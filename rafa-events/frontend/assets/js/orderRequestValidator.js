const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,20}$/;
const ALLOWED_SIZES = new Set(['Small', 'Medium', 'Large']);
const MAX_ITEMS = 20;
const MAX_QUANTITY_PER_ITEM = 20;
const MAX_ITEM_PRICE = 100000; // sanity ceiling in whole rupees, not a real catalog check yet

function isNonEmptyString(value, maxLength) {
	return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

// Validates and normalizes an incoming order-request payload.
// Returns { errors: string[] } on failure, or { value: {...} } on success.
// Never trusts client-supplied totals or IDs — those are recomputed/assigned server-side.
function validateOrderRequest(body) {
	const errors = [];

	if (!body || typeof body !== 'object') {
		return { errors: ['Request body must be a JSON object.'] };
	}

	const customerName = typeof body.customerName === 'string' ? body.customerName.trim() : '';
	if (!isNonEmptyString(customerName, 100)) errors.push('customerName is required (1-100 characters).');

	const customerEmail = typeof body.customerEmail === 'string' ? body.customerEmail.trim() : '';
	if (!isNonEmptyString(customerEmail, 254) || !EMAIL_PATTERN.test(customerEmail)) {
		errors.push('customerEmail must be a valid email address.');
	}

	let customerPhone = null;
	if (body.customerPhone !== undefined && body.customerPhone !== null && body.customerPhone !== '') {
		customerPhone = String(body.customerPhone).trim();
		if (!PHONE_PATTERN.test(customerPhone)) errors.push('customerPhone must be 7-20 digits/spaces/+/-/().');
	}

	let preferredDate = null;
	if (body.preferredDate) {
		const parsed = new Date(`${body.preferredDate}T00:00:00`);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (Number.isNaN(parsed.getTime())) {
			errors.push('preferredDate must be a valid date (YYYY-MM-DD).');
		} else if (parsed < today) {
			errors.push('preferredDate cannot be in the past.');
		} else {
			preferredDate = body.preferredDate;
		}
	}

	let notes = null;
	if (body.notes !== undefined && body.notes !== null && body.notes !== '') {
		notes = String(body.notes).trim().slice(0, 500);
	}

	const items = Array.isArray(body.items) ? body.items : null;
	if (!items || items.length === 0 || items.length > MAX_ITEMS) {
		errors.push(`items must be an array of 1-${MAX_ITEMS} entries.`);
	}

	const normalizedItems = [];
	if (items) {
		items.forEach((item, index) => {
			const name = typeof item?.name === 'string' ? item.name.trim() : '';
			const size = typeof item?.size === 'string' ? item.size.trim() : '';
			const quantity = Number(item?.quantity);
			const price = Number(item?.price);

			if (!isNonEmptyString(name, 100)) errors.push(`items[${index}].name is required.`);
			if (!ALLOWED_SIZES.has(size)) errors.push(`items[${index}].size must be one of Small, Medium, Large.`);
			if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) {
				errors.push(`items[${index}].quantity must be an integer between 1 and ${MAX_QUANTITY_PER_ITEM}.`);
			}
			if (!Number.isFinite(price) || price <= 0 || price > MAX_ITEM_PRICE) {
				errors.push(`items[${index}].price must be a positive number.`);
			}

			if (name && ALLOWED_SIZES.has(size) && Number.isInteger(quantity) && Number.isFinite(price)) {
				normalizedItems.push({ name, size, quantity, price });
			}
		});
	}

	if (errors.length > 0) return { errors };

	// Total is recomputed here, never taken from the client — a client could
	// otherwise submit arbitrary item prices alongside a low total.
	const total = normalizedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

	return {
		value: { customerName, customerEmail, customerPhone, preferredDate, notes, items: normalizedItems, total }
	};
}

module.exports = { validateOrderRequest };
