'use strict';
/* jslint browser:true */

let debug = require('debug')('dndb:vms:app');

let Vue = require('vue');
// let socket = require('../lib/socket');

module.exports = Vue.extend({
    data: function() {
        return {
            isLoaded: false,

            settings: {
            },
        };
    },

    ready: function() {
        this.isLoaded = true;
        window.addEventListener('contextmenu', this.contextMenuHandler);
    },

    methods: {
        openDevTools: function() {
            // socket.emit('window:openDevTools');
        },

        keypress: function(e) {
            debug('keypress event: ', e);
        },

        keydown: function(e) {
            debug('keydown event: ', e);

            if (e.which === 123) // <f12>
                return;
            // else:
        },

        keyup: function(e) {
            debug('keyup event: ', e);

            if (e.which === 123) // <f12>
                return;
            // else:
        },

        mousedown: function(e) {
            debug('mousedown event: ', e);
        },

        mouseup: function(e) {
            debug('mouseup event: ', e);
        },

        mousewheel: function(e) {
            debug('mousewheel event: ', e);
        },

        contextMenuHandler: function(e) {
            debug('contextMenu event: ', e);
        },
    }
});
