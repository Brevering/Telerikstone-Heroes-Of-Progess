(function () {

    define(['jquery', 'sammy'], function ($, Sammy) {
        function Validator() {
        }

        Validator.prototype = {
            onInvalidUserName(username) {
                var letters = /^[0-9a-zA-Z]+$/;
                if (!username.match(letters)) {
                    alert('User name must have alphanumeric characters only');
                    username.focus();
                    return false;
                }
                if (username.length < 3 || username.length > 20 || !username) {
                    return false;
                }

                return true;
            },
            onInvalidPassword(password) {
                if (password.length < 3 || password.length > 20 || !password) {
                    return false;
                }
                

                return true;
            },
        };

        return Validator;
    });

} ());