(function () {
  const yearNode = document.querySelector('[data-footer-year]');
  if (!yearNode) return;

  const currentYear = new Date().getFullYear();
  yearNode.textContent = currentYear;
})();
