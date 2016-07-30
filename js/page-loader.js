(function () {
    'use strict';

    define(['jquery', 'noty', 'cardCreator', 'sammy', 'engine'], function ($, noty, cardCreator, Sammy, engine) {
        const $container = $('#container');
        let trainerName;

        function showNotification(text, type) {
            noty({
                text: text,
                layout: 'top',
                type: type,
                timeout: 1500
            });
        }

        function startGameEvent() {
            $('#home-container').on('click', '#btn-start-game', function () {
                let $this = $(this);
                let $input = $('#tb-username');
                let username = $input.val();

                if (!username) {
                    showNotification('Username cannot be empty!', 'error');
                    $('#tb-user').val('');
                } else {
                    localStorage.setItem('username', username);
                    showNotification('Login successful!', 'success');
                }
            });
        }

        // add the chosen trainer's name to the local storage for further usage
        function chooseTrainerEvent() {
            $('#trainers-holder').on('click', 'img', function () {
                trainerName = $(this).attr('trainer-name');
            });
        }

        // Get random bot-player avatar
        function getBotPlayerImageUrl(realPlayerName) {
            let botPlayerName;

            if (realPlayerName === 'koce') {
                botPlayerName = ['doncho', 'cuki'][Math.floor(Math.random() * 2)];
            } else if (realPlayerName === 'cuki') {
                botPlayerName = ['doncho', 'koce'][Math.floor(Math.random() * 2)];
            } else {
                botPlayerName = ['cuki', 'koce'][Math.floor(Math.random() * 2)];
            }

            return getPlayerImageUrl(botPlayerName);
        }

        // Get player img url
        function getPlayerImageUrl(playerName) {
            switch (playerName) {
                case 'koce': return '../images/koce.png';
                case 'cuki': return '../images/cuki.png';
                case 'doncho': return '../images/doncho.png';
            }
        }

        // Load players avatars on the game field
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

        function loadHomePage() {
            $.get('html-parts/home-page.html', function (html) {
                $container.empty();
                $container.append(html);

                $('body').css('background', 'url("../images/home.jpg") no-repeat')
                    .css('background-size', 'cover');

                startGameEvent();
            });
        }

        // clears the local storage from stored data and redirects to the guest page
        function exitEvent() {
            $('#btn-exit-game', function () {
                localStorage.removeItem('username');
                localStorage.removeItem('trainerName');
            });
        }

        function loadTrainersPage() {
            $.get('html-parts/trainers-page.html', function (html) {
                $container.empty();
                $container.append(html);
                chooseTrainerEvent();
            });
        }

        function loadGamePage() {
            $.get('html-parts/game-page.html', function (html) {
                $container.empty();
                $container.append(html);
                exitEvent();

                $('body')
                    .css('background', 'url("../images/table.png") no-repeat center center fixed')
                    .css('-webkit-background-size', 'cover')
                    .css('-moz-background-size', 'cover')
                    .css('-o-background-size', 'cover')
                    .css('background-size', 'cover');

                if (!localStorage.trainer) {
                    localStorage.setItem('trainer', trainerName);
                }

                loadAvatars(localStorage.trainer);
                engine.start();
            });
        }

        return {
            loadHomePage: loadHomePage,
            loadTrainersPage: loadTrainersPage,
            loadGamePage: loadGamePage
        };
    });
} ());