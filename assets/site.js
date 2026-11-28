const root = document.documentElement;
const button = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('jacker-theme');

function setTheme(theme) {
  root.dataset.theme = theme;
  if (button) {
    button.textContent = theme === 'dark' ? '☀' : '☾';
    button.setAttribute('aria-label', theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro');
  }
}

setTheme(savedTheme || 'dark');
button?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('jacker-theme', next);
  setTheme(next);
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const revealNodes = document.querySelectorAll('.app-card, .panel, .policy-card, .feature, .hero-card');
revealNodes.forEach((node, idx) => {
  node.classList.add('reveal-item');
  node.style.transitionDelay = `${(idx % 4) * 60}ms`;
});

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );
  revealNodes.forEach((node) => io.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
}
