import { getAllConfigs, getConfig, setConfig } from '../../automation/config/config.js';
import notificationConfig from '../../automation/config/notification-config.js';
import { turnOff } from '../../automation/gpio.js';

export const settings = async (req, res) => {
  const status = getAllConfigs();
  res.status(200).json(prepareSettingsData(status));
}

export const settingByName = async (req, res) => {
  const key = req.params && req.params['key'];
  const r = (key === 'alarmUsers' || key === 'notificationUsers') ? getUsersList(getConfig(key)) : getConfig(key);
  res.status(200).json(r);
}

export const updateSettings = async (req, res) => {
  const {key, value} = req.body ?? {};
  console.log('key, value', key, value);
  setConfig(key, value)
  // const r = getConfig(key);
  // res.status(200).json(r);
  return settings(req, res);
}

export const goOut = async (req, res) => {
  const key = 'imGoOut';
  eventsWhenGoOut();
  setConfig(key, 1)
  // const r = getConfig(key);
  // res.status(200).json(r);
  return settings(req, res);
}

function getUsersList(list) {
  return list.map(item => getUserData(item));
}

function getUserData(id) {
  const users = notificationConfig.telegram_bot.user;
  return {
    id,
    name: users[id]?.name,
    telegramId: users[id]?.id
  };
}

function prepareSettingsData(status) {
  const r = {};
  Object.keys(status).map(key => {
    r[key] = status[key];
    if (key === 'alarmUsers' || key === 'notificationUsers') {
      r[key] = getUsersList(status[key]);
    }
  })
  return r;
}

function eventsWhenGoOut() {
  const key = 'imGoOut';
  const notification = 'notification';
  let timeout;
  if (getConfig(notification) === 1) {
    setConfig(notification, 0);
    timeout = setTimeout(() => {
      setConfig(notification, 1);
      setConfig(key, 0);
      turnOff();
      clearTimeout(timeout);
    }, getConfig('imGoOutTimeout') * 1000);
  }
}
