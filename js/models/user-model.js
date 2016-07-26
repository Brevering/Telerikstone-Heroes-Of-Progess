(function () {
    'use strict';

    define(['requester', 'url', 'headers'], function (Requester, url, Headers) {
        let requester = new Requester(),
            headers = new Headers();

        // Function constructor, so we can make instances of this model
        function UserModel() {
        }

        UserModel.prototype = {
            // Gets the headers needed for registering a user. A POST request will be made to kinvey and the user's
            // information will be saved there.
            register(data, appId, appSecret) {
                let registerHeaders = headers.getHeaders(true, false, appId, appSecret);
                return requester.post(url.baseUserUrl, registerHeaders, data);
            },
            login(data, appId, appSecret) {
                let loginHeaders = headers.getHeaders(true, false, appId, appSecret);
                return requester.post(url.loginUrl, loginHeaders, data);
            },
            logout() {
                let logoutHeaders = headers.getHeaders(false, true);
                return requester.post(url.logoutUrl, logoutHeaders);
            }
        };

        return UserModel;
    });
} ());