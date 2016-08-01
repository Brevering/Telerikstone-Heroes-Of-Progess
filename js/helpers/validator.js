(function(){
    
    define(['jquery','sammy'],function ($, Sammy){
        function Validator() {
        }

       Validator.prototype = {
           onInvalidUserName(username){
               return true;
           },
           onInvalidPassword(password){
               return true;
           },
       };
    });
    
}());