import {gpioValue, isStatusPinOn} from './gpio.js';
import {nowTime} from '../utils.js';
import {getConfig} from './config/config.js';
import {sendMessage} from './telegram-bot.js';

const waterAlarmPin = 'in17';

export function sendWaterAlarm(text = 'Water alarm!') {
    const users = getConfig('notificationUsers');
    sendMessage(`${text} at ${nowTime('notification')}`, users[0]);
    sendMessage(`${text} at ${nowTime('notification')}`, users[1]);
}

export function init() {
    const pinValue = isStatusPinOn(waterAlarmPin);
    const message = pinValue ? ' Water tap is opened' : 'Water tap is closed';
    const users = getConfig('notificationUsers');
    console.log('WaterAlarm init.', message);
    sendMessage(message, users[0]);
    gpioValue(waterAlarmPin).watch((err, value) => {
        if (err) {
            console.log('Alarm. WaterAlarm pin getting error');
            return;
        }
        if (!!value) {
            sendWaterAlarm();
        }
    })
}

function destroy() {

}

process.on('SIGINT', _ => {
    destroy();
});
