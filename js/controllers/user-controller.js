(function () {
    'use strict';

    define(['userView', 'userModel', 'noty', 'sammy', 'headers', 'requester', 'url'],
        function (UserView, UserModel, noty, Sammy, Headers, Requester, url) {
            // Function constructor, so we can create instances of this controller => new UserController()
            let userView = new UserView(),
                userModel = new UserModel(),
                headers = new Headers(),
                requester = new Requester();


            function showNotification(message, type) {
                noty({
                    text: message,
                    layout: 'top',
                    type: type,
                    timeout: 1500
                });
            }


            function UserController() {
            }

            UserController.prototype = {
                // Calls the userView's showGuestPage(selector) and the view will attach the needed events
                // and will display the content. The selector is the DOM element where the content will be displayed
                loadGuestPage(selector) {
                    return userView.showGuestPage(selector);
                },
                // Does the same as the function above. The selector is the DOM element where the content will be displayed
                loadRegisterPage(selector) {
                    return userView.showRegisterPage(selector);
                },
                // When a user is logged, the user ID and user authentication token will be retrieved from
                // the local storage and then will be made a request. The response will return JSON object
                // with the user information. JSON => {"name": "Some name", "gamesPlayed": "10"}. The returned
                // data will be passed to the view, and the view will display the content.
                // The selector is the DOM element where the content will be displayed
                loadHomePage(selector) {
                    let userId = localStorage.userId;
                    let userHeaders = headers.getHeaders(false, true);

                    requester.get(url.baseUserUrl + userId, userHeaders)
                        .then(function (success) {
                            userView.showHomePage(selector, success);
                        });
                },
                // The data is the collected information from the registration form. The appId and appSecret are the
                // kinvey.com keys for authentication. A call to userModel's register function will be made, and the data
                // with the 2 keys will be passes. If the registration is successful, the page will be redirected to the
                // login page and a successful register message will appear. If the registration is not successful
                // nothing will happen, and an error message will be shown.
                registerUser(data, appId, appSecret) {
                    userModel.register(data, appId, appSecret)
                        .then(function (success) {
                            showNotification('Registration successful!', 'success');

                            Sammy(function () {
                                this.trigger('redirectToUrl', { url: '#/' });
                            });
                        },
                        function (error) {
                            showNotification('Registration failed!', 'error');
                        });
                },
                // This will do the same as the function above, but it will log in an user. The user's authentication token
                // and ID will be saved to the local storage for further usage. The user will be redirected to the user-home page
                loginUser(data, appId, appSecret) {
                    userModel.login(data, appId, appSecret)
                        .then(function (success) {
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
                // This function will perform a logout action. The user will be redirected to the login page, and
                // his ID and authentication token will be removed from the local storage
                logoutUser() {
                    userModel.logout()
                        .then(function (success) {
                            localStorage.removeItem('sessionToken');
                            localStorage.removeItem('userId');

                            Sammy(function () {
                                this.trigger('redirectToUrl', { url: '#/' });
                            });

                            showNotification('Logout successful!', 'success');
                        },
                        function (error) {
                            showNotification('Logout failed!', 'error');
                        });
                }
            };

            return UserController;
        });
} ());