'use strict';
/* jslint browser:true */

let debug = require('debug')('dndb:cmpt:pane-single');

let Vue = require('vue'),
    dndbClient = require('../../lib/requests'),
    TypingDetector = require('typing-detector');

// Components
// require('../../x-pager');
// require('../../object-list');

window.components.paneSingle =
module.exports =
Vue.extend({
    template: '#vue-tmpl__pane-single',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: function() {
        return {
            isLoading: true,
            entryId: this.$route.params.id,
            entry: {},
        };
    },

    created: function() {
        window.singlePane = this;
        debug('created');
        this.$detector = new TypingDetector({
            timeout: 450
        });

        this.$detector
            .on('typing-stopped', () => {
                this.fetchData();
            });
    },


    methods: {
        detect: function() {
            if (!this.isLoading)
                this.$detector.detect();
        },

        fetchData: function() {
            this.isLoading = true;

            dndbClient
                .entries
                .get().id(this.entryId)
                .spread((entry,res) => {
                    debug(res);

                    this.entry = entry;
                    this.isLoading = false;

                    return entry;
                })
                .catch(err => { debug(err); });
        },
    }
});
