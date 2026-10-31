const crypto = require('node:crypto');
const express = require('express');
const rateLimit = require('express-rate-limit');
const db = require('../db');
const { validateOrderRequest } = require('../validators/orderRequestValidator');

const router = express.Router();

// Strict limit: this is a public write endpoint with no auth in front of it yet.
const orderRequestLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: { success: false, data: null, message: null, error: 'Too many requests. Please try again later.' }
});

const insertOrderRequest = db.prepare(`
  INSERT INTO order_requests
    (id, created_at, customer_name, customer_email, customer_phone, preferred_date, notes, items_json, total, status)
  VALUES (@id, @createdAt, @customerName, @customerEmail, @customerPhone, @preferredDate, @notes, @itemsJson, @total, 'pending')
`);

router.post('/', orderRequestLimiter, (req, res, next) => {
	try {
		const { errors, value } = validateOrderRequest(req.body);
		if (errors) {
			return res.status(422).json({ success: false, data: null, message: null, error: errors.join(' ') });
		}

		const id = `order-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
		const createdAt = new Date().toISOString();

		insertOrderRequest.run({
			id,
			createdAt,
			customerName: value.customerName,
			customerEmail: value.customerEmail,
			customerPhone: value.customerPhone,
			preferredDate: value.preferredDate,
			notes: value.notes,
			itemsJson: JSON.stringify(value.items),
			total: value.total
		});

		// Note: this only confirms the request was received and stored.
		// There is no real notification/fulfillment integration yet — see README note in server.js.
		res.status(201).json({
			success: true,
			data: { id, createdAt, total: value.total, status: 'pending' },
			message: 'Order request received.',
			error: null
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
