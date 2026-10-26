// ================= ИГРА (СВЯЖИ ПАРУ) =================
let connectLeftSelected = null;
let connectRightSelected = null;
let connectPairsLeft = 4;

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
        <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
          <button class="btn-exit" onclick="goHome()">← Выйти</button>
          <span style="font-weight: bold; color: var(--main-color); font-size: 18px;">✨ Космические Пары</span>
        </div>
        
        <div style="display: flex; width: 100%; gap: 15px; justify-content: space-between; position: relative;">
          <!-- Левая колонка (Кто?) -->
          <div id="connect-left-col" style="display: flex; flex-direction: column; gap: 15px; width: 40%;"></div>
          
          <!-- Правая колонка (Что делает + маркер?) -->
          <div id="connect-right-col" style="display: flex; flex-direction: column; gap: 15px; width: 55%;"></div>
        </div>

        <!-- Блок для всплывающего перевода -->
        <div id="connect-translation-box" style="margin-top: 25px; text-align: center; font-size: 18px; font-weight: bold; color: var(--gold); min-height: 50px; transition: opacity 0.3s ease; opacity: 0;"></div>
      </div>
    `;
    document.querySelector('.content-wrapper').appendChild(view);
  }

  view.style.display = 'flex';
  startConnectGame();
}

function startConnectGame() {
  connectLeftSelected = null;
  connectRightSelected = null;
  connectPairsLeft = 4;
  document.getElementById('connect-translation-box').style.opacity = '0';

  // 1. Берем данные из базы времен
  let pool = [...tensesData]; 
  pool.sort(() => Math.random() - 0.5);

  // 2. ФИЛЬТР: Убираем дубликаты левых слов (местоимений)
  let seenLefts = new Set();
  let uniquePool = [];
  
  for (let item of pool) {
    if (!seenLefts.has(item.left)) {
      seenLefts.add(item.left);
      uniquePool.push(item);
    }
    if (uniquePool.length === 4) break; 
  }

  let selected = uniquePool;

  // 3. Генерируем левую колонку
  let leftData = selected.map(c => ({ word: c.left, content: c.left, trans: c.trans, fullRight: c.right }));
  leftData.sort(() => Math.random() - 0.5);

  // 4. Генерируем правую колонку
  let rightData = selected.map(c => ({ word: c.left, content: c.right, trans: c.trans, fullRight: c.right }));
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
      let translation = connectLeftSelected.item.trans; // Берем готовый перевод из базы
      
      connectLeftSelected.el.classList.remove('wrong');
      connectRightSelected.el.classList.remove('wrong');
      
      connectLeftSelected.el.classList.add('correct');
      connectRightSelected.el.classList.add('correct');

      speakWord(fullSentence); // Озвучиваем всё предложение
      addStars(2);

      // Показываем красивый перевод
      const transBox = document.getElementById('connect-translation-box');
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
          showToast("🌌 Все пары соединены!", 'top');
          setTimeout(startConnectGame, 2500); // Даем время прочитать последний перевод
        }
      }, 2000); // Задержка 2 сек, чтобы ребенок успел прочитать перевод

    } else {
      // ОШИБКА
      setTimeout(() => {
        if (connectLeftSelected) connectLeftSelected.el.classList.remove('wrong');
        if (connectRightSelected) connectRightSelected.el.classList.remove('wrong');
        connectLeftSelected = null;
        connectRightSelected = null;
      }, 500);
    }
  }
}
