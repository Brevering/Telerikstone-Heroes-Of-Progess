/// <reference path="../typings/globals/jquery/index.d.ts" />

(function () {
    'use strict';

    require.config({
        paths: {
            // Libraries
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'noty': '../bower_components/noty/js/noty/packaged/jquery.noty.packaged.min',
            'TimelineMax': '../bower_components/gsap/src/minified/TimelineMax.min',
            'TimelineLite': '../bower_components/gsap/src/minified/TimelineLite.min',
            'TweenMax': '../bower_components/gsap/src/minified/TweenMax.min',
            'TweenLite': '../bower_components/gsap/src/minified/TweenLite.min',
            'Easing': '../bower_components/gsap/src/minified/easing/EasePack.min',
            'CSSPlugin': '../bower_components/gsap/src/minified/plugins/CSSPlugin.min',

            // Modules
            'pageLoader': './page-loader',
            'cardCreator': './card-creator',          
        }
    });

    require(['pageLoader'], function (pageLoader) {
        pageLoader.loadHomePage();
    });
}());