/**
 * Setup routing
 */
/* jslint browser:true */

let Vue = require('vue'),
    VueRouter = require('vue-router'),
    components = require('./components');

window.components = components;

Vue.use(VueRouter);

let app = require('./view-models/app'),
    router = new VueRouter({
        history: true,
    });

router.map({
    '/':            { component: components.panes.home },

    '/single/:id':  { component: components.panes.single },
});

router.alias({
    '/home':'/',

    '/single/:id/:name':'/single/:id',
});

// Start the app!
router.start(app, '#app');
window.router = router;
