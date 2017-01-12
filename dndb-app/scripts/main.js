/**
 * main.js
 *
 * Standard scripts to be ran on every page, all pages-specific scripts should
 * include this file
 */

'use strict';
/* jslint browser: true */

let _debug = require('debug'),
    debug = _debug('dndb');

_debug.enable('*');

// Setup globals
window._debug = _debug;
window.vms = {};
window.components = {};



// let socket = require('./lib/socket');
// 
// socket.on('message', data => {
//     debug(data);
// });
// socket.emit('ping');



/* ------------- ------------- ------------- */

require('./routing');
