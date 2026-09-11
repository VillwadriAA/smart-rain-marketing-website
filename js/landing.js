// nav background + back-to-top visibility
const topNav = document.getElementById('topNav');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  topNav.classList.toggle('bg-white/90', scrolled);
  topNav.classList.toggle('backdrop-blur', scrolled);
  topNav.classList.toggle('shadow', scrolled);
  backToTop.classList.toggle('hidden', window.scrollY < 500);
});

// smooth scroll
function scrollToId(id){
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-scrollto]');
  if (btn) {
    const id = btn.getAttribute('data-scrollto');
    document.getElementById('mobileMenu')?.classList.add('hidden');
    scrollToId(id);
  }
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// mobile menu toggle
document.getElementById('menuBtn')?.addEventListener('click', () => {
  document.getElementById('mobileMenu')?.classList.toggle('hidden');
});

// FAQ accordion
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-acc-btn]');
  if (!b) return;
  const panel = b.parentElement.querySelector('[data-acc-panel]');
  panel?.classList.toggle('hidden');
});

// Pricing plan buttons
document.querySelectorAll('[data-plan]').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.getAttribute('data-plan');
    const url = btn.getAttribute('data-stripe');
    const user = JSON.parse(localStorage.getItem('sr_user') || 'null');
    if (!user) {
      // not signed in → open login
      document.getElementById('loginModal')?.removeAttribute('hidden');
      alert('Please sign in to purchase a plan (demo)');
      return;
    }
    // demo: go directly to success page with ?plan=...
    // (when you have real Stripe, redirect to url + success/cancel redirect params)
    location.href = `payment-success.html?plan=${encodeURIComponent(plan)}`;
  });
});

// contact form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Message sent! We'll be in touch within 24 hours. (demo)");
});
