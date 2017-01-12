'use strict';

require('../ends-with');
var BPromise = require('bluebird');

var ApiRequest = require('./request');

var extend = require('../extend'),
    Emitter = require('../emitter');

function ApiClient(url, options) {
    if (!url.endsWith('/')) url += '/';
    Emitter.call(this);

    this.baseUrl = url;
    this.options = (typeof(options) === 'object') ? options : {};

    // Make sure to set the defaults (by default)
    if (!this.options.defaults)
        this.options.defaults = {};
}

extend(ApiClient, Emitter);
module.exports = ApiClient;


/**
 * Setup an angular app to track the digests of the internal promise instance
 */
ApiClient.trackDigests =
function trackDigests(angularApp) {
    angularApp.run(['$rootScope', function($rootScope) {
        BPromise.setScheduler(function(cb) {
            $rootScope.$evalAsync(cb);
        });
    }]);
};

// Create a reference to the rest-api's internal promise instance
ApiClient._internalPromise = BPromise;


// -------

/**
 * Generate a new ApiRequest with given common actions applied
 */
ApiClient.prototype.newRequest =
function(url, options) {
    // Set defaults
    if (typeof(options) !== 'object') options = {};
    options.defaults = options.defaults || this.options.defaults;
    options.apiClient = options.apiClient || this; // Make sure instance is set
                                                   // to be sent to the request

    var req = new ApiRequest(url, options);

    req.on('before-exec', function() {
    }.bind(this));


    // Set event handlers for each request from the options.
    var requestEvents = options.requestEvents ||
                        this.options.requestEvents;
    if (typeof(requestEvents) === 'object')
        for (var event in requestEvents) {
            var handler = requestEvents[event];
            req.on(event, handler);
        }

    return req;
};

// Just sticking these routes right in here for now

[
    { url: 'api/entries',         props: ['entry','entries'] },

    { url: 'api',                 props: ['root','base','single', 'one'] },

].forEach(function(row) {
    var getFunction = function() {
        var url = this.baseUrl + row.url;
        var req = this.newRequest(url);

        return req;
    };

    row.props.forEach(function(prop) {
        Object.defineProperty(ApiClient.prototype, prop, {
            get: getFunction,
        });
    });
});

// Register extra endpoints
require('./endpoints').register(ApiClient);
