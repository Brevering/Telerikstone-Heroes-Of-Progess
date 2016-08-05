(function () {
    'use strict';

    define([], () => {
        let widthOnePercent = window.outerWidth / 100,
            heightOnePercent = window.outerHeight / 100,
            canvasWidth = (window.outerWidth / 16) * 14,
            canvasHeight = (window.outerHeight / 9) * 8;

        return {
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight,
            widthOnePercent: widthOnePercent,
            heightOnePercent: heightOnePercent
        };
    });
}());