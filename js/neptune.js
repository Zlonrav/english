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
    transform: translate(-50%, -50%) rotate(-45deg) scale(1); 
    font-size: 60px; z-index: 10; 
    transition: top 1s ease-out, transform 1s ease-out, opacity 1s ease-out;
    filter: drop-shadow(0 0 10px #3b82f6); 
  }
  
  /* Планеты (теперь это контейнеры для картинок или эмодзи) */
  .n-planet {
    position: absolute; left: 70%; top: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 120px; height: 120px; /* Задаем жесткий размер */
    display: flex; justify-content: center; align-items: center;
    font-size: 120px; line-height: 1;
    z-index: 1;
    transition: top 1s ease-out, left 1s ease-out, transform 1s ease-out, opacity 0.5s;
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

  /* ПАНЕЛЬ ТЕСТИРОВАНИЯ */
  #n-test-panel { 
    display: none; position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); 
    width: 90%; max-width: 420px; background: rgba(0, 15, 0, 0.85); border: 1px solid #00ffcc; 
    box-shadow: 0 0 15px rgba(0, 255, 204, 0.3); padding: 15px; border-radius: 8px; 
    z-index: 20; flex-direction: column; gap: 10px; 
  }

  /* Экран ошибки и Финала */
  #n-error-screen, #n-final-screen {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: #000; z-index: 50; display: none; flex-direction: column;
    align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
  }
  #n-final-screen { z-index: 100; }
  
  /* HUD */
  #n-hud { 
    position: absolute; top: 15px; left: 15px; right: 15px; 
    display: flex; justify-content: space-between; align-items: center; 
    z-index: 20; color: #00ffcc; font-family: monospace; 
    font-weight: bold; text-shadow: 0 0 5px #00ffcc; 
  }
`;
document.head.appendChild(neptuneStyle);

// 2. Данные планет (с картинками)
const neptunePlanets = [
  { name: "Земля", rod: "Земли", icon: "img/planets/earth.png", target: 10, reward: 5, distKm: 384000 },
  { name: "Луна", rod: "Луны", icon: "img/planets/moon.png", target: 12, reward: 5, distKm: 225000000 },
  { name: "Марс", rod: "Марса", icon: "img/planets/mars.png", target: 15, reward: 10, distKm: 778000000 },
  { name: "Юпитер", rod: "Юпитера", icon: "img/planets/jupiter.png", target: 18, reward: 10, distKm: 1400000000 },
  { name: "Сатурн", rod: "Сатурна", icon: "img/planets/saturn.png", target: 22, reward: 15, distKm: 2800000000 },
  { name: "Уран", rod: "Урана", icon: "img/planets/uranus.png", target: 25, reward: 15, distKm: 4500000000 },
  { name: "Нептун", rod: "Нептуна", icon: "img/planets/neptune.png", target: 28, reward: 20, distKm: 7500000000 },
  { name: "Пояс Койпера", rod: "Пояса Койпера", icon: "img/planets/kuiper-belt.png", target: 30, reward: 20, distKm: 15000000000000 },
  { name: "Облако Оорта", rod: "Облака Оорта", icon: "🌌", target: 35, reward: 25, distKm: 40000000000000 },
  { name: "Альфа Центавра", rod: "Альфы Центавра", icon: "✨", target: 38, reward: 25, distKm: 81400000000000 },
  { name: "Сириус", rod: "Сириуса", icon: "⭐", target: 40, reward: 30, distKm: 236000000000000 },
  { name: "Вега", rod: "Веги", icon: "img/planets/vega.png", target: 42, reward: 30, distKm: 350000000000000 },
  { name: "Арктур", rod: "Арктура", icon: "✨", target: 45, reward: 35, distKm: 6050000000000000 },
  { name: "Бетельгейзе", rod: "Бетельгейзе", icon: "🔴", target: 48, reward: 35, distKm: 10000000000000000 },
  { name: "Кассиопея", rod: "Кассиопеи", icon: "🌟", target: 50, reward: 40, distKm: 12300000000000000 },
  { name: "Орион", rod: "Ориона", icon: "🏹", target: 52, reward: 40, distKm: 15000000000000000 },
  { name: "Большая Медведица", rod: "Большой Медведицы", icon: "img/planets/ursa-major.png", target: 55, reward: 45, distKm: 20000000000000000 },
  { name: "Облако Смита", rod: "Облака Смита", icon: "🌫️", target: 58, reward: 45, distKm: 25000000000000000 },
  { name: "Межзвездное Облако", rod: "Межзвездного Облака", icon: "☁️", target: 60, reward: 50, distKm: 154000000000000000 },
  { name: "Магеллановы Облака", rod: "Магеллановых Облаков", icon: "🌪️", target: 62, reward: 50, distKm: 236000000000000000 },
  { name: "Галактика Андромеды", rod: "Галактики Андромеды", icon: "img/planets/andromeda.png", target: 65, reward: 55, distKm: 284000000000000000 },
  { name: "Галактика Треугольника", rod: "Галактики Треугольника", icon: "🔺", target: 68, reward: 55, distKm: 1130000000000000000 },
  { name: "Галактика Боде", rod: "Галактики Боде", icon: "🌌", target: 70, reward: 60, distKm: 1230000000000000000 },
  { name: "Галактика Сигара", rod: "Галактики Сигара", icon: "💥", target: 75, reward: 70, distKm: 5100000000000000000 },
  { name: "Скопление Девы", rod: "Скопления Девы", icon: "💫", target: 80, reward: 80, distKm: 16100000000000000000 },
  { name: "Сверхскопление Центавра", rod: "Сверхскопления Центавра", icon: "img/planets/centaurus.png", target: 85, reward: 90, distKm: 18900000000000000000 },
  { name: "Сверхскопление Ланиакея", rod: "Сверхскопления Ланиакея", icon: "🌠", target: 100, reward: 100, distKm: 23600000000000000000 },
  { name: "Великий Аттрактор", rod: "Великого Аттрактора", icon: "🌀", target: 25, reward: 150, distKm: 23600000000000000000 }
];

function formatDistance(km) {
  if (km <= 0) return "0 км";
  const lightYear = 9460000000000;
  if (km >= lightYear) {
    let ly = km / lightYear;
    if (ly >= 1000000) return (ly / 1000000).toFixed(1) + " млн св. лет";
    if (ly >= 1000) return (ly / 1000).toFixed(1) + " тыс. св. лет";
    return ly.toFixed(1) + " св. лет";
  }
  if (km >= 1000000000) return (km / 1000000000).toFixed(1) + " млрд км";
  if (km >= 1000000) return (km / 1000000).toFixed(0) + " млн км";
  if (km >= 1000) return (km / 1000).toFixed(0) + " тыс. км";
  return km.toFixed(0) + " км";
}

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
        <div style="display: flex; flex-direction: column; align-items: flex-end;">
          <div id="n-hud-text">Земля: 0/10</div>
          <div id="n-hud-dist" style="font-size: 12px; color: #88ffee; margin-top: 2px;">До цели: 384 тыс. км</div>
        </div>
      </div>

      <div id="n-planet-next" class="n-planet"></div>
      <div id="n-planet-current" class="n-planet"></div>
      <div id="n-rocket">🚀</div>

      <div id="n-terminal">
        <div class="n-matrix-text">
          > ВНИМАНИЕ: СБОЙ СИСТЕМЫ...<br>
          > РАСШИФРУЙТЕ КОНСТАНТУ:<br>
          > <span class="n-matrix-word" id="n-question">[word]</span>
        </div>
        <div id="n-options" style="display: flex; flex-direction: column; gap: 8px;"></div>
      </div>

      <div id="n-test-panel">
        <div style="display: flex; gap: 10px;">
          <input type="number" id="n-test-speed" value="1" min="1" style="flex: 1; background: #000; color: #00ffcc; border: 1px solid #00ffcc; padding: 10px; border-radius: 4px; text-align: center; font-family: monospace; font-size: 16px;">
          <button onclick="handleTestStep(parseInt(document.getElementById('n-test-speed').value))" style="flex: 1; background: rgba(0, 255, 204, 0.1); color: #00ffcc; border: 1px solid #00ffcc; padding: 10px; border-radius: 4px; font-weight: bold; cursor: pointer;">⬆️ ВВЕРХ</button>
          <button onclick="handleTestStep(-parseInt(document.getElementById('n-test-speed').value))" style="flex: 1; background: rgba(255, 0, 0, 0.1); color: #ff4444; border: 1px solid #ff4444; padding: 10px; border-radius: 4px; font-weight: bold; cursor: pointer;">⬇️ ВНИЗ</button>
        </div>
      </div>

      <div id="n-error-screen">
        <div style="color: #ef4444; font-family: 'Courier New', Courier, monospace; font-size: 22px; font-weight: bold; text-align: center; text-transform: uppercase; line-height: 1.5; text-shadow: 0 0 10px #ef4444;" id="n-error-text">
          ⚠️ КАПИТАН, ДЛЯ ЗАПУСКА РАКЕТЫ НУЖНО ТОПЛИВО, ЗАРАБОТАЙТЕ 150 ЗВЕЗД В ЗАДАНИЯХ СЕГОДНЯ. СЕЙЧАС ЗАРАБОТАНО: 0/150
        </div>
      </div>

      <div id="n-final-screen" style="opacity: 0; transition: opacity 1s ease-in-out;">
        <div style="color: #fbbf24; font-family: 'Courier New', Courier, monospace; font-size: 20px; font-weight: bold; text-align: center; text-transform: uppercase; line-height: 1.5; text-shadow: 0 0 10px #fbbf24; margin-bottom: 10px; transition: opacity 0.5s;" id="n-final-text">
          ВЫ СОБРАЛИ ВСЕ ДАННЫЕ ВО ВСЕЛЕННОЙ!<br>ПОДГОТОВКА К ВОЗВРАЩЕНИЮ...
        </div>
        <div id="n-warp-text" style="color: #00ffcc; font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold; text-align: center; text-transform: uppercase; text-shadow: 0 0 20px #00ffcc; opacity: 0; transition: opacity 0.5s; margin-bottom: 20px;">ГИПЕРПРЫЖОК...</div>
        <div id="n-countdown" style="color: #ef4444; font-family: 'Courier New', Courier, monospace; font-size: 80px; font-weight: bold; text-shadow: 0 0 20px #ef4444; transition: opacity 0.5s;">10</div>
      </div>
    `;
    document.querySelector('.content-wrapper').appendChild(view);
  }

  view.style.display = 'flex';
  
  if (!nStarAnimId) {
    nStarAnimId = requestAnimationFrame(animateNeptuneStars);
  }

  const dailyEarned = state.dailyEarned || 0;
  const errorScreen = document.getElementById('n-error-screen');
  const finalScreen = document.getElementById('n-final-screen');
  const gameElements = [
    document.getElementById('n-planet-current'), 
    document.getElementById('n-planet-next'), 
    document.getElementById('n-rocket'), 
    document.getElementById('n-terminal'),
    document.getElementById('n-test-panel')
  ];
  const hudText = document.getElementById('n-hud-text');
  const hudDist = document.getElementById('n-hud-dist');

  if (dailyEarned < 150) {
    errorScreen.style.display = 'flex';
    finalScreen.style.display = 'none';
    document.getElementById('n-error-text').innerHTML = `⚠️ КАПИТАН, ДЛЯ ЗАПУСКА РАКЕТЫ НУЖНО ТОПЛИВО, ЗАРАБОТАЙТЕ 150 ЗВЕЗД В ЗАДАНИЯХ СЕГОДНЯ. СЕЙЧАС ЗАРАБОТАНО: ${dailyEarned}/150`;
    gameElements.forEach(el => { if(el) el.style.display = 'none'; });
    if (hudText) hudText.style.display = 'none';
    if (hudDist) hudDist.style.display = 'none';
    nTargetStarSpeed = 0.33;
    nCurrentStarSpeed = 0.33;
    return;
  }

  errorScreen.style.display = 'none';
  finalScreen.style.display = 'none';
  finalScreen.style.opacity = '0';
  
  if (state.neptuneTestMode) {
    if (document.getElementById('n-terminal')) document.getElementById('n-terminal').style.display = 'none';
    if (document.getElementById('n-test-panel')) document.getElementById('n-test-panel').style.display = 'flex';
  } else {
    if (document.getElementById('n-terminal')) document.getElementById('n-terminal').style.display = 'flex';
    if (document.getElementById('n-test-panel')) document.getElementById('n-test-panel').style.display = 'none';
  }
  
  if (hudText) hudText.style.display = 'block';
  if (hudDist) hudDist.style.display = 'block';

  nLocked = false;
  nPlanetIdx = state.neptunePlanetIdx || 0;
  nProgress = state.neptuneProgress || 0;
  
  if (nPlanetIdx >= neptunePlanets.length - 1) {
    nPlanetIdx = 0;
    nProgress = 0;
    state.neptunePlanetIdx = 0;
    state.neptuneProgress = 0;
    saveState();
  }
  
  nTargetStarSpeed = 0.33; 
  nCurrentStarSpeed = 0.33;
  
  const rocket = document.getElementById('n-rocket');
  if (rocket) {
    rocket.style.transition = 'none';
    rocket.style.top = '50%';
    rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(1)`;
    rocket.style.opacity = '1';
    setTimeout(() => { rocket.style.transition = 'top 1s ease-out, transform 1s ease-out, opacity 1s ease-out'; }, 50);
  }

  const curEl = document.getElementById('n-planet-current');
  const nextEl = document.getElementById('n-planet-next');
  if (curEl) curEl.style.transition = 'none';
  if (nextEl) nextEl.style.transition = 'none';
  
  updateNeptuneHUD();
  
  if (curEl) void curEl.offsetWidth;
  if (nextEl) void nextEl.offsetWidth;
  
  setTimeout(() => {
    if (curEl) curEl.style.transition = 'top 1s ease-out, left 1s ease-out, transform 1s ease-out, opacity 0.5s';
    if (nextEl) nextEl.style.transition = 'top 1s ease-out, left 1s ease-out, transform 1s ease-out, opacity 0.5s';
    startNeptuneQuestion();
  }, 50);
}

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
  const nextP = neptunePlanets[nPlanetIdx + 1];
  
  let progressPercent = currentP.target > 0 ? (nProgress / currentP.target) : 0;
  if (progressPercent > 1) progressPercent = 1;

  let currentTop = 50;
  let currentScale = 2.5;
  let currentOpacity = 1;
  let currentLeft = 70;

  let nextTop = -50;
  let nextScale = 0.5;
  let nextOpacity = 0;
  let nextLeft = 70;

  // --- СТАНДАРТНАЯ ЛОГИКА ДЛЯ ВСЕХ ПЛАНЕТ (кроме Аттрактора) ---
  if (nPlanetIdx < neptunePlanets.length - 1) {
    currentTop = 50 + (progressPercent * 100);
    currentScale = 2.5 - (progressPercent * 2.0);
    currentOpacity = Math.max(0, 1 - (progressPercent * 1.5));
    currentLeft = 70;

    nextTop = -50 + (progressPercent * 100);
    nextScale = 0.5 + (progressPercent * 2.0);
    nextOpacity = Math.min(1, progressPercent * 1.5);
    nextLeft = 70;
  } 
  // --- ЛОГИКА ДЛЯ АТТРАКТОРА (ПОЗНАНИЕ ИСТИНЫ) ---
  else {
    currentTop = 50; 
    currentOpacity = 1;
    
    if (progressPercent <= 0.8) {
      let p = progressPercent / 0.8;
      currentLeft = 70 - (p * 20); 
      currentScale = 2.5; 
    } else {
      let p = (progressPercent - 0.8) / 0.2;
      currentLeft = 50;
      currentScale = 2.5 + (p * 2.5); 
    }
  }

  const hud = document.getElementById('n-hud-text');
  const hudName = (nPlanetIdx === neptunePlanets.length - 1) ? "Познание истины" : (nextP ? nextP.name : currentP.name);
  if (hud) hud.innerText = `Цель: ${hudName} (${nProgress}/${currentP.target})`;

  const hudDist = document.getElementById('n-hud-dist');
  if (hudDist) {
    let remainingSteps = Math.max(0, currentP.target - nProgress);
    let kmPerStep = currentP.distKm / currentP.target;
    let remainingKm = remainingSteps * kmPerStep;

    if (remainingSteps <= 0) {
      hudDist.innerText = "Достигнуто!";
      hudDist.style.color = "#10b981"; 
    } else {
      hudDist.innerText = `Осталось: ${formatDistance(remainingKm)}`;
      hudDist.style.color = "#88ffee";
    }
  }

  const curEl = document.getElementById('n-planet-current');
  if (curEl) {
    // УНИВЕРСАЛЬНЫЙ ВЫВОД: Если это картинка (.png), то тег <img>, иначе - текст (эмодзи)
    if (currentP.icon.includes('.png')) {
      curEl.innerHTML = `<img src="${currentP.icon}" style="width: 100%; height: 100%; object-fit: contain;">`;
    } else {
      curEl.innerText = currentP.icon;
    }
    
    curEl.style.left = `${currentLeft}%`;
    curEl.style.top = `${currentTop}%`;
    curEl.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
    curEl.style.opacity = currentOpacity;
    
    // Свечение для Аттрактора
    if (nPlanetIdx === neptunePlanets.length - 1) {
      curEl.style.filter = 'drop-shadow(0 0 40px #a855f7) drop-shadow(0 0 80px #a855f7)';
    } else {
      curEl.style.filter = 'none';
    }
  }

  const nextEl = document.getElementById('n-planet-next');
  if (nextEl) {
    if (nextP) {
      nextEl.style.display = 'block';
      
      if (nextP.icon.includes('.png')) {
        nextEl.innerHTML = `<img src="${nextP.icon}" style="width: 100%; height: 100%; object-fit: contain;">`;
      } else {
        nextEl.innerText = nextP.icon;
      }

      nextEl.style.left = `${nextLeft}%`;
      nextEl.style.top = `${nextTop}%`;
      nextEl.style.transform = `translate(-50%, -50%) scale(${nextScale})`;
      nextEl.style.opacity = nextOpacity;

      if (nPlanetIdx + 1 === neptunePlanets.length - 1) {
        nextEl.style.filter = 'drop-shadow(0 0 40px #a855f7) drop-shadow(0 0 80px #a855f7)';
      } else {
        nextEl.style.filter = 'none';
      }
    } else {
      nextEl.style.display = 'none';
    }
  }
}

// 5. Генерация вопроса
function startNeptuneQuestion() {
  nLocked = false;
  
  const rocket = document.getElementById('n-rocket');
  if (rocket) {
    rocket.style.transition = 'top 0.5s ease-in-out, transform 0.5s ease-out, opacity 0.5s ease-out';
    rocket.style.top = '50%'; 
    
    if (nPlanetIdx === neptunePlanets.length - 1 && nProgress > 20) {
      let p = (nProgress - 20) / 5;
      rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(${Math.max(0, 1 - p)})`;
      rocket.style.opacity = Math.max(0, 1 - p);
    } else {
      rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(1)`;
      rocket.style.opacity = 1;
    }
  }

  const terminal = document.getElementById('n-terminal');
  const testPanel = document.getElementById('n-test-panel');
  
  if (state.neptuneTestMode) {
    if (terminal) terminal.style.display = 'none';
    if (testPanel) testPanel.style.display = 'flex';
    return;
  }
  
  if (terminal) {
    terminal.style.display = 'flex';
    terminal.style.opacity = '1';
  }
  if (testPanel) testPanel.style.display = 'none';

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
  const allBtns = document.querySelectorAll('.n-opt-btn');
  const currentP = neptunePlanets[nPlanetIdx];
  const nextP = neptunePlanets[nPlanetIdx + 1];
  
  const targetSteps = currentP.target;
  
  if (selectedOpt === nCurrentCorrectWord) {
    if (btnElement) btnElement.classList.add('correct');
    
    nProgress = Math.min(nProgress + 1, targetSteps); 
    updateNeptuneHUD(); 

    state.neptunePlanetIdx = nPlanetIdx;
    state.neptuneProgress = nProgress;
    saveState();

    nTargetStarSpeed = 2; 
    if (rocket) {
      rocket.style.transition = 'top 1s ease-out, transform 1s ease-out, opacity 1s ease-out';
      rocket.style.top = '10%';
      
      if (nPlanetIdx === neptunePlanets.length - 1 && nProgress > 20) {
        let p = (nProgress - 20) / 5;
        rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(${Math.max(0, 1 - p)})`;
        rocket.style.opacity = Math.max(0, 1 - p);
      } else {
        rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(1)`;
        rocket.style.opacity = 1;
      }
    }
    
    if (terminal) {
      terminal.style.opacity = '0';
      setTimeout(() => { if(terminal) terminal.style.display = 'none'; }, 300);
    }

    setTimeout(() => {
      if (nProgress >= targetSteps) {
        if (!nextP) {
          triggerNeptuneEndgame();
          return;
        }

        addStars(currentP.reward, "Нептун");
        showToast(`🪐 Вы достигли ${nextP.rod}! Награда: +${currentP.reward} ⭐`, 'top');
        
        nPlanetIdx++;
        nProgress = 0;
        
        if (neptunePlanets[nPlanetIdx].name === "Великий Аттрактор") {
            addStars(neptunePlanets[nPlanetIdx].reward, "Нептун");
            showToast(`🌑 Вы достигли Великого Аттрактора! Награда: +150 ⭐`, 'top');
        }
        
        nTargetStarSpeed = 0.33; 
        
        state.neptunePlanetIdx = nPlanetIdx;
        state.neptuneProgress = nProgress;
        saveState();
        
        const curEl = document.getElementById('n-planet-current');
        const nextEl = document.getElementById('n-planet-next');
        if (curEl) curEl.style.transition = 'none';
        if (nextEl) nextEl.style.transition = 'none';
        
        updateNeptuneHUD(); 
        
        if (curEl) void curEl.offsetWidth;
        if (nextEl) void nextEl.offsetWidth;

        setTimeout(() => {
          if (curEl) curEl.style.transition = 'top 1s ease-out, left 1s ease-out, transform 1s ease-out, opacity 0.5s';
          if (nextEl) nextEl.style.transition = 'top 1s ease-out, left 1s ease-out, transform 1s ease-out, opacity 0.5s';
          startNeptuneQuestion();
        }, 50);

      } else {
        nTargetStarSpeed = 0.33; 
        startNeptuneQuestion();
      }
    }, 1000); 

  } else {
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
      rocket.style.transition = 'top 1s ease-in, transform 1s ease-in, opacity 1s ease-in';
      rocket.style.top = '70%';
      rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(1)`;
      rocket.style.opacity = 1;

      setTimeout(() => {
        rocket.style.transition = 'top 0.5s ease-in-out, transform 0.5s ease-out, opacity 0.5s ease-out';
        rocket.style.top = '50%';
        nTargetStarSpeed = 0.33; 
        setTimeout(() => { startNeptuneQuestion(); }, 500);
      }, 1000);
    }
  }
}

// 7. Логика ручного тестирования
function handleTestStep(amount) {
  if (!amount || isNaN(amount) || nLocked) return;
  nLocked = true;
  
  const currentP = neptunePlanets[nPlanetIdx];
  const nextP = neptunePlanets[nPlanetIdx + 1];
  const targetSteps = currentP.target;
  
  let oldProgress = nProgress;
  
  if (amount > 0) {
    nProgress = Math.min(nProgress + amount, targetSteps);
  } else {
    nProgress = Math.max(0, nProgress + amount);
  }
  
  updateNeptuneHUD();
  
  let diff = nProgress - oldProgress;
  
  if (diff > 0) {
    nTargetStarSpeed = 2;
    const rocket = document.getElementById('n-rocket');
    if (rocket) {
      rocket.style.transition = 'top 1s ease-out, transform 1s ease-out, opacity 1s ease-out';
      rocket.style.top = '10%';
      
      if (nPlanetIdx === neptunePlanets.length - 1 && nProgress > 20) {
        let p = (nProgress - 20) / 5;
        rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(${Math.max(0, 1 - p)})`;
        rocket.style.opacity = Math.max(0, 1 - p);
      } else {
        rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(1)`;
        rocket.style.opacity = 1;
      }
    }
    
    setTimeout(() => {
      if (nProgress >= targetSteps) {
        if (!nextP) {
          triggerNeptuneEndgame();
        } else {
          nPlanetIdx++;
          nProgress = 0;
          
          if (neptunePlanets[nPlanetIdx].name === "Великий Аттрактор") {
              addStars(neptunePlanets[nPlanetIdx].reward, "Нептун");
              showToast(`🌑 Вы достигли Великого Аттрактора! Награда: +150 ⭐`, 'top');
          }
          
          nTargetStarSpeed = 0.33; 
          
          state.neptunePlanetIdx = nPlanetIdx;
          state.neptuneProgress = nProgress;
          saveState();
          
          const curEl = document.getElementById('n-planet-current');
          const nextEl = document.getElementById('n-planet-next');
          if (curEl) curEl.style.transition = 'none';
          if (nextEl) nextEl.style.transition = 'none';
          
          updateNeptuneHUD(); 
          
          if (curEl) void curEl.offsetWidth;
          if (nextEl) void nextEl.offsetWidth;
          
          setTimeout(() => {
            if (curEl) curEl.style.transition = 'top 1s ease-out, left 1s ease-out, transform 1s ease-out, opacity 0.5s';
            if (nextEl) nextEl.style.transition = 'top 1s ease-out, left 1s ease-out, transform 1s ease-out, opacity 0.5s';
            
            if (rocket) rocket.style.top = '50%';
            nLocked = false;
            startNeptuneQuestion();
          }, 50);
        }
      } else {
        nTargetStarSpeed = 0.33;
        const rocket = document.getElementById('n-rocket');
        if (rocket) rocket.style.top = '50%';
        nLocked = false;
      }
    }, 1000);
  } else if (diff < 0) {
    nTargetStarSpeed = -3;
    const rocket = document.getElementById('n-rocket');
    if (rocket) {
      rocket.style.transition = 'top 1s ease-in, transform 1s ease-in, opacity 1s ease-in';
      rocket.style.top = '70%';
      rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(1)`;
      rocket.style.opacity = 1;
    }
    
    setTimeout(() => {
      if (rocket) {
        rocket.style.transition = 'top 0.5s ease-in-out, transform 0.5s ease-out, opacity 0.5s ease-out';
        rocket.style.top = '50%';
      }
      nTargetStarSpeed = 0.33; 
      nLocked = false;
    }, 1000);
  } else {
    nLocked = false;
  }
}

// 8. Финальная анимация с затемнением
function triggerNeptuneEndgame() {
  nLocked = true;
  addStars(neptunePlanets[nPlanetIdx].reward, "Нептун");
  
  state.neptuneFlights = (state.neptuneFlights || 0) + 1;
  saveState();
  checkNewAchievements(); 

  const finalScreen = document.getElementById('n-final-screen');
  const hudText = document.getElementById('n-hud-text');
  const hudDist = document.getElementById('n-hud-dist');
  const finalText = document.getElementById('n-final-text');
  const timerEl = document.getElementById('n-countdown');
  
  if (hudText) hudText.style.display = 'none';
  if (hudDist) hudDist.style.display = 'none';
  
  nTargetStarSpeed = 5; 
  
  const rocket = document.getElementById('n-rocket');
  if (rocket) {
    rocket.style.opacity = '0';
    rocket.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(0)`;
  }

  if (finalScreen) {
    finalScreen.style.display = 'flex';
    finalScreen.style.transition = 'none';
    finalScreen.style.opacity = '0';

    setTimeout(() => {
      finalScreen.style.transition = 'opacity 1s ease-in-out';
      finalScreen.style.opacity = '1';

      setTimeout(() => {
        let countdown = 10;
        if (timerEl) timerEl.innerText = countdown;

        let int = setInterval(() => {
          countdown--;
          if (countdown > 0) {
            if (timerEl) timerEl.innerText = countdown;
          } else {
            clearInterval(int);
            if (timerEl) timerEl.innerText = "ПУСК!";
            
            setTimeout(() => {
              if (finalText) finalText.style.opacity = '0';
              if (timerEl) timerEl.style.opacity = '0';
              
              const warpText = document.getElementById('n-warp-text');
              if (warpText) warpText.style.opacity = '1';

              if (finalScreen) finalScreen.style.background = 'transparent';

              const planetToHide = document.getElementById('n-planet-current');
              if (planetToHide) {
                planetToHide.style.transition = 'opacity 1s ease-in';
                planetToHide.style.opacity = '0';
              }

              if (rocket) {
                rocket.style.opacity = '1';
                rocket.style.transition = 'none';
                rocket.style.top = '50%';
                rocket.style.transform = 'translate(-50%, -50%) rotate(135deg)';
              }

              let vibInt = setInterval(() => {
                if (rocket) {
                  let offsetX = (Math.random() - 0.5) * 6;
                  let offsetY = (Math.random() - 0.5) * 6;
                  rocket.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(135deg)`;
                }
              }, 50);

              nTargetStarSpeed = -15; 

              setTimeout(() => {
                clearInterval(vibInt);
                if (rocket) {
                  rocket.style.transition = 'top 1s ease-in, transform 1s ease-in';
                  rocket.style.transform = 'translate(-50%, -50%) rotate(135deg)';
                  setTimeout(() => { rocket.style.top = '150%'; }, 10);
                }

                if (warpText) warpText.innerText = "ПРИБЫТИЕ НА ЗЕМЛЮ...";
                
                setTimeout(() => {
                  nPlanetIdx = 0;
                  nProgress = 0;
                  state.neptunePlanetIdx = 0;
                  state.neptuneProgress = 0;
                  saveState();
                  
                  if (finalScreen) { 
                      finalScreen.style.display = 'none'; 
                      finalScreen.style.background = 'rgba(0,0,0,0.9)'; 
                      finalScreen.style.opacity = '0';
                  }
                  if (finalText) finalText.style.opacity = '1';
                  if (timerEl) timerEl.style.opacity = '1';
                  if (warpText) warpText.style.opacity = '0';
                  if (hudText) hudText.style.display = 'block';
                  if (hudDist) hudDist.style.display = 'block';
                  
                  nTargetStarSpeed = 0.33; 

                  const curEl = document.getElementById('n-planet-current');
                  const nextEl = document.getElementById('n-planet-next');
                  
                  if (curEl) { curEl.style.transition = 'none'; curEl.style.opacity = '0'; curEl.style.top = '-50%'; curEl.style.transform = `translate(-50%, -50%) scale(1)`; }
                  if (nextEl) nextEl.style.transition = 'none';

                  if (rocket) { rocket.style.transition = 'none'; rocket.style.top = '150%'; rocket.style.opacity = '0'; rocket.style.transform = 'translate(-50%, -50%) rotate(-45deg)'; }
                  
                  updateNeptuneHUD();
                  if (curEl) void curEl.offsetWidth;
                  if (nextEl) void nextEl.offsetWidth;
                  if (rocket) void rocket.offsetWidth;
                  
                  setTimeout(() => {
                    if (curEl) { curEl.style.transition = 'top 2s ease-out, left 2s ease-out, transform 2s ease-out, opacity 2s'; curEl.style.top = '50%'; curEl.style.opacity = '1'; }
                    if (nextEl) nextEl.style.transition = 'top 2s ease-out, left 2s ease-out, transform 2s ease-out, opacity 2s';
                    
                    if (rocket) { rocket.style.transition = 'top 2s ease-out, opacity 2s'; rocket.style.top = '50%'; rocket.style.opacity = '1'; }

                    setTimeout(() => {
                      nLocked = false;
                      startNeptuneQuestion();
                    }, 2000);
                  }, 50);
                }, 1000);
              }, 5000);
            }, 1000);
          }
        }, 1000);
      }, 1000);
    }, 3000);
  }
}
