(function () {
    'use strict';

    define(['jquery', 'noty', 'cardCreator'], function ($, noty, cardCreator) {
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
                    loadTrainersPage();
                }
            });
        }

        function chooseTrainerEvent() {
            $('#trainers-holder').on('click', 'img', function () {
                let trainerName = $(this).attr('trainer-name');

                localStorage.setItem('trainerName', trainerName);

                loadGamePage();
            });
        }

        function loadHomePage() {
            $.get('html-parts/home-page.html', function (html) {
                $container.empty();
                $container.append(html);
                startGameEvent();
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
                
                $('body').css('background', 'url("../images/table.jpg") no-repeat')
                    .css('background-size', 'cover');
                
                // testing
                cardCreator.initializeCard(4, 4, 4, '../images/cards/cuki_card.png', true);
                cardCreator.initializeCard(4, 4, 4, '../images/cards/cuki_card.png', false);
            });
        }

        return {
            loadHomePage: loadHomePage
        };
    });
} ());