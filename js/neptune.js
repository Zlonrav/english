// ================= ИГРА (НЕПТУН) =================

// 1. Внедряем стили
const neptuneStyle = document.createElement('style');
neptuneStyle.innerHTML = `
  #neptune-view { padding: 0; overflow: hidden; background: #000; position: relative; justify-content: flex-start; }
  
  /* Звездный фон (управляется через JS) */
  .n-stars { position: absolute; top: 0; left: 0; width: 100%; height: 200%; background-image: radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #fff, rgba(0,0,0,0)); background-repeat: repeat; will-change: background-position; }
  .n-layer1 { background-size: 200px 200px; opacity: 0.3; }
  .n-layer2 { background-size: 300px 300px; opacity: 0.5; }
  .n-layer3 { background-size: 400px 400px; opacity: 0.8; }

  /* Ракета */
  #n-rocket { 
    position: absolute; left: 50%; top: 50%; 
    transform: translate(-50%, -50%) rotate(-45deg); 
    font-size: 60px; z-index: 10; 
    transition: top 2s ease-out; /* 2 секунды на полет */
    filter: drop-shadow(0 0 10px #3b82f6); 
  }
  
  /* Планета на фоне */
  #n-planet { 
    position: absolute; right: 10%; top: -20%; 
    font-size: 120px; z-index: 1; opacity: 0.8; 
    transition: top 2s ease-out, opacity 0.5s; /* Синхронизировано с ракетой */
  }

  /* Терминал (Матрица) */
  #n-terminal { 
    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); 
    width: 90%; max-width: 420px; 
    background: rgba(0, 15, 0, 0.85); border: 1px solid #00ffcc; 
    box-shadow: 0 0 15px rgba(0, 255, 204, 0.3); padding: 15px; border-radius: 8px; 
    z-index: 20; display: none; flex-direction: column; gap: 10px; 
  }
  .n-matrix-text { color: #00ffcc; font-family: 'Courier New', Courier, monospace; font-size: 14px; line-height: 1.4; }
  .n-matrix-word { color: #fff; font-size: 22px; font-weight: bold; text-shadow: 0 0 8px #00ffcc; letter-spacing: 1px; }
  .n-opt-btn { 
    background: rgba(0, 255, 204, 0.1); border: 1px solid #00ffcc; color: #00ffcc; 
    font-family: 'Courier New', Courier, monospace; font-size: 16px; 
    padding: 10px; border-radius: 4px; cursor: pointer; transition: 0.2s; 
    text-align: left; width: 100%; 
  }
  .n-opt-btn:hover { background: rgba(0, 255, 204, 0.3); color: #fff; }
  .n-opt-btn.correct { background: #10b981; color: #fff; border-color: #10b981; }
  .n-opt-btn.wrong { background: #ef4444; color: #fff; border-color: #ef4444; }
  
  /* HUD */
  #n-hud { 
    position: absolute; top: 15px; left: 15px; right: 15px; 
    display: flex; justify-content: space-between; align-items: center; 
    z-index: 20; color: #00ffcc; font-family: monospace; 
    font-weight: bold; text-shadow: 0 0 5px #00ffcc; 
  }
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

// --- ДВИЖОК АНИМАЦИИ ЗВЕЗД ---
let nStarOffset = 0;
let nTargetStarSpeed = 0,33; // 1 = медленно вниз (покой)
let nCurrentStarSpeed = 1;
let nStarAnimId = null;

function animateNeptuneStars() {
  // Плавно меняем скорость
  nCurrentStarSpeed += (nTargetStarSpeed - nCurrentStarSpeed) * 0.05;
  
  // Если скорость положительная - звезды едут вниз, если отрицательная - вверх
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
    
    if (!nStarAnimId) {
      animateNeptuneStars();
    }
  }

  view.style.display = 'flex';
  nPlanetIdx = 0;
  nProgress = 0;
  nLocked = false;
  nTargetStarSpeed = 0,33; // В покое звезды летят вниз
  nCurrentStarSpeed = 1;
  
  // Мгновенный сброс планеты наверх при старте
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
    if (planetEl) planetEl.style.transition = 'top 2s ease-out';
    if (rocket) rocket.style.transition = 'top 2s ease-out';
    updateNeptuneHUD();
    startNeptuneQuestion();
  }, 50);
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
    // Высчитываем позицию планеты. Один шаг = часть от 120%.
    let progressPercent = nextP.target > 0 ? (nProgress / nextP.target) : 0;
    let topPos = -20 + (progressPercent * 120); 
    planetEl.style.top = `${topPos}%`;
  }
}

// 5. Генерация вопроса
function startNeptuneQuestion() {
  nLocked = false;
  
  // ВОЗВРАЩАЕМ РАКЕТУ В ЦЕНТР
  const rocket = document.getElementById('n-rocket');
  if (rocket) {
    rocket.style.transition = 'none'; // Отключаем анимацию, чтобы не было видно "прыжка"
    rocket.style.top = '50%';
    // Включаем анимацию обратно через миллисекунду
    setTimeout(() => { rocket.style.transition = 'top 2s ease-out'; }, 50);
  }

  const terminal = document.getElementById('n-terminal');
  terminal.style.display = 'flex';
  terminal.style.opacity = '1';

  let pool = getCleanGamePool(cardsData);
  if (pool.length === 0) pool = cardsData;
  
  const correctCard = pool[Math.floor(Math.random() * pool.length)];
  nCurrentCorrectWord = correctCard.trans;
  
  let wrongCard = pool[Math.floor(Math.random() * pool.length)];
  while (wrongCard.trans === nCurrentCorrectWord) {
    wrongCard = pool[Math.floor(Math.random() * pool.length)];
  }

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
  const planetEl = document.getElementById('n-planet');
  const allBtns = document.querySelectorAll('.n-opt-btn');
  const nextP = neptunePlanets[nPlanetIdx + 1];
  
  if (selectedOpt === nCurrentCorrectWord) {
    // ПРАВИЛЬНО (+1)
    btnElement.classList.add('correct');
    
    // Обновляем прогресс и двигаем планету (займет 2 секунды из-за transition в CSS)
    nProgress = Math.min(nProgress + 1, nextP.target); 
    updateNeptuneHUD(); 

    // Звезды летят вниз в 2 раза быстрее (было 1, стало 2)
    nTargetStarSpeed = 2; 

    // Ракета летит вверх (займет 2 секунды)
    rocket.style.top = '10%';
    
    terminal.style.opacity = '0';
    setTimeout(() => terminal.style.display = 'none', 300);

    // Ждем 2 секунды, пока летит ракета и двигается планета
    setTimeout(() => {
      if (nextP && nProgress >= nextP.target) {
        // ДОЛЕТЕЛИ ДО ПЛАНЕТЫ
        addStars(nextP.reward);
        showToast(`🪐 Вы достигли ${nextP.name}! Награда: +${nextP.reward} ⭐`, 'top');
        
        nPlanetIdx++;
        nProgress = 0;
        nTargetStarSpeed = 0,33; 
        
        // Мгновенно убираем старую планету наверх, чтобы она не летела обратно
        if (planetEl) {
          planetEl.style.transition = 'none';
          planetEl.style.top = '-20%';
        }
        
        setTimeout(() => {
          // Возвращаем анимацию и запускаем новую планету
          if (planetEl) planetEl.style.transition = 'top 2s ease-out';
          updateNeptuneHUD(); 
          startNeptuneQuestion();
        }, 50);

      } else if (!nextP) {
         showToast("🌌 Вы покинули Млечный Путь... Продолжение следует!", 'top');
         setTimeout(goHome, 3000);
      } else {
        nTargetStarSpeed = 0,33; // Возвращаем скорость покоя
        startNeptuneQuestion();
      }
    }, 2000); // 2000 мс = 2 секунды полета

  } else {
    // НЕПРАВИЛЬНО (-2)
    btnElement.classList.add('wrong');
    allBtns.forEach(b => {
      if (b.innerText.includes(nCurrentCorrectWord)) b.classList.add('correct');
    });

    // Штраф -2 звезды
    nProgress = Math.max(0, nProgress - 2);
    updateNeptuneHUD(); // Планета откатывается вверх

    // Звезды летят ВВЕРХ в 3 раза быстрее (отрицательная скорость)
    nTargetStarSpeed = -3; 

    // Ракета летит вниз (1 секунда)
    rocket.style.transition = 'top 1s ease-in';
    rocket.style.top = '70%';

    setTimeout(() => {
      // Возвращаем ракету в центр
      rocket.style.transition = 'top 0.5s ease-in-out';
      rocket.style.top = '50%';
      nTargetStarSpeed = 0,33; // Возвращаем медленный дрейф вниз
      
      setTimeout(() => {
        startNeptuneQuestion();
      }, 500);
    }, 1000);
  }
}
