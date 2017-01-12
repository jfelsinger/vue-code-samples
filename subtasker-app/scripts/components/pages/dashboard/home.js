'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:dashboard-home');

let Vue = require('vue'),
    loadTemplate = require('../../../lib/load-template'),
    BPromise = require('bluebird');

// Components
// require('../...');

window.v.components.pageDashboardHome =
module.exports =
Vue.component('page-dashboard-home', loadTemplate({
    template: '/tmpl/dashboard/home',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
    }),

    created: function() {
        window.v.dashboardHomePage = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
