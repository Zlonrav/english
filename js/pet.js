// ================= АВАТАРЫ ПИТОМЦЕВ =================
const pets = [
  // Мифические и крутые
  '🦖', '🐲', '🐉', '🦄', '🦅', '🐊', '🦈', '🦂',
  // Хищники и дикие
  '🦁', '🐯', '🐆', '🐺', '🦊', '🐻', '🐗', '🦌', '🦬',
  // Экзотика, морские и рептилии
  '🐼', '🐨', '🐧', '🐬', '🐳', '🦉', '🦇', '🐢', '🐍', '🐒',
  '🐘', '🦒', '🦓', '🦏', '🦣', '🦡', '🦔', '🦦', '🦭', '🐙', '🦑', '🦎', '🐸', '🦋', '🦜', '🦘',
  // Питомцы (домашние)
  '🐶', '🐱', '🐈', '🐕', '🐰', '🐹', '🐴', '🐻‍❄️'
];

const acc = [
  '', '🎩', '👑', '🕶️', '🧢', '🎧', '🎸', '⚽', '🚀', '💎', 
  '🥽', '🎮', '🛹', '🛡️', '🔥', '⚔️', '🏹', '🎯', '🧭', '🧣', '🎓'
];

// ================= ЛОГИКА ПИТОМЦА =================
function updatePet() {
  const container = document.getElementById('pet-box');
  if (!state.petName) {
    container.innerHTML = `
      <div style="font-size:16px; margin-bottom:10px;">Как зовут твоего питомца?</div>
      <input type="text" id="pet-input" style="padding:10px; font-size:16px; border-radius:8px; border:2px solid #ccc; width:80%; text-align:center;" placeholder="Введи имя...">
      <button onclick="createPet()" style="margin-top:10px; padding:10px 20px; background:var(--main-color); color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Создать</button>
    `;
    return;
  }

  // Генерация на лету (hash от имени), если питомец еще не выбран
  let hash = 0;
  for (let i = 0; i < state.petName.length; i++) hash += state.petName.charCodeAt(i);
  
  // Если в профиле еще нет сохраненного питомца, генерируем по имени
  if (!state.pet) {
      state.pet = pets[hash % pets.length];
      state.acc = acc[hash % acc.length];
      saveState();
  }

  // Отрисовываем карточку с кнопкой выбора питомца
  container.innerHTML = `
    <div class="pet-avatar" id="pet-avatar-img">${state.pet}</div>
    <div class="pet-name">${state.petName} ${state.acc}</div>
    <div id="level-container"></div>
    <button onclick="openPetSelector()" style="margin-top: 10px; background: #e0e7ff; border: none; padding: 8px 15px; border-radius: 20px; color: var(--main-color); font-weight: bold; cursor: pointer; font-size: 14px;">🎨 Выбрать питомца</button>
  `;
  updateLevel();
}

function createPet() {
  const val = document.getElementById('pet-input').value.trim();
  if (val) { state.petName = val; saveState(); }
}

// ================= ВЫБОР ПИТОМЦА =================
function openPetSelector() {
  const modal = document.getElementById('pet-selector-modal');
  modal.style.display = 'flex';
  
  const petGrid = document.getElementById('pet-grid');
  petGrid.innerHTML = pets.map(p => `<div class="grid-item ${state.pet === p ? 'selected' : ''}" onclick="selectPet('${p}')">${p}</div>`).join('');
  
  const accGrid = document.getElementById('acc-grid');
  accGrid.innerHTML = acc.map(a => `<div class="grid-item ${state.acc === a ? 'selected' : ''}" onclick="selectAcc('${a}')">${a === '' ? '❌' : a}</div>`).join('');
}

function closePetSelector() {
  document.getElementById('pet-selector-modal').style.display = 'none';
  updatePet(); // Обновляем аватар на главной
}

function selectPet(pet) {
  state.pet = pet;
  saveState();
  openPetSelector(); // Перерисовываем, чтобы обновить рамку
}

function selectAcc(accItem) {
  state.acc = accItem;
  saveState();
  openPetSelector();
}
