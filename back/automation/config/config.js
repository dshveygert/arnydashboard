// all periods in sec.
const automationConfig = {
  hallLightPeriod: 300,
  hallLightPending: 10,
  imGoOutTimeout: 60,
  alarm: 1,
  notification: 1,
  notificationUsers: [0],
  alarmUsers: [0, 1],
  smsSendDelay: 10,
  smsUsers: [0],
  doorOpenedAt: 'NoData',
  started: 'NoData',
  imGoOut: 0
}

export function getAllConfigs() {
  return automationConfig;
}

export function getConfig(key) {
  return automationConfig[key] ?? null;
}

export function setConfig(key, value) {
  if (!!automationConfig[key] || automationConfig[key] === 0 || automationConfig[key] === '') {
    automationConfig[key] = Number(value) == value ? Number(value) : value;
  }
}
