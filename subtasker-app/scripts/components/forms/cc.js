'use strict';
/* jslint browser:true */
/* globals Stripe */

let debug = require('debug')('subtasker:cmpt:cc-form');

import Vue from 'vue';
import loadTemplate from '../../lib/load-template';
// import BPromise from 'bluebird';

// Components
// require('../...');

window.v.components.ccForm =
module.exports =
Vue.component('form-cc', loadTemplate({
    template: '/tmpl/forms/cc',

    data: () => ({
        isSubmitted: false,
        isLoading: false,
        isSuccessful: false,
        isError: false,

        form: {
            ccNumber: '',
            ccExp: '',
            ccCVC: '',
            password: '',
        },

        resData: {
            last4: '',
            cardId: '',
            token: '',
        },

        resError: {
            type: '',
            code: '',
            message: '',
            param: '',
        },

        errors: [],
    }),

    computed: {
        stripeData: function() {
            return {
                number: this.form.ccNumber,
                exp:    this.form.ccExp,
                cvc:    this.form.ccCVC,
            };
        },
    },

    created: function() {
        window.v.ccForm = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        submit: function() {
            debug('submit');
            this.isSubmitted = true;
            this.isLoading = true;

            Stripe.card.createToken(this.stripeData, (status, response) => {
                this.isLoading = false;
                this.$dispatch('submit-stripe', response);

                if (status != 200 ) {
                    debug('stripe err: ', status, response);
                    this.isError = true;

                    if (response.error) {
                        this.resError.type = response.error.type;
                        this.resError.code = response.error.code;
                        this.resError.param = response.error.param;
                        this.resError.message = response.error.message;
                    }

                    this.$dispatch('submit-stripe_error', response);
                    return;
                } // else:

                debug('stripe success: ', response);
                this.isSuccessful = true;

                this.resData.last4 = response.card.last4;
                this.resData.cardId = response.card.id;
                this.resData.token = response.id;

                this.$dispatch('submit-stripe_success', response);
            });
        },
    },
}));
