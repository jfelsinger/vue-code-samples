'use strict';

let debug = require('debug')('subtasker:auth');

import {client} from '../lib/rest-client';
import {router} from '../routing';

export default {
    user: {
    },

    login(credentials, options = {}) {
        debug('.login : ...');

        return client
            .authenticate(credentials)
            .spread((data, res) => {
                debug('.login : success', arguments);

                localStorage.setItem('auth_data', JSON.stringify(data));

                this.user = data.user;
                this.token = data.token;

                if (options.redirect) {
                    router.go(options.redirect);
                }

                return [data, res];
            });
    },

    register(credentials, options = {}) {
        debug('.register : ...');

        return client
            .register(credentials)
            .spread((data, res) => {
                debug('.register : success', arguments);

                localStorage.setItem('auth_data', JSON.stringify(data));

                this.user = data.user;
                this.token = data.token;

                if (options.redirect) {
                    router.go(options.redirect);
                }

                return [data, res];
            });
    },

    refresh() {
        debug('.refresh : ...');

        this.loadAuth();

        return client
            .refreshAuth()
            .spread((data, res) => {
                debug('.refresh : success', data, res);
                data = {
                    user: data,
                    token: this.token,
                };

                localStorage.setItem('auth_data', JSON.stringify(data));

                this.user = data.user;
                this.token = data.token;

                return [data, res];
            });
    },

    logout() {
        debug('.logout');
        localStorage.removeItem('auth_data');
        this.user = {};
    },

    loadAuth() {
        debug('.loadAuth : ...');

        var authData = localStorage.getItem('auth_data');
        if (authData) {
            authData = JSON.parse(authData);
        } else {
            debug('.loadAuth : no auth data');
            return;
        }

        this.user = authData.user;

        if (!client.auth.user)
            client.auth.user = authData.user;
        if (!client.auth.token)
            client.auth.token = authData.token;

        debug('.loadAuth : got auth');
    },

    get isAuthenticated() {
        if (!this.user || !this.user._id)
            this.loadAuth();
        return !!(this.user &&
                  this.user._id);
    },

    get hasPlan() {
        return !!this.plan;
    },

    get plan() {
        if (!this.isAuthenticated)
            return null;

        return (this.user &&
                this.user.stripe &&
                this.user.stripe.plan) || 'free';
    },

    hasAccessTo(level = 0) {
        var plans = {
            free:   0,
            basic:  1,
            pro:    2,
        };

        var userLevel;

        if (typeof(level) === 'string')
            level = plans[level];

        if (this.plan)
            userLevel = plans[this.plan];
        else
            userLevel = -1;

        debug('.hasAccessTo : ', {
            userLevel:userLevel,
            level:level,
        });

        return userLevel >= level;
    },
};
