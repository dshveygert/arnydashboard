import { Router } from 'express';
import bodyParser from 'body-parser';
import { statuses, statusByName, updateStatus, gpioList } from './controllers/gpio-controller.js';
import { goOut, settingByName, settings, updateSettings } from './controllers/settings-controller.js';
import { testAlarm, testNotification } from './controllers/tests-controller.js';
const router = Router();
const api = '/api';
const gpioAPI = `${api}/gpio`;
const settingsAPI = `${api}/settings`;
const testsAPI = `${api}/tests`;

// GPIO

router.get(`${gpioAPI}/status`, statuses);

router.get(`${gpioAPI}/status/:pinName`, statusByName);

router.put(`${gpioAPI}/status`, bodyParser.json(), updateStatus);

router.get(`${gpioAPI}/list`, gpioList);

// Settings

router.get(`${settingsAPI}`, settings);

router.get(`${settingsAPI}/:key`, settingByName);

router.put(`${settingsAPI}`, bodyParser.json(), updateSettings);

router.put(`${settingsAPI}/goout`, bodyParser.json(), goOut);

// Tests

router.put(`${testsAPI}/alarm`, bodyParser.json(), testAlarm);

router.put(`${testsAPI}/notification`, bodyParser.json(), testNotification);

export default router;
