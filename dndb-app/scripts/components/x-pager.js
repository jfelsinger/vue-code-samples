'use strict';
/* jslint browser:true */

var debug = require('debug')('dndb:components:x-pager');

var Vue = require('vue');

window.components.pager =
module.exports =
Vue.component('x-pager', {
    template: '#vue-tmpl__pagination',

    props: ['pagination','max'],

    data: function() {
        return {
            max: 0,
            pagination: {
                q: this.$route.query.q || '',
                page: this.$route.query.page || 1,
                per: this.$route.query.page || 25,
            }
        };
    },

    computed: {
        /**
         * A proxy for pagination.term, with added events
         */
        term: {
            get: function() {
                return this.pagination.term;
            },
            set: function(value) {
                this.pagination.term = value;

                // set to the first page
                this.pagination.page = 1;

                // this.$dispatch('term-change', this.pagination);
                this.$dispatch('pagination-change', this.pagination);
            }
        },

        /**
         * A proxy for pagination.page, with added events
         */
        page: {
            get: function() {
                return this.pagination.page;
            },
            set: function(value) {
                value = parseInt(value);

                // Keep it valid
                if (!value) value = 1;
                if (value > this.maxPages)
                    value = this.maxPages;
                else if (value < 1)
                    value = 1;

                debug('setting page: %s', value);
                this.pagination.page = value;

                // this.$dispatch('page-change', this.pagination);
                this.$dispatch('pagination-change', this.pagination);
            }
        },

        /**
         * A proxy for pagination.per, with added events
         */
        per: {
            get: function() {
                return this.pagination.per;
            },
            set: function(value) {


                debug('setting items per page: %s', value);
                this.pagination.per = value;
                // set to the first page
                this.pagination.page = 1;
                // this.$dispatch('per-change', this.pagination);
                this.$dispatch('pagination-change', this.pagination);
            }
        },

        maxPages: {
            get: function() {
                return Math.ceil(this.max / this.per);
            },
        },
    },

    methods: {
        first: function() {
            this.page = 1;
        },

        next: function() {
            this.page++;
        },

        previous: function() {
            this.page--;
        },

        last: function() {
            this.page = this.maxPages;
        },

        setPage: function(i){
            this.page += i;
            debug('set page:', this.page);
        }
    },

    created: function() {
        debug('created pagination vm: ', this.$data);
        window.__pager = this;
    },
});
