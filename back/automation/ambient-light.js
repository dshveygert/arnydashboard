import sun from 'sun-time';
import * as gpio from './gpio.js';
import { getConfig, setConfig } from './config/config.js';

const location = [55.030518, 82.925092];
let timeOn = [21, 0];
let timeOff = [8, 0];
const pingPeriod = 5 * 1000; // 5 sec
const pingPeriodSun = 36000 * 1000; // 10 h
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
  const hour = nowDate.getHours();
  const min = nowDate.getMinutes();
  const pins = getConfig('ambientIds') ?? [];
  // console.log('nowDate hours', hour);
  // console.log('nowDate minutes', min);
  if (timeOn[0] === hour && timeOn[1] === min) {
    pins.forEach(item => {
      gpio.turnOn(item);
    });
  }
  if (timeOff[0] === hour && timeOff[1] === min) {
    gpio.turnOff();
  }
  // console.log('-', timeOn);
  // console.log('-', timeOff);
  // console.log('=', gpio.statusPins());
}

export function init() {
  intervalOn = setInterval(ambientToggler, pingPeriod);
  sunTimeCalculate();
  sunTimeInterval = setInterval(sunTimeCalculate, pingPeriodSun);
}

export function ambientLightPeriod() {
  const time = {timeOn, timeOff};
  setConfig(ambientLightPeriod, time);
  return time;
}

function destroy() {
  clearInterval(intervalOn);
  clearInterval(sunTimeInterval);
}

process.on('SIGINT', _ => {
  destroy();
});
