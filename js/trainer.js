// ================= ТРЕНАЖЕР =================
let currentCardIndex = -1;
let currentCard = null; // <--- ДОБАВИТЬ ЭТУ СТРОКУ
let nextCooldown = false;
let listenCooldown = false;
let currentTab = 'single'; 
let listenCounts = { single: 0, plural: 0 };
const REQUIRED_CLICKS = 2; 

function showRandomCard() {
  // 1. Фильтруем базу: исключаем Буквы (1) и Цифры 0-9 (2)
  let trainerPool = cardsData.filter(c => c.cat !== "1. Буквы" && c.cat !== "2. Цифры");
  if (trainerPool.length === 0) trainerPool = cardsData; // Защита, если вдруг база пустая

  // 2. Выбираем случайную карточку из оставшихся
  let newIndex = Math.floor(Math.random() * trainerPool.length);
  while (currentCard && newIndex !== -1 && trainerPool[newIndex].word === currentCard.word && trainerPool.length > 1) {
    newIndex = Math.floor(Math.random() * trainerPool.length);
  }
  
  currentCard = trainerPool[newIndex];
  const card = currentCard;
  
  listenCounts = { single: 0, plural: 0 };
  currentTab = 'single';
  nextCooldown = false;
  listenCooldown = false;

  let iconHtml = '';
  if (card.color) {
    iconHtml = `<div class="trainer-color-circle" style="width:80px; height:80px; border-radius:50%; background:${card.color}; margin-bottom:10px; border:3px solid rgba(255,255,255,0.2);"></div>`;
  } else {
    iconHtml = `<div class="trainer-icon">${card.icon}</div>`;
  }

  const tabsHtml = `
    <div class="v5-tabs ${card.single ? 'hidden-tabs' : ''}" id="trainer-tabs">
      <div class="v5-tab active" id="tab-single" onclick="${card.single ? '' : "switchTrainerTab('single')"}">Ед. число</div>
      <div class="v5-tab" id="tab-plural" onclick="${card.single ? '' : "switchTrainerTab('plural')"}">Мн. число</div>
    </div>
  `;

  let html = `
    <div style="width: 100%; display: flex; justify-content: flex-start; margin-bottom: 5px;">
      <button class="btn-exit" onclick="goHome()">← Назад</button>
    </div>
    ${iconHtml}
    <div class="divider" style="margin:15px 0 5px 0;"></div>
    ${tabsHtml}
    <div class="v5-content" id="trainer-content">
      <!-- Заполняется через renderTrainerContent -->
    </div>
    <div class="btn-next-container">
      <button class="btn-next" id="btn-next" onclick="handleNext()">
        <div class="btn-next-fill" id="btn-next-fill"></div>
        <span>Дальше ➔</span>
      </button>
    </div>
  `;

  document.getElementById('trainer-card-container').innerHTML = html;
  renderTrainerContent();
}

function renderTrainerContent() {
  const card = currentCard;
  const content = document.getElementById('trainer-content');
  
  const data = currentTab === 'single' 
    ? { word: card.word, pron: card.pron, trans: card.trans } 
    : { word: card.plural, pron: card.pronP, trans: card.transP };

  // Разделяем контент на верхний блок (текст) и нижний блок (кнопка Слушать)
  content.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 15px; width: 100%;">
      <div class="trainer-word">${data.word}</div>
      <div class="trainer-pron">${data.pron}</div>
      <div class="trainer-trans">${data.trans}</div>
    </div>
    
    <!-- Обертка для кнопки Слушать. Задаем ей те же размеры, что и у кнопки Дальше, плюс отступ снизу -->
    <div style="width: 100%; max-width: 320px; margin-bottom: 15px;">
      <button class="action-btn btn-listen" id="btn-listen-action" onclick="handleListen()" ${listenCooldown ? 'disabled' : ''} style="width: 100%; max-width: 100%; margin-top: 0; padding: 15px; box-sizing: border-box; font-size: 18px;">
        <div class="listen-fill" id="listen-fill-action" style="position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: rgba(0,0,0,0.2); z-index: 0; transition: none;"></div>
        <span style="position: relative; z-index: 1;">🔊 Слушать (${listenCounts[currentTab]}/${REQUIRED_CLICKS})</span>
      </button>
    </div>
  `;

  // Если кулдаун активен, запускаем анимацию заливки кнопки
  if (listenCooldown) {
    const fill = document.getElementById('listen-fill-action');
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      void fill.offsetWidth; 
      fill.style.transition = 'width 5s linear';
      fill.style.width = '100%';
    }
  }

  if (!card.single) {
    const tabSingle = document.getElementById('tab-single');
    const tabPlural = document.getElementById('tab-plural');
    
    tabSingle.className = `v5-tab ${currentTab === 'single' ? 'active' : ''} ${listenCounts.single >= REQUIRED_CLICKS ? 'done' : ''}`;
    tabPlural.className = `v5-tab ${currentTab === 'plural' ? 'active' : ''} ${listenCounts.plural >= REQUIRED_CLICKS ? 'done' : ''}`;
    
    tabSingle.innerText = `Ед. число ${listenCounts.single >= REQUIRED_CLICKS ? '✅' : ''}`;
    tabPlural.innerText = `Мн. число ${listenCounts.plural >= REQUIRED_CLICKS ? '✅' : ''}`;
  }

  updateNextButton();
}

function switchTrainerTab(tab) {
  const card = cardsData[currentCardIndex];
  if (card.single) return; 
  
  currentTab = tab;
  renderTrainerContent();
}

function handleListen() {
  if (listenCooldown) return; // <--- Блокировка спама

  const card = currentCard;
  const data = currentTab === 'single' 
    ? { word: card.word, pron: card.pron } 
    : { word: card.plural, pron: card.pronP };

  speakWord(data.word);
  addStars(1);
  markAsLearned(card.word);

  if (listenCounts[currentTab] < REQUIRED_CLICKS) {
    listenCounts[currentTab]++;
  }

  // Включаем кулдаун
  listenCooldown = true;
  renderTrainerContent(); // Перерисовываем, чтобы кнопка заблокировалась и пошла заливка

  // Разблокируем через 5 секунд
  setTimeout(() => {
    listenCooldown = false;
    renderTrainerContent(); // Перерисовываем, чтобы кнопка стала активной
  }, 5000);
}

function updateNextButton() {
  const card = currentCard; // <--- ИСПОЛЬЗУЕМ currentCard ВМЕСТО cardsData[currentCardIndex]
  const btn = document.getElementById('btn-next');
  const fill = document.getElementById('btn-next-fill');
  
  let totalClicks, maxClicks;
  
  if (card.single) {
    totalClicks = listenCounts.single;
    maxClicks = REQUIRED_CLICKS;
  } else {
    totalClicks = listenCounts.single + listenCounts.plural;
    maxClicks = REQUIRED_CLICKS * 2;
  }

  const percent = (totalClicks / maxClicks) * 100;
  fill.style.width = `${percent}%`;

  const isReady = card.single 
    ? listenCounts.single >= REQUIRED_CLICKS
    : (listenCounts.single >= REQUIRED_CLICKS && listenCounts.plural >= REQUIRED_CLICKS);

  if (isReady) {
    btn.classList.add('active');
    btn.disabled = false;
  } else {
    btn.classList.remove('active');
    btn.disabled = true;
  }
}

function handleNext() {
  const card = currentCard;
  const isReady = card.single 
    ? listenCounts.single >= REQUIRED_CLICKS
    : (listenCounts.single >= REQUIRED_CLICKS && listenCounts.plural >= REQUIRED_CLICKS);

  if (nextCooldown || !isReady) return;
  nextCooldown = true;
  
  showRandomCard(); 
}
