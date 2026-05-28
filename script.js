// ─── CALIGO ARTS COLLECTIVE — Scripts ───────────────────────────────────────

// ── Year ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll behavior ──
const navbar = document.getElementById('navbar');

// ── Fog parallax ──
// Moves the whole fog container slowly against scroll so it feels like
// a separate depth layer — puffs keep their CSS drift animations unaffected.
const fog = document.getElementById('fog');

const onScroll = () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 30);
  if (fog) fog.style.transform = `translateY(${y * 0.18}px)`;
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── Mobile nav toggle ──
const toggle    = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Card tilt effect on about card ──
const tiltCard = document.querySelector('.card-tilt');
if (tiltCard) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect  = tiltCard.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    tiltCard.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-6px)`;
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = '';
  });
}

// ── Contact form — handled by Formspree Ajax (see index.html) ──

// ── Smooth active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${entry.target.id}`) {
          a.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
