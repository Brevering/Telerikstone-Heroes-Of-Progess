(function () {
    'use strict';

    define([], function() {
        function Headers() {
        }

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