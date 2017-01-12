/**
 * main.js
 *
 * Standard scripts to be ran on every page, all pages-specific scripts should
 * include this file
 */

'use strict';
/* jslint browser: true */

// Setup globals
window._debug = require('debug');
window.v = {};
window.v.vms = {};
window.v.components = {};

window._debug.enable('*');


require('./includes');
