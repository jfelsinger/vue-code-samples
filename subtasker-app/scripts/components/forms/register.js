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

window.v.components.registrationForm =
module.exports =
Vue.component('form-registration', loadTemplate({
    template: '/tmpl/forms/registration',

    data: () => ({
        form: {
            username: '',
            email: '',
            password: '',
        },
        auth: auth, // This works for now.
        errors: [],
    }),

    created: function() {
        window.authModel = auth;
        window.v.registrationForm = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        register: function() {
            debug('submit');
            auth.register(this.$data.form)
                .spread((data) => {
                    this.isAuthenticated = auth.isAuthenticated;
                    debug('registration success: ', data);
                })
                .catch((err) => {
                    this.isAuthenticated = auth.isAuthenticated;
                    debug('registration err: ', err);
                });
        },

        logout: function() {
            auth.logout();
            this.isAuthenticated = auth.isAuthenticated;
        },
    },
}));
