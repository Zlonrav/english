// ================= БАЗА ДАННЫХ =================
const svg = (path) => `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const cardsData = [
  // 1. ЛЮДИ
  { cat: "1. Люди", icon: svg('<circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/>'), word: "Child", pron: "чайлд", trans: "ребёнок", plural: "Children", pronP: "чилдрен", transP: "дети" },
  { cat: "1. Люди", icon: svg('<circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/><path d="M9 7h6"/>'), word: "Man", pron: "мэн", trans: "мужчина", plural: "Men", pronP: "мен", transP: "мужчины" },
  { cat: "1. Люди", icon: svg('<circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/><path d="M9 7h6"/><path d="M12 11v10"/>'), word: "Woman", pron: "ву́мэн", trans: "женщина", plural: "Women", pronP: "уи́мин", transP: "женщины" },
  { cat: "1. Люди", icon: svg('<circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/>'), word: "Person", pron: "пёрсон", trans: "человек", plural: "People", pronP: "пипл", transP: "люди" },
  { cat: "1. Люди", icon: svg('<circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/><path d="M9 21v-2a3 3 0 0 1 6 0v2"/>'), word: "Family", pron: "фэ́мили", trans: "семья", plural: "Families", pronP: "фэ́милиз", transP: "семьи" },
  { cat: "1. Люди", icon: svg('<circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/><path d="M9 5c0-1.5 1-2 3-2s3 .5 3 2"/>'), word: "Mother", pron: "ма́зэ", trans: "мама", plural: "Mothers", pronP: "ма́зэз", transP: "мамы" },
  { cat: "1. Люди", icon: svg('<circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/>'), word: "Father", pron: "фа́зэ", trans: "папа", plural: "Fathers", pronP: "фа́зэз", transP: "папы" },
  { cat: "1. Люди", icon: svg('<circle cx="10" cy="7" r="3"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/><path d="M14 21v-2a4 4 0 0 1 4-4h2a2 2 0 0 1 2 2v4"/>'), word: "Sister", pron: "си́стэ", trans: "сестра", plural: "Sisters", pronP: "си́стэз", transP: "сёстры" },
  { cat: "1. Люди", icon: svg('<circle cx="10" cy="7" r="3"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/><path d="M14 21v-2a4 4 0 0 1 4-4h2a2 2 0 0 1 2 2v4"/>'), word: "Brother", pron: "бра́зэ", trans: "брат", plural: "Brothers", pronP: "бра́зэз", transP: "братья" },

  // 2. ЖИВОТНЫЕ
  { cat: "2. Животные", icon: svg('<path d="M4 10a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 4-3 7-8 11-5-4-8-7-8-11z"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/>'), word: "Sheep", pron: "шип", trans: "овца", plural: "Sheep", pronP: "шип", transP: "овцы" },
  { cat: "2. Животные", icon: svg('<path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/><path d="M4 14a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2H4z"/><path d="M8 16v4M16 16v4"/><path d="M4 10L2 8M20 10l2-2"/>'), word: "Ox", pron: "окс", trans: "бык", plural: "Oxen", pronP: "оксен", transP: "быки" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="12" r="6"/><path d="M12 6V2M12 6a2 2 0 0 1 2 2c0 1.5-1 2-2 2s-2-.5-2-2a2 2 0 0 1 2-2z"/><path d="M9 18l-2 4M15 18l2 4"/>'), word: "Goose", pron: "гус", trans: "гусь", plural: "Geese", pronP: "гис", transP: "гуси" },
  { cat: "2. Животные", icon: svg('<path d="M12 8V4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M8 16v6M16 16v6"/><path d="M6 4L2 2M18 4l4-2"/>'), word: "Deer", pron: "дир", trans: "олень", plural: "Deer", pronP: "дир", transP: "олени" },
  { cat: "2. Животные", icon: svg('<ellipse cx="10" cy="14" rx="6" ry="4"/><circle cx="16" cy="8" r="4"/><path d="M16 8l2-2M8 18v4M12 18v4"/><circle cx="17" cy="7" r="1" fill="currentColor"/>'), word: "Mouse", pron: "ма́ус", trans: "мышь", plural: "Mice", pronP: "майс", transP: "мыши" },
  { cat: "2. Животные", icon: svg('<path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M8 10L4 6l2-2 4 4M16 10l4-4-2-2-4 4"/><path d="M10 18v4M14 18v4M12 10v-4"/>'), word: "Cat", pron: "кэт", trans: "кошка", plural: "Cats", pronP: "кэтс", transP: "кошки" },
  { cat: "2. Животные", icon: svg('<ellipse cx="12" cy="14" rx="6" ry="4"/><circle cx="8" cy="8" r="3"/><path d="M4 14v2a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-2M10 18v3M14 18v3"/>'), word: "Dog", pron: "дог", trans: "собака", plural: "Dogs", pronP: "догз", transP: "собаки" },
  { cat: "2. Животные", icon: svg('<path d="M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M20 10l2-4-4-2-2 4M4 10L2 6l4-2 2 4"/><circle cx="9" cy="12" r="1" fill="currentColor"/>'), word: "Bird", pron: "бёёд", trans: "птица", plural: "Birds", pronP: "бёёдз", transP: "птицы" },
  { cat: "2. Животные", icon: svg('<path d="M6 16V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v8"/><path d="M4 16h16v4H4z"/><path d="M8 20v4M16 20v4"/>'), word: "Horse", pron: "хо́ос", trans: "лошадь", plural: "Horses", pronP: "хо́осиз", transP: "лошади" },
  { cat: "2. Животные", icon: svg('<path d="M6 10V8a6 6 0 0 1 12 0v2"/><path d="M4 14h16v6H4z"/><path d="M8 20v4M16 20v4"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/>'), word: "Cow", pron: "ка́у", trans: "корова", plural: "Cows", pronP: "ка́уз", transP: "коровы" },
  { cat: "2. Животные", icon: svg('<path d="M6 16V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v8"/><path d="M4 16h16v4H4z"/><path d="M8 20v4M16 20v4"/><circle cx="10" cy="12" r="1" fill="currentColor"/><circle cx="14" cy="12" r="1" fill="currentColor"/>'), word: "Pig", pron: "пиг", trans: "свинья", plural: "Pigs", pronP: "пигз", transP: "свиньи" },
  { cat: "2. Животные", icon: svg('<path d="M4 14a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2H4z"/><path d="M8 16v4M16 16v4"/><circle cx="8" cy="12" r="1" fill="currentColor"/>'), word: "Duck", pron: "дак", trans: "утка", plural: "Ducks", pronP: "дакс", transP: "утки" },
  { cat: "2. Животные", icon: svg('<path d="M8 10a4 4 0 0 1 8 0v6H8z"/><path d="M8 16v4M16 16v4"/><path d="M16 8l4-4 2 2-4 4M8 8L4 4 2 6l4 4"/><circle cx="10" cy="10" r="1" fill="currentColor"/>'), word: "Chicken", pron: "чи́кен", trans: "курица", plural: "Chickens", pronP: "чи́кенз", transP: "курицы" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="10" r="4"/><path d="M8 14v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2"/><path d="M6 6L2 2M18 6l4-4"/>'), word: "Lion", pron: "ла́йэн", trans: "лев", plural: "Lions", pronP: "ла́йэнз", transP: "львы" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="10" r="4"/><path d="M8 14v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2"/><path d="M6 6L2 2M18 6l4-4"/><path d="M10 9h4"/><circle cx="10" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="10" r="1" fill="currentColor"/>'), word: "Tiger", pron: "та́йгэ", trans: "тигр", plural: "Tigers", pronP: "та́йгэз", transP: "тигры" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="10" r="6"/><circle cx="12" cy="10" r="2"/><path d="M12 16v4M8 20h8M4 10a8 8 0 0 1 16 0"/>'), word: "Elephant", pron: "э́лефэнт", trans: "слон", plural: "Elephants", pronP: "э́лефэнтс", transP: "слоны" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="12" r="4"/><circle cx="6" cy="10" r="2"/><circle cx="18" cy="10" r="2"/><path d="M8 16v4M16 16v4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'), word: "Monkey", pron: "ма́нки", trans: "обезьяна", plural: "Monkeys", pronP: "ма́нкиз", transP: "обезьяны" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="14" r="4"/><circle cx="8" cy="10" r="2"/><circle cx="16" cy="10" r="2"/><path d="M8 18v4M16 18v4"/>'), word: "Bear", pron: "бэ́э", trans: "медведь", plural: "Bears", pronP: "бэ́эз", transP: "медведи" },
  { cat: "2. Животные", icon: svg('<path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M8 10L4 6l2-2 4 4M16 10l4-4-2-2-4 4"/><path d="M10 18v4M14 18v4M12 10v-4"/>'), word: "Wolf", pron: "уу́лф", trans: "волк", plural: "Wolves", pronP: "уу́лвз", transP: "волки" },
  { cat: "2. Животные", icon: svg('<path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M8 10L4 6l2-2 4 4M16 10l4-4-2-2-4 4"/><path d="M10 18v4M14 18v4M12 10v-4"/>'), word: "Fox", pron: "фокс", trans: "лиса", plural: "Foxes", pronP: "фо́ксиз", transP: "лисы" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="14" r="4"/><path d="M8 10L6 4M16 10l2-6M6 4l2 6M18 4l-2 6"/><circle cx="10" cy="14" r="1" fill="currentColor"/><circle cx="14" cy="14" r="1" fill="currentColor"/>'), word: "Rabbit", pron: "рэ́бит", trans: "кролик", plural: "Rabbits", pronP: "рэ́битс", transP: "кролики" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="14" r="6"/><circle cx="8" cy="10" r="2"/><circle cx="16" cy="10" r="2"/><circle cx="10" cy="13" r="1" fill="currentColor"/><circle cx="14" cy="13" r="1" fill="currentColor"/>'), word: "Frog", pron: "фрог", trans: "лягушка", plural: "Frogs", pronP: "фрогз", transP: "лягушки" },
  { cat: "2. Животные", icon: svg('<path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z"/><path d="M12 4v16M8 8l8 8M16 8l-8 8"/>'), word: "Snake", pron: "снэйк", trans: "змея", plural: "Snakes", pronP: "снэйкс", transP: "змеи" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/><circle cx="12" cy="12" r="4"/>'), word: "Turtle", pron: "тё́тл", trans: "черепаха", plural: "Turtles", pronP: "тё́тлз", transP: "черепахи" },
  { cat: "2. Животные", icon: svg('<path d="M12 12c-4-4-8 0-8 4s4 4 8 0c4 4 8 0 8-4s-4-8-8-4z"/><path d="M12 12v8"/>'), word: "Butterfly", pron: "ба́тэфлай", trans: "бабочка", plural: "Butterflies", pronP: "ба́тэфлайз", transP: "бабочки" },
  { cat: "2. Животные", icon: svg('<ellipse cx="12" cy="12" rx="4" ry="6"/><path d="M8 12h8M8 9h8M8 15h8"/><path d="M12 6V2M12 18v4"/>'), word: "Bee", pron: "бии", trans: "пчела", plural: "Bees", pronP: "бииз", transP: "пчёлы" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="12" r="4"/><path d="M12 8v-4M12 16v4M8 12H4M16 12h4M9 9L6 6M15 9l3-3M9 15l-3 3M15 15l3 3"/>'), word: "Spider", pron: "спа́йдэ", trans: "паук", plural: "Spiders", pronP: "спа́йдэз", transP: "пауки" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="12" r="6"/><circle cx="9" cy="11" r="2" fill="currentColor"/><circle cx="15" cy="11" r="2" fill="currentColor"/><path d="M10 16l2 2 2-2"/>'), word: "Owl", pron: "а́ул", trans: "сова", plural: "Owls", pronP: "а́улз", transP: "совы" },
  { cat: "2. Животные", icon: svg('<circle cx="12" cy="12" r="6"/><circle cx="9" cy="10" r="2"/><circle cx="15" cy="10" r="2"/><path d="M12 6v-4M10 6l-2-2M14 6l2-2M10 16h4"/>'), word: "Ladybug", pron: "лэ́йдибаг", trans: "божья коровка", plural: "Ladybugs", pronP: "лэ́йдибагз", transP: "божьи коровки" },
  { cat: "2. Животные", icon: svg('<path d="M2 12c4-4 8-4 12 0-4 4-8 4-12 0z"/><path d="M14 12l8-4v8z"/><circle cx="6" cy="12" r="1" fill="currentColor"/>'), word: "Fish", pron: "фиш", trans: "рыба", plural: "Fish", pronP: "фиш", transP: "рыбы" },

  // 3. ЧАСТИ ТЕЛА
  { cat: "3. Части тела", icon: svg('<path d="M8 8a4 4 0 0 1 8 0v4a4 4 0 0 1-8 0z"/><path d="M10 12v6M14 12v6"/>'), word: "Tooth", pron: "тус", trans: "зуб", plural: "Teeth", pronP: "тис", transP: "зубы" },
  { cat: "3. Части тела", icon: svg('<path d="M8 6v8a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-8"/><path d="M8 6h8"/>'), word: "Foot", pron: "фут", trans: "нога", plural: "Feet", pronP: "фит", transP: "ноги" },
  { cat: "3. Части тела", icon: svg('<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 6v4M12 18v-4"/>'), word: "Eye", pron: "ай", trans: "глаз", plural: "Eyes", pronP: "айз", transP: "глаза" },
  { cat: "3. Части тела", icon: svg('<path d="M6 12a6 6 0 0 1 12 0v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M8 10v4M16 10v4"/>'), word: "Ear", pron: "и́э", trans: "ухо", plural: "Ears", pronP: "и́эз", transP: "уши" },
  { cat: "3. Части тела", icon: svg('<path d="M8 12a4 4 0 0 1 8 0v4a4 4 0 0 1-8 0z"/><path d="M10 16h4"/>'), word: "Nose", pron: "ноуз", trans: "нос", plural: "Noses", pronP: "но́узиз", transP: "носы" },
  { cat: "3. Части тела", icon: svg('<path d="M8 8v4a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V8"/><path d="M8 8h8M12 16v4M8 20h8"/>'), word: "Hand", pron: "хэнд", trans: "рука", plural: "Hands", pronP: "хэндз", transP: "руки" },

  // 4. ДОМ И МЕБЕЛЬ
  { cat: "4. Дом и мебель", icon: svg('<rect x="3" y="8" width="18" height="12" rx="1"/><path d="M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"/><path d="M7 20v-4M17 20v-4"/>'), word: "Table", pron: "тэ́йбл", trans: "стол", plural: "Tables", pronP: "тэ́йблз", transP: "столы" },
  { cat: "4. Дом и мебель", icon: svg('<path d="M4 10h16v10H4z"/><path d="M8 10V6h8v4"/><path d="M8 20v-4M16 20v-4"/>'), word: "Chair", pron: "чэ́а", trans: "стул", plural: "Chairs", pronP: "чэ́аз", transP: "стулья" },
  { cat: "4. Дом и мебель", icon: svg('<path d="M4 6h16v4H4z"/><path d="M6 10l2 10M18 10l-2 10"/><path d="M8 15h8"/>'), word: "Stool", pron: "сту́ул", trans: "табуретка", plural: "Stools", pronP: "сту́улз", transP: "табуретки" },
  { cat: "4. Дом и мебель", icon: svg('<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 10h16M8 18v4M16 18v4"/>'), word: "Bed", pron: "бэд", trans: "кровать", plural: "Beds", pronP: "бэдз", transP: "кровати" },
  { cat: "4. Дом и мебель", icon: svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16M12 4v16"/>'), word: "Window", pron: "уи́ндоу", trans: "окно", plural: "Windows", pronP: "уи́ндоуз", transP: "окна" },
  { cat: "4. Дом и мебель", icon: svg('<rect x="6" y="4" width="12" height="16" rx="2"/><circle cx="14" cy="12" r="1" fill="currentColor"/>'), word: "Door", pron: "до́ор", trans: "дверь", plural: "Doors", pronP: "до́орз", transP: "двери" },
  { cat: "4. Дом и мебель", icon: svg('<path d="M4 10L12 4l8 6v10H4z"/><path d="M10 20v-6h4v6"/>'), word: "House", pron: "ха́ус", trans: "дом", plural: "Houses", pronP: "ха́узиз", transP: "дома" },

  // 5. ЕДА И ПОСУДА
  { cat: "5. Еда и посуда", icon: svg('<path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z"/><path d="M12 4v16"/>'), word: "Spoon", pron: "спун", trans: "ложка", plural: "Spoons", pronP: "спунз", transP: "ложки" },
  { cat: "5. Еда и посуда", icon: svg('<path d="M6 8h12v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"/><path d="M8 8V4h8v4"/>'), word: "Cup", pron: "кап", trans: "чашка", plural: "Cups", pronP: "капс", transP: "чашки" },
  { cat: "5. Еда и посуда", icon: svg('<path d="M12 6c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"/><path d="M12 14v6M8 20h8"/>'), word: "Apple", pron: "э́пл", trans: "яблоко", plural: "Apples", pronP: "э́плз", transP: "яблоки" },
  { cat: "5. Еда и посуда", icon: svg('<path d="M8 6c-4 4-4 12 0 12 2 0 4-4 4-8s2-8 4-8"/>'), word: "Banana", pron: "банэ́нэ", trans: "банан", plural: "Bananas", pronP: "банэ́нэз", transP: "бананы" },
  { cat: "5. Еда и посуда", icon: svg('<rect x="4" y="8" width="16" height="10" rx="2"/><path d="M8 18v4M16 18v4"/>'), word: "Bread", pron: "брэд", trans: "хлеб", single: true },
  { cat: "5. Еда и посуда", icon: svg('<path d="M8 6v8a4 4 0 0 0 8 0V6H8z"/><path d="M12 14v6"/>'), word: "Milk", pron: "милк", trans: "молоко", single: true },
  { cat: "5. Еда и посуда", icon: svg('<path d="M6 8h12v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"/><path d="M8 8V4h8v4"/>'), word: "Coffee", pron: "ко́фи", trans: "кофе", single: true },
  { cat: "5. Еда и посуда", icon: svg('<path d="M6 8h12v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"/><path d="M8 8V4h8v4"/>'), word: "Tea", pron: "ти", trans: "чай", single: true },
  { cat: "5. Еда и посуда", icon: svg('<path d="M6 8h12v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"/><path d="M8 8V4h8v4"/>'), word: "Sugar", pron: "шу́га", trans: "сахар", single: true },
  { cat: "5. Еда и посуда", icon: svg('<path d="M12 4c-2 4-4 8-4 12a4 4 0 0 0 8 0c0-4-2-8-4-12z"/>'), word: "Water", pron: "во́та", trans: "вода", single: true },

  // 6. ОДЕЖДА
  { cat: "6. Одежда", icon: svg('<path d="M8 4h8l4 4-2 2-2-2v12H8V8L6 10 4 8z"/>'), word: "Shirt", pron: "шёт", trans: "рубашка", plural: "Shirts", pronP: "шётс", transP: "рубашки" },
  { cat: "6. Одежда", icon: svg('<path d="M8 4h8l4 4-2 2-2-2v12H8V8L6 10 4 8z"/>'), word: "Dress", pron: "дрэс", trans: "платье", plural: "Dresses", pronP: "дрэ́сиз", transP: "платья" },
  { cat: "6. Одежда", icon: svg('<path d="M6 4h12v16H6z"/><path d="M6 12h12"/>'), word: "Pants", pron: "пэнтс", trans: "штаны", single: true },
  { cat: "6. Одежда", icon: svg('<path d="M4 14h16v4H4z"/><path d="M8 18v2M16 18v2"/>'), word: "Shoes", pron: "шуз", trans: "обувь", single: true },
  { cat: "6. Одежда", icon: svg('<path d="M8 8a4 4 0 0 1 8 0v4H8z"/><path d="M6 12h12v4H6z"/>'), word: "Hat", pron: "хэт", trans: "шапка", plural: "Hats", pronP: "хэтс", transP: "шапки" },
  { cat: "6. Одежда", icon: svg('<path d="M8 4h8l4 4-2 2-2-2v12H8V8L6 10 4 8z"/>'), word: "Coat", pron: "коут", trans: "пальто", plural: "Coats", pronP: "коутс", transP: "пальто" },

  // 7. ПРИРОДА
  { cat: "7. Природа", icon: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'), word: "Sun", pron: "сан", trans: "солнце", single: true },
  { cat: "7. Природа", icon: svg('<path d="M4 12a8 8 0 0 1 16 0v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M8 12v4M12 12v4M16 12v4"/>'), word: "Rain", pron: "рэйн", trans: "дождь", single: true },
  { cat: "7. Природа", icon: svg('<path d="M12 2v20M8 6h8M8 10h8M8 14h8M8 18h8"/>'), word: "Snow", pron: "сноу", trans: "снег", single: true },
  { cat: "7. Природа", icon: svg('<path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18"/>'), word: "Wind", pron: "уинд", trans: "ветер", single: true },
  { cat: "7. Природа", icon: svg('<path d="M12 22V10M12 10a4 4 0 0 1 4-4 4 4 0 0 0-8 0 4 4 0 0 1 4 4z"/><path d="M8 14h8"/>'), word: "Tree", pron: "три", trans: "дерево", plural: "Trees", pronP: "триз", transP: "деревья" },
  { cat: "7. Природа", icon: svg('<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="6"/><path d="M12 18v4"/>'), word: "Flower", pron: "фла́уэ", trans: "цветок", plural: "Flowers", pronP: "фла́уэз", transP: "цветы" },

  // 8. ТРАНСПОРТ
  { cat: "8. Транспорт", icon: svg('<rect x="4" y="8" width="16" height="8" rx="2"/><circle cx="8" cy="16" r="2"/><circle cx="16" cy="16" r="2"/>'), word: "Car", pron: "ка", trans: "машина", plural: "Cars", pronP: "каз", transP: "машины" },
  { cat: "8. Транспорт", icon: svg('<rect x="4" y="6" width="16" height="12" rx="2"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/><path d="M4 12h16"/>'), word: "Bus", pron: "бас", trans: "автобус", plural: "Buses", pronP: "ба́сиз", transP: "автобусы" },
  { cat: "8. Транспорт", icon: svg('<rect x="6" y="4" width="12" height="14" rx="2"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/><path d="M6 10h12"/>'), word: "Train", pron: "трэйн", trans: "поезд", plural: "Trains", pronP: "трэйнз", transP: "поезда" },
  { cat: "8. Транспорт", icon: svg('<path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18"/>'), word: "Plane", pron: "плэйн", trans: "самолет", plural: "Planes", pronP: "плэйнз", transP: "самолеты" },
  { cat: "8. Транспорт", icon: svg('<circle cx="8" cy="16" r="4"/><circle cx="16" cy="16" r="4"/><path d="M8 12l4-8 4 8"/>'), word: "Bicycle", pron: "ба́йсикл", trans: "велосипед", plural: "Bicycles", pronP: "ба́йсиклз", transP: "велосипеды" },
  { cat: "8. Транспорт", icon: svg('<path d="M4 12h16v4H4z"/><path d="M8 16v4M16 16v4"/><path d="M4 12l4-8h8l4 8"/>'), word: "Ship", pron: "шип", trans: "корабль", plural: "Ships", pronP: "шипс", transP: "корабли" },
  { cat: "8. Транспорт", icon: svg('<rect x="4" y="6" width="16" height="12" rx="2"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/><path d="M4 12h16"/>'), word: "Tram", pron: "трам", trans: "трамвай", plural: "Trams", pronP: "трамз", transP: "трамваи" },
  { cat: "8. Транспорт", icon: svg('<rect x="6" y="4" width="12" height="14" rx="2"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/><path d="M6 10h12"/>'), word: "Metro", pron: "мэ́троу", trans: "метро", single: true },
  { cat: "8. Транспорт", icon: svg('<circle cx="8" cy="16" r="4"/><circle cx="16" cy="16" r="4"/><path d="M8 12l4-8 4 8"/>'), word: "Scooter", pron: "ску́тэ", trans: "самокат", plural: "Scooters", pronP: "ску́тэз", transP: "самокаты" },
  { cat: "8. Транспорт", icon: svg('<circle cx="8" cy="16" r="4"/><circle cx="16" cy="16" r="4"/><path d="M8 12l4-8 4 8"/>'), word: "Motorcycle", pron: "мо́утэсайкл", trans: "мотоцикл", plural: "Motorcycles", pronP: "мо́утэсайклз", transP: "мотоциклы" },

  // 9. ШКОЛА И ИГРЫ
  { cat: "9. Школа и игры", icon: svg('<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M12 6v12M8 6v12M16 6v12"/>'), word: "Book", pron: "бук", trans: "книга", plural: "Books", pronP: "букс", transP: "книги" },
  { cat: "9. Школа и игры", icon: svg('<path d="M4 20L12 4l8 16"/><path d="M8 14h8"/>'), word: "Pencil", pron: "пэ́нсил", trans: "карандаш", plural: "Pencils", pronP: "пэ́нсилз", transP: "карандаши" },
  { cat: "9. Школа и игры", icon: svg('<path d="M4 20L12 4l8 16"/><path d="M8 14h8"/>'), word: "Pen", pron: "пэн", trans: "ручка", plural: "Pens", pronP: "пэнз", transP: "ручки" },
  { cat: "9. Школа и игры", icon: svg('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>'), word: "Ball", pron: "бол", trans: "мяч", plural: "Balls", pronP: "болз", transP: "мячи" },
  { cat: "9. Школа и игры", icon: svg('<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'), word: "Doll", pron: "дол", trans: "кукла", plural: "Dolls", pronP: "долз", transP: "куклы" },
  { cat: "9. Школа и игры", icon: svg('<rect x="4" y="6" width="16" height="12" rx="2"/><circle cx="8" cy="12" r="1" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="currentColor"/>'), word: "Robot", pron: "ро́бот", trans: "робот", plural: "Robots", pronP: "ро́ботс", transP: "роботы" },

  // 10. ЦИФРЫ
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

  // 11. ГЛАГОЛЫ
  { cat: "11. Глаголы", icon: svg('<path d="M6 6l12 12M18 6L6 18"/>'), word: "Eat", pron: "иит", trans: "есть", single: true },
  { cat: "11. Глаголы", icon: svg('<path d="M6 8h12v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"/><path d="M8 8V4h8v4"/>'), word: "Drink", pron: "дринк", trans: "пить", single: true },
  { cat: "11. Глаголы", icon: svg('<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 10h16M8 18v4M16 18v4"/>'), word: "Sleep", pron: "слиип", trans: "спать", single: true },
  { cat: "11. Глаголы", icon: svg('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>'), word: "Play", pron: "плэй", trans: "играть", single: true },
  { cat: "11. Глаголы", icon: svg('<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M12 6v12M8 6v12M16 6v12"/>'), word: "Read", pron: "риид", trans: "читать", single: true },
  { cat: "11. Глаголы", icon: svg('<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 12l4-4"/>'), word: "Run", pron: "ран", trans: "бегать", single: true },
  { cat: "11. Глаголы", icon: svg('<path d="M8 6v8a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-8"/><path d="M8 6h8"/>'), word: "Walk", pron: "уо́к", trans: "ходить", single: true },
  { cat: "11. Глаголы", icon: svg('<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 12l4 4"/>'), word: "Jump", pron: "джамп", trans: "прыгать", single: true },
  { cat: "11. Глаголы", icon: svg('<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M12 6v12M8 6v12M16 6v12"/>'), word: "Study", pron: "ста́ди", trans: "учиться", single: true },
  { cat: "11. Глаголы", icon: svg('<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 10h16M8 18v4M16 18v4"/>'), word: "Rest", pron: "рэст", trans: "отдыхать", single: true },

  // 12. ЦВЕТА
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

  // 13. РАЗМЕРЫ
  { cat: "13. Размеры", icon: svg('<path d="M4 12h16M8 8v8M16 8v8"/>'), word: "Big", pron: "биг", trans: "большой", single: true },
  { cat: "13. Размеры", icon: svg('<path d="M8 12h8M10 10v4M14 10v4"/>'), word: "Small", pron: "смоол", trans: "маленький", single: true },

  // 14. ФРАЗЫ
  { cat: "14. Фразы", icon: svg('<path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18"/>'), word: "Hello", pron: "хэлло́у", trans: "Здравствуйте", single: true },
  { cat: "14. Фразы", icon: svg('<path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18"/>'), word: "Goodbye", pron: "гудба́й", trans: "До свидания", single: true },
  { cat: "14. Фразы", icon: svg('<path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18"/>'), word: "Thank you", pron: "сэ́нк ю", trans: "Спасибо", single: true },
  { cat: "14. Фразы", icon: svg('<path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18"/>'), word: "Please", pron: "плиз", trans: "Пожалуйста", single: true },
  { cat: "14. Фразы", icon: svg('<path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18"/>'), word: "Yes", pron: "йес", trans: "Да", single: true },
  { cat: "14. Фразы", icon: svg('<path d="M4 12h16M12 4v16M6 6l12 12M18 6L6 18"/>'), word: "No", pron: "ноу", trans: "Нет", single: true }
];

// ... остальные функции (showRandomCard, renderCategoryList и т.д.) оставляем без изменений ...
