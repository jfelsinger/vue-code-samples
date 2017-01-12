'use strict';
/* jslint browser:true */

let debug = require('debug')('dndb:cmpt:pane-settings');

let Vue = require('vue');
let Keyboard = require('keyboardjs');

window.Keyboard = Keyboard;

window.components.paneSettings =
module.exports = 
Vue.extend({
    template: '#vue-tmpl__pane-settings',

    data: function() {
        return {
            isCapturing: false,
            wasCapturing: false,
            captureSetting: null,
            settings: {},
        };
    },

    created: function() {
        debug('created');
    },

    methods: {
        captureEvent: function(e) {
            debug(e);
        },

        startCapturing: function(settingKey, e) {
            debug('start capturing events');
            this.isCapturing = true;
            this.wasCapturing = true;

            this.captureSetting = this.settings[settingKey];

            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
        },

        keydown: function(e) {
            debug('keydown event: ', e);

            if (this.isCapturing) {

                e.stopPropagation();
                e.preventDefault();
            }
        },

        keyup: function(e) {
            debug('keyup event: ', e);

            if (this.isCapturing) {


                if ([16, 17, 18, 91, 92].indexOf(e.which) === -1) {
                    // Make sure we're no longer capturing
                    this.isCapturing = false;
                    setTimeout(() => {
                        this.wasCapturing = false;
                    }, 1);
                }

                e.stopPropagation();
                e.preventDefault();
            }
        },

        mousedown: function(e) {
            debug('mouseHandler event: ', e);

            if (this.isCapturing) {

                e.stopPropagation();
                e.preventDefault();
            }
        },

        mouseup: function(e) {
            debug('mouseHandler event: ', e);

            if (this.isCapturing) {

                // Make sure we're no longer capturing
                this.isCapturing = false;
                setTimeout(() => {
                    this.wasCapturing = false;
                }, 1);

                e.stopPropagation();
                e.preventDefault();
            }
        },

        contextMenuHandler: function(e) {
            debug('contextMenu event: ', e);

            // Hide the context menu if we're trying to capture an event
            if (this.isCapturing || this.wasCapturing) {
                e.stopPropagation();
                e.preventDefault();
            }
        },
    },
});
