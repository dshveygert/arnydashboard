import { Router } from 'express';
import bodyParser from 'body-parser';
import { statuses, statusByName, updateStatus } from './controllers/gpio-controller.js';
const router = Router();
const api = '/api';
const gpioAPI = `${api}/gpio`;

router.get(`${gpioAPI}/status`, (req, res) => statuses(req, res));

router.get(`${gpioAPI}/status/:pinName`, (req, res) => statusByName(req, res));

router.put(`${gpioAPI}/status`, bodyParser.json(), (req, res) => updateStatus(req, res));

export default router;
