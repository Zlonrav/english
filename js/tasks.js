// ================= ЗАДАНИЯ =================
function renderCategoryList() {
  const categories = [...new Set(cardsData.map(c => c.cat))];
  const container = document.getElementById('category-list-container');
  container.innerHTML = '';

  categories.forEach(cat => {
    const total = cardsData.filter(c => c.cat === cat).length;
    const learned = cardsData.filter(c => c.cat === cat && (state.listenCounts[c.word] || 0) >= 25).length;
    const done = learned === total;

    const btn = document.createElement('button');
    btn.className = `category-btn ${done ? 'done' : ''}`;
    btn.innerHTML = `<span>${cat}</span><span class="cat-progress">${learned} / ${total}</span>`;
    btn.onclick = () => showCategory(cat);
    container.appendChild(btn);
  });
}

let currentCategoryName = "";

function showCategory(catName, isShuffle = false) {
  currentCategoryName = catName;
  hideAllViews();
  document.getElementById('category-view').style.display = 'block';
  document.getElementById('category-title').innerText = catName;
  
  let filtered = cardsData.filter(c => c.cat === catName);
  if (isShuffle) filtered.sort(() => Math.random() - 0.5);

  const container = document.getElementById('category-cards-container');
  
  container.innerHTML = filtered.map(card => {
    const count = state.listenCounts[card.word] || 0;
    const learned = count >= 25;
    const percent = Math.min((count / 25) * 100, 100); 
    
    let iconHtml = card.color 
      ? `<div style="width:60px; height:60px; background:${card.color}; border-radius:50%; margin-bottom:10px; border:2px solid #333;"></div>` 
      : `<div class="task-card-icon">${card.icon}</div>`;

    let contentHtml = '';
    if (card.single) {
      contentHtml = `
        <div class="task-entry">
          <div class="task-word">${card.word}</div>
          <div class="task-pron">${card.pron}</div>
          <div class="task-trans">${card.trans}</div>
        </div>
        <button class="progress-btn" onclick="handleListenCategory('${card.word}', '${card.word}', event, this)">
          <div class="progress-btn-fill" style="width: ${percent}%;"></div>
          <div class="progress-btn-text">🔊 Слушать</div>
        </button>
      `;
    } else {
      contentHtml = `
        <div class="task-entry">
          <div class="task-label">Единственное число</div>
          <div class="task-word">${card.word}</div>
          <div class="task-pron">${card.pron}</div>
          <div class="task-trans">${card.trans}</div>
        </div>
        <button class="progress-btn" onclick="handleListenCategory('${card.word}', '${card.word}', event, this)">
          <div class="progress-btn-fill" style="width: ${percent}%;"></div>
          <div class="progress-btn-text">🔊 Слушать</div>
        </button>
        
        <div class="task-divider"></div>
        
        <div class="task-entry">
          <div class="task-label">Множественное число</div>
          <div class="task-word">${card.plural}</div>
          <div class="task-pron">${card.pronP}</div>
          <div class="task-trans">${card.transP}</div>
        </div>
        <button class="progress-btn" onclick="handleListenCategory('${card.word}', '${card.plural}', event, this)">
          <div class="progress-btn-fill" style="width: ${percent}%;"></div>
          <div class="progress-btn-text">🔊 Слушать</div>
        </button>
      `;
    }
    
    return `
      <div class="task-card ${learned ? 'learned' : ''}">
        ${iconHtml}
        <div class="task-divider"></div>
        ${contentHtml}
      </div>
    `;
  }).join('');
  window.scrollTo(0, 0);
}

let isTasksCooldown = false;

function shuffleCategory() {
  if (currentCategoryName) showCategory(currentCategoryName, true);
}

function handleListenCategory(baseWord, textToSpeak, event, btnElement) {
  if (isTasksCooldown) return;

  speakWord(textToSpeak);
  addStars(1);
  
  state.listenCounts[baseWord] = (state.listenCounts[baseWord] || 0) + 1;
  let count = state.listenCounts[baseWord];
  
  if (count >= 25 && !state.learned.includes(baseWord)) {
      state.learned.push(baseWord);
      showToast("🌟 Карточка изучена!", 'top');
      btnElement.closest('.task-card').classList.add('learned');
  }
  saveState();

  // Обновляем заливку СРАЗУ У ВСЕХ кнопок на этой карточке
  const percent = Math.min((count / 25) * 100, 100);
  const cardDiv = btnElement.closest('.task-card');
  const fills = cardDiv.querySelectorAll('.progress-btn-fill');
  fills.forEach(fill => fill.style.width = percent + '%');

  // Блокируем все кнопки на 5 секунд
  isTasksCooldown = true;
  document.querySelectorAll('.progress-btn').forEach(b => { b.disabled = true; });

  setTimeout(() => {
      isTasksCooldown = false;
      document.querySelectorAll('.progress-btn').forEach(b => { b.disabled = false; });
  }, 5000);
}
