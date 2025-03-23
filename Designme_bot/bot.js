const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const token = '8175431453:AAHby4tr2bt9w0hpTQNOgi10--HrdKfDiIg'; // Укажите ваш токен
const bot = new TelegramBot(token, { polling: true });

const usersFile = 'users.json';
let users = [];

// Загружаем пользователей из файла при старте
if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
}

// ID администратора
const adminId = 1767797528; // Замените на ваш Telegram ID

// Username вашего Telegram-канала
const channelUsername = 'designme_news'; // Укажите username вашего канала

// Хештег, который нужно искать в сообщениях
const hashtag = '#дизайн_квест';

// Клавиши
const mainKeyboard = {
  reply_markup: {
    keyboard: [
      ['🥇 Баллы', '🏆 Рейтинг', '📜 Правила'], 
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};

// Проверка подписки на канал
async function isUserSubscribed(userId) {
  try {
    const member = await bot.getChatMember(`@${channelUsername}`, userId);
    return ['member', 'administrator', 'creator'].includes(member.status);
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Обработчик команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username || 'Неизвестный';

  const subscribed = await isUserSubscribed(userId);

  if (!subscribed) {
    bot.sendMessage(chatId, 'Чтобы вступить в ряды веб-дизайнеров, подпишитесь на наш канал: https://t.me/' + channelUsername);
    return;
  }

  // Проверяем, есть ли пользователь в базе
  const userExists = users.some((user) => user.id === userId);

  if (!userExists) {
    users.push({ id: userId, username: username, rating: 0, status: 'Начинающий' });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
    bot.sendMessage(chatId, `Добро пожаловать, ${username}! Вы добавлены в список веб-дизайнеров!`, mainKeyboard);
  } else {
    bot.sendMessage(chatId, `Привет! Давно не виделись, ${username}!`, mainKeyboard);
  }  

  const socialMediaKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📸 Instagram', url: 'https://www.instagram.com/maximilian_designer' },
          { text: '✈️ Telegram', url: 'https://t.me/maximilian_courses' },
          { text: '💼 LinkedIn', url: 'https://www.linkedin.com/in/amaximilian/' },
          { text: '🎬 Youtube', url: 'https://www.youtube.com/channel/UCoBXmvFbRWaACxy0RJQsjMA' },
        ],
      ],
    },
  };

  await bot.sendMessage(chatId, 'Подпишись на наши новости:', socialMediaKeyboard);
});

// Обработчик сообщений канала
bot.on('channel_post', async (msg) => {
  console.log('Новое сообщение из канала:', msg);

  // Проверяем, содержит ли сообщение нужный хештег
  if (msg.text && msg.text.includes(hashtag)) {
    // Пересылаем сообщение всем пользователям
    users.forEach(user => {
      bot.forwardMessage(user.id, msg.chat.id, msg.message_id)
        .then(() => {
          console.log(`Сообщение отправлено пользователю ${user.username}`);
        })
        .catch(err => {
          console.error('Ошибка пересылки сообщения:', err);
        });
    });
  }
});

// Метод для получения и отображения Мои баллы
bot.onText(/🥇 Баллы/, (msg) => {
  const chatId = msg.chat.id;
  const user = users.find((user) => user.id === msg.from.id);

  if (!user) {
    bot.sendMessage(chatId, 'Вы ещё не зарегистрированы. Отправьте команду /start.');
    return;
  }

  // Сортируем пользователей по рейтингу
  const sortedUsers = [...users].sort((a, b) => b.rating - a.rating);
  const position = sortedUsers.findIndex((u) => u.id === msg.from.id) + 1;

  const responseText = `🥇 Ваше место в рейтинге: №*${position}*\n⭐ Ваши баллы: *${user.rating}*\n🎖️ Статус: *${user.status}*`;

  bot.sendMessage(chatId, responseText, { parse_mode: 'MarkdownV2' });
});

// Обработчик кнопки "Рейтинг"
bot.onText(/🏆 Рейтинг/, (msg) => {
    const chatId = msg.chat.id;
    const currentUserId = msg.from.id;
  
    if (!users.length) {
      bot.sendMessage(chatId, 'Список пользователей пуст.');
      return;
    }
  
    // Сортируем пользователей по рейтингу (от большего к меньшему)
    const sortedUsers = [...users].sort((a, b) => b.rating - a.rating);
  
    // Формируем список
    let topList = '';
    sortedUsers.forEach((user, index) => {
      const isCurrentUser = user.id === currentUserId;
      const userLine = `${index + 1}. ${isCurrentUser ? '⭐' : ''}${user.username || 'Без имени'} — ${user.rating}${isCurrentUser ? '⭐' : ''}`;
      topList += `${userLine}\n`;
    });
  
    bot.sendMessage(chatId, `🏆 Рейтинг веб-дизайнеров:\n\n${topList}`);

  });
  

// Обработчик кнопки "Инфо"
bot.onText(/📜 Правила/, (msg) => {
  const chatId = msg.chat.id;

  const infoText = `Квест-Бот для веб-дизайнеров:
1. Кнопка *🥇 Баллы* — показывает ваш текущий рейтинг.
2. Кнопка *🏆 Рейтинг* — выводит список всех пользователей с их рейтингами.
3. Участвуйте в заданиях в нашем Telegram-канале, чтобы повышать свой рейтинг.

❗️Правила
1. Поставить лайк посту в виде "💜", если хотите участвовать в проекте
2. Создается отдельная группа ТГ, если заказ не простой или добавляю в существующую группу
3. Быть ответственным и соблюдение дедлайнов, нужно доводить задачу до конца
5. По результату выполнения задания начисляются баллы
6. Баллы можно использовать для своих интересов и состязаться за первое место в Рейтинге

Ценность баллов:
⭐️x5 - в разработке
⭐️x10 - в разработке
⭐️x20 - в разработке
⭐️x50 - в разработке

Если у вас есть вопросы/нашли баг или хотите разместить рекламу, напишите мне в телеграм: [@maximilian_courses](https://t.me/maximilian_courses)`;

  bot.sendMessage(chatId, infoText, { parse_mode: 'Markdown' });
});

// Команда для изменения рейтинга (только для администратора)
bot.onText(/\/setrating (\d+) (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;

  if (msg.from.id !== adminId) {
    bot.sendMessage(chatId, 'У вас нет прав для выполнения этой команды.');
    return;
  }

  const userId = parseInt(match[1]); // ID пользователя
  const newRating = parseInt(match[2]); // Новый рейтинг

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    bot.sendMessage(chatId, 'Пользователь с таким ID не найден.');
  } else {
    users[userIndex].rating = newRating;
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
    bot.sendMessage(chatId, `Рейтинг пользователя ${users[userIndex].username} изменён на ${newRating}.`);
  }
});

//Команда для изменения статуса пользователя
bot.onText(/\/setstatus (\d+) (.+)/, (msg, match) => {
  const chatId = msg.chat.id;

  if (msg.from.id !== adminId) {
    bot.sendMessage(chatId, 'У вас нет прав для выполнения этой команды.');
    return;
  }

  const userId = parseInt(match[1]); // ID пользователя
  const newStatus = match[2]; // Новый статус

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    bot.sendMessage(chatId, 'Пользователь с таким ID не найден.');
  } else {
    users[userIndex].status = newStatus;
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
    bot.sendMessage(chatId, `Статус пользователя ${users[userIndex].username} изменён на "${newStatus}".`);
  }
});

// Команда для просмотра всех пользователей и их ID
bot.onText(/\/listusers/, (msg) => {
  if (msg.from.id !== adminId) {
    bot.sendMessage(msg.chat.id, 'У вас нет прав для выполнения этой команды.');
    return;
  }

  const userList = users
    .map((user, index) => `${index + 1}. ${user.username || 'Без имени'} (ID: ${user.id}, Рейтинг: ${user.rating})`)
    .join('\n');

  bot.sendMessage(msg.chat.id, userList || 'Список пользователей пуст.');
});

console.log('Бот успешно запущен!');