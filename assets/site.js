const root = document.documentElement;
const button = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('jacker-theme');
const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  root.dataset.theme = theme;
  if (button) {
    button.textContent = theme === 'dark' ? '☀' : '☾';
    button.setAttribute('aria-label', theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro');
  }
}

setTheme(savedTheme || (systemDark ? 'dark' : 'light'));
button?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('jacker-theme', next);
  setTheme(next);
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});
