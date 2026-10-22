// ================= ИГРА (ПРАВОПИСАНИЕ) =================
let currentRevealedIndices = []; 
let currentSpellingCard = null;
let spellingAttempts = 0;
let spellingMode = 'easy';
let spellingCooldown = false;
let spellingRoundScore = 0; // Счетчик раундов

function openSpelling() {
  if (!checkAuth()) return; 
  hideAllViews();
  document.getElementById('spelling-view').style.display = 'flex';
  
  spellingRoundScore = 0; 
  // ... и так далее
  
  spellingRoundScore = 0; // Сброс при входе
  document.getElementById('spelling-score').innerText = `Правильно: 0/10`;
  
  setSpellingMode('easy');
  startSpellingRound();
}

function setSpellingMode(mode) {
  spellingMode = mode;
  spellingCooldown = false; 
  
  const easyBtn = document.getElementById('mode-easy-btn');
  const hardBtn = document.getElementById('mode-hard-btn');
  
  if (mode === 'easy') {
    easyBtn.style.background = '#fff'; 
    easyBtn.style.color = 'var(--main-color)'; 
    easyBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    hardBtn.style.background = 'transparent'; 
    hardBtn.style.color = '#666'; 
    hardBtn.style.boxShadow = 'none';
    
    document.getElementById('spelling-ru-text').style.display = 'block';
    document.getElementById('spelling-ru-input').style.display = 'none';
  } else {
    easyBtn.style.background = 'transparent'; 
    easyBtn.style.color = '#666'; 
    easyBtn.style.boxShadow = 'none';
    hardBtn.style.background = '#fff'; 
    hardBtn.style.color = 'var(--main-color)'; 
    hardBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    
    document.getElementById('spelling-ru-text').style.display = 'none';
    document.getElementById('spelling-ru-input').style.display = 'block';
  }
  startSpellingRound(); 
}

function startSpellingRound() {
  spellingAttempts = 0;
  currentRevealedIndices = [];
  
  let pool = cardsData.filter(c => c.cat !== "1. Буквы");
  let newCard = pool[Math.floor(Math.random() * pool.length)];

  while (pool.length > 1 && newCard === currentSpellingCard) {
    newCard = pool[Math.floor(Math.random() * pool.length)];
  }
  currentSpellingCard = newCard;

  document.getElementById('spelling-hint').innerHTML = "";
  
  const enInput = document.getElementById('spelling-en-input');
  enInput.value = "";
  enInput.style.borderColor = "#ccc";
  enInput.style.backgroundColor = "";
  
  const ruInput = document.getElementById('spelling-ru-input');
  ruInput.value = "";
  ruInput.style.borderColor = "#ccc";
  ruInput.style.backgroundColor = "";
  
  document.getElementById('spelling-ru-text').innerText = "Перевод: " + currentSpellingCard.trans;
  
  speakWord(currentSpellingCard.word);
  
  const btn = document.getElementById('spelling-submit-btn');
  
  if (!spellingCooldown) {
    btn.disabled = false;
    btn.style.opacity = '1';
    document.getElementById('spelling-cooldown').style.width = '0%';
  }
}

function checkSpelling() {
  if (spellingCooldown) return;

  const enInput = document.getElementById('spelling-en-input');
  const ruInput = document.getElementById('spelling-ru-input');
  
  const cleanString = (str) => {
    return str.toLowerCase()
              .replace(/[.,?!]/g, '')     // убираем точки и вопросы
              .replace(/-/g, ' ')         // дефисы меняем на пробел
              .replace(/\s+/g, ' ')       // убираем двойные пробелы
              .trim();
  };

  const userEn = cleanString(enInput.value);
  const userRu = cleanString(ruInput.value);
  
  const correctEn = cleanString(currentSpellingCard.word);
  const correctRu = cleanString(currentSpellingCard.trans);

  let isCorrect = false;

  if (spellingMode === 'easy') {
    isCorrect = (userEn === correctEn);
  } else {
    isCorrect = (userEn === correctEn && userRu === correctRu);
  }

  if (isCorrect) {
    enInput.style.borderColor = "var(--green)";
    enInput.style.backgroundColor = "#d4edda"; 
    ruInput.style.borderColor = "var(--green)";
    ruInput.style.backgroundColor = "#d4edda";
    
    let starsEarned = 5;
    if (spellingAttempts >= 5) starsEarned = 3;
    if (spellingAttempts >= 8) starsEarned = 1;
    
    addStars(starsEarned);
    markAsLearned(currentSpellingCard.word);
    
    spellingRoundScore++;
    document.getElementById('spelling-score').innerText = `Правильно: ${spellingRoundScore}/10`;
    showToast("✅ Правильно! Молодец!", 'top');
    
    startSpellingCooldown(); 
    
    setTimeout(() => { 
      if (spellingRoundScore >= 10) {
        showToast("🏆 Раунд пройден! Ты молодец!", 'top');
        setTimeout(() => { openQuiz(); }, 1500);
      } else {
        startSpellingRound();
      }
    }, 1500);

  } else {
    enInput.style.borderColor = "var(--red)";
    enInput.style.backgroundColor = "#f8d7da";
    if (spellingMode === 'hard') {
      ruInput.style.borderColor = "var(--red)";
      ruInput.style.backgroundColor = "#f8d7da";
    }
    
      if (spellingAttempts < 7) { 
        spellingAttempts++;
      }
      showToast(`❌ Ошибка! Попытка ${spellingAttempts}/7`, 'top');
      
      updateSpellingHint(); 
      startSpellingCooldown();
  }
}

function updateSpellingHint() {
  const word = currentSpellingCard.word;
  const hintEl = document.getElementById('spelling-hint');
  
  // 1, 2 и 3 попытки — подсказок нет
  if (spellingAttempts < 4) {
    hintEl.innerHTML = ""; 
    return;
  }

  // Определяем целевой процент в зависимости от попытки
  let targetPercent = 0;
  if (spellingAttempts === 4) targetPercent = 0.25;
  if (spellingAttempts === 5) targetPercent = 0.50;
  if (spellingAttempts === 6) targetPercent = 0.75;
  if (spellingAttempts >= 7) targetPercent = 1.00;

  // Собираем индексы ВСЕХ букв и цифр в слове
  let allLetterIndices = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[a-zA-Z0-9]/)) {
      allLetterIndices.push(i);
    }
  }

  // Считаем, сколько всего букв нужно открыть
  let targetCount = Math.floor(allLetterIndices.length * targetPercent);
  if (targetPercent === 1) targetCount = allLetterIndices.length;

  // Сколько еще букв нужно открыть (недостающее количество)
  let needed = targetCount - currentRevealedIndices.length;

  if (needed > 0) {
    // Берем только те индексы, которые еще НЕ открыты
    let unrevealedIndices = allLetterIndices.filter(idx => !currentRevealedIndices.includes(idx));
    
    // Перемешиваем их случайным образом
    unrevealedIndices.sort(() => Math.random() - 0.5);
    
    // Добавляем нужное количество новых случайных букв к уже открытым
    let toAdd = unrevealedIndices.slice(0, needed);
    currentRevealedIndices.push(...toAdd);
  }

  // Собираем итоговую строку подсказки
  let hintHTML = "";
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    
    if (char.match(/[a-zA-Z0-9]/)) {
      if (currentRevealedIndices.includes(i)) {
        // Буква открыта
        hintHTML += `<span style="color:#d97706; font-weight:900;">${char}</span> `; 
      } else {
        // Буква скрыта
        hintHTML += `_ `;
      }
    } else if (char === ' ') {
      hintHTML += `<span style="color:#999; font-size:20px;">␣</span> `; 
    } else {
      hintHTML += `<span style="color:#666;">${char}</span> `;
    }
  }
  hintEl.innerHTML = hintHTML;
}

function startSpellingCooldown() {
  spellingCooldown = true;
  const btn = document.getElementById('spelling-submit-btn');
  const bar = document.getElementById('spelling-cooldown');
  
  btn.disabled = true;
  btn.style.opacity = '0.6';
  
  const seconds = spellingMode === 'easy' ? 5 : 10;
  
  bar.style.width = '100%';
  bar.style.transition = `width ${seconds}s linear`;
  setTimeout(() => bar.style.width = '0%', 50);

  setTimeout(() => {
    spellingCooldown = false;
    btn.disabled = false;
    btn.style.opacity = '1';
    
    const enInput = document.getElementById('spelling-en-input');
    const ruInput = document.getElementById('spelling-ru-input');
    enInput.style.borderColor = "#ccc";
    enInput.style.backgroundColor = "";
    ruInput.style.borderColor = "#ccc";
    ruInput.style.backgroundColor = "";
  }, seconds * 1000);
}
