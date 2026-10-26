// ================= ИГРА (БУКВЕННЫЙ КОНСТРУКТОР) =================
let currentConstructorCard = null;
let constructorScore = 0;
let userBuiltWord = [];
let shuffledLetters = [];

function openConstructor() {
  if (!checkAuth()) return;
  hideAllViews();
  
  // Динамически создаем или показываем экран конструктора
  let view = document.getElementById('constructor-view');
  if (!view) {
    view = document.createElement('div');
    view.id = 'constructor-view';
    view.className = 'view';
    view.innerHTML = `
      <div class="trainer-card" id="constructor-card">
        <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
          <button class="btn-exit" onclick="openQuiz()">← Выйти</button>
          <span id="constructor-score" style="font-weight: bold; color: var(--text-muted);">Правильно: 0/10</span>
        </div>
        <div id="constructor-icon-box" style="font-size: 60px; height: 70px; display: flex; align-items: center; justify-content: center; margin-bottom: 5px;"></div>
        
        <!-- Новый блок: перевод + кнопка звука -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 15px; width: 100%;">
          <div id="constructor-translation" class="trainer-trans" style="margin: 0; padding: 0; width: auto;"></div>
          <button onclick="speakWord(currentConstructorCard.word)" style="opacity: 0.5; background: #fff; border: 2px solid var(--main-color); border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 0 var(--main-color); padding: 0; line-height: 1;">🔊</button>
        </div>
        
        <!-- Область собранного слова -->
        <div id="constructor-slots" style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; min-height: 50px; width: 100%; margin-bottom: 20px;"></div>
        
        <!-- Область доступных букв -->
        <div id="constructor-letters" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; width: 100%; margin-bottom: auto;"></div>
        
        <button class="action-btn btn-next" id="constructor-check-btn" onclick="checkConstructorAnswer()" style="margin-top: auto;" disabled>Проверить</button>
      </div>
    `;
    document.querySelector('.content-wrapper').appendChild(view);
  }
  
  view.style.display = 'flex';
  constructorScore = 0;
  document.getElementById('constructor-score').innerText = `Правильно: 0/10`;
  
  startConstructorRound(); 
}

function startConstructorRound() {
  userBuiltWord = [];
  document.getElementById('constructor-check-btn').disabled = true;
  document.getElementById('constructor-check-btn').classList.remove('active');

  // 1. Берем слова из очищенного пула
  let pool = getCleanGamePool(cardsData);
  
  // 2. ДОПОЛНИТЕЛЬНЫЙ ФИЛЬТР ТОЛЬКО ДЛЯ КОНСТРУКТОРА:
  // Оставляем только слова без пробелов и дефисов (т.е. состоящие из одного слова)
  let singleWordPool = pool.filter(c => !c.word.includes(' ') && !c.word.includes('-'));
  
  // 3. Защита на случай, если пул вдруг опустеет (маловероятно, но пусть будет)
  if (singleWordPool.length === 0) {
    singleWordPool = pool; 
  }

  currentConstructorCard = singleWordPool[Math.floor(Math.random() * singleWordPool.length)];

  // Рендерим иконку и перевод
  const iconBox = document.getElementById('constructor-icon-box');
  if (currentConstructorCard.color) {
    iconBox.innerHTML = `<div style="width:60px; height:60px; background:${currentConstructorCard.color}; border-radius:50%; border:2px solid rgba(255,255,255,0.2);"></div>`;
  } else {
    // Если это картинка, ограничиваем её размер, чтобы не ломала верстку
    if (currentConstructorCard.icon && currentConstructorCard.icon.includes('<img')) {
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = currentConstructorCard.icon;
        let img = tempDiv.querySelector('img');
        if (img) {
            img.style.maxWidth = '65px';
            img.style.maxHeight = '65px';
            img.style.objectFit = 'contain';
        }
        iconBox.innerHTML = tempDiv.innerHTML;
    } else {
        // Если это эмодзи, выводим как есть
        iconBox.innerHTML = currentConstructorCard.icon;
    }
  }
  document.getElementById('constructor-translation').innerText = currentConstructorCard.trans;

  // Озвучиваем слово в начале раунда
  speakWord(currentConstructorCard.word);

  // Готовим буквы слова (приводим к нижнему регистру, убираем пробелы/дефисы для сборки)
  let cleanWord = currentConstructorCard.word.toLowerCase().replace(/[^a-z0-9]/g, '');
  let letters = cleanWord.split('');
  
  // Добавляем 2 случайные буквы-обманки для усложнения
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 2; i++) {
    letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }

  // Перемешиваем буквы
  shuffledLetters = letters.map((letter, index) => ({ id: index, char: letter }));
  shuffledLetters.sort(() => Math.random() - 0.5);

  renderConstructorMechanics();
}

function renderConstructorMechanics() {
  // 1. Рендерим слоты (куда падают буквы)
  const slotsContainer = document.getElementById('constructor-slots');
  slotsContainer.innerHTML = '';
  
  let cleanWordLength = currentConstructorCard.word.toLowerCase().replace(/[^a-z0-9]/g, '').length;
  
  for (let i = 0; i < cleanWordLength; i++) {
    const slot = document.createElement('div');
    slot.style.cssText = `
      width: 35px; height: 45px; border-bottom: 3px solid var(--main-color);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; font-weight: 900; color: #fff; text-transform: uppercase;
    `;
    if (userBuiltWord[i]) {
      slot.innerText = userBuiltWord[i].char;
      slot.style.borderBottom = '3px solid var(--gold)';
      slot.style.cursor = 'pointer';
      // Нажатие на собранную букву возвращает её назад
      slot.onclick = () => removeLetterFromWord(i);
    }
    slotsContainer.appendChild(slot);
  }

  // 2. Рендерим доступные кубики с буквами
  const lettersContainer = document.getElementById('constructor-letters');
  lettersContainer.innerHTML = '';

  shuffledLetters.forEach(item => {
    // Проверяем, не использована ли уже эта конкретная буква
    const isUsed = userBuiltWord.some(used => used.id === item.id);
    
    const btn = document.createElement('div');
    btn.className = 'digits'; // Используем твой готовый класс стиля из CSS
    btn.style.cssText = `
      width: 40px; height: 40px; font-size: 20px; cursor: pointer; text-transform: uppercase;
      transition: opacity 0.2s, transform 0.1s;
    `;
    btn.innerText = item.char;

    if (isUsed) {
      btn.style.opacity = '0.2';
      btn.style.transform = 'scale(0.9)';
      btn.style.cursor = 'default';
    } else {
      btn.onclick = () => pushLetterToWord(item);
    }
    lettersContainer.appendChild(btn);
  });

  // Активация кнопки проверки, когда собраны все ячейки
  const checkBtn = document.getElementById('constructor-check-btn');
  if (userBuiltWord.length === cleanWordLength) {
    checkBtn.disabled = false;
    checkBtn.classList.add('active');
  } else {
    checkBtn.disabled = true;
    checkBtn.classList.remove('active');
  }
}

function pushLetterToWord(letterItem) {
  userBuiltWord.push(letterItem);
  renderConstructorMechanics();
}

function removeLetterFromWord(index) {
  userBuiltWord.splice(index, 1);
  renderConstructorMechanics();
}

function checkConstructorAnswer() {
  let cleanCorrectWord = currentConstructorCard.word.toLowerCase().replace(/[^a-z0-9]/g, '');
  let userWordString = userBuiltWord.map(l => l.char).join('');

  const cardEl = document.getElementById('constructor-card');

  if (userWordString === cleanCorrectWord) {
    showToast("✅ Великолепно! Слово собрано!", 'top');
    constructorScore++;
    document.getElementById('constructor-score').innerText = `Правильно: ${constructorScore}/10`;
    
    addStars(3);
    markAsLearned(currentConstructorCard.word);
    speakWord(currentConstructorCard.word);

    setTimeout(() => {
      if (constructorScore >= 10) {
        showToast("🏆 Космический раунд завершен!", 'top');
        goHome();
      } else {
        startConstructorRound();
      }
    }, 1500);
  } else {
    showToast("❌ Ошибка в буквах! Попробуй пересобрать.", 'top');
    // Эффект тряски карточки
    cardEl.style.animation = 'bounce 0.3s ease 2';
    setTimeout(() => cardEl.style.animation = '', 600);
    
    // Сбрасываем собранное, чтобы ребенок попробовал заново
    userBuiltWord = [];
    renderConstructorMechanics();
  }
}
