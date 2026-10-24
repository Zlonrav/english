// ================= ЛОГИКА ЦИКЛА (4 недели) =================
const CYCLE_DAYS = 28;

function getMondayOfWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0=Sun, 1=Mon, ...
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function getNextMonday(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = day === 0 ? 1 : (8 - day);
  d.setDate(d.getDate() + diff);
  return d;
}

function getCycleEnd(cycleStart) {
  const end = new Date(cycleStart);
  end.setDate(end.getDate() + CYCLE_DAYS - 1); // Sunday, day 28
  end.setHours(23, 59, 59, 999);
  return end;
}

function checkForcedReset() {
  if (!state.cycleStartDate) {
    state.cycleStartDate = getMondayOfWeek(new Date()).toISOString();
    saveState();
    return;
  }
  const cycleStart = new Date(state.cycleStartDate);
  const cycleEnd = getCycleEnd(cycleStart);
  const now = new Date();
  if (now > cycleEnd) {
    state.stars = 0;
    state.cycleStartDate = getMondayOfWeek(now).toISOString();
    state.pendingNewCycleToast = true;
    saveState();
  }
}

function isLastSundayOfCycle() {
  if (!state.cycleStartDate) return false;
  const now = new Date();
  if (now.getDay() !== 0) return false;
  const cycleStart = new Date(state.cycleStartDate);
  const cycleEnd = getCycleEnd(cycleStart);
  const lastSun = new Date(cycleEnd);
  lastSun.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return today.getTime() === lastSun.getTime();
}

function canExchangeNow() {
  if (!state.cycleStartDate) return false;
  // ЧИТ: Если в URL есть debug, разрешаем обмен в любой день
  if (window.location.search.includes('debug=')) return true; 
  
  const now = new Date();
  if (now.getDay() !== 0) return false;        // только воскресенье
  if (now.getHours() < 10) return false;       // с 10:00
  if (state.lastExchangeDate === now.toDateString()) return false; // уже обменивал сегодня
  return true;
}

function getExchangeRate(amount) {
  if (amount >= 6000) return 1/3;
  if (amount >= 4000) return 0.30;
  if (amount >= 2000) return 0.25;
  if (amount >= 1000) return 0.20;
  if (amount >= 500)  return 0.15;
  if (amount >= 100)  return 0.10;
  return 0;
}

function calculateCoins(amount) {
  return Math.floor(amount * getExchangeRate(amount));
}

function doExchange(amount) {
  const coins = calculateCoins(amount);
  state.stars = Math.max(0, state.stars - amount);
  state.coins = (state.coins || 0) + coins;
  state.lastExchangeDate = new Date().toDateString();
  state.cycleStartDate = getNextMonday(new Date()).toISOString();
  state.pendingNewCycleToast = true;
  saveState();
  showToast(` +${coins} пульсаров!`, 'top');
}

function updateCycleBanner() {
  const banner = document.getElementById('cycle-warning-banner');
  if (!banner) return;
  const shouldShow = isLastSundayOfCycle()
    && (state.stars || 0) > 0
    && state.lastExchangeDate !== new Date().toDateString();
  banner.style.display = shouldShow ? 'block' : 'none';
}

function checkPendingNewCycleToast() {
  if (state.pendingNewCycleToast) {
    state.pendingNewCycleToast = false;
    saveState();
    setTimeout(() => {
      showToast("🔄 Новый цикл! Звёзды обнулились, но звание осталось.", 'top');
    }, 500);
  }
}

// ================= UI ОБМЕННИКА =================
function renderCoinsBlock() {
  const coinsEl = document.getElementById('coins-count');
  if (coinsEl) coinsEl.innerText = state.coins || 0;
  const btn = document.getElementById('exchange-btn');
  if (btn) {
    const allowed = canExchangeNow() && (state.stars || 0) >= 100;
    btn.style.display = allowed ? 'block' : 'none';
  }
}

function openExchangeModal() {
  if (!canExchangeNow()) {
    showToast('Обмен доступен только в воскресенье с 10:00 до 23:59', 'top');
    return;
  }
  document.getElementById('exchange-stars').innerText = state.stars || 0;
  document.getElementById('exchange-amount').value = '';
  document.getElementById('exchange-rate').innerText = '—';
  document.getElementById('exchange-coins').innerText = '0';
  document.getElementById('exchange-modal').style.display = 'flex';
}

function closeExchangeModal() {
  document.getElementById('exchange-modal').style.display = 'none';
}

function previewExchange() {
  const amount = parseInt(document.getElementById('exchange-amount').value) || 0;
  const rateEl = document.getElementById('exchange-rate');
  const coinsEl = document.getElementById('exchange-coins');
  if (amount < 100) {
    rateEl.innerText = '—';
    coinsEl.innerText = '0';
    return;
  }
  const rate = getExchangeRate(amount);
  rateEl.innerText = amount >= 6000 ? '×1/3 ≈ ' + rate.toFixed(4) : '×' + rate.toFixed(2);
  coinsEl.innerText = calculateCoins(amount);
}

function confirmExchange() {
  const amount = parseInt(document.getElementById('exchange-amount').value);
  if (!amount || amount < 100) { alert('Минимум 100 ⭐'); return; }
  if (amount > (state.stars || 0)) { alert('Недостаточно звёзд'); return; }
  if (!canExchangeNow()) { alert('Обмен доступен только в воскресенье с 10:00 до 23:59'); return; }
  const coins = calculateCoins(amount);
  if (!confirm(`Обменять ${amount} ⭐ на ${coins} 🪙?`)) return;
  doExchange(amount);
  closeExchangeModal();
  renderCoinsBlock();
  renderAchievements();
  updateUI();
}

// ================= ТАЙМЕР ДО ОБМЕНА =================
let exchangeTimerInterval = null;

function startExchangeTimer() {
  if (exchangeTimerInterval) clearInterval(exchangeTimerInterval);
  updateExchangeTimer(); // Сразу показываем время без задержки в 1 сек
  exchangeTimerInterval = setInterval(updateExchangeTimer, 1000);
}

function updateExchangeTimer() {
  const el = document.getElementById('exchange-timer');
  if (!el) return;

  if (canExchangeNow()) {
    el.innerHTML = "🟢 <b>Обмен открыт!</b>";
    el.style.color = "#28a745"; 
    return;
  }

  el.style.color = "#d97706"; 
  const now = new Date();
  
  // Создаем дату "Сегодня 10:00"
  let target = new Date(now);
  target.setHours(10, 0, 0, 0); 

  const day = now.getDay(); // 0=Вс, 1=Пн, ... 4=Чт
  
  if (day === 0) {
      // Если сегодня воскресенье, но время уже больше 10 утра (обмен прошел)
      if (now.getTime() > target.getTime()) {
          target.setDate(target.getDate() + 7); // Ждем следующее воскресенье
      }
  } else {
      // Если сегодня не воскресенье (например, четверг), прибавляем дни до воскресенья
      target.setDate(target.getDate() + (7 - day));
  }

  // Считаем разницу во времени
  let diff = target.getTime() - now.getTime();
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  let timeStr = "";
  if (days > 0) timeStr += `${days} д `;
  timeStr += `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  el.innerHTML = `⏳ До обмена: <b>${timeStr}</b>`;
}
