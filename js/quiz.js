// ================= ИГРА (ПРОВЕРКА ЗНАНИЙ) =================
let currentQuizCard = null;
let quizScore = 0;
let quizMode = 1;
let isQuizLocked = false;

function startQuiz(mode) {
  quizMode = mode;
  quizScore = 0;
  document.getElementById('quiz-menu').style.display = 'none';
  document.getElementById('quiz-play').style.display = 'flex'; // Чтобы кнопки прижались к низу
  document.getElementById('quiz-score').innerText = 'Правильно: 0/10'; // Добавили /10
  loadQuestion();
}

function loadQuestion() {
  let quizPool = cardsData.filter(c => c.cat !== "1. Буквы" && c.cat !== "3. Порядковые");
  if (quizPool.length === 0) quizPool = cardsData; 
  currentQuizCard = quizPool[Math.floor(Math.random() * quizPool.length)];
  
  let sameCategoryCards = cardsData.filter(c => c.cat === currentQuizCard.cat && c.word !== currentQuizCard.word);
  sameCategoryCards.sort(() => Math.random() - 0.5);
  let wrongOptions = sameCategoryCards.slice(0, 2);
  
  if (wrongOptions.length < 2) {
      let fallbackPool = cardsData.filter(c => c.word !== currentQuizCard.word && !wrongOptions.includes(c));
      fallbackPool.sort(() => Math.random() - 0.5);
      while (wrongOptions.length < 2) { wrongOptions.push(fallbackPool.pop()); }
  }

  let options = [currentQuizCard, ...wrongOptions];
  options.sort(() => Math.random() - 0.5);

  const qEl = document.getElementById('quiz-question');
  const soundBtn = document.getElementById('quiz-sound-btn');
  const optsEl = document.getElementById('quiz-options');
  
  soundBtn.style.display = 'none';
  qEl.style.display = 'block';

  // Отрисовка слова/перевода с текстовым произношением
  if (quizMode === 1) {
    qEl.innerHTML = `${currentQuizCard.word} <span style="font-size: 24px; color: var(--text-muted); font-weight: normal; margin-left: 10px;">[${currentQuizCard.pron}]</span>`;
  } else if (quizMode === 2) {
    qEl.style.display = 'none';
    soundBtn.style.display = 'inline-block';
    speakWord(currentQuizCard.word); 
  } else if (quizMode === 3) {
    qEl.innerHTML = `${currentQuizCard.trans} <span style="font-size: 24px; color: var(--text-muted); font-weight: normal; margin-left: 10px;">[${currentQuizCard.pron}]</span>`;
  }

  optsEl.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.dataset.word = opt.word; // Сохраняем слово в атрибут для надежной проверки
    
    if (quizMode === 1) btn.innerText = opt.trans; 
    else if (quizMode === 2) btn.innerText = `${opt.word} — ${opt.trans}`; 
    else if (quizMode === 3) btn.innerText = `${opt.word} — ${opt.pron}`; 
    
    btn.onclick = () => checkQuizAnswer(opt, currentQuizCard, btn);
    optsEl.appendChild(btn);
  });
  isQuizLocked = false;
}

function checkQuizAnswer(selected, correct, btnElement) {
  if (isQuizLocked) return;
  isQuizLocked = true;
  
  const allBtns = document.querySelectorAll('.quiz-opt-btn');
  
  if (selected.word === correct.word) {
    btnElement.classList.add('correct');
    quizScore++; 
    document.getElementById('quiz-score').innerText = `Правильно: ${quizScore}/10`;
    
    try {
      addStars(2); 
      markAsLearned(correct.word);
    } catch (e) {
      console.error("Ошибка наград:", e);
    }
    
    setTimeout(() => {
      if (quizScore >= 10) {
        showToast("🏆 Раунд пройден! Ты молодец!");
        openQuiz(); 
      } else {
        loadQuestion(); // <--- Восстановлен переход
      }
    }, 1000);
  } else {
    btnElement.classList.add('wrong');
    allBtns.forEach(b => {
      // Проверка по data-word, чтобы регистр текста не мешал
      if (b.dataset.word === correct.word) b.classList.add('correct');
    });
    setTimeout(() => { 
      loadQuestion(); // <--- Восстановлен переход
    }, 2000);
  }
}
