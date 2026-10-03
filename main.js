(() => {
  const root = document.documentElement;

  // Thème : choix mémorisé, sinon préférence du système
  const btn = document.getElementById('theme');
  let theme;
  try { theme = localStorage.getItem('theme'); } catch (e) {}
  if (!theme) theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const applyTheme = (t) => {
    root.dataset.theme = t;
    btn.textContent = t === 'dark' ? 'Mode clair' : 'Mode sombre';
  };
  applyTheme(theme);

  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Filtres des projets
  const filters = document.querySelectorAll('.filters button');
  const projects = document.querySelectorAll('.proj');

  filters.forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.f;
    filters.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    projects.forEach((p) => {
      p.hidden = f !== 'all' && !p.dataset.cats.split(' ').includes(f);
    });
  }));

  // Lien actif dans le menu selon la section visible
  const links = document.querySelectorAll('.side nav a');
  const sections = [...links].map((a) => document.querySelector(a.getAttribute('href')));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      const a = document.querySelector('.side nav a[href="#' + e.target.id + '"]');
      if (a) a.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  sections.forEach((s) => s && io.observe(s));
})();
