'use strict';
/* jslint browser: true */
/* globals io */

// Setup sockets
let socket = io.connect('http://localhost:4004');
window.socket = socket;

module.exports = socket;
