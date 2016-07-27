(function () {
    'use strict';

    require.config({
        paths: {
            // Librariesbower_components
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'sammy': '../bower_components/sammy/lib/min/sammy-latest.min',

            // Modules
            'pageLoader': './page-loader'
        }
    });

    require(['sammy', 'pageLoader'], function (Sammy, pageLoader) {
        const containerSelector = '#container';

        let router = Sammy(function () {
            this.get('#/', function () {
                pageLoader.loadGuestPage(containerSelector);
            });
        });

        router.run('#/');
    });
}());