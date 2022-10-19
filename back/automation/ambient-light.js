import sun from 'sun-time';
import * as gpio from './gpio.js';
import { getConfig, setConfig } from './config/config.js';

const location = [55.030518, 82.925092];
let timeOn = [21, 0];
let timeOff = [8, 0];
const pingPeriod = 900 * 1000; // 15 min
const pingPeriodSun = 86340 * 1000; // 23.59 h
let intervalOn;
let sunTimeInterval;

function sunTimeCalculate() {
  const {rise, set} = sun(location, new Date(), {format:"24h"});
  timeOn = set && set.split(':');
  timeOn = [+timeOn[0], +timeOn[1]];
  timeOff = rise && rise.split(':');
  timeOff = [+timeOff[0], +timeOff[1]];
  ambientLightPeriod();
}

function ambientToggler() {
  if (getConfig('nightAmbientLightStatus') !== 1) {
    return;
  }
  const nowDate = new Date();
  const hour = +nowDate.getHours();
  const min = +nowDate.getMinutes();
  const pins = getConfig('ambientIds') ?? [];
  const isTimeForLightOn = (hour > +timeOn[0] || ( +timeOn[0] === hour && min >= +timeOn[1] )) || (hour < +timeOff[0] || (+timeOff[0] === hour && min < +timeOff[1]));
  console.log('isTimeForLightOn', isTimeForLightOn.toString());
  const isTimeForLightOff = (hour < +timeOn[0] || ( +timeOn[0] === hour && min <= +timeOn[1] )) && (hour > +timeOff[0] || (+timeOff[0] === hour && min > +timeOff[1]));
  console.log('isTimeForLightOff', isTimeForLightOff.toString());
   console.log('nowDate hours', hour);
   console.log('nowDate minutes', min);
  if (isTimeForLightOn) {
    pins.forEach(item => {
      gpio.turnOn(item);
    });
  } else if (isTimeForLightOff) {
    gpio.turnOff();
  }
   console.log('-', timeOn);
   console.log('-', timeOff);
  // console.log('=', gpio.statusPins());
}

export function init() {
  intervalOn = setInterval(ambientToggler, pingPeriod);
  sunTimeCalculate();
  sunTimeInterval = setInterval(sunTimeCalculate, pingPeriodSun);
}

export function ambientLightPeriod() {
  const time = {timeOn, timeOff};
  console.log('ambientLightPeriod', time);
  setConfig('ambientLightPeriod', time);
  return time;
}

function destroy() {
  clearInterval(intervalOn);
  clearInterval(sunTimeInterval);
}

process.on('SIGINT', _ => {
  destroy();
});
