// https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#events
import TelegramBot from 'node-telegram-bot-api';
import {debounceMessages, MessageQueue, nowTime} from '../utils.js';

import notificationConfig from './config/notification-config.js';

let bot;
let botNotifier;

function startBot() {
    bot = new TelegramBot(notificationConfig.telegram_bot.token, {polling: true});
    botNotifier = new TelegramBot(notificationConfig.telegram_bot.notifier.token, {polling: true});
    bot.on("polling_error", (err) => err ? console.log(err) : console.log('No T-Bot errors'));
    botNotifier.on("polling_error", (err) => err ? console.log('notify:', err) : console.log('No T-Bot errors'));
}

export function sendMessage(text = '', userId = 0) {
    return bot.sendMessage(notificationConfig.telegram_bot.user[userId].id, text);
}

export function notifyMessage(text = '', userId = 0) {
    return botNotifier.sendMessage(notificationConfig.telegram_bot.user[userId].id, text);
}

export let alarmQueue;
export let notifyQueue;

export function init() {
    console.log('Telegram bot init');
    startBot();
    alarmQueue = new MessageQueue(sendMessage, 3);
    alarmQueue.init();
    notifyQueue = new MessageQueue(notifyMessage, 7);
    notifyQueue.init();
    alarmQueue.add({text: `Started. ${nowTime()}`, userId: 0});
}
