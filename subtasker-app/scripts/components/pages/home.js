'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:page:home');

import Vue from 'vue';
import loadTemplate from '../../lib/load-template';
import BPromise from 'bluebird';

import auth from '../../models/auth';

// Components
// require('../...');

window.v.components.pageHome =
module.exports =
Vue.component('page-home', loadTemplate({
    template: '/tmpl/home',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: () => ({
        auth: auth, // This works for now.
    }),

    events: {
    },

    created: function() {
        window.v.homePage = this;
        debug('created');
    },

    ready: () => {
        debug('ready');
    },

    methods: {
        fetchData: () => BPromise.resolve({}),
    },
}));
