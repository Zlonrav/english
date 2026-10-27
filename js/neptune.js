// ================= ИГРА (НЕПТУН) =================

// 1. Внедряем стили
const neptuneStyle = document.createElement('style');
neptuneStyle.innerHTML = `
  #neptune-view { padding: 0; overflow: hidden; background: #000; position: relative; justify-content: flex-start; }
  
  /* Звездный фон */
  .n-stars { position: absolute; top: 0; left: 0; width: 100%; height: 200%; background-image: radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #fff, rgba(0,0,0,0)); background-repeat: repeat; will-change: background-position; }
  .n-layer1 { background-size: 200px 200px; opacity: 0.3; }
  .n-layer2 { background-size: 300px 300px; opacity: 0.5; }
  .n-layer3 { background-size: 400px 400px; opacity: 0.8; }

  /* Ракета */
  #n-rocket { 
    position: absolute; left: 50%; top: 50%; 
    transform: translate(-50%, -50%) rotate(-45deg); 
    font-size: 60px; z-index: 10; 
    transition: top 1s ease-out;
    filter: drop-shadow(0 0 10px #3b82f6); 
  }
  
  /* Планета */
  #n-planet { 
    position: absolute; right: 10%; top: -20%; 
    font-size: 120px; z-index: 1; opacity: 0.8; 
    transition: top 1s ease-out, opacity 0.5s;
  }

  /* Терминал (Матрица) */
  #n-terminal { 
    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); 
    width: 90%; max-width: 420px; 
    background: rgba(0, 15, 0, 0.85); border: 1px solid #00ffcc; 
    box-shadow: 0 0 15px rgba(0, 255, 204, 0.3); padding: 15px; border-radius: 8px; 
    z-index: 20; display: none; flex-direction: column; gap: 10px; 
  }
  .n-matrix-text { color: #00ffcc; font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.4; text-transform: uppercase; }
  .n-matrix-word { color: #fff; font-size: 22px; font-weight: bold; text-shadow: 0 0 8px #00ffcc; letter-spacing: 1px; text-transform: none; }
  .n-opt-btn { 
    background: rgba(0, 255, 204, 0.1); border: 1px solid #00ffcc; color: #00ffcc; 
    font-family: 'Courier New', Courier, monospace; font-size: 16px; 
    padding: 10px; border-radius: 4px; cursor: pointer; transition: 0.2s; 
    text-align: left; width: 100%; text-transform: lowercase;
  }
  .n-opt-btn:hover { background: rgba(0, 255, 204, 0.3); color: #fff; }
  .n-opt-btn.correct { background: #10b981; color: #fff; border-color: #10b981; }
  .n-opt-btn.wrong { background: #ef4444; color: #fff; border-color: #ef4444; }

  /* Экран ошибки (Топливо) и Финала */
  #n-error-screen, #n-final-screen {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: #000; z-index: 50; display: none; flex-direction: column;
    align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
  }
  #n-final-screen { z-index: 100; background: rgba(0,0,0,0.9); }
  
  /* HUD */
  #n-hud { 
    position: absolute; top: 15px; left: 15px; right: 15px; 
    display: flex; justify-content: space-between; align-items: center; 
    z-index: 20; color: #00ffcc; font-family: monospace; 
    font-weight: bold; text-shadow: 0 0 5px #00ffcc; 
  }
`;
document.head.appendChild(neptuneStyle);

// 2. Данные планет (26 этапов)
const neptunePlanets = [
  { name: "Луна", icon: "🌕", target: 10, reward: 5 },
  { name: "Марс", icon: "🔴", target: 12, reward: 5 },
  { name: "Юпитер", icon: "🟠", target: 15, reward: 10 },
  { name: "Сатурн", icon: "🪐", target: 18, reward: 10 },
  { name: "Уран", icon: "🔵", target: 22, reward: 15 },
  { name: "Нептун", icon: "🌀", target: 25, reward: 15 },
  { name: "Пояс Койпера", icon: "☄️", target: 28, reward: 20 },
  { name: "Облако Оорта", icon: "🌌", target: 30, reward: 20 },
  { name: "Альфа Центавра", icon: "✨", target: 35, reward: 25 },
  { name: "Сириус", icon: "⭐", target: 38, reward: 25 },
  { name: "Вега", icon: "💙", target: 40, reward: 30 },
  { name: "Арктур", icon: "🧡", target: 42, reward: 30 },
  { name: "Бетельгейзе", icon: "❤️‍🔥", target: 45, reward: 35 },
  { name: "Кассиопея", icon: "👑", target: 48, reward: 35 },
  { name: "Орион", icon: "🏹", target: 50, reward: 40 },
  { name: "Большая Медведица", icon: "🐻", target: 52, reward: 40 },
  { name: "Любовь (Планета)", icon: "💖", target: 55, reward: 45 },
  { name: "Межзвездное Облако", icon: "☁️", target: 58, reward: 45 },
  { name: "Галактика Андромеды", icon: "🌪️", target: 60, reward: 50 },
  { name: "Галактика Треугольника", icon: "🔺", target: 62, reward: 50 },
  { name: "Галактика Боде", icon: "🌌", target: 65, reward: 55 },
  { name: "Галактика Сигара", icon: "🚬", target: 68, reward: 55 },
  { name: "Скопление Девы", icon: "💫", target: 70, reward: 60 },
  { name: "Сверхскопление Центавра", icon: "🌀", target: 75, reward: 70 },
  { name: "Сверхскопление Ланиакея", icon: "💦", target: 80, reward: 80 },
  { name: "Великий Аттрактор", icon: "🌑", target: 100, reward: 100 }
];

let nPlanetIdx = 0;
let nProgress = 0;
let nLocked = false;
let nCurrentCorrectWord = "";

// --- ДВИЖОК АНИМАЦИИ ЗВЕЗД ---
let nStarOffset = 0;
let nTargetStarSpeed = 0.33; 
let nCurrentStarSpeed = 0.33;
let nStarAnimId = null;

function animateNeptuneStars() {
  // Защита от утечки памяти: если экран скрыт, останавливаем анимацию
  const view = document.getElementById('neptune-view');
  if (!view || view.style.display === 'none') {
    nStarAnimId = null;
    return;
  }

  nCurrentStarSpeed += (nTargetStarSpeed - nCurrentStarSpeed) * 0.05;
  nStarOffset += nCurrentStarSpeed;

  const l1 = document.querySelector('.n-layer1');
  const l2 = document.querySelector('.n-layer2');
  const l3 = document.querySelector('.n-layer3');

  if (l1) l1.style.backgroundPositionY = (nStarOffset * 0.5) + 'px';
  if (l2) l2.style.backgroundPositionY = (nStarOffset * 1) + 'px';
  if (l3) l3.style.backgroundPositionY = (nStarOffset * 2) + 'px';

  nStarAnimId = requestAnimationFrame(animateNeptuneStars);
}

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
        <button class="btn-exit" onclick="closeNeptune()" style="color: #00ffcc; font-size: 16px; z-index: 60;">← Выйти</button>
        <div id="n-hud-text">Луна: 0/10</div>
      </div>

      <div id="n-planet">🌕</div>
      <div id="n-rocket">🚀</div>

      <div id="n-terminal">
        <div class="n-matrix-text">
          > ВНИМАНИЕ: СБОЙ СИСТЕМЫ...<br>
          > РАСШИФРУЙТЕ КОНСТАНТУ:<br>
          > <span class="n-matrix-word" id="n-question">[word]</span>
        </div>
        <div id="n-options" style="display: flex; flex-direction: column; gap: 8px;"></div>
      </div>

      <!-- Экран ошибки (Топливо) -->
      <div id="n-error-screen">
        <div style="color: #ef4444; font-family: 'Courier New', Courier, monospace; font-size: 22px; font-weight: bold; text-align: center; text-transform: uppercase; line-height: 1.5; text-shadow: 0 0 10px #ef4444;" id="n-error-text">
          ⚠️ КАПИТАН, ДЛЯ ЗАПУСКА РАКЕТЫ НУЖНО ТОПЛИВО, ЗАРАБОТАЙТЕ 150 ЗВЕЗД В ЗАДАНИЯХ СЕГОДНЯ. СЕЙЧАС ЗАРАБОТАНО: 0/150
        </div>
      </div>

      <!-- Экран Финала -->
      <div id="n-final-screen">
        <div style="color: #fbbf24; font-family: 'Courier New', Courier, monospace; font-size: 24px; font-weight: bold; text-align: center; text-transform: uppercase; line-height: 1.5; text-shadow: 0 0 10px #fbbf24; margin-bottom: 20px;">
          ВЫ СОБРАЛИ ВСЕ ДАННЫЕ ВО ВСЕЛЕННОЙ, ТЕПЕРЬ ВЫ МОЖЕТЕ ОТПРАВЛЯТЬСЯ НА ЗЕМЛЮ!
        </div>
        <div style="font-size: 60px; animation: bounce 1s infinite;">🏠</div>
      </div>
    `;
    document.querySelector('.content-wrapper').appendChild(view);
  }

  view.style.display = 'flex';
  
  // Сброс анимации (в случае если она была остановлена)
  if (!nStarAnimId) {
    nStarAnimId = requestAnimationFrame(animateNeptuneStars);
  }

  // Проверка топлива
  const dailyEarned = state.dailyEarned || 0;
  const errorScreen = document.getElementById('n-error-screen');
  const finalScreen = document.getElementById('n-final-screen');
  const gameElements = [document.getElementById('n-planet'), document.getElementById('n-rocket'), document.getElementById('n-terminal')];
  const hudText = document.getElementById('n-hud-text');

  if (dailyEarned < 150) {
    errorScreen.style.display = 'flex';
    finalScreen.style.display = 'none';
    document.getElementById('n-error-text').innerHTML = `⚠️ КАПИТАН, ДЛЯ ЗАПУСКА РАКЕТЫ НУЖНО ТОПЛИВО, ЗАРАБОТАЙТЕ 150 ЗВЕЗД В ЗАДАНИЯХ СЕГОДНЯ. СЕЙЧАС ЗАРАБОТАНО: ${dailyEarned}/150`;
    gameElements.forEach(el => { if(el) el.style.display = 'none'; });
    hudText.style.display = 'none';
    
    nTargetStarSpeed = 0.33;
    nCurrentStarSpeed = 0.33;
    return;
  }

  errorScreen.style.display = 'none';
  finalScreen.style.display = 'none';
  gameElements.forEach(el => { if(el) el.style.display = ''; });
  hudText.style.display = 'block';

  nLocked = false;
  nPlanetIdx = state.neptunePlanetIdx || 0;
  nProgress = state.neptuneProgress || 0;
  
  // Если игрок уже на последней планете и прошел её, сбрасываем на Землю
  if (nPlanetIdx >= neptunePlanets.length - 1 && nProgress >= neptunePlanets[nPlanetIdx].target) {
    nPlanetIdx = 0;
    nProgress = 0;
    state.neptunePlanetIdx = 0;
    state.neptuneProgress = 0;
    saveState();
  }
  
  nTargetStarSpeed = 0.33; 
  nCurrentStarSpeed = 0.33;
  
  const planetEl = document.getElementById('n-planet');
  if (planetEl) {
    planetEl.style.transition = 'none';
    planetEl.style.top = '-20%';
  }
  
  const rocket = document.getElementById('n-rocket');
  if (rocket) {
    rocket.style.transition = 'none';
    rocket.style.top = '50%';
  }
  
  setTimeout(() => {
    if (planetEl) planetEl.style.transition = 'top 1s ease-out';
    if (rocket) rocket.style.transition = 'top 1s ease-out';
    updateNeptuneHUD();
    startNeptuneQuestion();
  }, 50);
}

// Функция для правильного выхода (остановка анимации)
function closeNeptune() {
  if (nStarAnimId) {
    cancelAnimationFrame(nStarAnimId);
    nStarAnimId = null;
  }
  goHome();
}

// 4. Обновление интерфейса
function updateNeptuneHUD() {
  const currentP = neptunePlanets[nPlanetIdx];
  const nextP = neptunePlanets[nPlanetIdx + 1] || currentP;
  
  const hud = document.getElementById('n-hud-text');
  if (hud) hud.innerText = `${currentP.name}: ${nProgress}/${currentP.target}`;
  
  const planetEl = document.getElementById('n-planet');
  if (planetEl) {
    planetEl.innerText = currentP.icon;
    let progressPercent = currentP.target > 0 ? (nProgress / currentP.target) : 0;
    let topPos = -20 + (progressPercent * 120); 
    planetEl.style.top = `${topPos}%`;
  }
}

// 5. Генерация вопроса
function startNeptuneQuestion() {
  nLocked = false;
  
  const rocket = document.getElementById('n-rocket');
  if (rocket) {
    rocket.style.transition = 'top 0.5s ease-in-out';
    rocket.style.top = '50%'; 
  }

  const terminal = document.getElementById('n-terminal');
  if (terminal) {
    terminal.style.display = 'flex';
    terminal.style.opacity = '1';
  }

  let pool = getCleanGamePool(cardsData);
  if (pool.length === 0) pool = cardsData;
  
  const correctCard = pool[Math.floor(Math.random() * pool.length)];
  nCurrentCorrectWord = correctCard.trans;
  
  let wrongCard = pool[Math.floor(Math.random() * pool.length)];
  while (wrongCard.trans === nCurrentCorrectWord) {
    wrongCard = pool[Math.floor(Math.random() * pool.length)];
  }

  let options = [correctCard.trans, wrongCard.trans].sort(() => Math.random() - 0.5);

  const questionEl = document.getElementById('n-question');
  if (questionEl) {
    let formattedWord = correctCard.word.charAt(0).toUpperCase() + correctCard.word.slice(1);
    questionEl.innerText = `[ ${formattedWord} ]`;
  }
  
  const optContainer = document.getElementById('n-options');
  if (optContainer) {
    optContainer.innerHTML = '';
    options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'n-opt-btn';
      btn.innerText = `> ${opt.toLowerCase()}`;
      btn.onclick = () => answerNeptune(opt, btn);
      optContainer.appendChild(btn);
    });
  }
}

// 6. Обработка ответа
function answerNeptune(selectedOpt, btnElement) {
  if (nLocked) return;
  nLocked = true;
  
  const terminal = document.getElementById('n-terminal');
  const rocket = document.getElementById('n-rocket');
  const planetEl = document.getElementById('n-planet');
  const allBtns = document.querySelectorAll('.n-opt-btn');
  const currentP = neptunePlanets[nPlanetIdx];
  const nextP = neptunePlanets[nPlanetIdx + 1];
  
  if (selectedOpt === nCurrentCorrectWord) {
    // ПРАВИЛЬНО (+1)
    if (btnElement) btnElement.classList.add('correct');
    
    nProgress = Math.min(nProgress + 1, currentP.target); 
    updateNeptuneHUD(); 

    state.neptunePlanetIdx = nPlanetIdx;
    state.neptuneProgress = nProgress;
    saveState();

    nTargetStarSpeed = 2; 
    if (rocket) rocket.style.top = '10%';
    
    if (terminal) {
      terminal.style.opacity = '0';
      setTimeout(() => { if(terminal) terminal.style.display = 'none'; }, 300);
    }

    setTimeout(() => {
      // Проверяем, долетели ли до планеты
      if (nProgress >= currentP.target) {
        
        // Если это была последняя планета
        if (!nextP) {
          // ФИНАЛЬНЫЙ АВТОПИЛОТ
          addStars(currentP.reward);
          
          // Увеличиваем счетчик полетов
          state.neptuneFlights = (state.neptuneFlights || 0) + 1;
          saveState();
          checkNewAchievements(); // Проверяем ачивку

          const finalScreen = document.getElementById('n-final-screen');
          const hudText = document.getElementById('n-hud-text');
          if (finalScreen) finalScreen.style.display = 'flex';
          if (hudText) hudText.style.display = 'none';
          
          // Ускоряем звезды для ощущения гиперпрыжка
          nTargetStarSpeed = 20; 
          
          if (rocket) rocket.style.top = '50%'; // Ракета в центре
          
          setTimeout(() => {
            // Возвращаемся на Землю
            nPlanetIdx = 0;
            nProgress = 0;
            state.neptunePlanetIdx = 0;
            state.neptuneProgress = 0;
            saveState();
            
            if (finalScreen) finalScreen.style.display = 'none';
            if (hudText) hudText.style.display = 'block';
            
            nTargetStarSpeed = 0.33; 
            updateNeptuneHUD();
            startNeptuneQuestion();
          }, 5000); // 5 секунд красивого полета домой

          return;
        }

        // Если есть следующая планета
        addStars(currentP.reward);
        showToast(`🪐 Вы достигли ${currentP.name}! Награда: +${currentP.reward} ⭐`, 'top');
        
        nPlanetIdx++;
        nProgress = 0;
        nTargetStarSpeed = 0.33; 
        
        state.neptunePlanetIdx = nPlanetIdx;
        state.neptuneProgress = 0;
        saveState();
        
        if (planetEl) {
          planetEl.style.transition = 'none'; 
          planetEl.style.top = '-20%';        
        }
        
        updateNeptuneHUD(); 

        setTimeout(() => {
          if (planetEl) planetEl.style.transition = 'top 1s ease-out';
          startNeptuneQuestion();
        }, 50);

      } else {
        nTargetStarSpeed = 0.33; 
        startNeptuneQuestion();
      }
    }, 1000); 

  } else {
    // НЕПРАВИЛЬНО (-2)
    if (btnElement) btnElement.classList.add('wrong');
    allBtns.forEach(b => {
      if (b.innerText.includes(nCurrentCorrectWord.toLowerCase())) b.classList.add('correct');
    });

    nProgress = Math.max(0, nProgress - 2);
    updateNeptuneHUD(); 

    state.neptunePlanetIdx = nPlanetIdx;
    state.neptuneProgress = nProgress;
    saveState();

    nTargetStarSpeed = -3; 

    if (rocket) {
      rocket.style.transition = 'top 1s ease-in';
      rocket.style.top = '70%';

      setTimeout(() => {
        rocket.style.transition = 'top 0.5s ease-in-out';
        rocket.style.top = '50%';
        nTargetStarSpeed = 0.33; 
        
        setTimeout(() => {
          startNeptuneQuestion();
        }, 500);
      }, 1000);
    }
  }
}
