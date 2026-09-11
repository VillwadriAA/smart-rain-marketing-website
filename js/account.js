// helpers
function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}
function show(el, on = true) { el?.classList.toggle('hidden', !on); }

// hydrate profile from localStorage (simple demo user)
const user = JSON.parse(localStorage.getItem('sr_user') || '{}');
// defaults if nothing stored yet
if (!user.email) user.email = 'guest@example.com';
if (!user.name) user.name = 'Guest';
document.getElementById('acctName').textContent = user.name;
document.getElementById('acctEmail').textContent = user.email;

// handle coming from payment-success
const fromSuccess = getParam('from') === 'success';
const plan = getParam('plan');
if (fromSuccess && plan) {
  user.plan = plan;
  user.status = 'active';
  localStorage.setItem('sr_user', JSON.stringify(user));
  // banner
  const banner = document.getElementById('planBanner');
  const text = document.getElementById('planBannerText');
  if (banner && text) {
    text.textContent = `Your ${plan} plan is now active. Welcome to Smart Rain!`;
    banner.classList.remove('hidden');
  }
}

// toggle subscription sections
const hasActive = user.plan && user.status === 'active';
show(document.getElementById('subActive'), !!hasActive);
show(document.getElementById('subInactive'), !hasActive);
if (hasActive) {
  document.getElementById('planName').textContent = user.plan;
  document.getElementById('planNameLower').textContent = String(user.plan).toLowerCase();
}
