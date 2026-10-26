// ================= ИГРА (НЕПТУН) =================

// 1. Внедряем стили прямо из JS, чтобы не трогать styles.css
const neptuneStyle = document.createElement('style');
neptuneStyle.innerHTML = `
  #neptune-view { padding: 0; overflow: hidden; background: #000; position: relative; justify-content: flex-start; }
  
  /* Анимация параллакса звезд */
  .n-stars { position: absolute; top: 0; left: 0; width: 100%; height: 200%; background-image: radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #fff, rgba(0,0,0,0)); background-repeat: repeat; opacity: 0.3; }
  .n-layer1 { animation: n-move 20s linear infinite; background-size: 200px 200px; }
  .n-layer2 { animation: n-move 10s linear infinite; background-size: 300px 300px; opacity: 0.5; }
  .n-layer3 { animation: n-move 5s linear infinite; background-size: 400px 400px; opacity: 0.8; }
  
  @keyframes n-move { from { transform: translateY(0); } to { transform: translateY(-50%); } }

  /* Ракета */
  #n-rocket { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 60px; z-index: 10; transition: top 0.5s ease-in-out; filter: drop-shadow(0 0 10px #3b82f6); }
  
  /* Планета на фоне */
  #n-planet { position: absolute; right: -100px; top: 20%; font-size: 150px; z-index: 1; opacity: 0.4; transition: right 2s ease-in-out, opacity 2s; }

  /* Терминал (Матрица) */
  #n-terminal { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 420px; background: rgba(0, 15, 0, 0.85); border: 1px solid #00ffcc; box-shadow: 0 0 15px rgba(0, 255, 204, 0.3); padding: 15px; border-radius: 8px; z-index: 20; display: none; flex-direction: column; gap: 10px; }
  .n-matrix-text { color: #00ffcc; font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.4; }
  .n-matrix-word { color: #fff; font-size: 22px; font-weight: bold; text-shadow: 0 0 8px #00ffcc; letter-spacing: 1px; }
  .n-opt-btn { background: rgba(0, 255, 204, 0.1); border: 1px solid #00ffcc; color: #00ffcc; font-family: 'Courier New', Courier, monospace; font-size: 16px; padding: 10px; border-radius: 4px; cursor: pointer; transition: 0.2s; text-align: left; width: 100%; }
  .n-opt-btn:hover { background: rgba(0, 255, 204, 0.3); color: #fff; }
  .n-opt-btn.correct { background: #10b981; color: #fff; border-color: #10b981; }
  .n-opt-btn.wrong { background: #ef4444; color: #fff; border-color: #ef4444; }
  
  /* HUD */
  #n-hud { position: absolute; top: 15px; left: 15px; right: 15px; display: flex; justify-content: space-between; align-items: center; z-index: 20; color: #00ffcc; font-family: monospace; font-weight: bold; text-shadow: 0 0 5px #00ffcc; }
`;
document.head.appendChild(neptuneStyle);

// 2. Данные планет
const neptunePlanets = [
  { name: "Земля", icon: "🌍", target: 10, reward: 10 },
  { name: "Луна", icon: "🌕", target: 15, reward: 15 },
  { name: "Марс", icon: "🔴", target: 20, reward: 20 },
  { name: "Юпитер", icon: "🟠", target: 25, reward: 25 },
  { name: "Сатурн", icon: "🪐", target: 30, reward: 30 },
  { name: "Уран", icon: "🔵", target: 35, reward: 35 },
  { name: "Нептун", icon: "🌀", target: 40, reward: 40 },
  { name: "Пояс Койпера", icon: "☄️", target: 45, reward: 45 },
  { name: "Облако Оорта", icon: "🌌", target: 50, reward: 50 },
  { name: "Альфа Центавра", icon: "✨", target: 60, reward: 60 }
];

let nPlanetIdx = 0;
let nProgress = 0;
let nLocked = false;
let nCurrentCorrectWord = "";

// 3. Запуск игры
function openNeptune() {
  if (!checkAuth()) return;
  hideAllViews();
  
  let view = document.getElementById('neptune-view');
  if (!view) {
    view = document.createElement('div');
    view.id = 'neptune-view';
    view.className = 'view';
    view.innerHTML = `
      <div class="n-stars n-layer1"></div>
      <div class="n-stars n-layer2"></div>
      <div class="n-stars n-layer3"></div>
      
      <div id="n-hud">
        <button class="btn-exit" onclick="goHome()" style="color: #00ffcc; font-size: 16px;">← Выйти</button>
        <div id="n-hud-text">Земля ➔ Луна: 0/10</div>
      </div>

      <div id="n-planet">🌍</div>
      <div id="n-rocket">🚀</div>

      <div id="n-terminal">
        <div class="n-matrix-text">
          > ВНИМАНИЕ: СБОЙ СИСТЕМЫ...<br>
          > РАСШИФРУЙТЕ КОНСТАНТУ:<br>
          > <span class="n-matrix-word" id="n-question">[word]</span>
        </div>
        <div id="n-options" style="display: flex; flex-direction: column; gap: 8px;"></div>
      </div>
    `;
    document.querySelector('.content-wrapper').appendChild(view);
  }

  view.style.display = 'flex';
  nPlanetIdx = 0;
  nProgress = 0;
  nLocked = false;
  
  updateNeptuneHUD();
  startNeptuneQuestion();
}

// 4. Обновление интерфейса
function updateNeptuneHUD() {
  const currentP = neptunePlanets[nPlanetIdx];
  const nextP = neptunePlanets[nPlanetIdx + 1] || neptunePlanets[nPlanetIdx];
  
  const hud = document.getElementById('n-hud-text');
  if (hud) hud.innerText = `${currentP.name} ➔ ${nextP.name}: ${nProgress}/${nextP.target}`;
  
  const planetEl = document.getElementById('n-planet');
  if (planetEl) {
    planetEl.innerText = currentP.icon;
    // Планета подплывает справа при старте
    planetEl.style.right = '-100px';
    setTimeout(() => planetEl.style.right = '10px', 100);
  }

  // Сброс ракеты в центр
  const rocket = document.getElementById('n-rocket');
  if (rocket) rocket.style.top = '50%';
}

// 5. Генерация вопроса
function startNeptuneQuestion() {
  nLocked = false;
  const terminal = document.getElementById('n-terminal');
  terminal.style.display = 'flex';
  terminal.style.opacity = '1';

  // Берем пул слов
  let pool = getCleanGamePool(cardsData);
  if (pool.length === 0) pool = cardsData;
  
  const correctCard = pool[Math.floor(Math.random() * pool.length)];
  nCurrentCorrectWord = correctCard.trans;
  
  // Ищем неверный ответ
  let wrongCard = pool[Math.floor(Math.random() * pool.length)];
  while (wrongCard.trans === nCurrentCorrectWord) {
    wrongCard = pool[Math.floor(Math.random() * pool.length)];
  }

  // Перемешиваем ответы
  let options = [correctCard.trans, wrongCard.trans].sort(() => Math.random() - 0.5);

  document.getElementById('n-question').innerText = `[ ${correctCard.word} ]`;
  
  const optContainer = document.getElementById('n-options');
  optContainer.innerHTML = '';
  
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'n-opt-btn';
    btn.innerText = `> ${opt}`;
    btn.onclick = () => answerNeptune(opt, btn);
    optContainer.appendChild(btn);
  });
}

// 6. Обработка ответа
function answerNeptune(selectedOpt, btnElement) {
  if (nLocked) return;
  nLocked = true;
  
  const terminal = document.getElementById('n-terminal');
  const rocket = document.getElementById('n-rocket');
  const allBtns = document.querySelectorAll('.n-opt-btn');
  
  if (selectedOpt === nCurrentCorrectWord) {
    // ПРАВИЛЬНО
    btnElement.classList.add('correct');
    nProgress++;
    updateNeptuneHUD();

    // Анимация полета ВВЕРХ
    rocket.style.transition = 'top 2s ease-out';
    rocket.style.top = '10%';
    
    terminal.style.opacity = '0';
    setTimeout(() => terminal.style.display = 'none', 300);

    setTimeout(() => {
      // Проверка: долетели ли до планеты?
      const currentP = neptunePlanets[nPlanetIdx];
      const nextP = neptunePlanets[nPlanetIdx + 1];
      
      if (nextP && nProgress >= nextP.target) {
        // ДОЛЕТЕЛИ
        addStars(nextP.reward);
        showToast(`🪐 Вы достигли ${nextP.name}! Награда: +${nextP.reward} ⭐`, 'top');
        
        nPlanetIdx++;
        nProgress = 0;
        
        // Перезапускаем визуал планеты
        updateNeptuneHUD();
        
        setTimeout(startNeptuneQuestion, 1000);
      } else if (!nextP) {
         showToast("🌌 Вы покинули Млечный Путь... Продолжение следует!", 'top');
         setTimeout(goHome, 3000);
      } else {
        updateNeptuneHUD();
        startNeptuneQuestion();
      }
    }, 2200);

  } else {
    // НЕПРАВИЛЬНО
    btnElement.classList.add('wrong');
    allBtns.forEach(b => {
      if (b.innerText.includes(nCurrentCorrectWord)) b.classList.add('correct');
    });

    // Анимация полета ВНИЗ
    rocket.style.transition = 'top 1s ease-in';
    rocket.style.top = '70%';

    setTimeout(() => {
      // Возвращаем ракету на место
      rocket.style.transition = 'top 0.5s ease-out';
      rocket.style.top = '50%';
      
      setTimeout(() => {
        startNeptuneQuestion();
      }, 500);
    }, 1000);
  }
}
