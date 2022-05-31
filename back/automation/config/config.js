// all periods in sec.
const automationConfig = {
  hallLightPeriod: 300,
  hallLightPending: 10,
  alarm: 0,
  notification: 1,
  notificationUsers: [0],
  alarmUsers: [0, 1],
  smsSendDelay: 10,
  smsUsers: [0]
}

export function getConfig(key) {
  return automationConfig[key] ?? null;
}

export function setConfig(key, value) {
  if (!!automationConfig[key]) {
    automationConfig[key] = value;
  }
}
