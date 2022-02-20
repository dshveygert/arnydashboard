const Gpio = require('onoff').Gpio;
const gpioConfig = {
  out4: new Gpio(4, 'out'), // 'toilet W_LED'
  out5: new Gpio(5, 'out'), // 'kids, relay, W_LED'
  out16: new Gpio(16, 'out'), // 'hall, relay, W_LED'
  out22: new Gpio(22, 'out'), // 'kids, relay, R_LED'
};

const on = 0;
const off = 1;

function turnOn(pinName) {
  if (pinName) {
    gpioConfig[pinName] && gpioConfig[pinName].writeSync(on);
  }
}

function turnOff(pinName) {
  if (pinName) {
    gpioConfig[pinName] && gpioConfig[pinName].writeSync(off);
  } else {
    Object.keys(gpioConfig).forEach(key => {
      gpioConfig[key].writeSync(off);
    })
  }
}

function statusByPin(pinName) {
  return gpioConfig[pinName] && gpioConfig[pinName].readSync();
}

function statusPins() {
  return Object.keys(gpioConfig).map(key => {
    return {key, status: gpioConfig[key].readSync()};
  })
}

function isStatusPinOn(pinName) {
  return statusByPin(pinName) === on;
}

function init() {
  turnOff();
}

function destroy() {
  turnOff();
}

process.on('SIGINT', _ => {
  destroy();
});

module.exports = {
  gpioConfig,
  turnOn,
  turnOff,
  init,
  destroy,
  statusPins
}
