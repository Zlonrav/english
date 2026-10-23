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
  if (card.color) html += `<div class="trainer-color-circle" style="width:80px; height:80px; border-radius:50%; background:${card.color}; margin-bottom:10px; border:3px solid rgba(255,255,255,0.2);"></div>`;
  else html += `<div class="trainer-icon">${card.icon}</div>`;
  html += `<div class="divider"></div>`;

  // Шаблон для кнопки "Слушать" с внутренней заливкой
  const listenBtnHTML = (id, text, wordToSpeak) => `
    <button class="action-btn btn-listen" id="${id}" onclick="handleListen('${card.word}', '${wordToSpeak}')" style="position: relative; overflow: hidden;">
      <div class="listen-fill" style="position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: rgba(0,0,0,0.2); z-index: 0; transition: none;"></div>
      <span style="position: relative; z-index: 1;">🔊 Слушать ${text}</span>
    </button>
  `;

  if (card.single) {
    html += `
      <div class="trainer-entry">
        <div class="trainer-word">${card.word}</div>
        <div class="trainer-pron">${card.pron}</div>
        <div class="trainer-trans">${card.trans}</div>
      </div>
      ${listenBtnHTML('btn-listen', '', card.word)}
    `;
  } else {
    html += `
      <div class="trainer-entry" style="margin-bottom:5px;">
        <div style="font-size:10px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Единственное число</div>
        <div class="trainer-word">${card.word}</div>
        <div class="trainer-pron">${card.pron}</div>
        <div class="trainer-trans">${card.trans}</div>
      </div>
      ${listenBtnHTML('btn-listen-single', '', card.word)}

      <div class="divider" style="margin:15px 0 5px 0;"></div>

      <div class="trainer-entry">
        <div style="font-size:10px; color:var(--text-muted); font-weight:bold; text-transform:uppercase;">Множественное число</div>
        <div class="trainer-word">${card.plural}</div>
        <div class="trainer-pron">${card.pronP}</div>
        <div class="trainer-trans">${card.transP}</div>
      </div>
      ${listenBtnHTML('btn-listen-plural', '', card.plural)}
    `;
  }

  // Кнопка "Дальше" изначально заблокирована и выглядит как полупрозрачное стекло.
  html += `
    <button class="action-btn btn-next" id="btn-next" onclick="handleNext()" disabled style="margin-top: 15px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); box-shadow: none; border: 1px dashed rgba(255,255,255,0.2); position: relative; overflow: hidden; text-shadow: none;">
      <div id="next-fill" style="position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: linear-gradient(135deg, #3b82f6, #2563eb); z-index: 0; transition: width 0.3s ease; opacity: 0.7;"></div>
      <span style="position: relative; z-index: 1;">Дальше ➔</span>
    </button>
  `;

  document.getElementById('trainer-card-container').innerHTML = html;
  listenCooldown = false;
  nextCooldown = false;
}

function handleListen(baseWord, textToSpeak) {
  if (listenCooldown) return;
  
  speakWord(textToSpeak);
  addStars(1);
  markAsLearned(baseWord); 

  // Увеличиваем счетчик прослушиваний
  if (currentListenCount < 3) {
    currentListenCount++;
    
    // Обновляем заливку на кнопке "Дальше"
    const nextFill = document.getElementById('next-fill');
    if (nextFill) {
      nextFill.style.width = (currentListenCount / 3 * 100) + '%';
    }

    // Если прослушали 3 раза — разблокируем "Дальше" и делаем её сияющей
    if (currentListenCount === 3) {
      const btnNext = document.getElementById('btn-next');
      if (btnNext) {
        btnNext.disabled = false;
        btnNext.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        btnNext.style.color = '#fff';
        btnNext.style.boxShadow = '0 5px 0 #1e3a8a, 0 10px 20px rgba(59, 130, 246, 0.4)';
        btnNext.style.border = '1px solid rgba(255,255,255,0.2)';
        btnNext.style.textShadow = '0 1px 2px rgba(0,0,0,0.3)';
        if (nextFill) nextFill.style.opacity = '0'; // Скрываем заливку, так как кнопка теперь полностью синяя
      }
    }
  }

  // Анимация заполнения самой кнопки "Слушать" на 5 секунд
  listenCooldown = true;
  const btns = document.querySelectorAll('.btn-listen');
  
  btns.forEach(btn => {
    btn.disabled = true;
    const fill = btn.querySelector('.listen-fill');
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      // Форсируем перерисовку браузера, чтобы анимация сработала заново
      void fill.offsetWidth; 
      fill.style.transition = 'width 5s linear';
      fill.style.width = '100%';
    }
  });

  // Разблокировка через 5 секунд
  setTimeout(() => { 
    btns.forEach(btn => {
      btn.disabled = false;
      const fill = btn.querySelector('.listen-fill');
      if (fill) {
        fill.style.transition = 'none';
        fill.style.width = '0%';
      }
    });
    listenCooldown = false; 
  }, 5000);
}

function handleNext() {
  if (nextCooldown || currentListenCount < 3) return;
  nextCooldown = true;
  
  // Мгновенный переход без задержек
  showRandomCard(); 
}
