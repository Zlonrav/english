// ================= ТРЕНАЖЕР =================
let currentCardIndex = -1;
let nextCooldown = false;
let currentTab = 'single'; // 'single' или 'plural'
let listenCounts = { single: 0, plural: 0 };
const REQUIRED_CLICKS = 2; // Сколько раз нужно нажать на каждую форму

function showRandomCard() {
  let newIndex = Math.floor(Math.random() * cardsData.length);
  while (newIndex === currentCardIndex && cardsData.length > 1) {
    newIndex = Math.floor(Math.random() * cardsData.length);
  }
  currentCardIndex = newIndex;
  const card = cardsData[currentCardIndex];
  
  // Сброс состояния
  listenCounts = { single: 0, plural: 0 };
  currentTab = 'single';
  nextCooldown = false;

  let iconHtml = '';
  if (card.color) iconHtml = `<div class="trainer-color-circle" style="width:80px; height:80px; border-radius:50%; background:${card.color}; margin-bottom:10px; border:3px solid rgba(255,255,255,0.2);"></div>`;
  else iconHtml = `<div class="trainer-icon">${card.icon}</div>`;

  // Генерируем вкладки (скрытые, если слово single)
  const tabsHtml = `
    <div class="v5-tabs ${card.single ? 'hidden-tabs' : ''}" id="trainer-tabs">
      <div class="v5-tab active" id="tab-single" onclick="${card.single ? '' : "switchTrainerTab('single')"}">Ед. число</div>
      <div class="v5-tab" id="tab-plural" onclick="${card.single ? '' : "switchTrainerTab('plural')"}">Мн. число</div>
    </div>
  `;

  let html = `
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
  
  // Отрисовываем первый контент
  renderTrainerContent();
}

function renderTrainerContent() {
  const card = cardsData[currentCardIndex];
  const content = document.getElementById('trainer-content');
  
  // Берем данные в зависимости от вкладки
  const data = currentTab === 'single' 
    ? { word: card.word, pron: card.pron, trans: card.trans } 
    : { word: card.plural, pron: card.pronP, trans: card.transP };

  content.innerHTML = `
    <div class="trainer-word">${data.word}</div>
    <div class="trainer-pron">${data.pron}</div>
    <div class="trainer-trans">${data.trans}</div>
    <button class="action-btn btn-listen" onclick="handleListen()">
      🔊 Слушать (${listenCounts[currentTab]}/${REQUIRED_CLICKS})
    </button>
  `;

  // Обновляем вкладки (галочки и активный цвет)
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
  if (card.single) return; // Если слова нет, не переключаем
  
  currentTab = tab;
  renderTrainerContent();
}

function handleListen() {
  const card = cardsData[currentCardIndex];
  const data = currentTab === 'single' 
    ? { word: card.word, pron: card.pron } 
    : { word: card.plural, pron: card.pronP };

  // Озвучка и звезды
  speakWord(data.word);
  addStars(1);
  markAsLearned(card.word); // Прогресс пишется на базовое слово

  // Счетчик
  if (listenCounts[currentTab] < REQUIRED_CLICKS) {
    listenCounts[currentTab]++;
    renderTrainerContent();
  }
}

function updateNextButton() {
  const card = cardsData[currentCardIndex];
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
  const card = cardsData[currentCardIndex];
  const isReady = card.single 
    ? listenCounts.single >= REQUIRED_CLICKS
    : (listenCounts.single >= REQUIRED_CLICKS && listenCounts.plural >= REQUIRED_CLICKS);

  if (nextCooldown || !isReady) return;
  nextCooldown = true;
  
  // Мгновенный переход без задержек
  showRandomCard(); 
}
