/**
 * app.js
 *
 * Main app component
 */

'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:app');
debug = () => { };

import Vue from 'vue';
import auth from './models/auth';
import {client} from './lib/rest-client';

// Include other components
// require('./page-component');

window.v.app =
module.exports =
Vue.extend({
    data: () => ({
        settings: {
        },
    }),

    ready: function() {
        console.log('auth ready up...');

        auth.loadAuth();

        window.authModel = auth;
        window.addEventListener('contextmenu', this.contextMenuHandler);
    },

    events: {
        'submit-stripe_success': function(stripeResponse) {
            debug('setting user stripe token...');
            client
                .users.id('me').action('billing')
                .post()
                .send({
                    stripeToken: stripeResponse.id,
                })
                .then(() => {
                    debug('user stripe token set');
                })
                .catch((err) => {
                    debug('failed: user stripe token set', err);
                });
        },
    },

    methods: {
        // Key Event

        keypress: function(e) {
            debug('keypress event: ', e);
        },

        keydown: function(e) {
            debug('keydown event: ', e);
        },

        keyup: function(e) {
            debug('keyup event: ', e);
        },

        // Mouse Event

        mousewheel: function(e) {
            debug('mousewheel event: ', e);
        },

        mousedown: function(e) {
            debug('mousedown event: ', e);
        },

        mouseup: function(e) {
            debug('mouseup event: ', e);
        },

        contextMenuHandler: function(e) {
            debug('contextMenu event: ', e);
        },
    },
});
