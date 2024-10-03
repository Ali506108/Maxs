// whatsappService.js
const { body } = require('express-validator');
const twilio = require('twilio');
require('dotenv').config();

const accountSid =  'AC75368e6d4fdcb5acae5da692b27e1bf8'; 
const authToken =  '8c8bcdad29f2f86efa4883b2bf00396a'; 
const client = new twilio(accountSid, authToken);

async function sendWhatsAppTemplateMessage(phone, 
  contentSid  ,
    
  ) {
  try {
    const message = await client.messages.create({
      from: 'whatsapp:+77759852751', 
      to: `whatsapp:${phone}`, 
      contentSid,
    });
    console.log(`Message sent to ${phone}`);
  } catch (error) {
    console.error(`Failed to send message to ${phone}:`, error);
  }
}

module.exports = {
  sendWhatsAppTemplateMessage
}