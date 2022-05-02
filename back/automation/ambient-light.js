import * as gpio from './gpio.js';
import sun from 'sun-time';

const location = [55.030518, 82.925092];
let timeOn = [21, 0];
let timeOff = [8, 0];
const pingPeriod = 5 * 1000; // 5 sec
const pingPeriodSun = 86000 * 1000; // 23,3 h
let intervalOn;
let sunTimeInterval;

function sunTimeCalculate() {
  const {rise, set} = sun(location, new Date(), {format:"24h"});
  timeOn = set && set.split(':');
  timeOn = [+timeOn[0], +timeOn[1]];
  timeOff = rise && rise.split(':');
  timeOff = [+timeOff[0], +timeOff[1]];
}

function ambientToggler() {
  const nowDate = new Date();
  const hour = nowDate.getHours();
  const min = nowDate.getMinutes();
  // console.log('nowDate hours', hour);
  // console.log('nowDate minutes', min);
  if (timeOn[0] === hour && timeOn[1] === min) {
    gpio.turnOn('out16');
    gpio.turnOn('out4');
  }
  if (timeOff[0] === hour && timeOff[1] === min) {
    gpio.turnOff();
  }
  // console.log('--', gpio.status());
  // console.log('-', timeOn);
  // console.log('-', timeOff);
  // console.log('=', gpio.statusPins());
}

export function init() {
  intervalOn = setInterval(ambientToggler, pingPeriod);
  sunTimeCalculate();
  sunTimeInterval = setInterval(sunTimeCalculate, pingPeriodSun);
}

function destroy() {
  clearInterval(intervalOn);
  clearInterval(sunTimeInterval);
}

process.on('SIGINT', _ => {
  destroy();
});

//
// module.exports = {
//   init,
//   destroy
// }
