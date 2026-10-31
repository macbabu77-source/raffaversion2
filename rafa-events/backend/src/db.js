const path = require('node:path');
const fs = require('node:fs');
const Database = require('better-sqlite3');

const dbPath = process.env.DATABASE_PATH || './data/RAFA-events.db';
const resolvedPath = path.resolve(__dirname, '..', dbPath);

fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });

const db = new Database(resolvedPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Kept intentionally small: one table for one real, working flow (dessert
// order requests). Add further tables/migrations here as new flows are
// actually built, rather than pre-creating a full commerce schema upfront.
db.exec(`
  CREATE TABLE IF NOT EXISTS order_requests (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    preferred_date TEXT,
    notes TEXT,
    items_json TEXT NOT NULL,
    total INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
  );
`);

module.exports = db;
