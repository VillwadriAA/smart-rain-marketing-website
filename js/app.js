// simple sign-out: clears demo user and goes home
document.addEventListener('click', (e) => {
  if (e.target && e.target.matches('[data-signout]')) {
    localStorage.removeItem('sr_user');
    location.href = 'index.html';
  }
});
