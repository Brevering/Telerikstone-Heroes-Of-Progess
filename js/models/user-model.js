(function () {
    'use strict';

    define(['requester', 'url', 'headers'], function (Requester, url, Headers) {
        let requester = new Requester();
        let headers = new Headers();

        function UserModel() {
        }

        UserModel.prototype = {
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
            },
            sendUserData(data) {
                let updateUserInfoHeaders = headers.getHeaders(true, true);
                return requester.put(url.concreteUserUrl, updateUserInfoHeaders, data);
            },
            getUserData() {
                let getUserDataHeaders = headers.getHeaders(false, true);
                return requester.get(url.concreteUserUrl, getUserDataHeaders);
            },
            getAllUsersData() {
                let getAllUsersDataHeaders = headers.getAllUsersHeaders();
                return requester.get(url.baseUserUrl, getAllUsersDataHeaders);
            }
        };

        return UserModel;
    });
} ());