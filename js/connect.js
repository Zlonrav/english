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
        
        <div style="display: flex; width: 100%; gap: 20px; justify-content: space-between; position: relative;">
          <!-- Левая колонка (Иконки) -->
          <div id="connect-left-col" style="display: flex; flex-direction: column; gap: 15px; width: 45%;"></div>
          
          <!-- Правая колонка (Слова) -->
          <div id="connect-right-col" style="display: flex; flex-direction: column; gap: 15px; width: 45%;"></div>
        </div>
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

  // 1. Берем данные из новой базы времен
  let pool = [...tensesData]; 
  pool.sort(() => Math.random() - 0.5);
  
  // 2. Берем 4 случайные пары для раунда
  let selected = pool.slice(0, 4);

  // 3. Генерируем левую колонку (Кто? Местоимение/Существительное)
  let leftData = selected.map(c => ({ word: c.left, content: c.left }));
  leftData.sort(() => Math.random() - 0.5);

  // 4. Генерируем правую колонку (Что делает? Глагол с окончанием)
  let rightData = selected.map(c => ({ word: c.left, content: c.right }));
  rightData.sort(() => Math.random() - 0.5);

  const leftCol = document.getElementById('connect-left-col');
  const rightCol = document.getElementById('connect-right-col');
  
  leftCol.innerHTML = '';
  rightCol.innerHTML = '';

  leftData.forEach(item => {
    const box = document.createElement('div');
    box.className = 'quiz-opt-btn';
    box.style.cssText = `padding: 14px; font-size: 18px; height: 65px; display: flex; align-items: center; justify-content: center; margin: 0; text-align: center;`;
    box

function selectConnectItem(item, element, side) {
  if (element.style.visibility === 'hidden') return;

  if (side === 'left') {
    // Снимаем класс со старого выбора слева
    if (connectLeftSelected) connectLeftSelected.el.classList.remove('wrong');
    connectLeftSelected = { item: item, el: element };
    element.classList.add('wrong'); // Используем готовый класс оранжевого/красного бордера из CSS
  } else {
    if (connectRightSelected) connectRightSelected.el.classList.remove('wrong');
    connectRightSelected = { item: item, el: element };
    element.classList.add('wrong');
  }

  // Если выбраны обе стороны — проверяем
  if (connectLeftSelected && connectRightSelected) {
    if (connectLeftSelected.item.word === connectRightSelected.item.word) {
      // Верно!
      let wordToSpeak = connectLeftSelected.item.word;
      connectLeftSelected.el.classList.remove('wrong');
      connectRightSelected.el.classList.remove('wrong');
      
      connectLeftSelected.el.classList.add('correct');
      connectRightSelected.el.classList.add('correct');

      speakWord(wordToSpeak);
      addStars(2);
      markAsLearned(wordToSpeak);

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
          setTimeout(startConnectGame, 1000);
        }
      }, 600);
    } else {
      // Ошибка — сбрасываем выделение через полсекунды
      setTimeout(() => {
        if (connectLeftSelected) connectLeftSelected.el.classList.remove('wrong');
        if (connectRightSelected) connectRightSelected.el.classList.remove('wrong');
        connectLeftSelected = null;
        connectRightSelected = null;
      }, 500);
    }
  }
}
