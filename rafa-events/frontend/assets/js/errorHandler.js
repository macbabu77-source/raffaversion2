// Centralized error handler. Logs full detail server-side; sends only a
// generic message to clients so internals/stack traces never leak out.
function errorHandler(err, req, res, _next) {
	console.error(`[${new Date().toISOString()}] Unhandled error on ${req.method} ${req.originalUrl}:`, err);
	res.status(500).json({
		success: false,
		data: null,
		message: null,
		error: 'Something went wrong. Please try again.'
	});
}

function notFoundHandler(req, res) {
	res.status(404).json({ success: false, data: null, message: null, error: 'Not found.' });
}

module.exports = { errorHandler, notFoundHandler };
