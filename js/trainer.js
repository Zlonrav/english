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
      </div>`;
  } else {
    html += `
      <div class="trainer-entry" style="margin-bottom:10px;">
        <div style="font-size:10px; color:#888; font-weight:bold; text-transform:uppercase;">Единственное число</div>
        <div class="trainer-word">${card.word}</div>
        <div class="trainer-pron">${card.pron}</div>
        <div class="trainer-trans">${card.trans}</div>
      </div>
      <div class="divider" style="margin:5px 0;"></div>
      <div class="trainer-entry">
        <div style="font-size:10px; color:#888; font-weight:bold; text-transform:uppercase;">Множественное число</div>
        <div class="trainer-word">${card.plural}</div>
        <div class="trainer-pron">${card.pronP}</div>
        <div class="trainer-trans">${card.transP}</div>
      </div>`;
  }

  html += `
    <button class="action-btn btn-listen" id="btn-listen" onclick="handleListen('${card.word}')">
      🔊 Слушать <div class="cooldown-bar" id="bar-listen"></div>
    </button>
    <button class="action-btn btn-next" id="btn-next" onclick="handleNext()">
      Дальше ➔ <div class="cooldown-bar" id="bar-next"></div>
    </button>
  `;

  document.getElementById('trainer-card-container').innerHTML = html;
  listenCooldown = false;
  nextCooldown = false;
}

function handleListen(word) {
  if (listenCooldown) return;
  speakWord(word);
  addStars(1);
  markAsLearned(word); 

  listenCooldown = true;
  const btn = document.getElementById('btn-listen');
  const bar = document.getElementById('bar-listen');
  btn.disabled = true;
  bar.style.width = '100%';
  bar.style.transition = 'width 15s linear';
  setTimeout(() => bar.style.width = '0%', 50); 
  setTimeout(() => { btn.disabled = false; listenCooldown = false; }, 5000);
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
