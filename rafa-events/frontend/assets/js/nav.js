// Shared header/menu-toggle widget — used by index.html, apparels.html, desserts.html.
// Each page keeps its own visual theme; only this behavior is shared.
// Optional: set data-desktop-breakpoint="<px>" on #menuToggle to override
// the width at which the mobile menu auto-closes (defaults to 901).
(function () {
	const header = document.getElementById('siteHeader') || document.querySelector('header');
	const menuToggle = document.getElementById('menuToggle');
	if (!header || !menuToggle) return;

	const desktopBreakpoint = Number(menuToggle.dataset.desktopBreakpoint) || 901;
	const nav = menuToggle.getAttribute('aria-controls')
		? document.getElementById(menuToggle.getAttribute('aria-controls'))
		: header.querySelector('nav');

	const closeMenu = () => {
		header.classList.remove('nav-open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open menu');
	};

	menuToggle.addEventListener('click', () => {
		const isOpen = header.classList.toggle('nav-open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
	});

	(nav || header).querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') closeMenu();
	});
	window.matchMedia(`(min-width: ${desktopBreakpoint}px)`).addEventListener('change', closeMenu);
})();
