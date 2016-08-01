(function () {
    'use strict';

    define(['jquery', 'sammy', 'fileReader', 'handlebars', 'engine'], function ($, Sammy, fileReader, Handlebars, engine) {
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
            let $playerAvatar = $('#player-avatar');
            let $enemyAvatar = $('#enemy-avatar');

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
                setTimeout(function () {
                    $('body').removeClass('loaded');
                }, 1);
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
                            picture: $('#picture').attr('data-picture-data')
                        };

                        Sammy(function () {
                            this.trigger('register', data);
                        });
                    });
                });
            },
            showHomePage(selector, data) {
                return $.get('templates/home.html', function (template) {
                    showLoader();
                    $(selector).empty();

                    let templateFunc = Handlebars.compile(template);
                    let html = templateFunc(data);

                    $(selector).append(html);

                    $('#btn-logout').on('click', function () {
                        Sammy(function () {
                            this.trigger('logout');
                        });
                    });
                });
            },
            showTrainersPage(selector) {
                $.get('templates/trainers-page.html', function (html) {
                    showLoader();
                    $(selector).empty();
                    $(selector).append(html);

                    $('#trainers-holder').on('click', 'img', function () {
                        localStorage.setItem('trainer', $(this).attr('trainer-name'));
                    });
                });
            },
            showGamePage(selector) {
                $.get('templates/game-page.html', function (html) {
                    showLoader();
                    $(selector).empty();
                    $(selector).append(html);

                    $('#btn-exit-game').on('click', function () {
                        localStorage.clear();
                    });
                    $('body')
                        .css({
                            'background': 'url("images/bg_fill.jpg") no-repeat center center fixed',
                            'background-size': 'cover'
                        });
                    $('#playField')
                        .css({
                            'overflow': 'hidden',
                            'position': 'absolute',
                            'width': '100%',
                            'height': '100%',
                            'background': 'url("images/table.png") no-repeat center center fixed',
                            'background-size': 'contain'
                        });

                    loadAvatars(localStorage.trainer);
                    engine.start();
                });
            }
        };

        return UserView;
    });
} ());