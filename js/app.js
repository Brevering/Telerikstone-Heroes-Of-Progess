(function () {
    'use strict';

    require.config({
        paths: {
            // Libraries
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'handlebars': '../bower_components/handlebars/handlebars.min',
            'noty': '../bower_components/noty/js/noty/packaged/jquery.noty.packaged.min',
            'sammy': '../bower_components/sammy/lib/min/sammy-latest.min',
            'TweenMax': '../bower_components/gsap/src/minified/TweenMax.min',
            'TweenLite': '../bower_components/gsap/src/minified/TweenLite.min',
            'Easing': '../bower_components/gsap/src/minified/easing/EasePack.min',
            'CSSPlugin': '../bower_components/gsap/src/minified/plugins/CSSPlugin.min',
            'TimelineMax': '../bower_components/gsap/src/minified/TimelineMax.min',
            'AmCharts':'../bower_components/amcharts3/amcharts/amcharts',
            'serial':'../bower_components/amcharts3/amcharts/serial',
            // Helpers
            'requester': './helpers/requester',
            'headers': './helpers/headers',
            'url': './helpers/url',
            'fileReader': './helpers/file-reader',
            'validator': './helpers/validator',

            // Models
            'userModel': './models/user-model',

            // Views
            'userView': './views/user-view',

            // Controllers
            'userController': './controllers/user-controller',

            // Game
            'cardCreator': './game/card-creator',
            'engine': './game/engine',

            // Cards
            'card': './cards/card',
            'minionCard': './cards/minion-card',
            'powerCard': './cards/power-card',
            'weaponCard': './cards/weapon-card',
            'decks': './cards/decks'
        }
    });

    require(['jquery', 'sammy', 'handlebars', 'requester', 'userController', 'decks'],
        function ($, Sammy, Handlebars, Requester, UserController, decks) {
            const container = '#container';
            const appId = 'kid_SJxQIaiv';
            const appSecret = 'dc497d5b7de74f998c00d3af6e1a55c9';

            const requester = new Requester();
            const userController = new UserController();

            let router = Sammy(function () {
                this.get('#/', function () {
                    userController.loadGuestPage(container);
                });

                this.get('#/register/', function () {
                    userController.loadRegisterPage(container);
                });

                this.get('#/home/', function () {
                    userController.loadHomePage(container);
                });

                this.get('#/trainers/', function () {
                    userController.loadTrainersPage(container);
                });

                this.get('#/game/', function () {
                    userController.loadGamePage(container);
                });

                // Sammy events
                this.bind('redirectToUrl', function (event, data) {
                    this.redirect(data.url);
                });

                this.bind('register', function (event, data) {
                    userController.registerUser(data, appId, appSecret);
                });

                this.bind('login', function (event, data) {
                    userController.loginUser(data, appId, appSecret);
                });

                this.bind('logout', function (event, data) {
                    userController.logoutUser();
                });

                this.bind('send-user-data', function (event, data) {
                    userController.sendUserData(data);
                });

                this.bind('get-user-data', function (event) {
                    userController.getUserData();
                });

                this.bind('get-all-users-data', function () {
                    userController.getAllUsersData();
                });
            });

            router.run('#/');
        });
} ());