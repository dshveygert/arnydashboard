import { gpioValue, turnOn, turnOff } from './gpio.js';
import { nowTime } from '../utils.js';
import { getConfig } from './config/config.js';

const doorPin = 'in23';
const lightPin = 'out26';
let now;
let start = 0;
let interval;

function checkDuration() {
  now = +nowTime('unix');
  if ((now - start) > getConfig('hallLightPeriod') * 1000) {
    clearDuration();
    turnOff('lightPin');
  }
}
function clearDuration() {
  clearInterval(interval);
  start = +nowTime('unix');
  console.log('clearDuration at', start, ' = ', nowTime());
}

function lightOn() {
  clearDuration();
  turnOn(lightPin);
  interval = setInterval(checkDuration, getConfig('hallLightPending') * 1000);
}

export function init() {
  console.log('HallLight init');
  gpioValue(doorPin).watch((err, value) => {
    if (err) {
      console.log('Door pin getting error');
      return;
    }
    if (!!value) {
      console.log(`Door opened at `, nowTime());
      lightOn();
    }
  })
}

function destroy() {

}

process.on('SIGINT', _ => {
  destroy();
});
