(function () {
    'use strict';

    define(['jquery', 'sammy', 'fileReader', 'handlebars', 'engine', 'validator', 'statistics'],
        function ($, Sammy, fileReader, Handlebars, engine, Validator, statistics) {
            function getPlayerImageUrl(playerName) {
                switch (playerName) {
                    case 'koce':
                        return 'images/koce.png';
                    case 'cuki':
                        return 'images/cuki.png';
                    case 'doncho':
                        return 'images/doncho.png';
                    case 'evlogi':
                        return 'images/evlogi.png';
                }
            }

            function loadAvatars(playerName) {
                let $playerAvatar = $('#player-avatar'),
                    $enemyAvatar = $('#enemy-avatar');

                $playerAvatar
                    .css('background', `url("${getPlayerImageUrl(playerName)}") no-repeat`)
                    .css('background-size', '100% 100%');
                $enemyAvatar
                    .css('background', `url("${getBotPlayerImageUrl(playerName)}") no-repeat`)
                    .css('background-size', '100% 100%');
            }

            function getBotPlayerImageUrl(realPlayerName) {
                let botPlayerName;

                if (realPlayerName === 'koce') {
                    botPlayerName = ['doncho', 'cuki', 'evlogi'][Math.floor(Math.random() * 3)];
                } else if (realPlayerName === 'cuki') {
                    botPlayerName = ['doncho', 'koce', 'evlogi'][Math.floor(Math.random() * 3)];
                } else if (realPlayerName === 'doncho') {
                    botPlayerName = ['cuki', 'koce', 'evlogi'][Math.floor(Math.random() * 3)];
                } else {
                    botPlayerName = ['cuki', 'koce', 'doncho'][Math.floor(Math.random() * 3)];
                }

                return getPlayerImageUrl(botPlayerName);
            }

            function showLoader() {
                $(function () {
                    setTimeout(function () {
                        $('body').addClass('loaded');
                    }, 1000);
                    $('body').removeClass('loaded');
                });
            }

            function showNotification(text, type) {
                noty({
                    text: text,
                    layout: 'top',
                    type: type,
                    timeout: 1500
                });
            }

            function dataButtonsEvents() {
                $('#get-user-data').on('click', function () {
                    Sammy(function () {
                        this.trigger('get-user-data');
                    });
                });

                $('#get-all-users-data').on('click', function () {
                    Sammy(function () {
                        this.trigger('get-all-users-data');
                    });
                });

                $('#close-charts').on('click', function () {
                    $('#chartdiv').hide().empty();
                    $(this).hide();
                });

                $('#how-to-play').on('click', function () {
                    $.get('templates/how-to-play.html', function (html) {
                        $('#chartdiv').empty().append(html).show();
                    })
                        .then(function (success) {
                            $('#close-charts').show();
                        });
                });
            }

            function appendGamePageStyles() {
                $('#container')
                    .css({
                        'background': 'url("images/bg_fill.jpg") no-repeat center center fixed',
                        'background-size': 'cover'
                    });
            }

            function UserView() {
            }

            UserView.prototype = {
                showGuestPage(selector) {
                    return $.get('templates/guest-home.html', function (template) {
                        showLoader();
                        $(selector).empty();
                        $(selector).append(template);
                        localStorage.isReloaded = 'false';

                        $('#btn-login').on('click', function () {
                            let data = {
                                username: $('#username').val(),
                                password: $('#password').val()
                            };

                            Sammy(function () {
                                this.trigger('login', data);
                            });
                        });
                    });
                },
                showRegisterPage(selector) {
                    return $.get('templates/register.html', function (template) {
                        showLoader();
                        $(selector).empty();
                        $(selector).append(template);

                        $('#btn-register').on('click', function () {
                            let data = {
                                username: $('#username').val(),
                                name: $('#name').val(),
                                password: $('#password').val(),
                                wins: '0',
                                defeats: '0'
                            };

                            let validate = new Validator();

                            if (validate.onInvalidUserName(data.username) && validate.onInvalidPassword(data.password)) {
                                Sammy(function () {
                                    this.trigger('register', data);
                                });
                            } else {
                                showNotification('Registration failed!', 'error');
                            }
                        });
                    });
                },
                showHomePage(selector, data) {
                    return $.get('templates/home.html', function (template) {
                        showLoader();
                        $(selector).empty();

                        let templateFunc = Handlebars.compile(template),
                            html = templateFunc(data);

                        $(selector).append(html);
                        dataButtonsEvents();

                        $('#btn-logout').on('click', function () {
                            Sammy(function () {
                                this.trigger('logout');
                            });
                        });
                    });
                },
                showTrainersPage(selector) {
                    return $.get('templates/trainers-page.html', function (html) {
                        showLoader();
                        $(selector).empty();
                        $(selector).append(html);

                        $('#trainers-holder').on('click', 'img', function () {
                            localStorage.trainer = $(this).attr('trainer-name');
                        });
                    });
                },
                showGamePage(selector) {
                    return $.get('templates/game-page.html', function (html) {
                        showLoader();
                        $(selector).empty();
                        $(selector).append(html);
                        localStorage.enemyCardId = '1';
                        localStorage.playerCardId = 0;
                        localStorage.hasAttacked = 'false';
                        localStorage.currentCardAttack = '0';
                        localStorage.isPlayerTurn = 'true';
                        localStorage.hasToPlaceCard = 'true';

                        localStorage.playerDamageDealt = 0;
                        localStorage.playerHealthStolen = 0;
                        localStorage.playerManaStolen = 0;

                        localStorage.enemyDamageDealt = 0;
                        localStorage.enemyHealthStolen = 0;
                        localStorage.enemyManaStolen = 0;
                        localStorage.playerAlreadyAttacked = 'false';

                        $('#btn-exit-game').on('click', function () {
                            localStorage.clear();
                        });

                        appendGamePageStyles();
                        loadAvatars(localStorage.trainer);
                        engine.start();
                    });
                },
                showEndGamePage(selector) {
                    return $.get('templates/end-game.html', function (html) {
                        showLoader();
                        $(selector).empty();
                        $(selector).append(html);
                    });
                }
            };

            return UserView;
        });
}());