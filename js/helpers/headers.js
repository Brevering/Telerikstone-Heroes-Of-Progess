(function () {
    'use strict';

    define([], function () {
        function Headers() {
        }

        // Get headers needed for the requests.
        // sendData - will add 'Content-Type': 'application/json' to the request. This allows us to send data to kinvey
        //      for example if we want to login or to register or to save some data
        // useSessionToken - will get the user's authentication token from the local storage. This is needed for authentication
        //      before the user can manipulate some data from kinvey.
        // btoa() - encodes the token to BASE64 string
        Headers.prototype = {
            getHeaders(sendData, useSessionToken, appId, appSecret) {
                let headers = {};
                let token;

                if (sendData) {
                    headers['Content-Type'] = 'application/json';
                }

                if (useSessionToken) {
                    token = localStorage.getItem('sessionToken');
                    headers.Authorization = `Kinvey ${token}`;
                } else {
                    token = `${appId}:${appSecret}`;
                    token = btoa(token);
                    headers.Authorization = `Basic ${token}`;
                }

                return headers;
            }
        };

        return Headers;
    });
} ());