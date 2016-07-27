/// <reference path="../../typings/globals/jquery/index.d.ts" />

(function () {
    'use strict';

    define(['jquery', 'sammy', 'fileReader', 'handlebars'], function ($, Sammy, fileReader, Handlebars) {
        function UserView() {
        }
        UserView.prototype = {
            // makes a get request to the file where the html is saved, and the result is saved to the template parameter
            // on button click, the data will be retrieved from the form and will be passed to the Sammy function, that
            // will internally trigger the login event. The login event will get the data and it will pass it to the
            // user controller. The controller will perform the login action.
            showGuestPage(selector) {
                return $.get('templates/guest-home.html', function (template) {
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
            // Does the same like the function above, but will register an user.
            showRegisterPage(selector) {
                return $.get('templates/register.html', function (template) {
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
            // Does the same as the functions above. The difference is that here, we use Handlebars to replace the template strings
            // in the html files with the user information. An event will be atached to the logout button. When the user click it
            // he will be loged out. The data contains the user information as JSON.
            showHomePage(selector, data) {
                return $.get('templates/home.html', function (template) {
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
            }
        };

        return UserView;
    });
} ());