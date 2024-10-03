const cron = require('node-cron');
const moment = require('moment-timezone');
const { sendWhatsAppTemplateMessage } = require('./whatsappService');
const Client = require('../client/Client');
const { Op } = require('sequelize');

// Хранение отправленных сообщений в памяти
const sentBirthdayMessages = new Set();

// Ежедневная проверка в 11:52 по времени Алматы
cron.schedule('8 12 * * *', async () => {
  try {
    const today = moment().tz('Asia/Almaty').startOf('day');
    console.log(`Сегодня: ${today.format('YYYY-MM-DD')}`);

    // Получаем всех клиентов из базы данных
    const clients = await Client.findAll({
      where: {
        phone: {
          [Op.ne]: null,
          [Op.ne]: ''
        },
        birthday: {
          [Op.ne]: null,
          [Op.ne]: ''
        }
      }
    });
    console.log(`Найдено клиентов: ${clients.length}`);

    // Проверяем дни рождения клиентов
    for (const client of clients) {
      await checkBirthdayWithDelay(client, today);
    }
  } catch (error) {
    console.error('Ошибка при выполнении задачи:', error);
  }
});

// Функция для проверки и отправки поздравления с задержкой
async function checkBirthdayWithDelay(client, today) {
  const delay = 3000; // Задержка между сообщениями
  await checkBirthday(client, today);

  // Задержка перед отправкой следующего сообщения
  await new Promise(resolve => setTimeout(resolve, delay));
}

// Функция для проверки и отправки поздравления с днем рождения
async function checkBirthday(client, today) {
  try {
    const birthday = moment(client.birthday, 'YYYY-MM-DD').tz('Asia/Almaty');
    const birthdayThisYear = birthday.year(today.year());

    const diff = birthdayThisYear.diff(today, 'days');
    console.log(`Разница в днях до дня рождения клиента ${client.name}: ${diff}`);

    // Проверка, не отправлено ли сообщение ранее
    const clientKey = `${client.phone}_${today.year()}`; // Уникальный ключ для клиента и года

    if (diff === 5 && !sentBirthdayMessages.has(clientKey)) {
      await sendBirthdayGreeting(client);
      sentBirthdayMessages.add(clientKey); // Добавляем клиента в список отправленных сообщений
    }
  } catch (error) {
    console.error(`Ошибка при проверке дня рождения клиента ${client.name}:`, error);
  }
}

// Функция для отправки поздравления с днем рождения
async function sendBirthdayGreeting(client) {
  try {
    const contentSid = 'HXaadddcd4b23e846e57d6ee76a1779ecb';

    await sendWhatsAppTemplateMessage(client.phone, contentSid , );
    console.log(`Сообщение отправлено ${client.phone}`);
  } catch (error) {
    console.error(`Не удалось отправить сообщение ${client.phone}:`, error);
  }
}






async function getClients(pr) {
  const whereCondition = {
    phone: {
      [Op.ne]: null,
      [Op.ne]: ''
    }
  };

  if (pr === 'man') {
    whereCondition.gender = 'муж';
  } else if (pr === 'woman') {
    whereCondition.gender = 'жен';
  }

  return await Client.findAll({ where: whereCondition });
}

async function performScheduledTask(templateId, pr = 'general') {
  try {
    const clients = await getClients(pr);

    // Отправка сообщений параллельно
    await Promise.all(clients.map(client => sendHolidayGreeting(client, templateId)));
  } catch (error) {
    console.error(`Ошибка при выполнении задачи по праздникам:`, error);
  }
}

async function sendHolidayGreeting(client, templateId) {
  try {
    // Отправка сообщения, используя только идентификатор шаблона
    await sendWhatsAppTemplateMessage(client.phone, templateId);
    console.log(`Сообщение отправлено на ${client.phone}`);

    // Задержка перед отправкой следующего сообщения
    await new Promise(resolve => setTimeout(resolve, 3000));
  } catch (error) {
    console.error(`Не удалось отправить сообщение на ${client.phone}:`, error);
  }
}

// Расписание задач на праздники
cron.schedule('0 11 26 12 *', async () => {
  await performScheduledTask('HX03e240e83af2500ef19a5d62668296d0'); // ID шаблона для Нового года
});

cron.schedule('0 11 3 3 *', async () => {
  await performScheduledTask('HX136d99b10129d221f216e0cacc879b00', 'woman'); // ID шаблона для 8 марта
});

cron.schedule('0 11 2 5 *', async () => {
  await performScheduledTask('HX54aedbfef355dfdb268b2c17bdab08f4', 'man'); // ID шаблона для Дня Защитника Отечества
});

cron.schedule('0 11 16 3 *', async () => {
  await performScheduledTask('HXd84d4aeb7db803948f4fbbcfc9c760aa'); // ID шаблона для Наурыза
});





cron.schedule('13 15 3 10 *', async () => {
  await performScheduledTask('HX03e240e83af2500ef19a5d62668296d0'); // ID шаблона для Нового года
});






