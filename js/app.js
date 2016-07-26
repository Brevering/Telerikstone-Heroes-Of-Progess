(function () {
    'use strict';

    require.config({
        paths: {
            // Libraries
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'handlebars': '../bower_components/handlebars/handlebars.min',
            'noty': '../bower_components/noty/js/noty/packaged/jquery.noty.packaged.min',
            'sammy': '../bower_components/sammy/lib/min/sammy-latest.min',
            'amCharts': '../bower_components/amcharts3/amcharts/amcharts',
                        
            // Helpers
            'requester': './helpers/requester',
            'headers': './helpers/headers',
            'url': './helpers/url',
            'fileReader': './helpers/file-reader',

            // Models
            'userModel': './models/user-model',

            // Views
            'userView': './views/user-view',

            // Controllers
            'userController': './controllers/user-controller'
        }
    });

    require(
        ['sammy', 'handlebars', 'requester', 'userController'],
        function (Sammy, Handlebars, Requester, UserController) {
            const container = '#container';
            const appId = 'kid_SJxQIaiv';
            const appSecret = 'dc497d5b7de74f998c00d3af6e1a55c9';

            const requester = new Requester();
            const userController = new UserController();

            let router = Sammy(function () {
                // If the user is already logged in, his authentication token will be saved in the
                // local storage and a log in will not be needed. The app will automatically display
                // the user's home page
                this.before(function () {
                    if (localStorage.sessionToken) {
                        this.redirect('#/home/');
                        return true;
                    }
                });

                // This is the base url. This will load the log-in page.
                this.get('#/', function () {
                    userController.loadGuestPage(container);
                });

                // This will load the register page
                this.get('#/register/', function () {
                    userController.loadRegisterPage(container);
                });

                // This will load the user's home page
                this.get('#/home/', function () {
                    userController.loadHomePage(container);
                });

                // Bindings - predifined events that will be triggered when some conditions are met.
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
            });

            // Runs the app. #/ will be the default page url.
            router.run('#/');
        });
} ());