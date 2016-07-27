(function () {
    'use strict';

    define(['jquery'], function ($) {
        function loadGuestPage(selector) {
            $.get('html-parts/guest-page.html', function (html) {
                $(selector).append(html);
            });
        }
        
        return {
            loadGuestPage: loadGuestPage  
        };
    });
}());