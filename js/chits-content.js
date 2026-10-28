// ================= ЧИТЫ РАЗРАБОТЧИКА (ЗАЩИЩЕННЫЙ КОНТЕНТ) =================

const chitsHTML = `
  <h1>🛠 Читы разработчика</h1>
  <p style="text-align:center; color:#aaa;">Сюда нельзя заходить детям!</p>

  <div class="card">
    <h3>👥 Управление игроками</h3>
    <p class="desc">Удаление профилей. Выберите, кого удалить, прогресс будет стерт безвозвратно.</p>
    <div id="cheat-profiles-list" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;"></div>
  </div>

  <div class="card" style="border-color: #2563eb;">
    <h3 style="color: #60a5fa;">✏️ Редактирование профиля</h3>
    <p class="desc">Смена имени и PIN-кода для выбранного игрока.</p>
    <select id="edit-profile-select" onchange="loadProfileForEdit()" style="margin-bottom: 10px;">
      <option value="">-- Выберите игрока --</option>
    </select>
    <input type="text" id="edit-new-name" placeholder="Новое имя">
    <input type="text" id="edit-new-pin" placeholder="Новый PIN-код (4 цифры)" maxlength="4">
    <button onclick="saveProfileChanges()" class="btn-blue">Сохранить изменения</button>
  </div>

  <!-- УПРАВЛЕНИЕ ЗВЕЗДАМИ -->
  <div class="card">
    <h3>⭐ Управление звёздами</h3>
    
    <select id="stars-user-select" style="margin-bottom: 10px;">
      <option value="">-- Выберите игрока --</option>
    </select>
    
    <input type="number" id="stars-amount" placeholder="Количество звёзд" value="100">
    <div style="display: flex; gap: 10px; margin-top: 10px;">
      <button onclick="addCheatStars()" class="btn-green" style="margin: 0; width: 50%;">Начислить</button>
      <button onclick="removeCheatStars()" style="margin: 0; width: 50%; background: #ef4444;">Снять</button>
    </div>
  </div>

  <div class="card">
    <h3>🚀 Управление полетом (Нептун)</h3>
    <p class="desc">Сброс на Землю или телепортация к любой точке Вселенной.</p>
    <button onclick="resetNeptuneCheat()" class="btn-grey" style="margin-top: 10px;">Сбросить на Землю (0/10)</button>
    <div style="margin-top: 15px; border-top: 1px dashed #555; padding-top: 10px;">
      <select id="neptune-cheat-select" onchange="updateNeptuneMaxStep()"></select>
      <div style="display: flex; gap: 10px; margin-top: 5px;">
        <input type="number" id="neptune-cheat-step" placeholder="Шаг" value="0" min="0" style="margin: 0;">
        <button onclick="teleportNeptuneCheat()" class="btn-green" style="width: auto; white-space: nowrap; margin: 0; padding: 12px 20px;">Перелет</button>
      </div>
      <p class="desc" id="neptune-step-hint" style="text-align: center; margin-top: 5px;">Выберите планету</p>
    </div>
  </div>

  <div class="card">
    <h3>💾 Сохранение / Загрузка</h3>
    <p class="desc">Быстрый переход на страницы переноса прогресса.</p>
    <button onclick="location.href='save.html'" class="btn-blue" style="margin-bottom: 5px;">Сохранить прогресс</button>
    <button onclick="location.href='load.html'" class="btn-grey">Загрузить прогресс</button>
  </div>

  <!-- БЛОКИРОВКА РАЗДЕЛОВ И ТЕМ -->
  <div class="card" style="border-color: #ef4444;">
    <h3 style="color: #f87171;">🔒 Блокировка разделов</h3>
    <p class="desc">Выберите игрока и отметьте, что нужно заблокировать (галочка = закрыто).</p>
    
    <select id="block-user-select" onchange="loadBlockUser()" style="margin-bottom: 10px;">
      <option value="">-- Выберите игрока --</option>
    </select>
    
    <h4 style="margin: 10px 0 5px 0; font-size: 14px; color: #ddd;">Главные разделы:</h4>
    <div id="block-sections-container" style="display: flex; flex-direction: column; gap: 8px; background: #333; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input type="checkbox" id="block-tasks" value="tasks" style="width: auto; margin: 0;"> 📚 Задания
      </label>
      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input type="checkbox" id="block-trainer" value="trainer" style="width: auto; margin: 0;"> 🏠 Тренажер
      </label>
      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input type="checkbox" id="block-quiz" value="quiz" style="width: auto; margin: 0;"> 🏆 Проверка знаний
      </label>
      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input type="checkbox" id="block-neptune" value="neptune" style="width: auto; margin: 0;"> 🚀 Нептун
      </label>
    </div>

    <h4 style="margin: 10px 0 5px 0; font-size: 14px; color: #ddd;">Темы в Заданиях:</h4>
    <div id="category-checkboxes" style="max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; background: #333; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
      <span style="color: #aaa; font-size: 14px;">Загрузка тем...</span>
    </div>
    
    <button onclick="saveAllBlocks()" class="btn-blue">Сохранить блокировки</button>
  </div>

  <div class="card">
    <h3>🏆 Сбросить звания</h3>
    <p class="desc">Обнуляет прогресс званий (счетчик "всего заработано"), но оставляет золотые карточки и стрики.</p>
    <button onclick="resetRanks()" class="btn-grey">Сбросить звания</button>
  </div>

  <div class="card">
    <h3>☀️ Включить воскресенье</h3>
    <p class="desc">Открывает игру с URL-параметром <code>?debug=sunday</code>. Разрешает обмен и выплату в любой день.</p>
    <button onclick="location.href='index.html?debug=sunday'" class="btn-green">Открыть с обменником</button>
  </div>

  <div class="card">
    <h3>💥 Полный сброс</h3>
    <p class="desc">Удаляет ВСЁ: звёзды, звания, коины, профили и достижения. Игра начнется с нуля.</p>
    <button onclick="hardReset()">Удалить базу и начать заново</button>
  </div>

  <button onclick="location.href='index.html'" style="background:#1f4e9c; margin-top:20px;">Вернуться в игру (обычный режим)</button>
`;

function initChitsUI() {
  document.getElementById('main-content').innerHTML = chitsHTML;
  renderCheatProfiles();
  renderNeptuneOptions();
  renderEditProfiles();
  renderBlockUsers();
  renderCategoryCheckboxes(); 
  renderStarsUsers(); 
}

// ================= УПРАВЛЕНИЕ ПРОФИЛЯМИ =================
function renderCheatProfiles() {
  const listEl = document.getElementById('cheat-profiles-list');
  const db = JSON.parse(localStorage.getItem('eng_db'));
  if (!db || !db.profiles || Object.keys(db.profiles).length === 0) {
    listEl.innerHTML = '<span style="color: #aaa;">Нет созданных профилей.</span>';
    return;
  }
  listEl.innerHTML = '';
  for (const name in db.profiles) {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: #333; padding: 10px; border-radius: 5px;';
    row.innerHTML = `<span style="font-weight: bold; font-size: 18px;">${name}</span>
      <button onclick="deleteCheatProfile('${name}')" style="width: auto; padding: 8px 15px; margin: 0; background: #ff4444;">❌ Удалить</button>`;
    listEl.appendChild(row);
  }
}

function deleteCheatProfile(name) {
  if (!confirm(`Удалить профиль "${name}"? Весь прогресс сгорит!`)) return;
  const db = JSON.parse(localStorage.getItem('eng_db'));
  if (db && db.profiles && db.profiles[name]) {
    delete db.profiles[name];
    if (db.lastActive === name) db.lastActive = null;
    localStorage.setItem('eng_db', JSON.stringify(db));
    renderCheatProfiles();
    renderEditProfiles();
    renderBlockUsers();
  }
}

// ================= РЕДАКТИРОВАНИЕ ПРОФИЛЯ =================
function renderEditProfiles() {
  const select = document.getElementById('edit-profile-select');
  const db = JSON.parse(localStorage.getItem('eng_db'));
  select.innerHTML = '<option value="">-- Выберите игрока --</option>';
  if (!db || !db.profiles) return;
  for (const name in db.profiles) {
    const opt = document.createElement('option');
    opt.value = name;
    opt.innerText = name;
    select.appendChild(opt);
  }
  document.getElementById('edit-new-name').value = '';
  document.getElementById('edit-new-pin').value = '';
}

function loadProfileForEdit() {
  const name = document.getElementById('edit-profile-select').value;
  if (!name) {
    document.getElementById('edit-new-name').value = '';
    document.getElementById('edit-new-pin').value = '';
    return;
  }
  const db = JSON.parse(localStorage.getItem('eng_db'));
  if (db && db.profiles && db.profiles[name]) {
    document.getElementById('edit-new-name').value = name;
    document.getElementById('edit-new-pin').value = db.profiles[name].pin || '';
  }
}

function saveProfileChanges() {
  const oldName = document.getElementById('edit-profile-select').value;
  const newName = document.getElementById('edit-new-name').value.trim();
  const newPin = document.getElementById('edit-new-pin').value.trim();

  if (!oldName) { alert("Сначала выберите игрока!"); return; }
  if (!newName) { alert("Имя не может быть пустым!"); return; }
  if (newPin.length !== 4 || isNaN(newPin)) { alert("ПИН-код должен быть из 4 цифр!"); return; }

  let db = JSON.parse(localStorage.getItem('eng_db'));
  if (newName !== oldName && db.profiles[newName]) {
    alert(`Ошибка! Игрок с именем "${newName}" уже существует.`); return;
  }

  const profileData = db.profiles[oldName];
  profileData.petName = newName;
  profileData.pin = newPin;

  if (newName !== oldName) {
    delete db.profiles[oldName];
    db.profiles[newName] = profileData;
    if (db.lastActive === oldName) db.lastActive = newName;
  } else {
    db.profiles[oldName] = profileData;
  }

  localStorage.setItem('eng_db', JSON.stringify(db));
  alert(`✅ Данные обновлены!\nНовое имя: ${newName}\nНовый ПИН: ${newPin}`);
  renderCheatProfiles();
  renderEditProfiles();
  renderBlockUsers();
}

// ================= УПРАВЛЕНИЕ ЗВЕЗДАМИ =================
function addCheatStars() {
  const name = document.getElementById('stars-user-select').value;
  if (!name) { alert("Сначала выберите игрока в списке!"); return; }

  let db = JSON.parse(localStorage.getItem('eng_db'));
  if (!db.profiles[name]) return;

  const amount = parseInt(document.getElementById('stars-amount').value);
  if (isNaN(amount) || amount <= 0) { alert("Введите положительное число!"); return; }

  const profile = db.profiles[name];
  profile.stars = (profile.stars || 0) + amount;
  profile.totalStarsEarned = (profile.totalStarsEarned || 0) + amount;
  
  const currentDaily = profile.dailyEarned || 0;
  profile.dailyEarned = Math.min(250, currentDaily + amount);
  profile.dailyEarnedDate = new Date().toDateString();

  if (profile.dailyEarned >= 250) {
      profile.capBannerShownDate = null; 
  }
  
  localStorage.setItem('eng_db', JSON.stringify(db));
  alert(`✅ Игроку "${name}" начислено ${amount} ⭐`);
}

function removeCheatStars() {
  const name = document.getElementById('stars-user-select').value;
  if (!name) { alert("Сначала выберите игрока в списке!"); return; }

  let db = JSON.parse(localStorage.getItem('eng_db'));
  if (!db.profiles[name]) return;

  const amount = parseInt(document.getElementById('stars-amount').value);
  if (isNaN(amount) || amount <= 0) { alert("Введите положительное число!"); return; }

  const profile = db.profiles[name];
  profile.stars = Math.max(0, (profile.stars || 0) - amount);
  profile.totalStarsEarned = Math.max(0, (profile.totalStarsEarned || 0) - amount);
  profile.dailyEarned = Math.max(0, (profile.dailyEarned || 0) - amount);
  
  localStorage.setItem('eng_db', JSON.stringify(db));
  alert(`✅ У игрока "${name}" снято ${amount} ⭐`);
}

// ================= БЛОКИРОВКА РАЗДЕЛОВ И ТЕМ =================
function renderBlockUsers() {
  const select = document.getElementById('block-user-select');
  const db = JSON.parse(localStorage.getItem('eng_db'));
  if (!select) return;
  
  select.innerHTML = '<option value="">-- Выберите игрока --</option>';
  if (!db || !db.profiles) return;

  for (const name in db.profiles) {
    const opt = document.createElement('option');
    opt.value = name;
    opt.innerText = name;
    select.appendChild(opt);
  }

  if (db.lastActive && db.profiles[db.lastActive]) {
    select.value = db.lastActive;
    loadBlockUser();
  }
}

function renderCategoryCheckboxes() {
  const container = document.getElementById('category-checkboxes');
  if (!container) return;
  
  if (typeof cardsData === 'undefined') {
     container.innerHTML = '<span style="color: #aaa;">Загрузка тем...</span>';
     if (!document.getElementById('data-js-loader')) {
         const script = document.createElement('script');
         script.id = 'data-js-loader';
         script.src = 'js/data.js';
         script.onload = () => { renderCategoryCheckboxes(); };
         document.head.appendChild(script);
     }
     return;
  }
  
  const categories = [...new Set(cardsData.map(c => c.cat))];
  
  container.innerHTML = '';
  categories.forEach(cat => {
    const label = document.createElement('label');
    label.style.cssText = 'display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px;';
    label.innerHTML = `
      <input type="checkbox" value="${cat}" class="cat-block-checkbox" style="width: auto; margin: 0;">
      ${cat}
    `;
    container.appendChild(label);
  });

  loadBlockUser(); 
}

function loadBlockUser() {
  const name = document.getElementById('block-user-select').value;
  const db = JSON.parse(localStorage.getItem('eng_db'));
  
  const sections = ['tasks', 'trainer', 'quiz', 'neptune'];
  sections.forEach(sec => {
      const el = document.getElementById(`block-${sec}`);
      if (el) el.checked = false;
  });
  
  const checkboxes = document.querySelectorAll('.cat-block-checkbox');
  checkboxes.forEach(cb => cb.checked = false);
  
  if (!name || !db.profiles || !db.profiles[name]) return;
  
  const blockedSections = db.profiles[name].blockedSections || [];
  sections.forEach(sec => {
    if (blockedSections.includes(sec)) {
        const el = document.getElementById(`block-${sec}`);
        if (el) el.checked = true;
    }
  });

  const blockedCats = db.profiles[name].blockedCategories || [];
  checkboxes.forEach(cb => {
    if (blockedCats.includes(cb.value)) cb.checked = true;
  });
}

function saveAllBlocks() {
  const name = document.getElementById('block-user-select').value;
  if (!name) { alert("Выберите игрока!"); return; }
  
  let db = JSON.parse(localStorage.getItem('eng_db'));
  
  const sections = ['tasks', 'trainer', 'quiz', 'neptune'];
  let newBlockedSections = [];
  sections.forEach(sec => {
    const el = document.getElementById(`block-${sec}`);
    if (el && el.checked) newBlockedSections.push(sec);
  });
  
  const checkboxes = document.querySelectorAll('.cat-block-checkbox');
  let newBlockedCats = [];
  checkboxes.forEach(cb => {
    if (cb.checked) newBlockedCats.push(cb.value);
  });
  
  db.profiles[name].blockedSections = newBlockedSections;
  db.profiles[name].blockedCategories = newBlockedCats;
  
  localStorage.setItem('eng_db', JSON.stringify(db));
  alert(`✅ Настройки блокировки для "${name}" сохранены!`);
}

// ================= ЧИТЫ ДЛЯ НЕПТУНА =================
const cheatNeptunePlanets = [
  { name: "Земля", target: 10 }, { name: "Луна", target: 12 }, { name: "Марс", target: 15 },
  { name: "Юпитер", target: 18 }, { name: "Сатурн", target: 22 }, { name: "Уран", target: 25 },
  { name: "Нептун", target: 28 }, { name: "Пояс Койпера", target: 30 }, { name: "Облако Оорта", target: 35 },
  { name: "Альфа Центавра", target: 38 }, { name: "Сириус", target: 40 }, { name: "Вега", target: 42 },
  { name: "Арктур", target: 45 }, { name: "Бетельгейзе", target: 48 }, { name: "Кассиопея", target: 50 },
  { name: "Орион", target: 52 }, { name: "Большая Медведица", target: 55 }, { name: "Облако Смита", target: 58 },
  { name: "Межзвездное Облако", target: 60 }, { name: "Магеллановы Облака", target: 62 }, { name: "Галактика Андромеды", target: 65 },
  { name: "Галактика Треугольника", target: 68 }, { name: "Галактика Боде", target: 70 }, { name: "Галактика Сигара", target: 75 },
  { name: "Скопление Девы", target: 80 }, { name: "Сверхскопление Центавра", target: 85 }, { name: "Сверхскопление Ланиакея", target: 100 },
  { name: "Великий Аттрактор", target: 25 }
];

function renderNeptuneOptions() {
  const select = document.getElementById('neptune-cheat-select');
  if (!select) return;
  select.innerHTML = cheatNeptunePlanets.map((p, idx) => `<option value="${idx}">${idx}. ${p.name} (до цели: ${p.target})</option>`).join('');
  updateNeptuneMaxStep();
}

function updateNeptuneMaxStep() {
  const idx = parseInt(document.getElementById('neptune-cheat-select').value);
  const hint = document.getElementById('neptune-step-hint');
  const stepInput = document.getElementById('neptune-cheat-step');
  if (cheatNeptunePlanets[idx] && hint && stepInput) {
    hint.innerText = `Максимальный шаг: ${cheatNeptunePlanets[idx].target}`;
    stepInput.value = 0;
    stepInput.max = cheatNeptunePlanets[idx].target;
  }
}

function teleportNeptuneCheat() {
  const data = getState();
  if (!data) return;
  const idx = parseInt(document.getElementById('neptune-cheat-select').value);
  const step = parseInt(document.getElementById('neptune-cheat-step').value) || 0;
  data.profile.neptunePlanetIdx = idx;
  data.profile.neptuneProgress = step;
  saveState(data.db);
}

function resetNeptuneCheat() {
  const data = getState();
  if (!data) return;
  data.profile.neptunePlanetIdx = 0;
  data.profile.neptuneProgress = 0;
  saveState(data.db);
}

// ================= ОСТАЛЬНЫЕ ЧИТЫ =================
function getState() {
  const db = JSON.parse(localStorage.getItem('eng_db'));
  if (!db || !db.lastActive) { alert("Сначала зайди в профиль в игре!"); return null; }
  return { db: db, profile: db.profiles[db.lastActive] };
}

function saveState(db) {
  localStorage.setItem('eng_db', JSON.stringify(db));
  alert("Готово! Можешь возвращаться в игру.");
}

function resetRanks() {
  if (!confirm("Сбросить все звания?")) return;
  const data = getState();
  if (!data) return;
  data.profile.stars = 0;
  data.profile.totalStarsEarned = 0;
  data.profile.dailyEarned = 0;
  if (data.profile.achievements) {
    data.profile.achievements = data.profile.achievements.filter(id => !id.startsWith('lvl_'));
  }
  saveState(data.db);
  location.href = 'index.html';
}

function hardReset() {
  if (!confirm("ВНИМАНИЕ! Это удалит ВСЕХ игроков и весь прогресс. Вы уверены?")) return;
  localStorage.removeItem('eng_db');
  sessionStorage.clear();
  location.href = 'index.html';
}
// ================= НАЧИСЛЕНИЕ И СНЯТИЕ ЗВЁЗД =================
function renderStarsUsers() {
  const select = document.getElementById('stars-user-select');
  const db = JSON.parse(localStorage.getItem('eng_db'));
  if (!select) return;
  
  select.innerHTML = '<option value="">-- Выберите игрока --</option>';
  if (!db || !db.profiles) return;

  for (const name in db.profiles) {
    const opt = document.createElement('option');
    opt.value = name;
    opt.innerText = name;
    select.appendChild(opt);
  }

  // Автовыбор последнего активного игрока
  if (db.lastActive && db.profiles[db.lastActive]) {
    select.value = db.lastActive;
  }
}
