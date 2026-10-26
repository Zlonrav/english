// ================= ИГРА (СВЯЖИ ПАРУ) =================
let connectLeftSelected = null;
let connectRightSelected = null;
let connectPairsLeft = 4;
let connectScore = 0;

function openConnect() {
  if (!checkAuth()) return;
  hideAllViews();

  let view = document.getElementById('connect-view');
  if (!view) {
    view = document.createElement('div');
    view.id = 'connect-view';
    view.className = 'view';
    view.innerHTML = `
      <div class="trainer-card" style="height: auto; min-height: 560px; justify-content: flex-start; padding: 25px 15px;">
        <!-- ЕДИНАЯ ШАПКА -->
        <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
          <button class="btn-exit" onclick="openQuiz()">← Выйти</button>
          <span id="connect-score" style="font-weight: bold; color: var(--green); font-size: 18px;">Правильно: 0/10</span>
        </div>
        
        <div style="display: flex; width: 100%; gap: 15px; justify-content: space-between; position: relative;">
          <!-- Левая колонка (Кто?) -->
          <div id="connect-left-col" style="display: flex; flex-direction: column; gap: 15px; width: 40%;"></div>
          
          <!-- Правая колонка (Что делает?) -->
          <div id="connect-right-col" style="display: flex; flex-direction: column; gap: 15px; width: 55%;"></div>
        </div>

        <!-- Блок для подсказок и перевода -->
        <div id="connect-translation-box" style="margin-top: 25px; text-align: center; font-size: 18px; font-weight: bold; color: var(--gold); min-height: 70px; transition: opacity 0.3s ease; opacity: 0; line-height: 1.4;"></div>
      </div>
    `;
    document.querySelector('.content-wrapper').appendChild(view);
  }

  view.style.display = 'flex';
  connectScore = 0;
  document.getElementById('connect-score').innerText = `Правильно: 0/10`;
  startConnectGame();
}

function startConnectGame() {
  connectLeftSelected = null;
  connectRightSelected = null;
  connectPairsLeft = 4;
  
  const transBox = document.getElementById('connect-translation-box');
  transBox.style.opacity = '0';
  transBox.innerHTML = '';

  // 1. Выбираем ОДНО случайное время для текущего раунда
  const categories = ["Present Simple", "Present Continuous", "Past Simple", "Future Simple"];
  const randomCat = categories[Math.floor(Math.random() * categories.length)];

  // 2. Берем слова только из этого времени
  let pool = tensesData.filter(c => c.cat === randomCat);
  pool.sort(() => Math.random() - 0.5);

  // 3. Берем 4 уникальные пары (уникальны и кто, и что делает)
  let seenLefts = new Set();
  let seenRights = new Set();
  let selected = [];
  
  for (let item of pool) {
    if (!seenLefts.has(item.left) && !seenRights.has(item.right)) {
      seenLefts.add(item.left);
      seenRights.add(item.right);
      selected.push(item);
    }
    if (selected.length === 4) break; 
  }

  // 4. Генерируем левую и правую колонки
  let leftData = selected.map(c => ({ word: c.left, content: c.left, trans: c.trans, hint: c.hint, fullRight: c.right }));
  leftData.sort(() => Math.random() - 0.5);

  let rightData = selected.map(c => ({ word: c.left, content: c.right, trans: c.trans, hint: c.hint, fullRight: c.right }));
  rightData.sort(() => Math.random() - 0.5);

  const leftCol = document.getElementById('connect-left-col');
  const rightCol = document.getElementById('connect-right-col');
  
  leftCol.innerHTML = '';
  rightCol.innerHTML = '';

  leftData.forEach(item => {
    const box = document.createElement('div');
    box.className = 'quiz-opt-btn';
    box.style.cssText = `padding: 15px 10px; font-size: 18px; height: 75px; display: flex; align-items: center; justify-content: center; margin: 0; text-align: center; word-break: break-word;`;
    box.innerText = item.content;
    box.onclick = () => selectConnectItem(item, box, 'left');
    leftCol.appendChild(box);
  });

  rightData.forEach(item => {
    const box = document.createElement('div');
    box.className = 'quiz-opt-btn';
    box.style.cssText = `padding: 15px 10px; font-size: 15px; height: 75px; display: flex; align-items: center; justify-content: center; margin: 0; font-weight: 900; text-align: center; word-break: break-word; line-height: 1.2;`;
    box.innerText = item.content;
    box.onclick = () => selectConnectItem(item, box, 'right');
    rightCol.appendChild(box);
  });
}

function selectConnectItem(item, element, side) {
  if (element.style.visibility === 'hidden' || element.classList.contains('correct')) return;

  const transBox = document.getElementById('connect-translation-box');
  
  // Показываем подсказку при нажатии на любую кнопку
  if (item.hint) {
    transBox.innerHTML = `💡 <span style="font-size: 16px; color: #fff; font-weight: normal;">${item.hint}</span>`;
    transBox.style.opacity = '1';
  }

  if (side === 'left') {
    if (connectLeftSelected) connectLeftSelected.el.classList.remove('wrong');
    connectLeftSelected = { item: item, el: element };
    element.classList.add('wrong'); 
  } else {
    if (connectRightSelected) connectRightSelected.el.classList.remove('wrong');
    connectRightSelected = { item: item, el: element };
    element.classList.add('wrong');
  }

  if (connectLeftSelected && connectRightSelected) {
    if (connectLeftSelected.item.word === connectRightSelected.item.word) {
      // ВЕРНО!
      let fullSentence = connectLeftSelected.item.content + " " + connectRightSelected.item.content;
      let translation = connectLeftSelected.item.trans;
      
      connectLeftSelected.el.classList.remove('wrong');
      connectRightSelected.el.classList.remove('wrong');
      
      connectLeftSelected.el.classList.add('correct');
      connectRightSelected.el.classList.add('correct');

      speakWord(fullSentence); 
      addStars(2);

      connectScore++;
      document.getElementById('connect-score').innerText = `Правильно: ${connectScore}/10`;

      // Показываем перевод
      transBox.innerHTML = `<span style="color: #fff;">${fullSentence}</span><br><span style="font-size: 16px; color: var(--gold);">${translation}</span>`;
      transBox.style.opacity = '1';

      let savedLeft = connectLeftSelected.el;
      let savedRight = connectRightSelected.el;

      connectLeftSelected = null;
      connectRightSelected = null;
      connectPairsLeft--;

      setTimeout(() => {
        savedLeft.style.visibility = 'hidden';
        savedRight.style.visibility = 'hidden';

        if (connectPairsLeft === 0) {
          if (connectScore >= 10) {
            showToast("🏆 Раунд пройден! Ты молодец!", 'top');
            setTimeout(() => { goHome(); }, 2000); 
          } else {
            showToast("🌌 Все пары соединены! Новый раунд.", 'top');
            setTimeout(startConnectGame, 2500);
          }
        }
      }, 2000);

    } else {
      // ОШИБКА
      transBox.innerHTML = `❌ <span style="font-size: 16px; color: var(--red); font-weight: normal;">Неверно! Посмотри на подсказку и попробуй снова.</span>`;
      
      setTimeout(() => {
        if (connectLeftSelected) connectLeftSelected.el.classList.remove('wrong');
        if (connectRightSelected) connectRightSelected.el.classList.remove('wrong');
        connectLeftSelected = null;
        connectRightSelected = null;
      }, 800);
    }
  }
}
