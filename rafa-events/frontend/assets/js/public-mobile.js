(function () {
  const pageFile = window.location.pathname.split('/').pop() || 'index.html';
  const pages = [
    { file: 'index.html', label: 'Home' },
    { file: 'apparels.html', label: 'Apparels' },
    { file: 'desserts.html', label: 'Desserts' }
  ];
  const currentPage = pages.find((page) => page.file === pageFile) || pages[0];
  const mobileViewport = window.matchMedia('(max-width: 760px)');
  const nav = document.createElement('nav');
  const sectionNav = document.createElement('nav');
  const pageSections = Array.from(document.body.children)
    .filter((element) => element.matches('section, footer'));

  nav.className = 'mobile-app-nav';
  nav.setAttribute('aria-label', 'Public site');
  nav.setAttribute('aria-hidden', String(!mobileViewport.matches));
  nav.hidden = !mobileViewport.matches;
  sectionNav.className = 'mobile-section-nav';
  sectionNav.setAttribute('aria-label', `${currentPage.label} sections`);
  sectionNav.setAttribute('aria-hidden', String(!mobileViewport.matches));
  sectionNav.hidden = !mobileViewport.matches;

  pages.forEach((page) => {
    const link = document.createElement('a');
    link.href = page.file;
    link.textContent = page.label;
    if (page.file === currentPage.file) link.setAttribute('aria-current', 'page');
    nav.append(link);
  });

  pageSections.forEach((section, index) => {
    if (!section.id) section.id = `mobile-section-${index + 1}`;
    const heading = section.querySelector('h1, h2');
    const eyebrow = section.querySelector('.eyebrow');
    const label = index === 0
      ? 'Start'
      : (eyebrow?.textContent || heading?.textContent || section.tagName).trim().replace(/\s+/g, ' ');
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.textContent = label;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.replaceState(null, '', link.hash);
      section.scrollIntoView({
        block: 'start',
        behavior: 'instant'
      });
    });
    sectionNav.append(link);
  });

  document.body.dataset.mobilePage = currentPage.file.replace('.html', '');
  document.querySelector('header')?.insertAdjacentElement('afterend', sectionNav);
  document.body.append(nav);

  const updateViewport = () => {
    document.body.classList.toggle('mobile-app-mode', mobileViewport.matches);
    nav.setAttribute('aria-hidden', String(!mobileViewport.matches));
    sectionNav.setAttribute('aria-hidden', String(!mobileViewport.matches));
    nav.hidden = !mobileViewport.matches;
    sectionNav.hidden = !mobileViewport.matches;
    document.body.style.setProperty(
      '--mobile-viewport-height',
      `${window.visualViewport?.height || window.innerHeight}px`
    );
  };

  mobileViewport.addEventListener('change', updateViewport);
  window.addEventListener('resize', updateViewport, { passive: true });
  window.visualViewport?.addEventListener('resize', updateViewport, { passive: true });
  updateViewport();

  if ('IntersectionObserver' in window) {
    const sectionLinks = Array.from(sectionNav.querySelectorAll('a'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) {
            link.setAttribute('aria-current', 'location');
            const left = link.offsetLeft - sectionNav.offsetLeft + link.offsetWidth / 2 - sectionNav.clientWidth / 2;
            sectionNav.scrollTo({ left, behavior: 'smooth' });
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    pageSections.forEach((section) => observer.observe(section));
  }
})();
