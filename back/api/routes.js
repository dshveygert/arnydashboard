import { Router } from 'express';
import bodyParser from 'body-parser';
import { statuses, statusByName, updateStatus } from './controllers/gpio-controller.js';
import { goOut, settingByName, settings, updateSettings } from './controllers/settings-controller.js';
const router = Router();
const api = '/api';
const gpioAPI = `${api}/gpio`;
const settingsAPI = `${api}/settings`;

router.get(`${gpioAPI}/status`, statuses);

router.get(`${gpioAPI}/status/:pinName`, statusByName);

router.put(`${gpioAPI}/status`, bodyParser.json(), updateStatus);

router.get(`${settingsAPI}`, settings);

router.get(`${settingsAPI}/:key`, settingByName);

router.put(`${settingsAPI}`, bodyParser.json(), updateSettings);

router.put(`${settingsAPI}/goout`, bodyParser.json(), goOut);

export default router;
