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
  // 3. Отрисовываем карточку с кликабельным питомцем
  container.innerHTML = `
    <div class="pet-avatar" id="pet-avatar-img" onclick="openPetSelector()" style="cursor: pointer;" title="Сменить питомца">${state.pet}</div>
    <div class="pet-name" style="display: flex; align-items: center; justify-content: center; gap: 10px;">
      <span>${state.petName} ${state.acc}</span>
    </div>
    <div id="level-container"></div>
    
    <!-- БЛОК ПРОГРЕССА ОГОНЬКА И ДНЕВНЫХ ЗВЕЗД -->
    <div style="margin-top: 15px; display: flex; flex-direction: column; gap: 10px; width: 100%; box-sizing: border-box;">
      <!-- Огонек -->
      <div style="padding: 10px; background: rgba(0,0,0,0.2); border-radius: 12px; font-size: 14px; width: 100%; text-align: center; box-sizing: border-box;">
        ${(state.dailyEarned || 0) >= 50 
          ? `<span style="color: var(--green); font-weight: bold;">🔥 Огонек получен! (50/50)</span>` 
          : `<span style="color: var(--text-main);">🔥 До огонька: <b>${state.dailyEarned || 0} / 50 ⭐</b></span>`
        }
      </div>
      
      <!-- Дневной лимит 250 -->
      <div style="padding: 10px; background: rgba(0,0,0,0.2); border-radius: 12px; font-size: 14px; width: 100%; text-align: center; box-sizing: border-box;">
        ${(state.dailyEarned || 0) >= 250 
          ? `<span style="color: var(--green); font-weight: bold;">🎉 Поздравляю, сегодня все звёзды заработаны!</span>` 
          : `<span style="color: var(--text-main);">⭐ Сегодня заработано: <b>${state.dailyEarned || 0} / 250</b></span>`
        }
      </div>
    </div>
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
