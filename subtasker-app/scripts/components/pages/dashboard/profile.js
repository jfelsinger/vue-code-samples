'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:dashboard-profile');

let Vue = require('vue'),
    loadTemplate = require('../../../lib/load-template'),
    BPromise = require('bluebird');

// Components
// require('../...');

window.v.components.pageDashboardProfile =
module.exports =
Vue.component('page-dashboard-profile', loadTemplate({
    template: '/tmpl/dashboard/profile',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
    }),

    created: function() {
        window.v.dashboardProfilePage = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
