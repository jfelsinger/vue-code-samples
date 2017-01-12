'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:dashboard-billing');

let Vue = require('vue'),
    loadTemplate = require('../../../lib/load-template'),
    BPromise = require('bluebird');

// Components
// require('../...');

window.v.components.pageDashboardBilling =
module.exports =
Vue.component('page-dashboard-billing', loadTemplate({
    template: '/tmpl/dashboard/billing',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
    }),

    created: function() {
        window.v.dashboardBillingPage = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
