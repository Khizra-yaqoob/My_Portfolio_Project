// =========================================================
//  PORTFOLIO — Global JS Functions
//  Author: khizra (Assignment)
// =========================================================

/* ── Hamburger menu toggle ── */
function initHamburger() {
  const toggle = document.querySelector('.menu-toggle');
  const navUl  = document.querySelector('nav ul');
  if (!toggle || !navUl) return;
  toggle.addEventListener('click', () => {
    navUl.classList.toggle('open');
    const isOpen = navUl.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

/* ── Scroll-spy: highlight active nav link ── */
function initScrollSpy() {
  const sections = document.querySelectorAll('[data-section]');
  const navLinks  = document.querySelectorAll('nav a[href*="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        const id = entry.target.getAttribute('data-section');
        const active = document.querySelector(`nav a[href*="${id}"]`);
        if (active) active.style.color = 'var(--brand-accent-color)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ── Animate skill bars on first view ── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.getAttribute('data-width') || '0%';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => {
    const target = f.style.width;
    f.setAttribute('data-width', target);
    f.style.width = '0%';
    observer.observe(f);
  });
}

/* ── Dark / Light mode toggle ── */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeBtn(btn, saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeBtn(btn, next);
  });
}

function updateThemeBtn(btn, theme) {
  btn.textContent = theme === 'dark' ? '☀ Light' : '☾ Dark';
}

/* ── Typewriter effect ── */
function typeWriter(elementId, text, speed = 70) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let i = 0;
  el.textContent = '';
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(type, speed);
    }
  }
  type();
}

/* ── Contact form submission ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Sent!';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

/* ── Filter projects by category ── */
function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');
  const btns  = document.querySelectorAll('.filter-btn');

  btns.forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-filter="${category}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    card.style.display = (category === 'all' || cat === category) ? 'flex' : 'none';
  });
}

/* ── Navbar shrink on scroll ── */
function initNavShrink() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.padding = '10px 60px';
      nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
      nav.style.padding = '';
      nav.style.boxShadow = '';
    }
  });
}

/* ── Init everything on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initScrollSpy();
  initSkillBars();
  initThemeToggle();
  initContactForm();
  initNavShrink();
});
