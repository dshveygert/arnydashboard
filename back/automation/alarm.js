import { gpioValue } from './gpio.js';
import { debouncePeriod, nowTime } from '../utils.js';
import { getConfig, setConfig } from './config/config.js';
import { notifyMessage, sendMessage } from './telegram-bot.js';
import { sendSMS } from './sms/sms-notification.js';

const doorPin = 'in23';

export function sendNotification(text = 'Door opened') {
  const status = getConfig('notification');
  const alarm = getConfig('alarm');
  const users = getConfig('notificationUsers');
  if (!!status && !alarm) {
    notifyMessage(`${text} at ${nowTime('notification')}`, users[0]);
    if (users[1]) {
      setTimeout(() => {
        notifyMessage(`${text} at ${nowTime('notification')}`, users[1]);
      }, debouncePeriod + 1000);
    }
  }
}

export function sendAlarm(text = 'Alarm !!! Door opened') {
  const alarm = getConfig('alarm');
  const users = getConfig('alarmUsers');
  if (!!alarm) {
    sendMessage(`${text} at ${nowTime('notification')}`, users[0]);
    if (users[1]) {
      setTimeout(() => {
        sendMessage(`${text} at ${nowTime('notification')}`, users[1]);
      }, debouncePeriod + (5 * 1000));
    }
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
      setConfig('doorOpenedAt', nowTime());
      // sendSmsNotification();
    }
  })
}

function destroy() {

}

process.on('SIGINT', _ => {
  destroy();
});
