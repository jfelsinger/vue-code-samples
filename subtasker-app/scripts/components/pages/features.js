'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:features');

let Vue = require('vue'),
    loadTemplate = require('../../lib/load-template'),
    BPromise = require('bluebird');

// Components
// require('../...');

window.v.components.pageFeatures =
module.exports =
Vue.component('page-features', loadTemplate({
    template: '/tmpl/features',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
    }),

    created: function() {
        window.v.featuresPage = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
