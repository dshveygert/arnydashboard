import { getConfig, setConfig } from '../../automation/config/config.js';
import { sendAlarm, sendNotification } from '../../automation/alarm.js';
import { debouncePeriod } from '../../utils.js';

export const testAlarm = async (req, res) => {
  const alarm = getConfig('alarm');
  setConfig('alarm', 1);
  sendAlarm('Test of Alarm notification');
  let timeout;
  timeout = setTimeout(() => {
      setConfig('alarm', alarm);
      clearTimeout(timeout);
    }, debouncePeriod + (10 * 1000));

  const status = {
    test: {
      status: 'success',
      value: 'Alarm'
    },
  };
  console.log('status', status);
  res.status(200).json(status);
}

export const testNotification = async (req, res) => {
  const notification = getConfig('notification');
  setConfig('notification', 1);
  sendNotification('Test of Notification');
  let timeout;
  timeout = setTimeout(() => {
    setConfig('notification', notification);
    clearTimeout(timeout);
  }, debouncePeriod + (10 * 1000));

  const status = {
    test: {
      status: 'success',
      value: 'Notification'
    },
  };
  console.log('status', status);
  res.status(200).json(status);
}
