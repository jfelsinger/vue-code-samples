'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:errors:404');

let Vue = require('vue'),
    loadTemplate = require('../../../lib/load-template'),
    BPromise = require('bluebird');

// Components
// require('../...');

window.v.components.error404 =
module.exports =
Vue.component('page-404', loadTemplate({
    template: '/tmpl/errors/404',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
    }),

    created: function() {
        window.v.error404Page = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
