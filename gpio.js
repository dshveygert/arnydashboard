import { Gpio } from 'onoff';
const gpioConfig = {
  out4: {value: new Gpio(4, 'out'), description: 'toilet W_LED'},
  out5: {value: new Gpio(5, 'out'), description: 'kids, relay, W_LED'},
  out16: {value: new Gpio(16, 'out'), description: 'hall, relay, W_LED'},
  out22: {value: new Gpio(22, 'out'), description: 'kids, relay, R_LED'}
};

const on = 0;
const off = 1;

export function turnOn(pinName) {
  if (pinName) {
    gpioConfig[pinName] && gpioConfig[pinName].value.writeSync(on);
  }
}

export function turnOff(pinName) {
  if (pinName) {
    gpioConfig[pinName] && gpioConfig[pinName].value.writeSync(off);
  } else {
    Object.keys(gpioConfig).forEach(key => {
      gpioConfig[key].value.writeSync(off);
    })
  }
}

export async function switchStatusAsync(pinName, status) {
  if (pinName) {
    let error;
    const s = await gpioConfig[pinName] && gpioConfig[pinName].value.write(status, (err) => error = err);
    return {status: "success", message: error};
  }
}

export function statusByPin(pinName) {
  return gpioConfig[pinName] && gpioConfig[pinName].value.readSync();
}
export async function statusByPinAsync(pinName) {
  const s = await gpioConfig[pinName] && gpioConfig[pinName].value.read();
  return prepareStatusInfo(pinName, s)
}

export function statusPins() {
  return Object.keys(gpioConfig).map(key => {
    return prepareStatusInfo(key, gpioConfig[key].value.readSync());
  })
}
export async function statusPinsAsync() {
  const arrayAsync = Object.keys(gpioConfig).map(key => gpioConfig[key].value.read())
  const s = await Promise.all(arrayAsync);
  return s.map((v, i) => prepareStatusInfo(Object.keys(gpioConfig)[i], v));
}

export function isStatusPinOn(pinName) {
  return statusByPin(pinName) === on;
}

export function init() {
  turnOff();
}

export function destroy() {
  turnOff();
}

function prepareStatusInfo(gpio, status) {
  return {key: gpio, status: status, description: gpioConfig[gpio].description};
}

process.on('SIGINT', _ => {
  destroy();
});
