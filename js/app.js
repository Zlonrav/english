// ================= БАЗА ДАННЫХ ПРОФИЛЕЙ =================
let db = JSON.parse(localStorage.getItem('eng_db')) || { profiles: {}, lastActive: null };
let state = {};

function saveDb() {
  localStorage.setItem('eng_db', JSON.stringify(db));
}

function saveState() {
  if (state.petName) {
    db.profiles[state.petName] = state;
    db.lastActive = state.petName;
    saveDb();
  }
  updateUI();
}

function migrateOldData() {
  if (Object.keys(db.profiles).length === 0 && localStorage.getItem('eng_petName')) {
    let oldProfile = {
      petName: localStorage.getItem('eng_petName') || 'Игрок',
      pin: '0000',
      stars: parseInt(localStorage.getItem('eng_stars') || '0'),
      streak: parseInt(localStorage.getItem('eng_streak') || '0'),
      lastDate: localStorage.getItem('eng_lastDate') || '',
      dailyCount: parseInt(localStorage.getItem('eng_dailyCount') || '0'),
      learned: JSON.parse(localStorage.getItem('eng_learned') || '[]'),
      listenCounts: JSON.parse(localStorage.getItem('eng_listenCounts') || '{}'),
      achievements: JSON.parse(localStorage.getItem('eng_achievements') || '[]')
    };
    db.profiles[oldProfile.petName] = oldProfile;
    db.lastActive = oldProfile.petName;
    saveDb();
  }
}

function ensureStateDefaults() {
  if (state.totalStarsEarned === undefined) state.totalStarsEarned = state.stars || 0;
  if (state.coins === undefined) state.coins = 0;
  if (state.totalPaidRubles === undefined) state.totalPaidRubles = 0;
  if (state.dailyEarned === undefined) state.dailyEarned = 0;
  if (!state.dailyEarnedDate) state.dailyEarnedDate = new Date().toDateString();
  if (!state.cycleStartDate) state.cycleStartDate = getMondayOfWeek(new Date()).toISOString();
  if (state.lastExchangeDate === undefined) state.lastExchangeDate = null;
  if (!state.streakCountedDate && state.lastDate) state.streakCountedDate = state.lastDate;
  if (!state.achievements) state.achievements = [];
  if (!state.learned) state.learned = [];
  if (!state.listenCounts) state.listenCounts = {};
  saveState();
}

function resetDailyIfNeeded() {
  const today = new Date().toDateString();
  if (state.dailyEarnedDate !== today) {
    state.dailyEarnedDate = today;
    state.dailyEarned = 0;
    state.capBannerShownDate = null;
    saveState();
  }
}

// ================= ЛОГИКА УРОВНЕЙ =================
const levelList = [
  { name: "Малыш", stars: 0 }, { name: "Новичок", stars: 10 }, { name: "Ученик", stars: 25 },
  { name: "Читатель", stars: 50 }, { name: "Искатель", stars: 80 }, { name: "Знаток", stars: 120 },
  { name: "Эрудит", stars: 170 }, { name: "Умник", stars: 230 }, { name: "Мастер", stars: 300 },
  { name: "Гений", stars: 400 }, { name: "Волшебник слова", stars: 550 }, { name: "Хранитель знаний", stars: 750 },
  { name: "Полиглот", stars: 1000 }, { name: "Легенда", stars: 1300 }, { name: "Профессор", stars: 1700 },
  { name: "Академик", stars: 2200 }, { name: "Гуру", stars: 2800 }, { name: "Оракул", stars: 3500 },
  { name: "Бог английского", stars: 4500 }, { name: "Космос", stars: 6000 }
];

function updateLevel() {
  const lvlBox = document.getElementById('level-container');
  if (!lvlBox) return;
  
  const total = state.totalStarsEarned || 0;
  let currentLevel = levelList[0];
  let nextLevel = levelList[1];

  for (let i = 0; i < levelList.length; i++) {
    if (total >= levelList[i].stars) {
      currentLevel = levelList[i];
      nextLevel = levelList[i + 1] || levelList[i]; 
    } else {
      break; 
    }
  }

  let progress = 100;
  let starsLeft = 0;

  if (nextLevel.name !== currentLevel.name) {
    const range = nextLevel.stars - currentLevel.stars;
    const currentProgress = total - currentLevel.stars;
    progress = Math.min(100, (currentProgress / range) * 100);
    starsLeft = nextLevel.stars - total;
  }
  
  lvlBox.innerHTML = `
    <div style="font-size:14px; font-weight:bold; color:#555; margin-top:10px;">
      Звание: <span style="color:var(--main-color); font-size:16px;">${currentLevel.name}</span>
    </div>
    <div class="level-bar-container" style="margin-top: 5px;">
      <div class="level-bar" style="width: ${progress}%;"></div>
    </div>
    <div class="level-text" style="font-size: 13px; color: var(--text-muted); margin-top: 7px; opacity: 0.5; font-weight: normal;">
      ${nextLevel.name !== currentLevel.name ? `До звания "${nextLevel.name}": ${starsLeft} ⭐` : `Максимальное звание достигнуто!`}
    </div>
  `;
}

// ================= ДОСТИЖЕНИЯ =================
let allAchievements = levelList.slice(1).map((lvl, index) => ({
  id: 'lvl_' + index,
  icon: '⭐',
  title: `Звание: ${lvl.name}`,
  desc: `Достигни ${lvl.stars} звезд`,
  check: (s) => (s.totalStarsEarned || 0) >= lvl.stars
}));

allAchievements = allAchievements.concat([
  { id: 'streak_7', icon: '🧭', title: 'Юный следопыт', desc: 'Занимайся 7 дней подряд', check: (s) => s.streak >= 7 },
  { id: 'streak_14', icon: '🏹', title: 'Меткий стрелок', desc: 'Занимайся 14 дней подряд', check: (s) => s.streak >= 14 },
  { id: 'streak_21', icon: '🗺️', title: 'Искатель сокровищ', desc: 'Занимайся 21 день подряд', check: (s) => s.streak >= 21 },
  { id: 'streak_28', icon: '🌙', title: 'Лунный рыцарь', desc: 'Занимайся 28 дней подряд', check: (s) => s.streak >= 28 },
  { id: 'streak_35', icon: '🥉', title: 'Бронзовый страж', desc: 'Занимайся 35 дней подряд', check: (s) => s.streak >= 35 },
  { id: 'streak_42', icon: '🥈', title: 'Серебряный страж', desc: 'Занимайся 42 дня подряд', check: (s) => s.streak >= 42 },
  { id: 'streak_49', icon: '🥇', title: 'Золотой страж', desc: 'Занимайся 49 дней подряд', check: (s) => s.streak >= 49 },
  { id: 'streak_56', icon: '🔥', title: 'Огненный дракон', desc: 'Занимайся 56 дней подряд', check: (s) => s.streak >= 56 },
  { id: 'streak_70', icon: '🚀', title: 'Космический рейнджер', desc: 'Занимайся 70 дней подряд', check: (s) => s.streak >= 70 },
  { id: 'streak_84', icon: '⏳', title: 'Повелитель времени', desc: 'Занимайся 84 дня подряд', check: (s) => s.streak >= 84 },
  { id: 'streak_105', icon: '⚡', title: 'Громовержец', desc: 'Занимайся 105 дней подряд', check: (s) => s.streak >= 105 },
  { id: 'streak_126', icon: '🏆', title: 'Гранд-мастер', desc: 'Занимайся 126 дней подряд', check: (s) => s.streak >= 126 },
  { id: 'streak_150', icon: '🎯', title: 'Снайпер знаний', desc: 'Занимайся 150 дней подряд', check: (s) => s.streak >= 150 },
  { id: 'streak_182', icon: '🦸', title: 'Супергерой', desc: 'Занимайся 182 дня подряд', check: (s) => s.streak >= 182 },
  { id: 'streak_210', icon: '🐉', title: 'Укротитель драконов', desc: 'Занимайся 210 дней подряд', check: (s) => s.streak >= 210 },
  { id: 'streak_240', icon: '🧙‍♂️', title: 'Архимаг', desc: 'Занимайся 240 дней подряд', check: (s) => s.streak >= 240 },
  { id: 'streak_270', icon: '🔮', title: 'Верховный маг', desc: 'Занимайся 270 дней подряд', check: (s) => s.streak >= 270 },
  { id: 'streak_300', icon: '👑', title: 'Король знаний', desc: 'Занимайся 300 дней подряд', check: (s) => s.streak >= 300 },
  { id: 'streak_330', icon: '🌌', title: 'Космический император', desc: 'Занимайся 330 дней подряд', check: (s) => s.streak >= 330 },
  { id: 'streak_365', icon: '🎆', title: 'Легенда года', desc: 'Занимайся 365 дней подряд!', check: (s) => s.streak >= 365 },
  { id: 'gold_1', icon: '🥇', title: 'Золотая коллекция', desc: 'Изучи первую карточку на 100%', check: (s) => s.learned.length >= 1 },
  { id: 'gold_10', icon: '🏆', title: 'Коллекционер', desc: 'Изучи 10 карточек на 100%', check: (s) => s.learned.length >= 10 },
  { id: 'gold_50', icon: '👑', title: 'Мастер слова', desc: 'Изучи 50 карточек на 100%', check: (s) => s.learned.length >= 50 },
  { id: 'gold_100', icon: '🌍', title: 'Покоритель слов', desc: 'Изучи 100 карточек на 100%', check: (s) => s.learned.length >= 100 },
]);

function openAchievements() {
  if (!checkAuth()) return;
  hideAllViews();
  document.getElementById('achievements-view').style.display = 'flex';
  renderAchievements();
  renderCoinsBlock();
  startExchangeTimer();
}

function renderAchievements() {
  const container = document.getElementById('achievements-list');
  const userAchievements = state.achievements || []; 

  container.innerHTML = allAchievements.map(ach => {
    const isUnlocked = userAchievements.includes(ach.id);
    return `
      <div class="ach-item ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="ach-icon">${ach.icon}</div>
        <div class="ach-info">
          <h4>${ach.title}</h4>
          <p>${ach.desc}</p>
        </div>
      </div>
    `;
  }).join('');
}

function checkNewAchievements() {
  if (!state.achievements) state.achievements = []; 
  allAchievements.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.check(state)) {
      state.achievements.push(ach.id);
      saveState();
      showToast(`🏆 Новое достижение: ${ach.title}!`, 'top');
    }
  });
}

// ================= ПРОГРЕСС КАРТОЧЕК =================
function markAsLearned(word) {
  if (!state.listenCounts[word]) state.listenCounts[word] = 0;
  if (state.listenCounts[word] >= 25) return;
  state.listenCounts[word] += 5;
  if (state.listenCounts[word] >= 25 && !state.learned.includes(word)) {
      state.learned.push(word);
  }
  saveState();
}

// ================= УТИЛИТЫ =================
function updateUI() {
  document.getElementById('ui-stars').innerText = state.stars || 0;
  document.getElementById('ui-streak').innerText = state.streak || 0;
  updatePet();
  updateLevel();
  updateCycleBanner();
}

function addStars(amount) {
  resetDailyIfNeeded();

  const dailyCap = 250;
  const today = new Date().toDateString();
  const dailyEarned = state.dailyEarned || 0;

  if (dailyEarned >= dailyCap) {
    if (state.capBannerShownDate !== today) {
      state.capBannerShownDate = today;
      saveState();
      showToast("🌟 Дневной лимит звёзд достигнут, молодец! Можешь продолжать обучаться.", 'top');
    }
    return;
  }

  const actualAmount = Math.min(amount, dailyCap - dailyEarned);
  state.dailyEarned = dailyEarned + actualAmount;
  state.totalStarsEarned = (state.totalStarsEarned || 0) + actualAmount;
  state.stars = Math.min(6000, (state.stars || 0) + actualAmount);

  checkDailyProgress();
  saveState();
  showToast(`+${actualAmount} ⭐`, 'bottom');
  checkNewAchievements();

  if (state.dailyEarned >= dailyCap && state.capBannerShownDate !== today) {
    state.capBannerShownDate = today;
    saveState();
    showToast("🌟 Дневной лимит звёзд достигнут, молодец! Можешь продолжать обучаться.", 'top');
  }
}

function showToast(text, position = 'top') {
  const container = document.getElementById(position === 'bottom' ? 'toast-bottom-container' : 'toast-top-container');
  const t = document.createElement('div');
  t.className = 'toast-item';
  t.innerText = text;
  container.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'scale(0.8)';
    setTimeout(() => t.remove(), 300);
  }, 2500);
}

function checkDailyProgress() {
  const today = new Date().toDateString();
  if ((state.dailyEarned || 0) >= 50 && state.streakCountedDate !== today) {
    state.streakCountedDate = today;
    state.streak = (state.streak || 0) + 1;
    showToast(`🔥 Огонь! Ты занимаешься ${state.streak} дней подряд!`, 'top');
  }
}

// ================= НАВИГАЦИЯ =================
function hideAllViews() {
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
}

// Проверка авторизации
function checkAuth() {
  if (!state || !state.petName) {
    renderAuthScreen(); 
    return false;
  }
  return true;
}

function goHome() {
  if (!checkAuth()) return;
  hideAllViews();
  document.getElementById('dashboard-view').style.display = 'flex';
  checkForcedReset();
  updateUI();
}

function startTrainer() {
  if (!checkAuth()) return;
  hideAllViews();
  document.getElementById('trainer-view').style.display = 'flex';
  showRandomCard();
}

function openTasks() {
  if (!checkAuth()) return;
  hideAllViews();
  document.getElementById('tasks-view').style.display = 'block';
  renderCategoryList();
}

function openQuiz() {
  if (!checkAuth()) return;
  hideAllViews();
  document.getElementById('quiz-view').style.display = 'flex';
  document.getElementById('quiz-menu').style.display = 'block';
  document.getElementById('quiz-play').style.display = 'none';
}

// ================= ОЗВУЧКА =================
function speakWord(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.6;
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.includes('en') && v.name.includes('Google')) || voices.find(v => v.lang.includes('en'));
    if (enVoice) utterance.voice = enVoice;
    window.speechSynthesis.speak(utterance);
  }
}

// ================= АВТОРИЗАЦИЯ =================
let tempPin = "";
let tempProfileName = "";
let isCreating = false;

function renderAuthScreen() {
  document.querySelector('.top-bar').style.display = 'none';
  hideAllViews();
  document.getElementById('auth-view').style.display = 'flex';
  
  document.getElementById('pin-pad-container').style.display = 'none';
  document.getElementById('create-profile-container').style.display = 'none';
  document.getElementById('auth-title').innerText = "Кто играет?";

  document.getElementById('auth-rules-link').style.display = 'block';

  const list = document.getElementById('profiles-list');
  list.style.display = 'grid'; 
  list.innerHTML = '';

  const profileNames = Object.keys(db.profiles);

  // 1. Рисуем существующие профили (максимум 4)
  profileNames.slice(0, 4).forEach(name => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    const petEmoji = pets[hash % pets.length];

    const div = document.createElement('div');
    div.className = 'profile-btn';
    div.onclick = () => selectProfile(name);
    div.innerHTML = `
      <div class="profile-avatar">${petEmoji}</div>
      <div class="profile-name">${name}</div>
    `;
    list.appendChild(div);
  });

  // 2. Считаем, сколько пустых мест осталось (всего 4)
  const emptySlots = 4 - profileNames.length;

  // 3. Дорисовываем пустые плитки с плюсом
  for (let i = 0; i < emptySlots; i++) {
    const addDiv = document.createElement('div');
    addDiv.className = 'profile-btn';
    addDiv.onclick = () => showCreateProfile();
    addDiv.innerHTML = `
      <div class="profile-avatar" style="color: var(--main-color); font-weight: 900;">+</div>
      <div class="profile-name">Новый</div>
    `;
    list.appendChild(addDiv);
  }
}

function deleteProfile(name) {
  if(confirm(`Удалить профиль "${name}"? Весь прогресс сгорит!`)) {
    delete db.profiles[name];
    saveDb();
    renderAuthScreen();
  }
}

function showCreateProfile() {
  // Защита от создания больше 4 игроков
  if (Object.keys(db.profiles).length >= 4) {
    alert("Максимум 4 игрока на устройстве. Удалите кого-нибудь, чтобы создать нового.");
    return;
  }

  isCreating = true;
  document.getElementById('auth-title').innerText = "Новый игрок";
  document.getElementById('profiles-list').style.display = 'none';
  document.getElementById('pin-pad-container').style.display = 'none'; 
  document.getElementById('auth-rules-link').style.display = 'none';
  document.getElementById('create-profile-container').style.display = 'flex';
  document.getElementById('new-profile-name').value = '';
  document.getElementById('new-pet-preview').innerText = '👻';
}

function previewNewPet() {
  const name = document.getElementById('new-profile-name').value.trim();
  if (!name) { document.getElementById('new-pet-preview').innerText = '👻'; return; }
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  document.getElementById('new-pet-preview').innerText = pets[hash % pets.length];
}

function cancelCreate() {
  isCreating = false;
  document.getElementById('profiles-list').style.display = 'flex'; // Возвращаем flex
  document.getElementById('create-profile-container').style.display = 'none';
  document.getElementById('auth-title').innerText = "Кто играет?";
  // Строка с btn-add-profile удалена
}

function startPinCreation() {
  tempProfileName = document.getElementById('new-profile-name').value.trim();
  if (!tempProfileName) { alert("Введи имя!"); return; }
  if (db.profiles[tempProfileName]) { alert("Такое имя уже занято!"); return; }
  
  isCreating = true;
  tempPin = "";
  setupPinPad();
  document.getElementById('create-profile-container').style.display = 'none';
  document.getElementById('pin-pad-container').style.display = 'block';
  document.getElementById('pin-pet-name').innerText = "Введи PIN-код";
}

function selectProfile(name) {
  isCreating = false;
  tempProfileName = name;
  tempPin = "";
  setupPinPad();
  document.getElementById('profiles-list').style.display = 'none';
  document.getElementById('auth-rules-link').style.display = 'none';
  document.getElementById('pin-pad-container').style.display = 'flex';
  document.getElementById('pin-pet-name').innerText = "Придумай PIN-код";
  document.getElementById('auth-title').innerText = "Вход";
}

function setupPinPad() {
  const grid = document.getElementById('pin-grid');
  grid.innerHTML = '';
  for (let i = 1; i <= 9; i++) {
    let btn = document.createElement('button');
    btn.className = 'pin-btn';
    btn.innerText = i;
    btn.onclick = () => enterPin(i);
    grid.appendChild(btn);
  }
  let btn0 = document.createElement('button');
  btn0.className = 'pin-btn btn-zero';
  btn0.innerText = '0';
  btn0.onclick = () => enterPin(0);
  grid.appendChild(btn0);
  let btnDel = document.createElement('button');
  btnDel.className = 'pin-btn';
  btnDel.innerText = '⌫';
  btnDel.onclick = () => deletePin();
  grid.appendChild(btnDel);
  updatePinDots();
}

function enterPin(num) {
  if (tempPin.length < 4) {
    tempPin += num;
    updatePinDots();
    if (tempPin.length === 4) setTimeout(checkPin, 200);
  }
}

function deletePin() {
  if (tempPin.length > 0) {
    tempPin = tempPin.slice(0, -1);
    updatePinDots();
  }
}

function updatePinDots() {
  let dots = '';
  for (let i = 0; i < 4; i++) {
    dots += i < tempPin.length ? '🔵' : '⚪';
  }
  document.getElementById('pin-dots').innerText = dots;
}

function checkPin() {
  if (isCreating) {
    db.profiles[tempProfileName] = {
      petName: tempProfileName, pin: tempPin,
      stars: 0, streak: 0, dailyCount: 0, lastDate: '',
      learned: [], listenCounts: {}, achievements: [],
      totalStarsEarned: 0, coins: 0, totalPaidRubles: 0,
      dailyEarned: 0, dailyEarnedDate: new Date().toDateString(),
      cycleStartDate: getMondayOfWeek(new Date()).toISOString(),
      lastExchangeDate: null, streakCountedDate: null,
      pendingNewCycleToast: false
    };
    saveDb();
    loginSuccess(tempProfileName);
  } else {
    if (db.profiles[tempProfileName].pin === tempPin) {
      loginSuccess(tempProfileName);
    } else {
      alert("Неверный ПИН-код!");
      tempPin = "";
      updatePinDots();
    }
  }
}

function cancelPin() {
  tempPin = "";
  // Принудительно скрываем все вложенные контейнеры
  const pinPad = document.getElementById('pin-pad-container');
  if (pinPad) pinPad.style.display = 'none';
  
  const createProfile = document.getElementById('create-profile-container');
  if (createProfile) createProfile.style.display = 'none';

  if (isCreating) {
    showCreateProfile();
  } else {
    renderAuthScreen();
  }
}

function loginSuccess(name) {
  state = db.profiles[name];
  document.querySelector('.top-bar').style.display = 'flex';
  ensureStateDefaults();
  resetDailyIfNeeded();
  checkForcedReset();
  checkStreakReset();
  checkPendingNewCycleToast();
  saveDb();
  goHome();
}

function logout() {
  state = {}; 
  renderAuthScreen();
}

// ================= ИНИЦИАЛИЗАЦИЯ =================
window.onload = () => {
  migrateOldData();
  checkStreakReset();
  renderAuthScreen();
};

function resetLearned() {
  if(confirm("Сбросить прогресс изучения ВСЕХ карточек? Звезды и ачивки за уровни останутся, но золотые карточки и награды за них исчезнут.")) {
    state.learned = [];
    state.listenCounts = {};
    if (state.achievements) {
      state.achievements = state.achievements.filter(a => !['gold_1', 'gold_10', 'gold_50', 'gold_100'].includes(a));
    }
    saveState();
    renderAchievements();
    alert("Прогресс карточек сброшен!");
  }
}

function checkStreakReset() {
  if (!state.streakCountedDate) return;
  const last = new Date(state.streakCountedDate);
  last.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today - last) / 86400000);
  if (diffDays > 1) {
    state.streak = 0;
    saveState();
  }
}
