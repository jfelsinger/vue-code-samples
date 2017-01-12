'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:about');

let Vue = require('vue'),
    loadTemplate = require('../../lib/load-template'),
    BPromise = require('bluebird');

// Components
// require('../...');

window.v.components.pageAbout =
module.exports =
Vue.component('page-about', loadTemplate('/tmpl/about', {
    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
    }),

    created: function() {
        window.v.aboutPage = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
