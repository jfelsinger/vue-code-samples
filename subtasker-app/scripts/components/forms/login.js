'use strict';
/* jslint browser:true */

//
// TODO:
//  * Form Validation
//  * Failure Notifications
//

let debug = require('debug')('subtasker:cmpt:login-form');

import Vue from 'vue';
import loadTemplate from '../../lib/load-template';
// import BPromise from 'bluebird';

import auth from '../../models/auth';

// Components
// require('../...');

window.v.components.loginForm =
module.exports =
Vue.component('form-login', loadTemplate({
    template: '/tmpl/forms/login',

    data: () => ({
        form: {
            username: '',
            password: '',
        },
        auth: auth, // This works for now.
        errors: [],
    }),

    created: function() {
        window.v.loginForm = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        login: function() {
            debug('submit');
            auth.login(this.$data.form)
                .spread((data) => {
                    this.isAuthenticated = auth.isAuthenticated;
                    debug('login success: ', data);
                })
                .catch((err) => {
                    this.isAuthenticated = auth.isAuthenticated;
                    debug('login err: ', err);
                });
        },

        logout: function() {
            auth.logout();
            this.isAuthenticated = auth.isAuthenticated;
        },
    },
}));
