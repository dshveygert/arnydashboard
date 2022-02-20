const gpio = require('./gpio');
const ambient = require('./automation/ambient-light');

gpio.init();

ambient.init();
