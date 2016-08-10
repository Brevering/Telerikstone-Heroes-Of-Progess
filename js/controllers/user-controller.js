(function () {
    'use strict';

    define(['userView', 'userModel', 'noty', 'sammy', 'headers', 'requester', 'url', 'statistics', 'engine'],
        function (UserView, UserModel, noty, Sammy, Headers, Requester, url, statistics, engine) {
            function showNotification(text, type) {
                noty({
                    text: text,
                    layout: 'top',
                    type: type,
                    timeout: 1500
                });
            }

            function getChartData() {
                return [
                    {
                        "damageDealt": localStorage.getItem('playerDamageDealt'),
                        "healthStolen": localStorage.getItem('playerHealthStolen'),
                        "manaStolen": localStorage.getItem('playerManaStolen'),
                        "attackStolen": localStorage.getItem('playerStolenAttack'),
                        "player": "You"
                    },
                    {
                        "damageDealt": localStorage.getItem('enemyDamageDealt'),
                        "healthStolen": localStorage.getItem('enemyHealthStolen'),
                        "manaStolen": localStorage.getItem('enemyManaStolen'),
                        "attackStolen": localStorage.getItem('enemyStolenAttack'),
                        "player": "Enemy"
                    }
                ];
            }

            function playBackgroundMusic() {
                let sound = new Audio("backgroundMusic/Tower-Defense.mp3");
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
                            showNotification('Registration successful!', 'success');

                            Sammy(function () {
                                this.trigger('redirectToUrl', { url: '#/' });
                            });
                        });
                },
                loginUser(data, appId, appSecret) {
                    userModel.login(data, appId, appSecret)
                        .then(function (success) {
                            localStorage.setItem('sessionToken', success._kmd.authtoken);
                            localStorage.setItem('userId', success._id);
                            localStorage.setItem('currentWins', success.wins);
                            localStorage.setItem('currentDefeats', success.defeats);

                            Sammy(function () {
                                this.trigger('redirectToUrl', { url: '#/home/' });
                            });

                            showNotification('Login successful!', 'success');
                        }, function (error) {
                            showNotification('Login failed!', 'error');
                        });
                },
                logoutUser() {
                    userModel.logout()
                        .then(function (success) {
                            localStorage.removeItem('sessionToken');
                            localStorage.removeItem('userId');

                            Sammy(function () {
                                this.trigger('redirectToUrl', { url: '#/' });
                            });

                            showNotification('Logout successful!', 'success');
                        }, function (error) {
                            showNotification('Logout failed!', 'error');
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
                            $('#chartdiv').show();
                        }, function (error) {
                            console.log(error);
                        })
                        .then(function (success) {
                            $('#close-charts').show();
                        });
                },
                getAllUsersData() {
                    userModel.getAllUsersData()
                        .then(function (success) {
                            success = success.slice(0, 10).sort((a, b) => Number(a.wins) - Number(b.wins)).reverse();

                            statistics.showTopUsers(success);
                            $('#chartdiv').show();
                        }, function (error) {
                            console.log(error);
                        })
                        .then(function (success) {
                            $('#close-charts').show();
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