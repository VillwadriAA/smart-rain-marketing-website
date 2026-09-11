// very simple demo auth using localStorage
function getUser() {
  try { return JSON.parse(localStorage.getItem('sr_user') || 'null'); }
  catch { return null; }
}
function setUser(u) { localStorage.setItem('sr_user', JSON.stringify(u)); }
function clearUser() { localStorage.removeItem('sr_user'); }

function hydrateUserAreas() {
  const user = getUser();
  const containers = [document.getElementById('userArea'), document.getElementById('userAreaMobile')].filter(Boolean);
  containers.forEach(c => {
    if (!c) return;
    if (!user) {
      c.innerHTML = `<button data-open="login" class="rounded-lg border px-3 py-1 w-full lg:w-auto">Sign in</button>`;
      return;
    }
    const initials = (user.name || user.email || 'U').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
    c.innerHTML = `
      <button data-user-menu-btn class="rounded-full w-10 h-10 bg-blue-600 text-white font-semibold">${initials}</button>
      <div data-user-menu hidden class="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow">
        <div class="px-3 py-2 text-sm">
          <div class="font-medium">${user.name || 'User'}</div>
          <div class="text-gray-500 text-xs">${user.email || ''}</div>
        </div>
        <div class="border-t"></div>
        <a href="account.html" class="block px-3 py-2 text-sm hover:bg-gray-50">Account</a>
        <button data-signout class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Sign out</button>
      </div>
    `;
  });
}
hydrateUserAreas();

// user menu toggle
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-user-menu-btn]');
  const menu = document.querySelector('[data-user-menu]');
  if (btn && menu) menu.toggleAttribute('hidden');
  else if (menu && !e.target.closest('[data-user-menu],[data-user-menu-btn]')) menu.setAttribute('hidden', '');
});

// modals open/close
function openModal(id){ document.getElementById(id)?.removeAttribute('hidden'); }
function closeModal(el){ el?.setAttribute('hidden',''); }

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-open="login"]')) openModal('loginModal');
  if (e.target.matches('[data-open="signup"]')) openModal('signupModal');
  if (e.target.matches('[data-open="forgot"]')) openModal('forgotModal');
  if (e.target.matches('[data-close-modal]')) closeModal(e.target.closest('[data-modal]'));
  if (e.target.matches('[data-signout]')) { clearUser(); location.href = 'index.html'; }
});

// auth form handlers
document.addEventListener('submit', (e) => {
  const form = e.target;
  if (form.matches('#loginForm')) {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    setUser({ email, name: email.split('@')[0], status: 'active' });
    document.querySelectorAll('#loginModal').forEach(m=>m.setAttribute('hidden',''));
    hydrateUserAreas();
    alert('Signed in (demo)');
  }
  if (form.matches('#signupForm')) {
    e.preventDefault();
    const name = form.querySelector('input[placeholder="John Smith"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    setUser({ name, email, status: 'active' });
    document.querySelectorAll('#signupModal').forEach(m=>m.setAttribute('hidden',''));
    hydrateUserAreas();
    alert('Account created (demo)');
  }
  if (form.matches('#forgotForm')) {
    e.preventDefault();
    document.querySelectorAll('#forgotModal').forEach(m=>m.setAttribute('hidden',''));
    alert('Reset email sent (demo)');
  }
});
