// ================= ТРЕНАЖЕР =================
let currentCardIndex = -1;
let nextCooldown = false;
let listenCooldown = false; // <--- Защита от спама
let currentTab = 'single'; 
let listenCounts = { single: 0, plural: 0 };
const REQUIRED_CLICKS = 2; 

function showRandomCard() {
  let newIndex = Math.floor(Math.random() * cardsData.length);
  while (newIndex === currentCardIndex && cardsData.length > 1) {
    newIndex = Math.floor(Math.random() * cardsData.length);
  }
  currentCardIndex = newIndex;
  const card = cardsData[currentCardIndex];
  
  listenCounts = { single: 0, plural: 0 };
  currentTab = 'single';
  nextCooldown = false;
  listenCooldown = false;

  let iconHtml = '';
  if (card.color) iconHtml = `<div class="trainer-color-circle" style="width:80px; height:80px; border-radius:50%; background:${card.color}; margin-bottom:10px; border:3px solid rgba(255,255,255,0.2);"></div>`;
  else iconHtml = `<div class="trainer-icon">${card.icon}</div>`;

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
  renderTrainerContent();
}

function renderTrainerContent() {
  const card = cardsData[currentCardIndex];
  const content = document.getElementById('trainer-content');
  
  const data = currentTab === 'single' 
    ? { word: card.word, pron: card.pron, trans: card.trans } 
    : { word: card.plural, pron: card.pronP, trans: card.transP };

  // Добавляем полоску заливки внутрь кнопки Слушать
  content.innerHTML = `
    <div class="trainer-word">${data.word}</div>
    <div class="trainer-pron">${data.pron}</div>
    <div class="trainer-trans">${data.trans}</div>
    <button class="action-btn btn-listen" id="btn-listen-action" onclick="handleListen()" ${listenCooldown ? 'disabled' : ''}>
      <div class="listen-fill" id="listen-fill-action" style="position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: rgba(0,0,0,0.2); z-index: 0; transition: none;"></div>
      <span style="position: relative; z-index: 1;">🔊 Слушать (${listenCounts[currentTab]}/${REQUIRED_CLICKS})</span>
    </button>
  `;

  // Если кулдаун активен, запускаем анимацию заливки кнопки
  if (listenCooldown) {
    const fill = document.getElementById('listen-fill-action');
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      void fill.offsetWidth; // Хак для перезапуска анимации
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

  const card = cardsData[currentCardIndex];
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
  
  showRandomCard(); 
}
