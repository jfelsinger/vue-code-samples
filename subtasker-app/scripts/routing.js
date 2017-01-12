/**
 * routing.js
 *
 * Setup routing through vue.js
 */

'use strict';
/* jslint browser:true */

let debug = require('debug')('subtasker:routing');

// Load Components
import './components';

import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './app';

// Install Vue plugins
Vue.use(VueResource);
Vue.use(VueRouter);

export var router = new VueRouter({
        history: true,
        hashbang: false,
    });

router.map({
    // Home Page
    // '/': { component: components.pages.home },
    '/': { component: Vue.component('page-home') },

    '/about': { component: Vue.component('page-about') },
    '/features': { component: Vue.component('page-features') },
    '/pricing': { component: Vue.component('page-pricing') },
    '/support': { component: Vue.component('page-support') },
    '/password-reset': { component: Vue.component('page-reset') },

    '/dashboard': { component: Vue.component('page-dashboard-home') },
    '/dashboard/profile': { component: Vue.component('page-dashboard-profile') },
    '/dashboard/billing': { component: Vue.component('page-dashboard-billing') },

    // 404 Not found handling for pages that don't exist
    '/*any': { component: Vue.component('page-404') },
});

router.alias({
    '/index': '/',
    '/home': '/',

    'dashboard/home':   '/dashboard',
    'dashboard/index':  '/dashboard',

    // Route Types, Lol
    'dashbaord/':       '/dashboard',
    'dashbaord/home':   '/dashboard',
    'dashbaord/index':  '/dashboard',
    'dashbaord/profile':'/dashboard/profile',
    'dashbaord/billing':'/dashboard/billing',
});

router.start(App, '#app');

debug('setup router');

window.v.router = router;
