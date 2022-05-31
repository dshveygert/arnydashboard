import { gpioValue } from './gpio.js';
import { nowTime } from '../utils.js';
import { getConfig } from './config/config.js';
import { notifyMessage, sendMessage } from './telegram-bot.js';
import { sendSMS } from './sms/sms-notification.js';

const doorPin = 'in23';

function sendNotification() {
  const status = getConfig('notification');
  const users = getConfig('notificationUsers');
  if (!!status) {
    users.forEach(id => {
      notifyMessage(`Door opened at ${nowTime('notification')}`, id);
    })
  }
}

function sendAlarm() {
  const status = getConfig('alarm');
  const users = getConfig('alarmUsers');
  if (!!status) {
    users.forEach(id => {
      sendMessage(`Alarm !!! Door opened at ${nowTime('notification')}`, id);
    })
  }
}

function sendSmsNotification() {
  const status = getConfig('alarm');
  if (!!status) {
    sendSMS();
  }
}

export function init() {
  gpioValue(doorPin).watch((err, value) => {
    if (err) {
      console.log('Alarm. Door pin getting error');
      return;
    }
    if (!!value) {
      sendNotification();
      sendAlarm();
      // sendSmsNotification();
    }
  })
}

function destroy() {

}

process.on('SIGINT', _ => {
  destroy();
});
