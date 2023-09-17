import {gpioValue, isStatusPinOn} from './gpio.js';
import {nowTime} from '../utils.js';
import {getConfig, setConfig} from './config/config.js';
import {alarmQueue, notifyQueue} from './telegram-bot.js';

const waterAlarmPin = 'in17';

export function sendWaterAlarm(text = 'Water alarm!') {
    const users = getConfig('alarmUsers');
    alarmQueue.add({text: `${text} at ${nowTime('notification')}`, userId: users[0]})
    alarmQueue.add({text: `${text} at ${nowTime('notification')}`, userId: users[1]})
}

export function init() {
    const pinValue = isStatusPinOn(waterAlarmPin);
    const message = pinValue ? 'WaterAlarm started. Tap is opened.' : 'WaterAlarm started. Tap is closed.';
    const users = getConfig('alarmUsers');
    console.log('WaterAlarm init.');
    notifyQueue.add({text: message, userId: users[0]})
    gpioValue(waterAlarmPin).watch((err, value) => {
        if (err) {
            console.log('Alarm. WaterAlarm pin getting error');
            return;
        }
        if (!!value) {
            sendWaterAlarm();
            setConfig('waterAlarmedAt', nowTime());
        }
    })
}

function destroy() {

}

process.on('SIGINT', _ => {
    destroy();
});
