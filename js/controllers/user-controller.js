(function () {
    'use strict';

    define(['userView', 'userModel', 'noty', 'sammy', 'headers', 'requester', 'url', 'statistics', 'engine'],
        function (UserView, UserModel, noty, Sammy, Headers, Requester, url, statistics, engine) {
            const redirectEventName = 'redirectToUrl',
                notySuccessType = 'success',
                notyErrorType = 'error',

                // Urls
                baseAppUrl = '#/',
                homeAppUrl = '#/home/',

                // Players data stats
                damageDealtKey = 'damageDealt',
                healthStolenKey = 'healthStolen',
                manaStolenKey = 'manaStolen',
                attackStolenKey = 'attackStolen',
                playerKey = 'player',
                playerDamageDealt = 'playerDamageDealt',
                playerHealthStolen = 'playerHealthStolen',
                playerManaStolen = 'playerManaStolen',
                enemyDamageDealt = 'enemyDamageDealt',
                enemyHealthStolen = 'enemyHealthStolen',
                enemyManaStolen = 'enemyManaStolen',
                backgroundMusicPath = 'background-music/Tower-Defense.mp3',

                // Messages
                successfulRegistrationMessage = 'Registration successful!',
                successfulLoginMessage = 'Login successful!',
                errorLoginMessage = 'Login failed!',
                successfulLogoutMessage = 'Logout successful!',
                errorLogoutMessage = 'Logout failed!',

                // Selectors
                chartDivSelector = '#chartdiv',
                closeChartSelector = '#close-charts',

                // Other
                notificationTimeout = 1500,
                notificationPosition = 'top';

            function showNotification(text, type) {
                noty({
                    text: text,
                    layout: notificationPosition,
                    type: type,
                    timeout: notificationTimeout
                });
            }

            function getChartData() {
                return [
                    {
                        damageDealtKey: localStorage.getItem(playerDamageDealt),
                        healthStolenKey: localStorage.getItem(playerHealthStolen),
                        manaStolenKey: localStorage.getItem(playerManaStolen),
                        playerKey: "You"
                    }, {
                        damageDealtKey: localStorage.getItem(enemyDamageDealt),
                        healthStolenKey: localStorage.getItem(enemyHealthStolen),
                        manaStolenKey: localStorage.getItem(enemyManaStolen),
                        playerKey: "Enemy"
                    }
                ];
            }

            function playBackgroundMusic() {
                let sound = new Audio(backgroundMusicPath);
                sound.loop = true;
                sound.play();
            }

            let userView = new UserView(),
                userModel = new UserModel(),
                headers = new Headers(),
                requester = new Requester();

            function UserController(userView) {
            }

            UserController.prototype = {
                loadGuestPage(selector) {
                    localStorage.clear();
                    return userView.showGuestPage(selector);
                },
                loadRegisterPage(selector) {
                    return userView.showRegisterPage(selector);
                },
                loadHomePage(selector) {
                    let userId = localStorage.userId,
                        userHeaders = headers.getHeaders(false, true);

                    requester.get(url.baseUserUrl + userId, userHeaders)
                        .then(function (success) {
                            userView.showHomePage(selector, success);
                        });
                },
                loadTrainersPage(selector) {
                    localStorage.isReloaded = 'false';
                    return userView.showTrainersPage(selector);
                },
                loadGamePage(selector) {
                    if (localStorage.isReloaded === 'false') {
                        document.location.reload(true);
                        localStorage.isReloaded = 'true';
                    }

                    playBackgroundMusic();
                    return userView.showGamePage(selector);
                },
                registerUser(data, appId, appSecret) {


                    userModel.register(data, appId, appSecret)
                        .then(function (success) {
                            showNotification(successfulRegistrationMessage, notySuccessType);

                            Sammy(function () {
                                this.trigger(redirectEventName, { url: baseAppUrl });
                            });
                        });
                },
                loginUser(data, appId, appSecret) {
                    userModel.login(data, appId, appSecret)
                        .then(function (success) {
                            localStorage.sessionToken = success._kmd.authtoken;
                            localStorage.userId = success._id;
                            localStorage.currentWins = success.wins;
                            localStorage.currentDefeats = success.defeats;

                            Sammy(function () {
                                this.trigger(redirectEventName, { url: homeAppUrl });
                            });

                            showNotification(successfulLoginMessage, notySuccessType);
                        }, function (error) {
                            showNotification(errorLoginMessage, notyErrorType);
                        });
                },
                logoutUser() {
                    userModel.logout()
                        .then(function (success) {
                            localStorage.clear();
                            Sammy(function () {
                                this.trigger(redirectEventName, { url: baseAppUrl });
                            });
                            showNotification(successfulLogoutMessage, notySuccessType);
                        }, function (error) {
                            showNotification(errorLogoutMessage, notyErrorType);
                        });
                },
                sendUserData(data) {
                    userModel.sendUserData(data)
                        .then(function (success) {
                            console.log(JSON.stringify(success));
                        }, function (error) {
                            console.log(error);
                        });
                },
                getUserData() {
                    userModel.getUserData()
                        .then(function (success) {
                            statistics.showMyStats(success);
                            $(chartDivSelector).show();
                        }, function (error) {
                            console.log(error);
                        })
                        .then(function (success) {
                            $(closeChartSelector).show();
                        });
                },
                getAllUsersData() {
                    userModel.getAllUsersData()
                        .then(function (success) {
                            success = success.slice(0, 10).sort((a, b) => Number(a.wins) - Number(b.wins)).reverse();
                            statistics.showTopUsers(success);
                            $(chartDivSelector).show();
                        }, function (error) {
                            console.log(error);
                        })
                        .then(function (success) {
                            $(closeChartSelector).show();
                        });
                },
                loadEndGamePage(selector) {
                    let chartData = getChartData();

                    userView.showEndGamePage(selector)
                        .then(function (success) {
                            statistics.endGameChart(chartData);
                        }, function (error) {
                            console.log(error);
                        });
                }
            };

            return UserController;
        });
} ());