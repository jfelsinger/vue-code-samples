'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:cmpt:change-plan-form');

import Vue from 'vue';
import loadTemplate from '../../lib/load-template';
import auth from '../../models/auth';
import {client} from '../../lib/rest-client';

window.v.components.planChangeForm =
module.exports =
Vue.component('form-change-plan', loadTemplate({
    template: '/tmpl/forms/change-plan',

    data: () => ({
        isSubmitted: false,
        isLoading: false,
        isSuccessful: false,
        isError: false,

        form: {
            plan:'free',
        },

        auth: auth,

        errors: [],
    }),

    created: function() {
        window.v.planChangeForm = this;
        debug('created');
    },

    ready: function() {
        debug('ready');
        this.form.plan = auth.plan;
    },

    methods: {
        updatePlan: function() {
            this.isSubmitted = true;
            this.isLoading = true;

            client
                .users.id('me').action('plan')
                .post()
                .send(this.form)
                .spread((data) => {
                    this.isLoading = false;
                    this.isSuccessful = true;
                    debug('success: ', data);

                    return auth.refresh();
                })
                .catch((err) => {
                    this.isLoading = false;
                    this.isSuccessful = false;
                    debug('failed: ', err);
                });
        },
    },
}));
