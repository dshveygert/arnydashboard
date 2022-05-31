// https://sms.ru/api/send
import axios from 'axios';
import { getConfig } from '../config/config.js';
import notificationConfig from '../config/notification-config.js';
import { nowTime } from '../../utils.js';

const token = notificationConfig.sms.token;
let url = `${notificationConfig.sms.url}?api_id=${token}&json=1&to=`;
const msg = '&msg=';
const delay = getConfig('smsSendDelay') * 1000;
let lastUpdateTime = nowTime('unix');
let interval;

export function sendSMS(text = '_') {
  const now = nowTime('unix');
  if (now - lastUpdateTime > delay) {
    const messages = getConfig('smsUsers')?.map(id => {
      return `${url}${notificationConfig.sms.user[id].phone}${msg}${text !== '_' ? text : 'Alarm!+Door+is+opened!'}+${nowTime('notification').replace(/\s/g, '+')}`;
    });
    console.log('messages', messages);
    let i = 0;
    interval = setInterval(() => {
      getSmsApiRequest(messages[i]);
      i++;
      if (i >= messages.length) {
        clearInterval(interval);
      }
    }, delay + 3000);
  }
};

function getSmsApiRequest(apiUrl) {
  console.log('axios: ', apiUrl);
  axios.get(apiUrl)
      .then(({ status, data, error }) => {
        // console.log(status, data, error);
        lastUpdateTime = nowTime('unix');
      })
      .catch(function (error) {
        console.log(error);
      });
}
