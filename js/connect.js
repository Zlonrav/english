function selectConnectItem(item, element, side) {
  if (connectLocked) return;
  if (element.style.visibility === 'hidden' || element.classList.contains('correct')) return;

  const transBox = document.getElementById('connect-translation-box');
  
  // 1. ПОДСКАЗКА (без плитки, в одну строку, мелкий шрифт)
  if (side === 'left' && item.hint) {
    transBox.innerHTML = `<div style="font-size: 13px; color: var(--gold); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">💡 ${item.hint}</div>`;
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

      // 2. ПРАВИЛЬНЫЙ ОТВЕТ (без плитки, в одну строку)
      transBox.innerHTML = `<div style="font-size: 16px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">${fullSentence} <span style="color: var(--gold); font-size: 14px;">— ${translation}</span></div>`;
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
      }, 2000);

    } else {
      // 3. ОШИБКА (без плитки, в одну строку)
      connectLocked = true; 
      
      transBox.innerHTML = `<div style="font-size: 15px; color: var(--red); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">❌ Неверно! Попробуй другую пару.</div>`;
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
