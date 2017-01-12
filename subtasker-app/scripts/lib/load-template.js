'use strict';

let debug = require('debug')('subtasker:lib:load-template');
let request = require('superagent');

/**
 * Loads a template for a component asyncronousely
 */
module.exports =
function loadAsyncTemplate(path, definition) {
    if (!definition &&
        typeof(path) === 'object') {
        definition = path;
        path = definition.template || definition.path;
    }

    return function(resolve, reject) {
        debug('request path:', path);
        request
            .get(path)
            .end(function(err, response) {
                if (err) return reject(err);

                definition.template = response.text ||
                                      response.body;

                debug('request res:', response);
                debug('template: ', definition.template);

                resolve(definition);
            });
    };
};
