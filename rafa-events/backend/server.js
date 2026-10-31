// RAFA Events — backend, Phase 1 slice
//
// What this is: one real, working endpoint (POST /api/order-requests) backing
// the desserts checkout form, with actual validation, rate limiting, and a
// SQLite table behind it.
//
// What this is NOT: payment processing, email/SMS notifications to the
// bakery, an admin API to list/manage requests, or auth. Those are real
// integration points, not stubbed here, and would need to be built
// deliberately (an admin endpoint in particular needs auth in front of it
// before it can safely return other customers' names/emails/phone numbers).
//
// Setup:
//   cd backend
//   npm install
//   cp .env.example .env   (edit FRONTEND_ORIGINS to match your dev server)
//   npm start
require('dotenv').config();
const app = require('./src/app');

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => {
	console.log(`RAFA Events backend listening on http://localhost:${port}`);
});
