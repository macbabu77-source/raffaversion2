const sections = {
  projects: {
    title: 'Architecture',
    eyebrow: 'ARCHITECTURE PAGE',
    description: 'Manage featured projects on the RAFFA website.',
    collection: 'projects',
    kind: 'project',
    detailLabel: 'Location'
  },
  apparel: {
    title: 'Apparels',
    eyebrow: 'APPARELS PAGE',
    description: 'Manage products in the RAFFA Apparels catalog.',
    collection: 'apparel',
    kind: 'product',
    detailLabel: 'Category'
  },
  desserts: {
    title: 'Desserts',
    eyebrow: 'DESSERTS PAGE',
    description: 'Manage the cake flavors shown on the RAFFA Desserts page.',
    collection: 'desserts',
    kind: 'dessert',
    detailLabel: 'Description'
  },
  orders: {
    title: 'Dessert orders',
    eyebrow: 'CUSTOMER REQUESTS',
    description: 'Review dessert requests saved in this browser.',
    kind: 'order'
  }
};

const orderStorageKey = 'RAFA-desserts-order-requests';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let currentSection = 'overview';
let editingId = null;
let orders = [];

const sideNav = $('#sideNav');
const overviewPanel = $('#overviewPanel');
const contentPanel = $('#contentPanel');
const dataTable = $('#dataTable');
const sectionSearch = $('#sectionSearch');
const globalSearch = $('#globalSearch');
const editDialog = $('#editDialog');
const editForm = $('#editForm');
const formFields = $('#formFields');
const statusMessage = $('#statusMessage');
const toast = $('#toast');

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function notify(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(notify.timeout);
  notify.timeout = window.setTimeout(() => { toast.hidden = true; }, 2600);
}

function showStorageError(error) {
  statusMessage.textContent = `Could not load or save content: ${error.message}`;
  statusMessage.classList.add('error');
  $('#saveStatus').textContent = 'Could not save changes';
}

function clearStatus() {
  statusMessage.textContent = '';
  statusMessage.classList.remove('error');
}

function readOrders() {
  const saved = localStorage.getItem(orderStorageKey);
  if (saved === null) return [];
  const parsed = JSON.parse(saved);
  if (!Array.isArray(parsed)) throw new Error('Saved dessert orders must be a list.');
  return parsed;
}

function getItems(section) {
  if (section === 'orders') return orders;
  const config = sections[section];
  if (!config) throw new Error(`Unknown admin section: ${section}`);
  return window.RAFAContent.getCollection(config.collection);
}

function saveItems(section, items) {
  if (section === 'orders') {
    localStorage.setItem(orderStorageKey, JSON.stringify(items));
    orders = items;
    return;
  }
  const config = sections[section];
  if (!config) throw new Error(`Unknown admin section: ${section}`);
  window.RAFAContent.saveCollection(config.collection, items);
}

function itemDescription(item, section) {
  if (section === 'projects') return item.detail || 'Architecture project';
  if (section === 'apparel') return item.description || item.category || 'Apparel product';
  return item.description || 'Dessert flavor';
}

function itemMatches(item, section, query) {
  if (!query) return true;
  const content = section === 'orders'
    ? [item.id, item.customer?.customerName, item.customer?.customerEmail, ...(item.items || []).map((entry) => entry.name)].join(' ')
    : [item.name, item.detail, item.category, item.description, section].join(' ');
  return content.toLowerCase().includes(query.toLowerCase());
}

function itemToken(item, section) {
  if (section === 'orders') return 'OR';
  if (section === 'projects') return 'AR';
  if (section === 'apparel') return 'AP';
  return 'DS';
}

function itemPrimary(item, section) {
  if (section === 'orders') return item.customer?.customerName || item.customerName || 'Customer';
  return item.name || 'Untitled';
}

function orderTotal(order) {
  const total = Number(order.total);
  if (!Number.isFinite(total)) return '—';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total);
}

function dateLabel(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function orderState(order) {
  const state = order.adminStatus || order.status || 'pending';
  return state === 'local-only' || state === 'sent' || state === 'pending' ? 'new' : state;
}

function statusBadge(state) {
  const normalized = state === 'new' ? 'new' : state;
  const label = normalized === 'local-only' ? 'Local only'
    : normalized === 'sent' ? 'Sent'
      : normalized.charAt(0).toUpperCase() + normalized.slice(1);
  return `<span class="status-badge ${escapeHTML(normalized)}">${escapeHTML(label)}</span>`;
}

function renderCounts() {
  const projectCount = getItems('projects').length;
  const apparelCount = getItems('apparel').length;
  const dessertCount = getItems('desserts').length;
  $('#projectsCount').textContent = String(projectCount);
  $('#apparelCount').textContent = String(apparelCount);
  $('#dessertsCount').textContent = String(dessertCount);
  $('#ordersCount').textContent = String(orders.length);
  return { projectCount, apparelCount, dessertCount, orderCount: orders.length };
}

function renderOverview() {
  clearStatus();
  const counts = renderCounts();
  const summary = [
    { icon: '▧', value: counts.projectCount, label: 'Architecture projects', section: 'projects' },
    { icon: '▣', value: counts.apparelCount, label: 'Apparel products', section: 'apparel' },
    { icon: '◇', value: counts.dessertCount, label: 'Dessert flavors', section: 'desserts' },
    { icon: '◷', value: counts.orderCount, label: 'Browser-saved requests', section: 'orders' }
  ];
  $('#summaryGrid').innerHTML = summary.map((entry) => `
    <button class="summary-card" type="button" data-open-section="${entry.section}">
      <span class="summary-icon" aria-hidden="true">${entry.icon}</span>
      <strong>${entry.value}</strong>
      <span>${escapeHTML(entry.label)}</span>
    </button>`).join('');

  const pageEntries = [
    { key: 'projects', label: 'Architecture', icon: '▧', detail: 'Featured projects', count: counts.projectCount },
    { key: 'apparel', label: 'Apparels', icon: '▣', detail: 'Catalog products', count: counts.apparelCount },
    { key: 'desserts', label: 'Desserts', icon: '◇', detail: 'Cake flavors', count: counts.dessertCount }
  ];
  $('#pageCards').innerHTML = pageEntries.map((page) => `
    <button class="page-card" type="button" data-open-section="${page.key}">
      <span class="page-card-icon" aria-hidden="true">${page.icon}</span>
      <strong>${escapeHTML(page.label)}</strong>
      <small>${page.count} ${page.count === 1 ? 'item' : 'items'} · ${escapeHTML(page.detail)}</small>
    </button>`).join('');

  const recentOrders = orders.slice().reverse().slice(0, 3);
  $('#recentOrders').innerHTML = recentOrders.length
    ? recentOrders.map((order) => {
      const state = orderState(order);
      const count = Array.isArray(order.items) ? order.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) : 0;
      return `<button class="recent-order" type="button" data-open-section="orders">
        <strong>${escapeHTML(order.customer?.customerName || order.customerName || order.id || 'Dessert request')}</strong>
        <span class="order-total">${escapeHTML(orderTotal(order))}</span>
        <small>${count} ${count === 1 ? 'item' : 'items'} · ${escapeHTML(dateLabel(order.createdAt))}</small>
        <span class="order-state ${escapeHTML(state)}">${escapeHTML(state === 'new' ? 'New' : state)}</span>
      </button>`;
    }).join('')
    : '<p class="orders-empty">No dessert requests have been saved in this browser yet.</p>';
}

function renderOrderRow(order, index) {
  const customerName = order.customer?.customerName || order.customerName || 'Customer';
  const email = order.customer?.customerEmail || order.customerEmail || '';
  const items = Array.isArray(order.items) ? order.items : [];
  const itemSummary = items.map((item) => `${item.name || 'Dessert'} × ${Number(item.quantity) || 0}`).join(', ') || 'Dessert request';
  const status = order.adminStatus || order.status || 'pending';
  const selectedStatus = status === 'local-only' || status === 'sent' || status === 'pending' ? 'new' : status;
  const options = ['new', 'reviewed', 'completed'].map((value) =>
    `<option value="${value}" ${selectedStatus === value ? 'selected' : ''}>${value === 'new' ? 'New' : value.charAt(0).toUpperCase() + value.slice(1)}</option>`
  ).join('');
  return `<tr data-id="${escapeHTML(order.id || index)}" data-index="${index}">
    <td><div class="item-cell"><span class="item-token">OR</span><span class="item-copy"><strong>${escapeHTML(customerName)}</strong><small>${escapeHTML(email || order.id || '')}</small></span></div></td>
    <td>${escapeHTML(itemSummary)}</td>
    <td>${escapeHTML(order.customer?.customerPhone || order.customerPhone || '—')}</td>
    <td>${escapeHTML(dateLabel(order.createdAt))}</td>
    <td><strong>${escapeHTML(orderTotal(order))}</strong></td>
    <td>${statusBadge(status)}</td>
    <td><select class="order-status-select" aria-label="Update status for ${escapeHTML(customerName)}" data-order-index="${index}">${options}</select></td>
  </tr>`;
}

function renderContentRow(item, section, index) {
  if (section === 'orders') return renderOrderRow(item, index);
  const displayName = itemPrimary(item, section);
  const detail = itemDescription(item, section);
  const category = section === 'apparel'
    ? `<span class="category-badge">${escapeHTML(item.category || 'Uncategorized')}</span>`
    : section === 'projects'
      ? escapeHTML(item.detail || '—')
      : 'Cake flavor';
  const thirdColumn = section === 'apparel'
    ? Number.isFinite(Number(item.price))
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(item.price))
      : '—'
    : section === 'projects'
      ? item.image ? 'Image added' : 'No image'
      : 'Published';
  return `<tr data-id="${escapeHTML(item.id)}" data-section="${section}">
    <td><div class="item-cell"><span class="item-token">${itemToken(item, section)}</span><span class="item-copy"><strong>${escapeHTML(displayName)}</strong><small>${escapeHTML(detail)}</small></span></div></td>
    <td>${category}</td>
    <td>${escapeHTML(thirdColumn)}</td>
    <td>${escapeHTML(dateLabel(item.updatedAt))}</td>
    <td><div class="row-actions"><button type="button" data-action="edit">Edit</button><button type="button" class="delete-action" data-action="delete">Delete</button></div></td>
  </tr>`;
}

function renderTable() {
  clearStatus();
  const config = sections[currentSection];
  const query = sectionSearch.value.trim();
  const items = getItems(currentSection).filter((item) => itemMatches(item, currentSection, query));
  const isOrders = currentSection === 'orders';
  const headings = isOrders
    ? ['Customer', 'Order items', 'Phone', 'Date', 'Total', 'Request status', 'Admin status']
    : currentSection === 'projects'
      ? ['Project', 'Location', 'Cover image', 'Updated', 'Actions']
      : currentSection === 'apparel'
        ? ['Product', 'Category', 'Price', 'Updated', 'Actions']
        : ['Flavor', 'Description', 'Website status', 'Updated', 'Actions'];
  const tableRows = items.map((item, index) => renderContentRow(item, currentSection, isOrders ? orders.indexOf(item) : index)).join('');
  const empty = query ? `No ${escapeHTML(config.kind)} matches “${escapeHTML(query)}”.` : `No ${escapeHTML(config.kind)} items yet.`;

  dataTable.innerHTML = `<table class="data-table${dataTable.classList.contains('compact-view') ? ' compact' : ''}">
    <thead><tr>${headings.map((heading) => `<th scope="col">${escapeHTML(heading)}</th>`).join('')}</tr></thead>
    <tbody>${tableRows}</tbody>
  </table>`;
  $('#emptyState').hidden = items.length > 0;
  $('#emptyState').innerHTML = `<strong>${items.length ? '' : 'Nothing here yet'}</strong>${items.length ? '' : empty}`;
  dataTable.hidden = items.length === 0;
  if (isOrders && items.length === 0) $('#emptyState').innerHTML = `<strong>${orders.length ? 'No matching orders' : 'No browser-saved requests'}</strong>${orders.length ? 'Try another search.' : 'Requests submitted while the bakery server is unavailable are saved here only.'}`;
}

function setSection(section) {
  if (section !== 'overview' && !sections[section]) throw new Error(`Unknown admin section: ${section}`);
  currentSection = section;
  globalSearch.value = '';
  sectionSearch.value = '';
  $$('.nav-item').forEach((button) => button.classList.toggle('active', button.dataset.section === section));
  const isOverview = section === 'overview';
  const config = isOverview ? null : sections[section];
  overviewPanel.hidden = !isOverview;
  contentPanel.hidden = isOverview;
  $('#createButton').hidden = section === 'orders';
  $('#breadcrumbCurrent').textContent = isOverview ? 'Overview' : config.title;
  $('#pageEyebrow').textContent = isOverview ? 'YOUR WORKSPACE' : config.eyebrow;
  $('#pageTitle').textContent = isOverview ? 'Welcome to RAFFA Admin' : config.title;
  $('#pageDescription').textContent = isOverview
    ? 'Manage your website content and review dessert requests.'
    : config.description;
  if (!isOverview) {
    $('#listTitle').textContent = config.title;
    $('#listSubtitle').textContent = section === 'orders'
      ? 'Orders saved in this browser. Server-stored requests are not listed here.'
      : `${getItems(section).length} ${config.kind}${getItems(section).length === 1 ? '' : 's'} currently shown on your ${config.title} page.`;
    $('#privacyNote').textContent = section === 'orders'
      ? 'Only requests saved in this browser are shown. Requests stored by the bakery server are not available in this admin console yet.'
      : 'Content changes are stored in this browser only. They are not synced to other devices or the bakery server.';
    sectionSearch.placeholder = section === 'orders' ? 'Search requests' : 'Filter items';
    renderTable();
  } else {
    renderOverview();
  }
  renderCounts();
}

function renderGlobalResults(query) {
  clearStatus();
  overviewPanel.hidden = true;
  contentPanel.hidden = false;
  $('#createButton').hidden = true;
  $('#breadcrumbCurrent').textContent = 'Search results';
  $('#pageEyebrow').textContent = 'WEBSITE CONTENT';
  $('#pageTitle').textContent = 'Search results';
  $('#pageDescription').textContent = `Matching RAFFA website content for “${query}”.`;
  $('#listTitle').textContent = 'Matching content';
  $('#listSubtitle').textContent = 'Search results from Architecture, Apparels, and Desserts.';
  $('#privacyNote').textContent = 'Content changes are stored in this browser only.';
  sectionSearch.value = '';

  const matches = Object.keys(sections)
    .filter((section) => section !== 'orders')
    .flatMap((section) => getItems(section)
      .filter((item) => itemMatches(item, section, query))
      .map((item) => ({ item, section })));
  dataTable.innerHTML = `<table class="data-table"><thead><tr><th scope="col">Page</th><th scope="col">Item</th><th scope="col">Details</th><th scope="col">Actions</th></tr></thead><tbody>
    ${matches.map(({ item, section }) => `<tr data-id="${escapeHTML(item.id)}" data-section="${section}">
      <td>${escapeHTML(sections[section].title)}</td>
      <td><div class="item-cell"><span class="item-token">${itemToken(item, section)}</span><span class="item-copy"><strong>${escapeHTML(itemPrimary(item, section))}</strong></span></div></td>
      <td>${escapeHTML(itemDescription(item, section))}</td>
      <td><div class="row-actions"><button type="button" data-action="edit">Edit</button><button type="button" class="delete-action" data-action="delete">Delete</button></div></td>
    </tr>`).join('')}
  </tbody></table>`;
  dataTable.hidden = matches.length === 0;
  $('#emptyState').hidden = matches.length > 0;
  $('#emptyState').innerHTML = `<strong>No matching content</strong>Try another search term.`;
}

function field(label, name, value, type = 'text', options = {}) {
  const id = `field-${name}`;
  let control;
  if (options.select) {
    const choices = options.select.map((option) =>
      `<option value="${escapeHTML(option.value)}" ${String(value) === option.value ? 'selected' : ''}>${escapeHTML(option.label)}</option>`
    ).join('');
    control = `<select id="${id}" name="${name}" ${options.required === false ? '' : 'required'}>${choices}</select>`;
  } else if (type === 'textarea') {
    control = `<textarea id="${id}" name="${name}" ${options.required === false ? '' : 'required'}>${escapeHTML(value)}</textarea>`;
  } else {
    const attributes = [
      `id="${id}"`,
      `name="${name}"`,
      `type="${type}"`,
      `value="${escapeHTML(value)}"`,
      options.required === false ? '' : 'required',
      options.min !== undefined ? `min="${options.min}"` : '',
      options.step ? `step="${options.step}"` : '',
      options.maxlength ? `maxlength="${options.maxlength}"` : ''
    ].filter(Boolean).join(' ');
    control = `<input ${attributes}>`;
  }
  const hint = options.hint ? `<small>${escapeHTML(options.hint)}</small>` : '';
  return `<label for="${id}">${escapeHTML(label)}${control}${hint}</label>`;
}

function openEditor(item = null) {
  const section = currentSection;
  const isEditing = Boolean(item);
  editingId = item?.id || null;
  $('#dialogTitle').textContent = isEditing ? `Edit ${sections[section].kind}` : `New ${sections[section].kind}`;
  formFields.innerHTML = '';
  if (section === 'projects') {
    formFields.innerHTML = field('Project name', 'name', item?.name || '', 'text', { maxlength: 120 }) +
      field('Location', 'detail', item?.detail || '', 'text', { maxlength: 160 }) +
      field('Cover image URL', 'image', item?.image || '', 'url', { required: false, hint: 'Optional. Use an http or https image URL.' });
  } else if (section === 'apparel') {
    formFields.innerHTML = field('Product name', 'name', item?.name || '', 'text', { maxlength: 120 }) +
      field('Category', 'category', item?.category || 'clothes', 'text', { select: [
        { value: 'clothes', label: 'Clothes' }, { value: 'shoes', label: 'Shoes' },
        { value: 'handbags', label: 'Handbags' }, { value: 'accessories', label: 'Accessories' }
      ] }) +
      field('Description', 'description', item?.description || '', 'textarea', { maxlength: 500 }) +
      field('Price (USD)', 'price', item?.price ?? '', 'number', { min: 0, step: '1' }) +
      field('Rating', 'rating', item?.rating ?? '5', 'number', { min: 0, step: '0.1' }) +
      field('Product image URL', 'image', item?.image || '', 'url', { required: false, hint: 'Optional. Use an http or https image URL.' });
  } else if (section === 'desserts') {
    formFields.innerHTML = field('Flavor name', 'name', item?.name || '', 'text', { maxlength: 120 }) +
      field('Description', 'description', item?.description || '', 'textarea', { maxlength: 500 });
  }
  $('#formError').textContent = '';
  editDialog.showModal();
}

function safeImageUrl(value) {
  if (!value) return '';
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Enter a valid http or https image URL.');
  return url.href;
}

function saveEditor(event) {
  event.preventDefault();
  if (!editForm.reportValidity()) return;
  const section = currentSection;
  const values = Object.fromEntries(new FormData(editForm).entries());
  const currentItems = getItems(section);
  const existing = editingId ? currentItems.find((item) => item.id === editingId) : null;
  const id = existing?.id || `${section}-${window.crypto?.randomUUID ? window.crypto.randomUUID() : Date.now().toString(36)}`;
  const item = { ...values, id, updatedAt: new Date().toISOString() };

  try {
    if (section === 'apparel') {
      item.price = Number(values.price);
      item.rating = Number(values.rating);
      if (!Number.isFinite(item.price) || item.price < 0 || !Number.isFinite(item.rating) || item.rating < 0) {
        throw new Error('Enter a valid non-negative price and rating.');
      }
      item.image = safeImageUrl(values.image);
    } else if (section === 'projects') {
      item.image = safeImageUrl(values.image);
    }
    const nextItems = existing
      ? currentItems.map((entry) => entry.id === id ? item : entry)
      : [...currentItems, item];
    saveItems(section, nextItems);
    editDialog.close();
    renderTable();
    renderCounts();
    $('#saveStatus').textContent = 'Changes saved in this browser';
    notify(existing ? 'Changes saved.' : 'Content added.');
  } catch (error) {
    $('#formError').textContent = `Could not save changes: ${error.message}`;
  }
}

function handleTableClick(event) {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const row = button.closest('[data-id]');
  if (!row) return;
  const section = row.dataset.section || currentSection;
  const items = getItems(section);
  const item = items.find((entry) => entry.id === row.dataset.id);
  if (!item) return;
  if (button.dataset.action === 'edit') {
    setSection(section);
    openEditor(item);
    return;
  }
  if (button.dataset.action === 'delete') {
    if (section === 'desserts' && items.length === 1) {
      notify('Keep at least one dessert flavor on the website.');
      return;
    }
    const name = item.name || 'this item';
    if (!window.confirm(`Delete “${name}” from ${sections[section].title}?`)) return;
    try {
      saveItems(section, items.filter((entry) => entry.id !== item.id));
      renderTable();
      renderCounts();
      notify('Content deleted.');
    } catch (error) {
      showStorageError(error);
    }
  }
}

function handleOrderStatus(event) {
  const select = event.target.closest('.order-status-select');
  if (!select) return;
  const order = orders[Number(select.dataset.orderIndex)];
  if (!order) return;
  const nextOrders = orders.map((entry) => entry === order ? { ...entry, adminStatus: select.value } : entry);
  try {
    saveItems('orders', nextOrders);
    renderTable();
    renderCounts();
    $('#saveStatus').textContent = 'Changes saved in this browser';
    notify('Order status saved in this browser.');
  } catch (error) {
    showStorageError(error);
    renderTable();
  }
}

function renderAll() {
  orders = readOrders();
  renderCounts();
  if (currentSection === 'overview') renderOverview();
  else renderTable();
}

sideNav.addEventListener('click', (event) => {
  const button = event.target.closest('[data-section]');
  if (button) {
    setSection(button.dataset.section);
    closeMobileNav();
  }
});

document.addEventListener('click', (event) => {
  const shortcut = event.target.closest('[data-open-section]');
  if (shortcut) setSection(shortcut.dataset.openSection);
});

const sectionPicker = $('#sectionPicker');

$('#createButton').addEventListener('click', () => {
  if (currentSection === 'overview') sectionPicker.showModal();
  else openEditor();
});
$('#closeSectionPicker').addEventListener('click', () => sectionPicker.close());
sectionPicker.addEventListener('click', (event) => {
  const button = event.target.closest('[data-section-option]');
  if (!button) return;
  sectionPicker.close();
  setSection(button.dataset.sectionOption);
  openEditor();
});
$('#cancelDialog').addEventListener('click', () => editDialog.close());
$('#closeDialog').addEventListener('click', () => editDialog.close());
editForm.addEventListener('submit', saveEditor);
dataTable.addEventListener('click', handleTableClick);
dataTable.addEventListener('change', handleOrderStatus);
sectionSearch.addEventListener('input', renderTable);

globalSearch.addEventListener('input', () => {
  const query = globalSearch.value.trim();
  if (currentSection === 'overview') {
    if (query) renderGlobalResults(query);
    else {
      overviewPanel.hidden = false;
      contentPanel.hidden = true;
      $('#breadcrumbCurrent').textContent = 'Overview';
      $('#pageEyebrow').textContent = 'YOUR WORKSPACE';
      $('#pageTitle').textContent = 'Welcome to RAFFA Admin';
      $('#pageDescription').textContent = 'Manage your website content and review dessert requests.';
      $('#createButton').hidden = false;
      renderOverview();
    }
    return;
  }
  sectionSearch.value = query;
  renderTable();
});

$('#refreshButton').addEventListener('click', () => {
  try {
    renderAll();
    notify('Content refreshed.');
  } catch (error) {
    showStorageError(error);
  }
});

$('#viewToggle').addEventListener('click', () => {
  dataTable.classList.toggle('compact-view');
  renderTable();
});

$('#themeToggle').addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark-mode');
  $('#themeToggle').textContent = dark ? '☼' : '☾';
  $('#themeToggle').setAttribute('aria-label', dark ? 'Switch to light mode' : 'Toggle dark mode');
  try {
    localStorage.setItem('rafa-admin-theme', dark ? 'dark' : 'light');
  } catch (error) {
    notify(`Theme changed, but could not save the preference: ${error.message}`);
    return;
  }
  notify(dark ? 'Dark theme enabled' : 'Light theme enabled');
});

$('#profileButton').addEventListener('click', () => {
  notify('RAFFA administrator');
});

$('#resetButton').addEventListener('click', () => {
  if (!window.confirm('Restore the sample projects and products and clear browser-saved flavors and orders?')) return;
  try {
    ['projects', 'apparel', 'desserts'].forEach((collection) => localStorage.removeItem(`rafa-admin-${collection}`));
    localStorage.removeItem(orderStorageKey);
    orders = [];
    setSection('overview');
    $('#saveStatus').textContent = 'Sample content restored';
    notify('Sample content restored.');
  } catch (error) {
    showStorageError(error);
  }
});

function closeMobileNav() {
  document.body.classList.remove('nav-open');
  $('#mobileBackdrop').hidden = true;
  $('#sidebarToggle').setAttribute('aria-expanded', 'false');
}

$('#sidebarToggle').addEventListener('click', () => {
  if (!window.matchMedia('(max-width: 760px)').matches) {
    const collapsed = $('.admin-shell').classList.toggle('sidebar-collapsed');
    $('#sidebarToggle').setAttribute('aria-expanded', String(!collapsed));
    return;
  }
  const open = !document.body.classList.contains('nav-open');
  document.body.classList.toggle('nav-open', open);
  $('#mobileBackdrop').hidden = !open;
  $('#sidebarToggle').setAttribute('aria-expanded', String(open));
});

$('#mobileBackdrop').addEventListener('click', closeMobileNav);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMobileNav();
  if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    globalSearch.focus();
  }
});

window.addEventListener('storage', (event) => {
  if (event.key === orderStorageKey || event.key?.startsWith('rafa-admin-')) {
    try {
      renderAll();
    } catch (error) {
      showStorageError(error);
    }
  }
});

window.addEventListener('resize', () => {
  if (!window.matchMedia('(max-width: 760px)').matches) closeMobileNav();
});

try {
  const savedTheme = localStorage.getItem('rafa-admin-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    $('#themeToggle').textContent = '☼';
    $('#themeToggle').setAttribute('aria-label', 'Switch to light mode');
  }
  $('#year').textContent = String(new Date().getFullYear());
  orders = readOrders();
  setSection('overview');
} catch (error) {
  showStorageError(error);
  overviewPanel.hidden = true;
  contentPanel.hidden = false;
  $('#pageTitle').textContent = 'Unable to load admin content';
  $('#pageDescription').textContent = 'Check browser storage and refresh the page.';
}
