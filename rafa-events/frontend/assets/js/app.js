const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const orderRequestsRouter = require('./routes/orderRequests');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const allowedOrigins = (process.env.FRONTEND_ORIGINS || '')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

const app = express();

app.use(helmet());
app.use(
	cors({
		origin(origin, callback) {
			// Allow same-origin/non-browser requests (no Origin header) and anything explicitly listed.
			if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
			return callback(new Error('Not allowed by CORS'));
		}
	})
);
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (req, res) => {
	res.json({ success: true, data: { status: 'ok' }, message: null, error: null });
});

app.use('/api/order-requests', orderRequestsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
