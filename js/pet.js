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
  const topBarAvatar = document.getElementById('top-bar-avatar'); // Наша новая аватарка в шапке

  if (!state.petName) {
    // На случай если профиль не выбран
    if (topBarAvatar) topBarAvatar.innerText = '👤';
    return;
  }

  // Генерация на лету (hash от имени), если питомец еще не выбран
  let hash = 0;
  for (let i = 0; i < state.petName.length; i++) hash += state.petName.charCodeAt(i);
  
  if (!state.pet) {
      state.pet = pets[hash % pets.length];
      state.acc = acc[hash % acc.length];
      saveState();
  }

  // 1. Обновляем маленькую аватарку в шапке
  if (topBarAvatar) {
    topBarAvatar.innerText = state.pet;
  }

  // 2. Отрисовываем карточку внутри модалки
  if (container) {
    container.innerHTML = `
      <div class="pet-avatar" id="pet-avatar-img" onclick="openPetSelector()" style="cursor: pointer;" title="Сменить питомца">${state.pet}</div>
      <div class="pet-name">${state.petName} ${state.acc}</div>
      <div id="level-container"></div>
    `;
    updateLevel();
  }
}

// ================= МОДАЛКА ПРОФИЛЯ =================
function openPetInfoModal() {
  document.getElementById('pet-info-modal').style.display = 'flex';
  updatePet(); // Обновляем данные перед показом
}

function closePetInfoModal() {
  document.getElementById('pet-info-modal').style.display = 'none';
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
