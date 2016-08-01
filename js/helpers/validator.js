(function () {

    define(['jquery', 'sammy'], function ($, Sammy) {
        function Validator() {
        }

        Validator.prototype = {
            onInvalidUserName(username) {
                if (username.length < 3 || username > 20 || !username) {
                    return false;
                }
                return true;
            },
            onInvalidPassword(password) {
                if (password.length < 3 || password > 20 || !password) {
                    return false;
                }
                return true;
            },
        };
    });

} ());