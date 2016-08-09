(function () {

    define(['jquery', 'sammy'], function ($, Sammy) {
        const minTextLength = 3,
            maxTextLength = 20;

        function Validator() {
        }

        Validator.prototype = {
            onInvalidUserName(username) {
                let letters = /^[0-9a-zA-Z]+$/;

                if (!username.match(letters)) {
                    alert('User name must have alphanumeric characters only');
                    username.focus();
                    return false;
                }

                if (username.length < minTextLength || username.length > maxTextLength || !username) {
                    return false;
                }

                return true;
            },
            onInvalidPassword(password) {
                if (password.length < minTextLength || password.length > maxTextLength || !password) {
                    return false;
                }

                return true;
            },
        };

        return Validator;
    });

} ());