const params = new URLSearchParams(location.search);
const plan = params.get('plan') || 'Smart Rain';
document.getElementById('planSpan').textContent = plan;
const toAccount = document.getElementById('toAccount');
if (toAccount) toAccount.href = `account.html?from=success&plan=${encodeURIComponent(plan)}`;
