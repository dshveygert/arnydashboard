import * as gpio from './back/automation/gpio.js';
import * as ambient from './back/automation/ambient-light.js';
import * as hallLight from './back/automation/hall-light.js';
import * as bot from './back/automation/telegram-bot.js';
import * as alarm from './back/automation/alarm.js';
import * as waterAlarm from './back/automation/waterAlarm.js';

import * as server from './back/api/index.js';

gpio.init();
server.init();
ambient.init();
hallLight.init();
bot.init();
alarm.init();
waterAlarm.init();
