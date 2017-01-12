/**
 * Test sockets
 */

'use strict';
/* jslint browser: true */
/* globals io */

var debug = require('debug')('subtasker:sockets-test');

// Setup sockets
let socket = io.connect('http://localhost:3000');
window.socket = socket;

socket.on('message', (data) => {
    debug(data);
});

socket.emit('ping');
