const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

async function sendWhatsAppMessage(phone, message) {
  try {
    await client.messages.create({
      body: message,
      from: 'whatsapp:14155238886', // Twilio Sandbox номер
      to: `whatsapp:${phone}`,
    });
    console.log(`Message sent to ${phone}`);
  } catch (error) {
    console.error(`Failed to send message to ${phone}:`, error);
  }
}

module.exports = { sendWhatsAppMessage };




// const twilio = require('twilio');
// require('dotenv').config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

// // Динамический импорт для p-limit
// async function getPLimit() {
//   return (await import('p-limit')).default;
// }

// async function sendWhatsAppMessage(phone, message) {
//   try {
//     await client.messages.create({
//       body: message,
//       from: 'whatsapp:14155238886', // Twilio Sandbox номер
//       to: `whatsapp:${phone}`,
//     });
//     console.log(`Message sent to ${phone}`);
//   } catch (error) {
//     console.error(`Failed to send message to ${phone}:`, error);
//   }
// }

// async function sendMessagesToClients(clients) {
//   const pLimit = await getPLimit();
//   const limit = pLimit(1); // Ограничение на задачи
//   const batchSize = 5;

//   for (let i = 0; i < clients.length; i += batchSize) {
//     const batch = clients.slice(i, i + batchSize);

//     await Promise.all(
//       batch.map(client =>
//         limit(() => sendWhatsAppMessage(client.phone, `Здравствуйте, ${client.name}! Мы поздравляем Вас!`))
//       )
//     );

//     if (i + batchSize < clients.length) {
//       console.log('Waiting for 1 minute...');
//       await new Promise(resolve => setTimeout(resolve, 60000));
//     }
//   }
// }

// module.exports = { sendWhatsAppMessage, sendMessagesToClients };
