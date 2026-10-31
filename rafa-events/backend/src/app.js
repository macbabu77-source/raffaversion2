const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('node:crypto');
const db = require('./db');

const app = express();

// Security + body parsing
app.use(helmet());
app.use(express.json({ limit: '100kb' }));

// CORS: read allowed origins from .env (comma-separated)
const origins = (process.env.FRONTEND_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true }));

// Rate limit the order-request endpoint only
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Validation helpers
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateOrderRequest(body) {
  const errors = [];
  const b = body || {};

  if (typeof b.customer_name !== 'string' || b.customer_name.trim().length < 2) {
    errors.push('customer_name is required (min 2 chars)');
  }
  if (typeof b.customer_email !== 'string' || !EMAIL_RE.test(b.customer_email)) {
    errors.push('customer_email must be a valid email');
  }
  if (b.customer_phone != null && typeof b.customer_phone !== 'string') {
    errors.push('customer_phone must be a string');
  }
  if (b.preferred_date != null && typeof b.preferred_date !== 'string') {
    errors.push('preferred_date must be a string');
  }
  if (b.notes != null && typeof b.notes !== 'string') {
    errors.push('notes must be a string');
  }
  if (!Array.isArray(b.items) || b.items.length === 0) {
    errors.push('items must be a non-empty array');
  } else {
    b.items.forEach((it, i) => {
      if (!it || typeof it.name !== 'string' || !it.name.trim()) {
        errors.push(`items[${i}].name is required`);
      }
      if (!Number.isInteger(it.qty) || it.qty < 1) {
        errors.push(`items[${i}].qty must be a positive integer`);
      }
      if (!Number.isInteger(it.price) || it.price < 0) {
        errors.push(`items[${i}].price must be a non-negative integer (cents)`);
      }
    });
  }

  return errors;
}

// POST /api/order-requests
app.post('/api/order-requests', orderLimiter, (req, res) => {
  const errors = validateOrderRequest(req.body);
  if (errors.length) {
    return res.status(400).json({ error: 'validation_failed', details: errors });
  }

  const {
    customer_name,
    customer_email,
    customer_phone = null,
    preferred_date = null,
    notes = null,
    items,
  } = req.body;

  const total = items.reduce((sum, it) => sum + it.qty * it.price, 0);
  const id = crypto.randomUUID();
  const created_at = new Date().toISOString();

  try {
    const stmt = db.prepare(`
      INSERT INTO order_requests
        (id, created_at, customer_name, customer_email, customer_phone,
         preferred_date, notes, items_json, total, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `);
    stmt.run(
      id,
      created_at,
      customer_name.trim(),
      customer_email.trim().toLowerCase(),
      customer_phone,
      preferred_date,
      notes,
      JSON.stringify(items),
      total
    );

    return res.status(201).json({ id, created_at, total, status: 'pending' });
  } catch (err) {
    console.error('Failed to insert order request:', err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// 404 fallback
app.use((req, res) => res.status(404).json({ error: 'not_found' }));

module.exports = app;
