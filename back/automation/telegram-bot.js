// https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#events
import TelegramBot from 'node-telegram-bot-api';
import { nowTime } from '../utils.js';

import notificationConfig from './config/notification-config.js';

let bot;
let botNotifier;

function startBot() {
  bot = new TelegramBot(notificationConfig.telegram_bot.token, { polling: true });
  botNotifier = new TelegramBot(notificationConfig.telegram_bot.notifier.token, { polling: true });
  bot.on("polling_error", (err) => err ? console.log(err) : console.log('No T-Bot errors'));
  botNotifier.on("polling_error", (err) => err ? console.log('notify:', err) : console.log('No T-Bot errors'));
  sendMessage(`Started. ${nowTime()}`);
}

export function sendMessage(text = '', userId = 0) {
  // if (!debounceMessages(text)) return;
  return bot.sendMessage(notificationConfig.telegram_bot.user[ userId ].id, text);
}
export function notifyMessage(text = '', userId = 0) {
  // if (!debounceMessages(text)) return;
  return botNotifier.sendMessage(notificationConfig.telegram_bot.user[ userId ].id, text);
}

export function init() {
  startBot();
}
