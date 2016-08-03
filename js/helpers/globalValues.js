(function () {
    'use strict';

    define([], () => {
        let widthOnePercent = window.outerWidth / 100;
        let heightOnePercent = window.outerHeight / 100;
        let canvasWidth = (window.outerWidth / 16) * 14;
        let canvasHeight = (window.outerHeight / 9) * 8;

        return {
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight,
            widthOnePercent: widthOnePercent,
            heightOnePercent: heightOnePercent
        };
    });
} ());