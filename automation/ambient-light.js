const gpio = require('../gpio');
const timeOn = [21, 0];
const timeOff = [8, 0];
const pingPeriod = 5 * 1000; // 5 sec
let intervalOn;

function ambientToggler() {
  // console.log('timeOn', timeOn);
  // console.log('timeOff', timeOff);
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
}

function init() {
  intervalOn = setInterval(ambientToggler, pingPeriod);
}

function destroy() {
  clearInterval(intervalOn);
}

module.exports = {
  init,
  destroy
}
