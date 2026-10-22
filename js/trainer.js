// ================= ТРЕНАЖЕР =================
let currentCardIndex = -1;
let listenCooldown = false;
let nextCooldown = false;

function showRandomCard() {
  let newIndex = Math.floor(Math.random() * cardsData.length);
  while (newIndex === currentCardIndex && cardsData.length > 1) {
    newIndex = Math.floor(Math.random() * cardsData.length);
  }
  currentCardIndex = newIndex;
  const card = cardsData[currentCardIndex];

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

  html += `
    <button class="action-btn btn-next" id="btn-next" onclick="handleNext()" style="margin-top: 15px;">
      Дальше ➔ <div class="cooldown-bar" id="bar-next"></div>
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

  listenCooldown = true;

  // Блокируем обе кнопки (для ед. и мн. числа) одновременно
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
  if (nextCooldown) return;
  nextCooldown = true;
  const btn = document.getElementById('btn-next');
  const bar = document.getElementById('bar-next');
  btn.disabled = true;
  bar.style.width = '100%';
  bar.style.transition = 'width 5s linear';
  setTimeout(() => bar.style.width = '0%', 50);
  setTimeout(() => { showRandomCard(); }, 2500); 
}
