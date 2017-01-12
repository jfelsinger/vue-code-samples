'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:reset');

let Vue = require('vue'),
    loadTemplate = require('../../lib/load-template'),
    BPromise = require('bluebird');

// Components
// require('../...');

window.v.components.pageReset =
module.exports =
Vue.component('page-reset', loadTemplate({
    template: '/tmpl/password-reset',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
    }),

    created: function() {
        window.v.resetPage = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
