// <reference path="../typings/globals/jquery/index.d.ts" />

(function () {
    'use strict';

    require.config({
        paths: {
            // Libraries
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'noty': '../bower_components/noty/js/noty/packaged/jquery.noty.packaged.min',

            // Modules
            'pageLoader': './page-loader',
            'welcomeScreen': './welcome-screen'
        }
    });

    require(['pageLoader'], function (pageLoader) {
        const containerSelector = '#container';


        pageLoader.loadHomePage(containerSelector);
    });

    require(['welcomeScreen'], function (welcomeScreen) {
        const selector='#welcome-screen';
        welcomeScreen.loadWelcomeScreen(selector);
    });
} ());