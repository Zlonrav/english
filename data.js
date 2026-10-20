  // ================= БАЗА ДАННЫХ =================
  const cardsData = [
    { cat: "1. Люди", icon: "👶", word: "Child", pron: "чайлд", trans: "ребёнок", plural: "Children", pronP: "чилдрен", transP: "дети" },
    { cat: "1. Люди", icon: "👨", word: "Man", pron: "мэн", trans: "мужчина", plural: "Men", pronP: "мен", transP: "мужчины" },
    { cat: "1. Люди", icon: "👩", word: "Woman", pron: "ву́мэн", trans: "женщина", plural: "Women", pronP: "уи́мин", transP: "женщины" },
    { cat: "1. Люди", icon: "🧑", word: "Person", pron: "пёрсон", trans: "человек", plural: "People", pronP: "пипл", transP: "люди" },
    { cat: "1. Люди", icon: "👨‍👩‍👧", word: "Family", pron: "фэ́мили", trans: "семья", plural: "Families", pronP: "фэ́милиз", transP: "семьи" },
    { cat: "1. Люди", icon: "👩‍🦰", word: "Mother", pron: "ма́зэ", trans: "мама", plural: "Mothers", pronP: "ма́зэз", transP: "мамы" },
    { cat: "1. Люди", icon: "👨‍🦰", word: "Father", pron: "фа́зэ", trans: "папа", plural: "Fathers", pronP: "фа́зэз", transP: "папы" },
    { cat: "1. Люди", icon: "👧", word: "Sister", pron: "си́стэ", trans: "сестра", plural: "Sisters", pronP: "си́стэз", transP: "сёстры" },
    { cat: "1. Люди", icon: "👦", word: "Brother", pron: "бра́зэ", trans: "брат", plural: "Brothers", pronP: "бра́зэз", transP: "братья" },
    { cat: "2. Животные", icon: "🐑", word: "Sheep", pron: "шип", trans: "овца", plural: "Sheep", pronP: "шип", transP: "овцы" },
    { cat: "2. Животные", icon: "🐂", word: "Ox", pron: "окс", trans: "бык", plural: "Oxen", pronP: "оксен", transP: "быки" },
    { cat: "2. Животные", icon: "🦢", word: "Goose", pron: "гус", trans: "гусь", plural: "Geese", pronP: "гис", transP: "гуси" },
    { cat: "2. Животные", icon: "🦌", word: "Deer", pron: "дир", trans: "олень", plural: "Deer", pronP: "дир", transP: "олени" },
    { cat: "2. Животные", icon: "🐭", word: "Mouse", pron: "ма́ус", trans: "мышь", plural: "Mice", pronP: "майс", transP: "мыши" },
    { cat: "2. Животные", icon: "🐈", word: "Cat", pron: "кэт", trans: "кошка", plural: "Cats", pronP: "кэтс", transP: "кошки" },
    { cat: "2. Животные", icon: "🐕", word: "Dog", pron: "дог", trans: "собака", plural: "Dogs", pronP: "догз", transP: "собаки" },
    { cat: "2. Животные", icon: "🐦", word: "Bird", pron: "бёёд", trans: "птица", plural: "Birds", pronP: "бёёдз", transP: "птицы" },
    { cat: "2. Животные", icon: "🐎", word: "Horse", pron: "хо́ос", trans: "лошадь", plural: "Horses", pronP: "хо́осиз", transP: "лошади" },
    { cat: "2. Животные", icon: "🐄", word: "Cow", pron: "ка́у", trans: "корова", plural: "Cows", pronP: "ка́уз", transP: "коровы" },
    { cat: "2. Животные", icon: "🐖", word: "Pig", pron: "пиг", trans: "свинья", plural: "Pigs", pronP: "пигз", transP: "свиньи" },
    { cat: "2. Животные", icon: "🦆", word: "Duck", pron: "дак", trans: "утка", plural: "Ducks", pronP: "дакс", transP: "утки" },
    { cat: "2. Животные", icon: "🐓", word: "Chicken", pron: "чи́кен", trans: "курица", plural: "Chickens", pronP: "чи́кенз", transP: "курицы" },
    { cat: "2. Животные", icon: "🦁", word: "Lion", pron: "ла́йэн", trans: "лев", plural: "Lions", pronP: "ла́йэнз", transP: "львы" },
    { cat: "2. Животные", icon: "🐅", word: "Tiger", pron: "та́йгэ", trans: "тигр", plural: "Tigers", pronP: "та́йгэз", transP: "тигры" },
    { cat: "2. Животные", icon: "🐘", word: "Elephant", pron: "э́лефэнт", trans: "слон", plural: "Elephants", pronP: "э́лефэнтс", transP: "слоны" },
    { cat: "2. Животные", icon: "🐒", word: "Monkey", pron: "ма́нки", trans: "обезьяна", plural: "Monkeys", pronP: "ма́нкиз", transP: "обезьяны" },
    { cat: "2. Животные", icon: "🐻", word: "Bear", pron: "бэ́э", trans: "медведь", plural: "Bears", pronP: "бэ́эз", transP: "медведи" },
    { cat: "2. Животные", icon: "🐺", word: "Wolf", pron: "уу́лф", trans: "волк", plural: "Wolves", pronP: "уу́лвз", transP: "волки" },
    { cat: "2. Животные", icon: "🦊", word: "Fox", pron: "фокс", trans: "лиса", plural: "Foxes", pronP: "фо́ксиз", transP: "лисы" },
    { cat: "2. Животные", icon: "🐇", word: "Rabbit", pron: "рэ́бит", trans: "кролик", plural: "Rabbits", pronP: "рэ́битс", transP: "кролики" },
    { cat: "2. Животные", icon: "🐸", word: "Frog", pron: "фрог", trans: "лягушка", plural: "Frogs", pronP: "фрогз", transP: "лягушки" },
    { cat: "2. Животные", icon: "🐍", word: "Snake", pron: "снэйк", trans: "змея", plural: "Snakes", pronP: "снэйкс", transP: "змеи" },
    { cat: "2. Животные", icon: "🐢", word: "Turtle", pron: "тё́тл", trans: "черепаха", plural: "Turtles", pronP: "тё́тлз", transP: "черепахи" },
    { cat: "2. Животные", icon: "🦋", word: "Butterfly", pron: "ба́тэфлай", trans: "бабочка", plural: "Butterflies", pronP: "ба́тэфлайз", transP: "бабочки" },
    { cat: "2. Животные", icon: "🐝", word: "Bee", pron: "бии", trans: "пчела", plural: "Bees", pronP: "бииз", transP: "пчёлы" },
    { cat: "2. Животные", icon: "🕷️", word: "Spider", pron: "спа́йдэ", trans: "паук", plural: "Spiders", pronP: "спа́йдэз", transP: "пауки" },
    { cat: "2. Животные", icon: "🦉", word: "Owl", pron: "а́ул", trans: "сова", plural: "Owls", pronP: "а́улз", transP: "совы" },
    { cat: "2. Животные", icon: "🐞", word: "Ladybug", pron: "лэ́йдибаг", trans: "божья коровка", plural: "Ladybugs", pronP: "лэ́йдибагз", transP: "божьи коровки" },
    { cat: "2. Животные", icon: "🐟", word: "Fish", pron: "фиш", trans: "рыба", plural: "Fish", pronP: "фиш", transP: "рыбы" },
    { cat: "3. Части тела", icon: "🦷", word: "Tooth", pron: "тус", trans: "зуб", plural: "Teeth", pronP: "тис", transP: "зубы" },
    { cat: "3. Части тела", icon: "🦶", word: "Foot", pron: "фут", trans: "нога", plural: "Feet", pronP: "фит", transP: "ноги" },
    { cat: "3. Части тела", icon: "👁️", word: "Eye", pron: "ай", trans: "глаз", plural: "Eyes", pronP: "айз", transP: "глаза" },
    { cat: "3. Части тела", icon: "👂", word: "Ear", pron: "и́э", trans: "ухо", plural: "Ears", pronP: "и́эз", transP: "уши" },
    { cat: "3. Части тела", icon: "👃", word: "Nose", pron: "ноуз", trans: "нос", plural: "Noses", pronP: "но́узиз", transP: "носы" },
    { cat: "3. Части тела", icon: "✋", word: "Hand", pron: "хэнд", trans: "рука", plural: "Hands", pronP: "хэндз", transP: "руки" },
    { cat: "4. Дом и мебель", icon: "🪵", word: "Table", pron: "тэ́йбл", trans: "стол", plural: "Tables", pronP: "тэ́йблз", transP: "столы" },
    { cat: "4. Дом и мебель", icon: "🪑", word: "Chair", pron: "чэ́а", trans: "стул", plural: "Chairs", pronP: "чэ́аз", transP: "стулья" },
    { cat: "4. Дом и мебель", icon: "🪑", word: "Stool", pron: "сту́ул", trans: "табуретка", plural: "Stools", pronP: "сту́улз", transP: "табуретки" },
    { cat: "4. Дом и мебель", icon: "🛏️", word: "Bed", pron: "бэд", trans: "кровать", plural: "Beds", pronP: "бэдз", transP: "кровати" },
    { cat: "4. Дом и мебель", icon: "🪟", word: "Window", pron: "уи́ндоу", trans: "окно", plural: "Windows", pronP: "уи́ндоуз", transP: "окна" },
    { cat: "4. Дом и мебель", icon: "🚪", word: "Door", pron: "до́ор", trans: "дверь", plural: "Doors", pronP: "до́орз", transP: "двери" },
    { cat: "4. Дом и мебель", icon: "🏠", word: "House", pron: "ха́ус", trans: "дом", plural: "Houses", pronP: "ха́узиз", transP: "дома" },
    { cat: "5. Еда и посуда", icon: "🥄", word: "Spoon", pron: "спун", trans: "ложка", plural: "Spoons", pronP: "спунз", transP: "ложки" },
    { cat: "5. Еда и посуда", icon: "☕", word: "Cup", pron: "кап", trans: "чашка", plural: "Cups", pronP: "капс", transP: "чашки" },
    { cat: "5. Еда и посуда", icon: "🍎", word: "Apple", pron: "э́пл", trans: "яблоко", plural: "Apples", pronP: "э́плз", transP: "яблоки" },
    { cat: "5. Еда и посуда", icon: "🍌", word: "Banana", pron: "банэ́нэ", trans: "банан", plural: "Bananas", pronP: "банэ́нэз", transP: "бананы" },
    { cat: "5. Еда и посуда", icon: "🍞", word: "Bread", pron: "брэд", trans: "хлеб", single: true },
    { cat: "5. Еда и посуда", icon: "🥛", word: "Milk", pron: "милк", trans: "молоко", single: true },
    { cat: "5. Еда и посуда", icon: "☕", word: "Coffee", pron: "ко́фи", trans: "кофе", single: true },
    { cat: "5. Еда и посуда", icon: "🍵", word: "Tea", pron: "ти", trans: "чай", single: true },
    { cat: "5. Еда и посуда", icon: "🧂", word: "Sugar", pron: "шу́га", trans: "сахар", single: true },
    { cat: "5. Еда и посуда", icon: "💧", word: "Water", pron: "во́та", trans: "вода", single: true },
    { cat: "6. Одежда", icon: "👕", word: "Shirt", pron: "шёт", trans: "рубашка", plural: "Shirts", pronP: "шётс", transP: "рубашки" },
    { cat: "6. Одежда", icon: "👗", word: "Dress", pron: "дрэс", trans: "платье", plural: "Dresses", pronP: "дрэ́сиз", transP: "платья" },
    { cat: "6. Одежда", icon: "👖", word: "Pants", pron: "пэнтс", trans: "штаны", single: true },
    { cat: "6. Одежда", icon: "👟", word: "Shoes", pron: "шуз", trans: "обувь", single: true },
    { cat: "6. Одежда", icon: "🧢", word: "Hat", pron: "хэт", trans: "шапка", plural: "Hats", pronP: "хэтс", transP: "шапки" },
    { cat: "6. Одежда", icon: "🧥", word: "Coat", pron: "коут", trans: "пальто", plural: "Coats", pronP: "коутс", transP: "пальто" },
    { cat: "7. Природа", icon: "☀️", word: "Sun", pron: "сан", trans: "солнце", single: true },
    { cat: "7. Природа", icon: "🌧️", word: "Rain", pron: "рэйн", trans: "дождь", single: true },
    { cat: "7. Природа", icon: "❄️", word: "Snow", pron: "сноу", trans: "снег", single: true },
    { cat: "7. Природа", icon: "🌬️", word: "Wind", pron: "уинд", trans: "ветер", single: true },
    { cat: "7. Природа", icon: "🌳", word: "Tree", pron: "три", trans: "дерево", plural: "Trees", pronP: "триз", transP: "деревья" },
    { cat: "7. Природа", icon: "🌸", word: "Flower", pron: "фла́уэ", trans: "цветок", plural: "Flowers", pronP: "фла́уэз", transP: "цветы" },
    { cat: "8. Транспорт", icon: "🚗", word: "Car", pron: "ка", trans: "машина", plural: "Cars", pronP: "каз", transP: "машины" },
    { cat: "8. Транспорт", icon: "🚌", word: "Bus", pron: "бас", trans: "автобус", plural: "Buses", pronP: "ба́сиз", transP: "автобусы" },
    { cat: "8. Транспорт", icon: "🚂", word: "Train", pron: "трэйн", trans: "поезд", plural: "Trains", pronP: "трэйнз", transP: "поезда" },
    { cat: "8. Транспорт", icon: "✈️", word: "Plane", pron: "плэйн", trans: "самолет", plural: "Planes", pronP: "плэйнз", transP: "самолеты" },
    { cat: "8. Транспорт", icon: "🚲", word: "Bicycle", pron: "ба́йсикл", trans: "велосипед", plural: "Bicycles", pronP: "ба́йсиклз", transP: "велосипеды" },
    { cat: "8. Транспорт", icon: "🚢", word: "Ship", pron: "шип", trans: "корабль", plural: "Ships", pronP: "шипс", transP: "корабли" },
    { cat: "9. Школа и игры", icon: "📖", word: "Book", pron: "бук", trans: "книга", plural: "Books", pronP: "букс", transP: "книги" },
    { cat: "9. Школа и игры", icon: "✏️", word: "Pencil", pron: "пэ́нсил", trans: "карандаш", plural: "Pencils", pronP: "пэ́нсилз", transP: "карандаши" },
    { cat: "9. Школа и игры", icon: "🖊️", word: "Pen", pron: "пэн", trans: "ручка", plural: "Pens", pronP: "пэнз", transP: "ручки" },
    { cat: "9. Школа и игры", icon: "⚽", word: "Ball", pron: "бол", trans: "мяч", plural: "Balls", pronP: "болз", transP: "мячи" },
    { cat: "9. Школа и игры", icon: "🪆", word: "Doll", pron: "дол", trans: "кукла", plural: "Dolls", pronP: "долз", transP: "куклы" },
    { cat: "9. Школа и игры", icon: "🤖", word: "Robot", pron: "ро́бот", trans: "робот", plural: "Robots", pronP: "ро́ботс", transP: "роботы" },
    { cat: "10. Цифры", icon: "1️⃣", word: "One", pron: "уан", trans: "один", single: true },
    { cat: "10. Цифры", icon: "2️⃣", word: "Two", pron: "ту", trans: "два", single: true },
    { cat: "10. Цифры", icon: "3️⃣", word: "Three", pron: "сри", trans: "три", single: true },
    { cat: "10. Цифры", icon: "4️⃣", word: "Four", pron: "фо", trans: "четыре", single: true },
    { cat: "10. Цифры", icon: "5️⃣", word: "Five", pron: "файв", trans: "пять", single: true },
    { cat: "10. Цифры", icon: "6️⃣", word: "Six", pron: "сикс", trans: "шесть", single: true },
    { cat: "10. Цифры", icon: "7️⃣", word: "Seven", pron: "сэ́вэн", trans: "семь", single: true },
    { cat: "10. Цифры", icon: "8️⃣", word: "Eight", pron: "эйт", trans: "восемь", single: true },
    { cat: "10. Цифры", icon: "9️⃣", word: "Nine", pron: "найн", trans: "девять", single: true },
    { cat: "10. Цифры", icon: "🔟", word: "Ten", pron: "тэн", trans: "десять", single: true },
    { cat: "11. Глаголы", icon: "🍽️", word: "Eat", pron: "иит", trans: "есть", single: true },
    { cat: "11. Глаголы", icon: "🥤", word: "Drink", pron: "дринк", trans: "пить", single: true },
    { cat: "11. Глаголы", icon: "🛌", word: "Sleep", pron: "слиип", trans: "спать", single: true },
    { cat: "11. Глаголы", icon: "⚽", word: "Play", pron: "плэй", trans: "играть", single: true },
    { cat: "11. Глаголы", icon: "📖", word: "Read", pron: "риид", trans: "читать", single: true },
    { cat: "11. Глаголы", icon: "🏃", word: "Run", pron: "ран", trans: "бегать", single: true },
    { cat: "11. Глаголы", icon: "🚶", word: "Walk", pron: "уо́к", trans: "ходить", single: true },
    { cat: "11. Глаголы", icon: "🦘", word: "Jump", pron: "джамп", trans: "прыгать", single: true },
    { cat: "11. Глаголы", icon: "📚", word: "Study", pron: "ста́ди", trans: "учиться", single: true },
    { cat: "11. Глаголы", icon: "🛋️", word: "Rest", pron: "рэст", trans: "отдыхать", single: true },
    { cat: "12. Цвета", color: "#ff4d4d", word: "Red", pron: "рэд", trans: "красный", single: true },
    { cat: "12. Цвета", color: "#4d79ff", word: "Blue", pron: "блуу", trans: "синий", single: true },
    { cat: "12. Цвета", color: "#4dff4d", word: "Green", pron: "грииин", trans: "зелёный", single: true },
    { cat: "12. Цвета", color: "#ffea00", word: "Yellow", pron: "йэ́лоу", trans: "жёлтый", single: true },
    { cat: "12. Цвета", color: "#000000", word: "Black", pron: "блэк", trans: "чёрный", single: true },
    { cat: "12. Цвета", color: "#ffffff", word: "White", pron: "уа́йт", trans: "белый", single: true },
    { cat: "12. Цвета", color: "#ffa64d", word: "Orange", pron: "о́рэндж", trans: "оранжевый", single: true },
    { cat: "12. Цвета", color: "#9933ff", word: "Purple", pron: "пёрпл", trans: "фиолетовый", single: true },
    { cat: "12. Цвета", color: "#ff66b3", word: "Pink", pron: "пинк", trans: "розовый", single: true },
    { cat: "12. Цвета", color: "#8a5a44", word: "Brown", pron: "бра́ун", trans: "коричневый", single: true },
    { cat: "12. Цвета", color: "#a6a6a6", word: "Grey", pron: "грэй", trans: "серый", single: true },
    { cat: "12. Цвета", color: "linear-gradient(135deg, #ff4d4d 0%, #ffa64d 20%, #ffea00 40%, #4dff4d 60%, #4d79ff 80%, #9933ff 100%)", word: "Rainbow", pron: "рэ́йнбоу", trans: "радуга", single: true },
    { cat: "13. Размеры", icon: "🐘", word: "Big", pron: "биг", trans: "большой", single: true },
    { cat: "13. Размеры", icon: "🐜", word: "Small", pron: "смоол", trans: "маленький", single: true },
    { cat: "14. Фразы", icon: "👋", word: "Hello", pron: "хэлло́у", trans: "Здравствуйте", single: true },
    { cat: "14. Фразы", icon: "🚪", word: "Goodbye", pron: "гудба́й", trans: "До свидания", single: true },
    { cat: "14. Фразы", icon: "🤝", word: "Thank you", pron: "сэ́нк ю", trans: "Спасибо", single: true },
    { cat: "14. Фразы", icon: "🙏", word: "Please", pron: "плиз", trans: "Пожалуйста", single: true },
    { cat: "14. Фразы", icon: "👍", word: "Yes", pron: "йес", trans: "Да", single: true },
    { cat: "14. Фразы", icon: "👎", word: "No", pron: "ноу", trans: "Нет", single: true }
  ];

  let currentCardIndex = -1;

  function showRandomCard() {
    let newIndex = Math.floor(Math.random() * cardsData.length);
    while (newIndex === currentCardIndex && cardsData.length > 1) {
      newIndex = Math.floor(Math.random() * cardsData.length);
    }
    currentCardIndex = newIndex;
    const card = cardsData[currentCardIndex];

    let html = '';
    if (card.color) html += `<div class="trainer-color-circle" style="background: ${card.color};"></div>`;
    else html += `<div class="trainer-icon">${card.icon}</div>`;

    if (card.single) {
      html += `
        <div class="trainer-entry">
          <div class="trainer-word">${card.word} <span class="trainer-pron">— ${card.pron}</span></div>
          <div class="trainer-trans">${card.trans}</div>
          <button class="speak-btn" onclick="speakWord('${card.word}')">🔊 Слушать</button>
        </div>`;
    } else {
      html += `
        <div class="trainer-entry">
          <div class="trainer-label">Единственное число</div>
          <div class="trainer-word">${card.word} <span class="trainer-pron">— ${card.pron}</span></div>
          <div class="trainer-trans">${card.trans}</div>
          <button class="speak-btn" onclick="speakWord('${card.word}')">🔊 Слушать</button>
        </div>
        <div class="divider"></div>
        <div class="trainer-entry">
          <div class="trainer-label">Множественное число</div>
          <div class="trainer-word">${card.plural} <span class="trainer-pron">— ${card.pronP}</span></div>
          <div class="trainer-trans">${card.transP}</div>
          <button class="speak-btn" onclick="speakWord('${card.plural}')">🔊 Слушать</button>
        </div>`;
    }
    document.getElementById('trainer-card-container').innerHTML = html;
  }

  function renderCategoryList() {
    const categories = [...new Set(cardsData.map(card => card.cat))];
    const container = document.getElementById('category-list-container');
    container.innerHTML = categories.map(cat => `<button class="category-btn" onclick="showCategory('${cat}')">${cat}</button>`).join('');
  }

  function showCategory(catName) {
    document.getElementById('category-title').innerText = catName;
    const filteredCards = cardsData.filter(card => card.cat === catName);
    const container = document.getElementById('category-cards-container');
    
    container.innerHTML = filteredCards.map(card => {
      let inner = `<div class="task-card">`;
      if (card.color) inner += `<div class="trainer-color-circle" style="background: ${card.color};"></div>`;
      else inner += `<div class="trainer-icon">${card.icon}</div>`;

      if (card.single) {
        inner += `<div class="trainer-entry"><div class="trainer-word">${card.word} <span class="trainer-pron">— ${card.pron}</span></div><div class="trainer-trans">${card.trans}</div><button class="speak-btn" onclick="speakWord('${card.word}')">🔊 Слушать</button></div>`;
      } else {
        inner += `
          <div class="trainer-entry"><div class="trainer-label">Единственное число</div><div class="trainer-word">${card.word} <span class="trainer-pron">— ${card.pron}</span></div><div class="trainer-trans">${card.trans}</div><button class="speak-btn" onclick="speakWord('${card.word}')">🔊 Слушать</button></div>
          <div class="divider"></div>
          <div class="trainer-entry"><div class="trainer-label">Множественное число</div><div class="trainer-word">${card.plural} <span class="trainer-pron">— ${card.pronP}</span></div><div class="trainer-trans">${card.transP}</div><button class="speak-btn" onclick="speakWord('${card.plural}')">🔊 Слушать</button></div>`;
      }
      inner += `</div>`;
      return inner;
    }).join('');
    
    document.getElementById('tasks-view').style.display = 'none';
    document.getElementById('category-detail-view').style.display = 'block';
    document.querySelector('.content-wrapper').scrollTo(0, 0);
  }

  function speakWord(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.6;
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.includes('en') && v.name.includes('Google')) || voices.find(v => v.lang.includes('en'));
      if (enVoice) utterance.voice = enVoice;
      window.speechSynthesis.speak(utterance);
    }
  }

  function renderPrintView() {
    const printView = document.getElementById('print-view');
    let html = '';
    let cardsInSheet = 0;
    cardsData.forEach((card) => {
      if (cardsInSheet === 0) html += `<div class="sheet">`;
      html += `<div class="card ${card.single ? 'single-form' : ''}">`;
      html += card.color ? `<div class="print-color-circle" style="background: ${card.color};"></div>` : `<div class="print-icon">${card.icon}</div>`;
      if (card.single) {
        html += `<div class="print-entry"><div class="print-word">${card.word} <span class="print-pron">— ${card.pron}</span></div><div class="print-trans">${card.trans}</div></div>`;
      } else {
        html += `<div class="print-entry"><div class="form-label">Единственное число</div><div class="print-word">${card.word} <span class="print-pron">— ${card.pron}</span></div><div class="print-trans">${card.trans}</div></div><div class="divider"></div><div class="print-entry"><div class="form-label">Множественное число</div><div class="print-word">${card.plural} <span class="print-pron">— ${card.pronP}</span></div><div class="print-trans">${card.transP}</div></div>`;
      }
      html += `</div>`;
      cardsInSheet++;
      if (cardsInSheet === 6) { html += `</div>`; cardsInSheet = 0; }
    });
    if (cardsInSheet > 0) html += `</div>`;
    printView.innerHTML = html;
  }

  function switchView(viewName) {
    document.querySelectorAll('.nav button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.content-wrapper > div').forEach(el => el.style.display = 'none');
    
    if (viewName === 'home') { document.getElementById('btn-home').classList.add('active'); document.getElementById('home-view').style.display = 'flex'; }
    else if (viewName === 'tasks') { document.getElementById('btn-tasks').classList.add('active'); document.getElementById('tasks-view').style.display = 'block'; }
    else if (viewName === 'print') { document.getElementById('btn-print').classList.add('active'); document.getElementById('print-view').style.display = 'block'; }
  }

  // Инициализация и регистрация Service Worker
  window.onload = () => {
    showRandomCard();
    renderCategoryList();
    renderPrintView();

    // Регистрация Service Worker для PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(() => console.log("Service Worker зарегистрирован"))
        .catch((err) => console.log("Ошибка регистрации SW:", err));
    }
  };
