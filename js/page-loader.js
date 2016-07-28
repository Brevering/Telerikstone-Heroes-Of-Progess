/// <reference path="../typings/globals/jquery/index.d.ts" />

(function () {
    'use strict';

    define(['jquery', 'noty'], function ($, noty) {
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

        function loadHomePage(selector) {
            $.get('html-parts/home-page.html', function (html) {
                $(selector).empty();
                $(selector).append(html);
                startGameEvent();
            });
        }

        return {
            loadHomePage: loadHomePage
        };
    });
} ());