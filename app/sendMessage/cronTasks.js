const cron = require('node-cron');
const moment = require('moment-timezone');
const { sendWhatsAppMessage } = require('./whatsappService');
const Client = require('../client/Client');
const { Op } = require('sequelize');

// Ежедневная проверка в 11:52 по времени Алматы
cron.schedule('34 15 * * *', async () => {
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

    if (diff === 5) {
      await sendBirthdayGreeting(client);
    }
  } catch (error) {
    console.error(`Ошибка при проверке дня рождения клиента ${client.name}:`, error);
  }
}

// Функция для отправки поздравления с днем рождения
async function sendBirthdayGreeting(client) {
  try {
    const message = `Здравствуйте${client.name ? `, ${client.name}` : ''}! Мы поздравляем Вас с наступающим днем рождения и приглашаем Вас отметить этот праздник в нашей сауне!`;
    await sendWhatsAppMessage(client.phone, message);
    console.log(`Message sent to ${client.phone}`);
  } catch (error) {
    console.error(`Failed to send message to ${client.phone}:`, error);
  }
}

// Функция для отправки поздравлений по праздникам
async function performScheduledTask(message, pr = 'general') {
  try {
    let clients;

    if (pr === 'general') {
      clients = await Client.findAll({
        where: {
          phone: {
            [Op.ne]: null,
            [Op.ne]: ''
          }
        }
      });
    } else if (pr === 'man') {
      clients = await Client.findAll({
        where: {
          phone: {
            [Op.ne]: null,
            [Op.ne]: ''
          },
          gender: 'муж'
        }
      });
    } else if (pr === 'woman') {
      clients = await Client.findAll({
        where: {
          phone: {
            [Op.ne]: null,
            [Op.ne]: ''
          },
          gender: 'жен'
        }
      });
    }

    for (const client of clients) {
      await sendHolidayGreeting(client, message);
    }
  } catch (error) {
    console.error(`Ошибка при выполнении задачи по праздникам:`, error);
  }
}

// Функция для отправки праздничного поздравления с указанием скидки
async function sendHolidayGreeting(client, message) {
  try {
    const personalizedMessage = `Здравствуйте${client.name ? `, ${client.name}` : ''}! ${message} В честь праздника, мы предоставляем вам скидку 10%!`;
    await sendWhatsAppMessage(client.phone, personalizedMessage);
    console.log(`Message sent to ${client.phone}`);
    
    // Задержка перед отправкой следующего сообщения
    await new Promise(resolve => setTimeout(resolve, 3000));
  } catch (error) {
    console.error(`Failed to send message to ${client.phone}:`, error);
  }
}

// Расписание задач на праздники
cron.schedule('0 11 26 12 *', async () => {
  await performScheduledTask('Поздравляeм с наступающим Новым годом!');
});

cron.schedule('0 11 3 3 *', async () => {
  await performScheduledTask('Поздравляeм с Международным женским днем!', 'woman');
});

cron.schedule('0 11 2 5 *', async () => {
  await performScheduledTask('Поздравляeм с Днем Защитника Отечества', 'man');
});

cron.schedule('0 11 16 3 *', async () => {
  await performScheduledTask('Поздравляeм с Наурызом!');
});





