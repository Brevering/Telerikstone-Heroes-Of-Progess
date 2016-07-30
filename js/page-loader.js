(function () {
    'use strict';

    define(['jquery', 'noty', 'cardCreator', 'sammy', 'engine'], function ($, noty, cardCreator, Sammy, engine) {
        const $container = $('#container');

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
                let trainerName = $(this).attr('trainer-name');

                localStorage.setItem('trainerName', trainerName);
            });
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

                $('body').css('background', 'url("../images/table.png") no-repeat')
                    .css('background-size', 'cover');

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