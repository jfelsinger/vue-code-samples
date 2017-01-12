'use strict';
/* jslint browser:true */

let debug = require('debug')('dndb:cmpt:pane-home');

let Vue = require('vue'),
    dndbClient = require('../../lib/requests'),
    TypingDetector = require('typing-detector'),
    BPromise = require('bluebird');

// Components
require('../x-pager');
// require('../../object-list');

window.components.paneHome =
module.exports =
Vue.extend({
    template: '#vue-tmpl__pane-home',

    route: {
        data: function() {
            return this.fetchData();
        },
    },

    data: function() {
        return {

            isLoading: true,
            max: 0,
            pagination: {
                q: this.$route.query.q || '',
                page: this.$route.query.page || 1,
                per: this.$route.query.page || 25,
            },
            entries: [],

            filtering: {
                categories: [
                    { name:'Associates', slug:'associates', active:false },
                    { name:'Backgrounds', slug:'backgrounds', active:false },
                    { name:'Character Themes', slug:'character-themes', active:false },
                    { name:'Classes', slug:'classes', active:false },
                    { name:'Companions and Familiars', slug:'companions-and-familiars', active:false },
                    { name:'Creatures', slug:'creatures', active:false },
                    { name:'Deities', slug:'deities', active:false },
                    { name:'Diseases', slug:'diseases', active:false },
                    { name:'Epic Destinies', slug:'epic-destinies', active:false },
                    { name:'Feats', slug:'feats', active:false },
                    { name:'Glossary', slug:'glossary', active:false },
                    { name:'Items', slug:'items', active:false },
                    { name:'Paragon Paths', slug:'paragon-paths', active:false },
                    { name:'Poisons', slug:'poisons', active:false },
                    { name:'Powers', slug:'powers', active:false },
                    { name:'Races', slug:'races', active:false },
                    { name:'Rituals', slug:'rituals', active:false },
                    { name:'Skills', slug:'skills', active:false },
                    { name:'Terrain', slug:'terrain', active:false },
                    { name:'Traps', slug:'traps', active:false },
                ],
            },
        };
    },

    computed: {
        categoryQueryString: function() {
            return this.filtering.categories
                       .filter(c => c.active)
                       .map(c => c.name)
                       .join(',');
        }
    },

    created: function() {
        window.homePane = this;
        debug('created');
        this.$detector = new TypingDetector({
            timeout: 450
        });

        this.$detector
            .on('typing-stopped', () => {
                this.fetchData();
            });

        this.$on('pagination-change', function() {
            this.fetchData();
        });
    },

    methods: {
        detect: function() {
            if (!this.isLoading)
                this.$detector.detect();
        },

        toggleCategories: function() {
            if (this.categoryQueryString)
                this.filtering.categories.forEach(c => c.active = false);
            else
                this.filtering.categories.forEach(c => c.active = true);
        },

        fetchData: function() {
            this.isLoading = true;
            BPromise.all([
                    dndbClient
                        .entries
                        .post()
                        .page(this.pagination.page)
                        .limit(this.pagination.per)
                        .search(this.pagination.q)
                        .query({
                            category: this.categoryQueryString,
                        })
                        .spread((entries,res) => {
                            debug(res);
                            this.entries = entries;
                            this.highlight();
                            return entries;
                        }),
                    dndbClient
                        .entries
                        .post()
                        .search(this.pagination.q)
                        .query({
                            category: this.categoryQueryString,
                        })
                        .count()
                        .spread((count,res) => {
                            debug(res);
                            this.max = count;
                            return count;
                        }),
                ])
                .spread((/* entries,count */) => {
                    this.isLoading = false;
                })
                .catch(err => { debug(err); });
        },

        highlight: function() {
            function highlightString(string, query) {
                if (!query) return string;
                if (typeof(query) === 'string')
                    query = new RegExp('(\\b' + query + '\\b)','gim');

                return string.replace(query, '<span class="hl">$1</span>');
            }

            this.entries.forEach(entry => {
                entry.body_highlight =
                    highlightString(
                        entry.body_html,
                        this.pagination.q
                    );
            });
        },
    },
});
