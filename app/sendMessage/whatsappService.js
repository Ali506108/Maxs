// whatsappService.js
const { body } = require('express-validator');
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

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