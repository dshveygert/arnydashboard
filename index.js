import * as gpio from './gpio.js';
import * as ambient from './automation/ambient-light.js';
import * as server from './api/index.js';

gpio.init();
server.init();
ambient.init();
