// ================= ТРЕНАЖЕР =================
let currentCardIndex = -1;
let listenCooldown = false;
let nextCooldown = false;
let currentListenCount = 0; // Счетчик прослушиваний для текущей карточки

function showRandomCard() {
  let newIndex = Math.floor(Math.random() * cardsData.length);
  while (newIndex === currentCardIndex && cardsData.length > 1) {
    newIndex = Math.floor(Math.random() * cardsData.length);
  }
  currentCardIndex = newIndex;
  const card = cardsData[currentCardIndex];
  currentListenCount = 0; // Сбрасываем счетчик при новой карточке

  let html = '';
  if (card.color) html += `<div class="trainer-color-circle" style="width:80px; height:80px; border-radius:50%; background:${card.color}; margin-bottom:10px; border:3px solid #333;"></div>`;
  else html += `<div class="trainer-icon">${card.icon}</div>`;
  html += `<div class="divider"></div>`;

  if (card.single) {
    html += `
      <div class="trainer-entry">
        <div class="trainer-word">${card.word}</div>
        <div class="trainer-pron">${card.pron}</div>
        <div class="trainer-trans">${card.trans}</div>
      </div>
      <button class="action-btn btn-listen" id="btn-listen" onclick="handleListen('${card.word}', '${card.word}')">
        🔊 Слушать <div class="cooldown-bar" id="bar-listen"></div>
      </button>`;
  } else {
    html += `
      <div class="trainer-entry" style="margin-bottom:10px;">
        <div style="font-size:10px; color:#888; font-weight:bold; text-transform:uppercase;">Единственное число</div>
        <div class="trainer-word">${card.word}</div>
        <div class="trainer-pron">${card.pron}</div>
        <div class="trainer-trans">${card.trans}</div>
      </div>
      <button class="action-btn btn-listen" id="btn-listen-single" onclick="handleListen('${card.word}', '${card.word}')" style="margin-bottom: 8px;">
        🔊 Слушать (ед. ч.) <div class="cooldown-bar" id="bar-listen-single"></div>
      </button>

      <div class="divider" style="margin:5px 0;"></div>

      <div class="trainer-entry">
        <div style="font-size:10px; color:#888; font-weight:bold; text-transform:uppercase;">Множественное число</div>
        <div class="trainer-word">${card.plural}</div>
        <div class="trainer-pron">${card.pronP}</div>
        <div class="trainer-trans">${card.transP}</div>
      </div>
      <button class="action-btn btn-listen" id="btn-listen-plural" onclick="handleListen('${card.word}', '${card.plural}')">
        🔊 Слушать (мн. ч.) <div class="cooldown-bar" id="bar-listen-plural"></div>
      </button>`;
  }

  // Кнопка "Дальше" изначально заблокирована и бледная. Внутри неё будет заливка прогресса.
  html += `
    <button class="action-btn btn-next" id="btn-next" onclick="handleNext()" disabled style="margin-top: 15px; background: #c2d2e8; color: #6d84a3; box-shadow: 0 5px 0 #a0b4ce; opacity: 0.8; position: relative; overflow: hidden;">
      <div id="next-fill" style="position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: var(--main-color); z-index: 0; transition: width 0.3s ease;"></div>
      <span style="position: relative; z-index: 1;">Дальше ➔</span>
    </button>
  `;

  document.getElementById('trainer-card-container').innerHTML = html;
  listenCooldown = false;
  nextCooldown = false;
}

function handleListen(baseWord, textToSpeak) {
  if (listenCooldown) return;
  
  // Воспроизводим и начисляем звезду
  speakWord(textToSpeak);
  addStars(1);
  markAsLearned(baseWord); 

  // Увеличиваем счетчик прослушиваний
  if (currentListenCount < 3) {
    currentListenCount++;
    
    // Обновляем заливку на кнопке "Дальше"
    const fill = document.getElementById('next-fill');
    if (fill) {
      fill.style.width = (currentListenCount / 3 * 100) + '%';
    }

    // Если прослушали 3 раза — разблокируем "Дальше" и делаем её синей
    if (currentListenCount === 3) {
      const btnNext = document.getElementById('btn-next');
      if (btnNext) {
        btnNext.disabled = false;
        btnNext.style.background = 'var(--main-color)';
        btnNext.style.color = '#fff';
        btnNext.style.boxShadow = '0 5px 0 #153870';
        btnNext.style.opacity = '1';
      }
    }
  }

  // Блокируем кнопки "Слушать" на 5 секунд
  listenCooldown = true;
  const btns = document.querySelectorAll('.btn-listen');
  const bars = document.querySelectorAll('.cooldown-bar[id^="bar-listen"]');

  btns.forEach(btn => btn.disabled = true);
  bars.forEach(bar => {
    bar.style.width = '100%';
    bar.style.transition = 'width 5s linear';
    setTimeout(() => bar.style.width = '0%', 50);
  });

  setTimeout(() => { 
    btns.forEach(btn => btn.disabled = false); 
    listenCooldown = false; 
  }, 5000);
}

function handleNext() {
  if (nextCooldown || currentListenCount < 3) return; // Двойная защита
  nextCooldown = true;
  const btn = document.getElementById('btn-next');
  const bar = document.getElementById('bar-next');
  
  btn.disabled = true;
  if (bar) {
    bar.style.width = '100%';
    bar.style.transition = 'width 5s linear';
    setTimeout(() => bar.style.width = '0%', 50);
  }
  
  setTimeout(() => { showRandomCard(); }, 2500); 
}
