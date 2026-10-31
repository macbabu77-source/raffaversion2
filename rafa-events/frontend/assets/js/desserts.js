// Nav/menu-toggle behavior now lives in assets/js/nav.js (shared across pages).

// Points at the backend/ service in this repo. Override before this script
// runs (e.g. <script>window.RAFA_API_BASE_URL = 'https://api.example.com';</script>)
// for a real deployment. If the backend isn't reachable, checkout still works
// but is honest that the request only saved locally — see checkoutForm submit below.
const apiBaseUrl = window.RAFA_API_BASE_URL || 'http://localhost:3001';

function syncDessertFlavors() {
	const flavorList = document.querySelector('.flavor-list');
	if (!flavorList || !window.RAFAContent) return;
	try {
		const flavors = window.RAFAContent.getCollection('desserts');
		const dotClasses = ['dot-choc', 'dot-van', 'dot-straw', 'dot-red'];
		flavorList.replaceChildren(...flavors.map((flavor, index) => {
			const button = document.createElement('button');
			button.className = `flavor-row${index === 0 ? ' active' : ''}`;
			button.type = 'button';
			button.dataset.name = flavor.name;
			button.dataset.description = flavor.description;
			button.setAttribute('aria-pressed', String(index === 0));

			const dot = document.createElement('span');
			dot.className = `dot ${dotClasses[index % dotClasses.length]}`;
			button.append(dot, document.createTextNode(flavor.name));
			if (index === 0) {
				const arrow = document.createElement('span');
				arrow.className = 'arrow';
				arrow.setAttribute('aria-hidden', 'true');
				arrow.textContent = '↗';
				button.append(arrow);
			}
			return button;
		}));
	} catch (error) {
		console.error('Unable to load dessert flavors:', error);
	}
}

syncDessertFlavors();
const flavorButtons = [...document.querySelectorAll('.flavor-row')];
const moodButtons = [...document.querySelectorAll('.mood-card')];
const cakeName = document.getElementById('cakeName');
const cakeDescription = document.getElementById('cakeDescription');
const searchToggle = document.getElementById('searchToggle');
const searchForm = document.getElementById('flavorSearch');
const flavorQuery = document.getElementById('flavorQuery');
const searchStatus = document.getElementById('searchStatus');
const sizeButtons = [...document.querySelectorAll('.size-btn')];
const cakePriceDisplay = document.getElementById('cakePrice');
const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

function getSelectedSize() {
	const activeSize = sizeButtons.find((button) => button.classList.contains('active'));
	return activeSize
		? { size: activeSize.dataset.size, price: Number(activeSize.dataset.price) }
		: { size: sizeButtons[0]?.dataset.size ?? 'Medium', price: Number(sizeButtons[0]?.dataset.price) || 0 };
}

function selectSize(sizeButton) {
	if (!sizeButton) return;
	sizeButtons.forEach((button) => {
		const selected = button === sizeButton;
		button.classList.toggle('active', selected);
		button.setAttribute('aria-pressed', String(selected));
	});
	if (cakePriceDisplay) cakePriceDisplay.textContent = currencyFormatter.format(Number(sizeButton.dataset.price));
}

sizeButtons.forEach((button) => button.addEventListener('click', () => selectSize(button)));

function selectFlavor(flavorButton) {
	if (!flavorButton) return;

	flavorButtons.forEach((button) => {
		const selected = button === flavorButton;
		button.classList.toggle('active', selected);
		button.setAttribute('aria-pressed', String(selected));
	});
	if (cakeName) cakeName.textContent = flavorButton.dataset.name;
	if (cakeDescription) cakeDescription.textContent = flavorButton.dataset.description;
	moodButtons.forEach((button) => {
		const selected = button.dataset.flavor === flavorButton.dataset.name;
		button.classList.toggle('selected', selected);
		button.setAttribute('aria-pressed', String(selected));
	});
}

flavorButtons.forEach((button) => button.addEventListener('click', () => selectFlavor(button)));

moodButtons.forEach((button) => {
	button.addEventListener('click', () => {
		moodButtons.forEach((moodButton) => {
			const selected = moodButton === button;
			moodButton.classList.toggle('selected', selected);
			moodButton.setAttribute('aria-pressed', String(selected));
		});
		selectFlavor(flavorButtons.find((flavorButton) => flavorButton.dataset.name === button.dataset.flavor));
	});
});

if (searchToggle && searchForm && flavorQuery) {
	searchToggle.addEventListener('click', () => {
		const isOpen = searchForm.hidden;
		searchForm.hidden = !isOpen;
		searchToggle.setAttribute('aria-expanded', String(isOpen));
		if (isOpen) flavorQuery.focus();
		else {
			flavorQuery.value = '';
			flavorQuery.dispatchEvent(new Event('input'));
		}
	});

	flavorQuery.addEventListener('input', () => {
		const query = flavorQuery.value.trim().toLowerCase();
		let visibleCount = 0;
		flavorButtons.forEach((button) => {
			const matches = button.textContent.toLowerCase().includes(query);
			button.hidden = !matches;
			if (matches) visibleCount += 1;
		});
		if (searchStatus) {
			searchStatus.hidden = !query || visibleCount > 0;
			searchStatus.textContent = 'No matching flavors.';
		}
	});
}

const cartDialog = document.getElementById('cartDialog');
const cartToggle = document.getElementById('cartToggle');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartTotal = document.getElementById('cartTotal');
const checkoutForm = document.getElementById('checkoutForm');
const orderStatus = document.getElementById('orderStatus');
const cartStorageKey = 'RAFA-desserts-cart';
const orderStorageKey = 'RAFA-desserts-order-requests';

function readStoredCart() {
	try {
		const storedCart = JSON.parse(localStorage.getItem(cartStorageKey) || '[]');
		return Array.isArray(storedCart)
			? storedCart.filter((item) =>
					typeof item.name === 'string' &&
					typeof item.size === 'string' &&
					Number.isFinite(item.price) &&
					item.price > 0 &&
					Number.isInteger(item.quantity) &&
					item.quantity > 0
				)
			: [];
	} catch {
		return [];
	}
}

let cart = readStoredCart();

function saveCart() {
	try {
		localStorage.setItem(cartStorageKey, JSON.stringify(cart));
	} catch {
		if (orderStatus) {
			orderStatus.hidden = false;
			orderStatus.textContent = 'Browser storage is unavailable; cart changes will not persist.';
		}
	}
}

function updateCart() {
	if (!cartItems || !cartCount) return;
	const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
	const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
	cartCount.textContent = String(itemCount);
	cartCount.setAttribute('aria-label', `${itemCount} items in cart`);
	cartItems.replaceChildren();

	cart.forEach((item, index) => {
		const row = document.createElement('li');
		const name = document.createElement('span');
		const controls = document.createElement('div');
		const decrease = document.createElement('button');
		const quantity = document.createElement('span');
		const increase = document.createElement('button');
		const remove = document.createElement('button');
		name.textContent = `${item.name} (${item.size}) — ${currencyFormatter.format(item.price)}`;
		decrease.type = increase.type = remove.type = 'button';
		decrease.textContent = '−';
		decrease.setAttribute('aria-label', `Remove one ${item.name} (${item.size})`);
		increase.textContent = '+';
		increase.setAttribute('aria-label', `Add one ${item.name} (${item.size})`);
		remove.textContent = 'Remove';
		remove.setAttribute('aria-label', `Remove ${item.name} (${item.size}) from cart`);
		quantity.textContent = String(item.quantity);
		controls.className = 'cart-quantity';
		controls.append(decrease, quantity, increase, remove);
		row.append(name, controls);
		row.dataset.cartIndex = String(index);
		cartItems.append(row);
	});

	if (cartEmpty) cartEmpty.hidden = itemCount > 0;
	if (cartTotal) {
		cartTotal.hidden = itemCount === 0;
		cartTotal.textContent = `Estimated total: ${currencyFormatter.format(total)}`;
	}
	if (checkoutForm) checkoutForm.hidden = itemCount === 0;
}

if (cartToggle && cartDialog) {
	cartToggle.addEventListener('click', () => cartDialog.showModal());
	document.getElementById('closeCart')?.addEventListener('click', () => cartDialog.close());
	cartDialog.addEventListener('click', (event) => {
		if (event.target === cartDialog) cartDialog.close();
	});
}

document.getElementById('addToCart')?.addEventListener('click', () => {
	const selectedFlavor = flavorButtons.find((button) => button.classList.contains('active'));
	if (!selectedFlavor) return;
	const { size, price } = getSelectedSize();
	const existingItem = cart.find((item) => item.name === selectedFlavor.dataset.name && item.size === size);
	if (existingItem) existingItem.quantity += 1;
	else cart.push({ name: selectedFlavor.dataset.name, size, price, quantity: 1 });
	saveCart();
	updateCart();
	cartDialog?.showModal();
});

cartItems?.addEventListener('click', (event) => {
	const button = event.target.closest('button');
	const row = button?.closest('[data-cart-index]');
	if (!button || !row) return;
	const item = cart[Number(row.dataset.cartIndex)];
	if (!item) return;
	if (button.textContent === '+') item.quantity += 1;
	else if (button.textContent === '−') item.quantity -= 1;
	else cart.splice(Number(row.dataset.cartIndex), 1);
	if (item.quantity <= 0) cart = cart.filter((cartItem) => cartItem !== item);
	saveCart();
	updateCart();
});

const orderHistoryList = document.getElementById('orderHistoryList');
const orderHistoryEmpty = document.getElementById('orderHistoryEmpty');
const orderDateFormatter = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

function readStoredOrders() {
	try {
		const storedOrders = JSON.parse(localStorage.getItem(orderStorageKey) || '[]');
		return Array.isArray(storedOrders) ? storedOrders : [];
	} catch {
		return [];
	}
}

function renderOrderHistory() {
	if (!orderHistoryList) return;
	const orders = readStoredOrders().slice().reverse();
	orderHistoryList.replaceChildren();
	orders.forEach((order) => {
		const item = document.createElement('li');
		const itemCount = Array.isArray(order.items) ? order.items.reduce((sum, entry) => sum + entry.quantity, 0) : 0;
		const orderDate = order.createdAt ? orderDateFormatter.format(new Date(order.createdAt)) : '';
		const statusLabel = order.status === 'sent' ? 'Sent' : 'Saved locally only';
		item.innerHTML = `<strong>${order.id ?? 'Order'}</strong> — ${itemCount} item${itemCount === 1 ? '' : 's'} — ${currencyFormatter.format(order.total ?? 0)}${orderDate ? ` — ${orderDate}` : ''} — ${statusLabel}`;
		orderHistoryList.append(item);
	});
	if (orderHistoryEmpty) orderHistoryEmpty.hidden = orders.length > 0;
}

renderOrderHistory();

checkoutForm?.addEventListener('submit', async (event) => {
	event.preventDefault();
	if (cart.length === 0 || !orderStatus) return;

	const formValues = Object.fromEntries(new FormData(checkoutForm).entries());
	const payload = {
		customerName: formValues.customerName,
		customerEmail: formValues.customerEmail,
		customerPhone: formValues.customerPhone || undefined,
		preferredDate: formValues.preferredDate || undefined,
		notes: formValues.orderNotes || undefined,
		items: cart.map((item) => ({ name: item.name, size: item.size, quantity: item.quantity, price: item.price }))
	};

	const submitButton = checkoutForm.querySelector('button[type="submit"]');
	if (submitButton) submitButton.disabled = true;
	orderStatus.hidden = false;
	orderStatus.textContent = 'Sending your request…';

	let order;
	try {
		const response = await fetch(`${apiBaseUrl}/api/order-requests`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});
		const body = await response.json().catch(() => null);

		if (response.ok && body?.success) {
			// Genuinely confirmed by the backend — only claim this when it's true.
			order = {
				id: body.data.id,
				createdAt: body.data.createdAt,
				customer: formValues,
				items: cart.map((item) => ({ ...item })),
				total: body.data.total,
				status: 'sent'
			};
			orderStatus.textContent = `Request sent — reference ${order.id}. The bakery has received it.`;
		} else {
			// Backend reached but rejected it (validation failed) — show the real reason, don't save it.
			orderStatus.textContent = body?.error || 'The bakery could not accept this request. Please check the form and try again.';
			if (submitButton) submitButton.disabled = false;
			return;
		}
	} catch {
		// Backend unreachable (not running, offline, etc). Be honest: this is local-only, not sent.
		order = {
			id: `local-${Date.now()}`,
			createdAt: new Date().toISOString(),
			customer: formValues,
			items: cart.map((item) => ({ ...item })),
			total: cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
			status: 'local-only'
		};
		orderStatus.textContent = `Could not reach the bakery's system, so this was saved in this browser only as ${order.id}. It has not been sent.`;
	}

	try {
		const savedOrders = JSON.parse(localStorage.getItem(orderStorageKey) || '[]');
		localStorage.setItem(orderStorageKey, JSON.stringify([...savedOrders, order]));
		renderOrderHistory();
	} catch {
		// Local history is a convenience; a failure here doesn't change whether the order was actually sent.
	}

	cart = [];
	saveCart();
	updateCart();
	checkoutForm.reset();
	if (submitButton) submitButton.disabled = false;
});

const preferredDateInput = document.getElementById('preferredDate');
if (preferredDateInput) preferredDateInput.min = new Date().toISOString().slice(0, 10);

updateCart();

document.getElementById('cakeSpin')?.addEventListener('click', (event) => {
	const cake = event.currentTarget;
	cake.classList.remove('spinning');
	requestAnimationFrame(() => cake.classList.add('spinning'));
});

const testGrid = document.querySelector('.test-grid');
document.querySelectorAll('[data-review-direction]').forEach((button) => {
	button.addEventListener('click', () => {
		const cards = testGrid?.querySelectorAll('.test-card');
		if (!cards || cards.length < 2) return;
		if (button.dataset.reviewDirection === 'next') testGrid.append(cards[0]);
		else testGrid.prepend(cards[cards.length - 1]);
	});
});

const likeButton = document.getElementById('likePage');
if (likeButton) {
	try {
		const liked = localStorage.getItem('RAFA-desserts-liked') === 'true';
		likeButton.setAttribute('aria-pressed', String(liked));
		likeButton.classList.toggle('liked', liked);
	} catch {}
	likeButton.addEventListener('click', () => {
		const liked = likeButton.getAttribute('aria-pressed') !== 'true';
		likeButton.setAttribute('aria-pressed', String(liked));
		likeButton.classList.toggle('liked', liked);
		try {
			localStorage.setItem('RAFA-desserts-liked', String(liked));
		} catch {}
	});
}

document.getElementById('sharePage')?.addEventListener('click', async () => {
	const shareStatus = document.getElementById('shareStatus');
	try {
		if (navigator.share) await navigator.share({ title: document.title, url: location.href });
		else {
			await navigator.clipboard.writeText(location.href);
			if (shareStatus) shareStatus.textContent = 'Page link copied.';
		}
	} catch (error) {
		if (error.name !== 'AbortError' && shareStatus) shareStatus.textContent = 'Unable to share this page.';
	}
});
