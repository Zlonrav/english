// ================= ИГРА (СВЯЖИ ПАРУ) =================
let connectLeftSelected = null;
let connectRightSelected = null;
let connectPairsLeft = 4;
let connectScore = 0;
let connectLocked = false;

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
          <div id="connect-left-col" style="display: flex; flex-direction: column; gap: 15px; width: 40%;"></div>
          <div id="connect-right-col" style="display: flex; flex-direction: column; gap: 15px; width: 55%;"></div>
        </div>

        <!-- Блок для подсказок и перевода (фиксированная высота, верхнее выравнивание) -->
        <div id="connect-translation-box" style="margin-top: 25px; text-align: center; font-size: 16px; font-weight: bold; color: var(--gold); height: 90px; display: flex; flex-direction: column; justify-content: flex-start; padding-top: 15px; transition: opacity 0.3s ease; opacity: 0; line-height: 1.3; overflow: hidden;"></div>
      </div>
    `;
    document.querySelector('.content-wrapper').appendChild(view);
  }

  view.style.display = 'flex';
  connectScore = 0;
  connectLocked = false;
  document.getElementById('connect-score').innerText = `Правильно: 0/10`;
  startConnectGame();
}

function startConnectGame() {
  connectLeftSelected = null;
  connectRightSelected = null;
  connectPairsLeft = 4;
  connectLocked = false;
  
  const transBox = document.getElementById('connect-translation-box');
  transBox.innerHTML = '';
  transBox.style.opacity = '0';

  // 1. Берем по ОДНОМУ слову из каждого времени
  const categories = ["Present Simple", "Present Continuous", "Past Simple", "Future Simple"];
  let selected = [];
  let seenLefts = new Set();

  categories.forEach(cat => {
    let pool = tensesData.filter(c => c.cat === cat);
    pool.sort(() => Math.random() - 0.5);
    
    for (let item of pool) {
      if (!seenLefts.has(item.left)) {
        seenLefts.add(item.left);
        selected.push(item);
        break;
      }
    }
  });

  // 2. Генерируем левую и правую колонки
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
  if (connectLocked) return;
  if (element.style.visibility === 'hidden' || element.classList.contains('correct')) return;

  const transBox = document.getElementById('connect-translation-box');
  
    // 1. ПОДСКАЗКА (перенос строк разрешен, ширина ограничена)
  if (side === 'left' && item.hint) {
    // Делаем принудительный перенос перед "добавляется" и склеиваем дефис с окончанием (-ed, -s, -ing)
    let formattedHint = item.hint
      .replace('добавляется', '<br>добавляется')
      .replace(/ (-[a-z]+)/g, '&nbsp;$1'); 

    transBox.innerHTML = `
      <div style="font-size: 14px; color: var(--gold); line-height: 1.2; width: 100%; padding: 0 10px; box-sizing: border-box;">
        💡 ${formattedHint}
      </div>
    `;
    transBox.style.opacity = '1';
  } else if (side === 'right' && !connectLeftSelected) {
    transBox.style.opacity = '0';
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

      // 2. ПРАВИЛЬНЫЙ ОТВЕТ (в две строки, выравнивание по верху)
      transBox.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 2px; align-items: center; justify-content: flex-start; width: 100%; padding: 0 10px; box-sizing: border-box;">
          <div style="font-size: 15px; color: #fff; line-height: 1.2;">${fullSentence}</div>
          <div style="font-size: 14px; color: var(--gold); line-height: 1.2;">${translation}</div>
        </div>
      `;
      transBox.style.opacity = '1';

      let savedLeft = connectLeftSelected.el;
      let savedRight = connectRightSelected.el;

      connectLeftSelected = null;
      connectRightSelected = null;
      connectPairsLeft--;
      if (connectPairsLeft === 0) {
        connectLocked = true; 
      }

      setTimeout(() => {
        savedLeft.style.visibility = 'hidden';
        savedRight.style.visibility = 'hidden';

        transBox.innerHTML = '';
        transBox.style.opacity = '0';

        if (connectPairsLeft === 0) {
          connectScore++;
          document.getElementById('connect-score').innerText = `Правильно: ${connectScore}/10`;

          if (connectScore >= 10) {
            showToast("🏆 Все 10 раундов пройдены! Ты молодец!", 'top');
            setTimeout(() => { goHome(); }, 2000); 
          } else {
            showToast(`🌌 Раунд пройден! (${connectScore}/10)`, 'top');
            setTimeout(startConnectGame, 2500);
          }
        }
      }, 4000);

    } else {
      // 3. ОШИБКА (без плитки, по центру)
      connectLocked = true; 
      
      transBox.innerHTML = `
        <div style="font-size: 15px; color: var(--red); line-height: 1.2; width: 100%; padding: 0 10px; box-sizing: border-box;">
          ❌ Неверно! Попробуй другую пару.
        </div>
      `;
      transBox.style.opacity = '1';
      
      setTimeout(() => {
        if (connectLeftSelected) connectLeftSelected.el.classList.remove('wrong');
        if (connectRightSelected) connectRightSelected.el.classList.remove('wrong');
        connectLeftSelected = null;
        connectRightSelected = null;
        transBox.style.opacity = '0';
        connectLocked = false; 
      }, 1000); 
    }
  }
}
