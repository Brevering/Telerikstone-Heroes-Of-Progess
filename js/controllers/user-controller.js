(function () {
    'use strict';

    define(['userView', 'userModel', 'noty', 'sammy', 'headers', 'requester', 'url'],
        function (UserView, UserModel, noty, Sammy, Headers, Requester, url) {
            function showNotification(text, type) {
                noty({
                    text: text,
                    layout: 'top',
                    type: type,
                    timeout: 1500
                });
            }

            let userView = new UserView();
            let userModel = new UserModel();
            let headers = new Headers();
            let requester = new Requester();

            function UserController(userView) {
            }

            UserController.prototype = {
                loadGuestPage(selector) {
                    return userView.showGuestPage(selector);
                },
                loadRegisterPage(selector) {
                    return userView.showRegisterPage(selector);
                },
                loadHomePage(selector) {
                    let userId = localStorage.userId;
                    let userHeaders = headers.getHeaders(false, true);

                    requester.get(url.baseUserUrl + userId, userHeaders)
                        .then(
                        function (success) {
                            userView.showHomePage(selector, success);
                        });
                },
                loadTrainersPage(selector) {
                    return userView.showTrainersPage(selector);
                },
                loadGamePage(selector) {
                    return userView.showGamePage(selector);
                },
                registerUser(data, appId, appSecret) {
                    userModel.register(data, appId, appSecret)
                        .then(
                        function (success) {
                            showNotification('Registration successful!', 'success');

                            Sammy(function () {
                                this.trigger('redirectToUrl', { url: '#/' });
                            });
                        },
                        function (error) {
                            showNotification('Registration failed!', 'error');
                        });
                },
                loginUser(data, appId, appSecret) {
                    userModel.login(data, appId, appSecret)
                        .then(
                        function (success) {
                            localStorage.setItem('sessionToken', success._kmd.authtoken);
                            localStorage.setItem('userId', success._id);

                            Sammy(function () {
                                this.trigger('redirectToUrl', { url: '#/home/' });
                            });

                            showNotification('Login successful!', 'success');
                        },
                        function (error) {
                            showNotification('Login failed!', 'error');
                        });
                },
                logoutUser() {
                    userModel.logout()
                        .then(
                        function (success) {
                            localStorage.removeItem('sessionToken');
                            localStorage.removeItem('userId');

                            Sammy(function () {
                                this.trigger('redirectToUrl', { url: '#/' });
                            });

                            showNotification('Logout successful!', 'success');
                        },
                        function (error) {
                            showNotification('Logout failed!', 'error');
                        }
                        );
                }
            };

            return UserController;
        });
} ());