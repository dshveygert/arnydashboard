import * as gpio from './back/automation/gpio.js';
import * as ambient from './back/automation/ambient-light.js';
import * as server from './back/api/index.js';

gpio.init();
server.init();
ambient.init();
