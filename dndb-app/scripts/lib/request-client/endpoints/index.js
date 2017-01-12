'use strict';

var allEndpoints = {
};

module.exports = {
    all: allEndpoints,
    register: function(ApiClient, options) {
        for (var key in allEndpoints) {
            allEndpoints[key].register(ApiClient, options);
        }
    }
};
