import {gpioValue} from './gpio.js';
import {nowTime} from '../utils.js';
import {getConfig, setConfig} from './config/config.js';
import {alarmQueue, notifyQueue} from './telegram-bot.js';

const doorPin = 'in23';

export function sendNotification(text = 'Door opened') {
    const status = getConfig('notification');
    const alarm = getConfig('alarm');
    const users = getConfig('notificationUsers');
    if (!!status && !alarm) {
        // notifyMessage(`${text} at ${nowTime('notification')}`, users[0]);
        notifyQueue.add({text: `${text} at ${nowTime('notification')}`, userId: users[0]});
        if (users[1]) {
            notifyQueue.add({text: `${text} at ${nowTime('notification')}`, userId: users[1]});
        }
    }
}

export function sendAlarm(text = 'Alarm !!! Door opened') {
    const alarm = getConfig('alarm');
    const users = getConfig('alarmUsers');
    if (!!alarm) {
        alarmQueue.add({text: `${text} at ${nowTime('notification')}`, userId: users[0]});
        alarmQueue.add({text: `${text} at ${nowTime('notification')}`, userId: users[1]});
    }
}

export function init() {
    console.log('Door alarm init');
    gpioValue(doorPin).watch((err, value) => {
        if (err) {
            console.log('Alarm. Door pin getting error');
            return;
        }
        if (!!value) {
            sendNotification();
            sendAlarm();
            setConfig('doorOpenedAt', nowTime());
        }
    })
}

function destroy() {

}

process.on('SIGINT', _ => {
    destroy();
});
