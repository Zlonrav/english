// ================= РОДИТЕЛЬСКИЙ РЕЖИМ =================
function canPayoutNow() {
  const now = new Date();
  return now.getDay() === 0 && now.getHours() >= 10;
}

function openParentMode() {
  document.getElementById('parent-password').value = '';
  document.getElementById('parent-auth').style.display = 'block';
  document.getElementById('parent-content').style.display = 'none';
  document.getElementById('parent-modal').style.display = 'flex';
}

function closeParentModal() {
  document.getElementById('parent-modal').style.display = 'none';
}

function verifyParentPassword() {
  const pwd = document.getElementById('parent-password').value;
  if (btoa(pwd) === PARENT_PASSWORD_B64) {
    document.getElementById('parent-auth').style.display = 'none';
    document.getElementById('parent-content').style.display = 'block';
    document.getElementById('parent-coins').innerText = state.coins || 0;
    document.getElementById('parent-paid').innerText = state.totalPaidRubles || 0;
    const payoutBtn = document.getElementById('parent-payout-btn');
    const notAvail = document.getElementById('parent-not-avail');
    if (canPayoutNow()) {
      payoutBtn.style.display = 'block';
      notAvail.style.display = 'none';
    } else {
      payoutBtn.style.display = 'none';
      notAvail.style.display = 'block';
    }
  } else {
    alert('Неверный пароль');
  }
}

function payoutCoins() {
  const amount = state.coins || 0;
  if (amount <= 0) { alert('Нет коинов для выплаты'); return; }
  if (!canPayoutNow()) { alert('Выплата доступна только в воскресенье с 10:00 до 23:59'); return; }
  if (!confirm(`Выплатить ${amount} ₽ и обнулить коины?`)) return;
  state.totalPaidRubles = (state.totalPaidRubles || 0) + amount;
  state.coins = 0;
  saveState();
  document.getElementById('parent-coins').innerText = 0;
  document.getElementById('parent-paid').innerText = state.totalPaidRubles;
  showToast(`💰 Выплачено ${amount} ₽`, 'top');
  renderCoinsBlock();
}
