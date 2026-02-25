// =============================================
//  MINNA — Legal Recruitment & Career Advisory
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── YEAR ──────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── NAV SCROLL STATE ──────────────────────
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── MOBILE NAV TOGGLE ─────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ── SCROLL REVEAL ─────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── SERVICE ITEMS (staggered) ─────────────
  const serviceItems = document.querySelectorAll('.service-item');

  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.closest('ul').querySelectorAll('.service-item');
        siblings.forEach((item, i) => {
          setTimeout(() => item.classList.add('visible'), i * 120);
        });
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Observe only the first item in each list
  document.querySelectorAll('.service-list').forEach(list => {
    const first = list.querySelector('.service-item');
    if (first) serviceObserver.observe(first);
  });

  // ── NUMBER COUNTER ────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const countUp = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ── ACTIVE NAV LINK ───────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));

  // ── CONTACT FORM (basic mailto fallback) ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = form.querySelector('#name').value;
      const company = form.querySelector('#company').value;
      const email   = form.querySelector('#email').value;
      const phone   = form.querySelector('#phone').value;
      const message = form.querySelector('#message').value;

      const body = [
        `Name: ${name}`,
        company ? `Company: ${company}` : '',
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : '',
        `\n${message}`
      ].filter(Boolean).join('\n');

      window.location.href = `mailto:minnafeliglaw@gmail.com?subject=Confidential Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
    });
  }

});
