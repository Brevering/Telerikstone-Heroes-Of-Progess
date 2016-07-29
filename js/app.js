(function () {
    'use strict';

    require.config({
        paths: {
            // Libraries
            'jquery': '../bower_components/jquery/dist/jquery.min',
            'noty': '../bower_components/noty/js/noty/packaged/jquery.noty.packaged.min',
            'sammy': '../bower_components/sammy/lib/min/sammy-latest.min',
            'TimelineMax': '../bower_components/gsap/src/minified/TimelineMax.min',
            'TimelineLite': '../bower_components/gsap/src/minified/TimelineLite.min',
            'TweenMax': '../bower_components/gsap/src/minified/TweenMax.min',
            'TweenLite': '../bower_components/gsap/src/minified/TweenLite.min',
            'Easing': '../bower_components/gsap/src/minified/easing/EasePack.min',
            'CSSPlugin': '../bower_components/gsap/src/minified/plugins/CSSPlugin.min',

            // Modules
            'pageLoader': './page-loader',
            'cardCreator': './card-creator',

            // Cards
            'card': './cards/card',
            'minionCard': './cards/minion-card',
            'powerCard': './cards/power-card',
            'weaponCard': './cards/weapon-card'
        }
    });

    require(['sammy', 'pageLoader'], function (Sammy, pageLoader) {
        let router = Sammy(function () {
            this.before(function () {
                if (localStorage.username) {
                    this.redirect('#/home');
                    return true;
                } else {
                    this.redirect('#/');
                    return true;
                }
            });

            this.get('#/', function () {
                pageLoader.loadHomePage();
            });

            this.get('#/home', function () {
                pageLoader.loadTrainersPage();
            });

            this.get('#/game', function () {
                pageLoader.loadGamePage();
            });
        });

        router.run('#/');
    });
} ());