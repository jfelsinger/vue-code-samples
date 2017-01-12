'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:pricing');

let Vue = require('vue'),
    loadTemplate = require('../../lib/load-template'),
    BPromise = require('bluebird');

// Components
// require('../...');

window.v.components.pagePricing =
module.exports =
Vue.component('page-pricing', loadTemplate({
    template: '/tmpl/pricing',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
    }),

    created: function() {
        window.v.pricingPage = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
