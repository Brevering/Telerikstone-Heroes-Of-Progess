/// <reference path="../../typings/globals/jquery/index.d.ts" />

(function () {
    'use strict';

    // Requester allows us to make easily requests to kinvey to store or retrieve data.
    define(['jquery'], function ($) {
        const GET = 'GET';
        const POST = 'POST';
        const PUT = 'PUT';
        const DELETE = 'DELETE';

        // Godfather function for all kind of requests
        function makeRequest(method, url, headers, data) {
            let promise = new Promise(function (resolve, reject) {
                $.ajax({
                    method: method,
                    url: url,
                    headers: headers,
                    data: data ? JSON.stringify(data) : null,
                    success(data) {
                        resolve(data);
                    },
                    error(error) {
                        reject(error);
                    }
                });
            });

            return promise;
        }

        function Requester() {
        }

        // Simple interface to make GET, POST, PUT, DELETE requests
        Requester.prototype = {
            get(url, headers) {
                return makeRequest(GET, url, headers);
            },
            post(url, headers, data) {
                return makeRequest(POST, url, headers, data);
            },
            put(url, headers, data) {
                return makeRequest(PUT, url, headers, data);
            },
            delete(url, headers) {
                return makeRequest(DELETE, url, headers);
            }
        };

        return Requester;
    });
} ());