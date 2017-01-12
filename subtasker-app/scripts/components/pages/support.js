'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:support');

let Vue = require('vue'),
    loadTemplate = require('../../lib/load-template'),
    BPromise = require('bluebird');

// Components
// require('../...');

window.v.components.pageSupport =
module.exports =
Vue.component('page-support', loadTemplate({
    template: '/tmpl/support',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
    }),

    created: function() {
        window.v.supportPage = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
