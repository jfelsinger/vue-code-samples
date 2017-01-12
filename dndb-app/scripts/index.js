'use strict';
/* jslint browser: true */

require('./main');
let vms = window.vms;

// vms
vms.app = require('./view-models/app')();
