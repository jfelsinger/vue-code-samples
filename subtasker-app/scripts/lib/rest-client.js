'use strict';
/* jshint browser:true */

// import ApiClient from 'subtasker-client';
import ApiClient from 'subtasker-client';
export var client = new ApiClient('/');

// if (window.restCredentials) {
//     if (window.restCredentials.auth)
//         client.auth = window.restCredentials.auth;
// }

window.restClient = client;
