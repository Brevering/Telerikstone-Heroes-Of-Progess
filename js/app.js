(function () {
    'use strict';

    require.config({
        paths: {
            // Libraries
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'sammy': '../bower_components/sammy/lib/min/sammy-latest.min',

        }
    });

    require(['sammy', 'pageNavigator'], function (Sammy, pageNavigator) {
        
    });
} ());    