(function(){
    'use strict';
    
    var app = angular.module('app', ['ngRoute'])
                    .run(function($rootScope) {
                        $rootScope.onloadfunc = function() //funkcija koja se pokrece nakon loadanja template html-a i overrideana je u svakom kontroleru za svaki template html
                        {
                            console.log('onload from root');
                        };
                    })
                    .config(['$routeProvider', function ($routeProvider) {
                        //Setting routes
                        $routeProvider.when("/", {
                            controller: "HomeCtrl",
                            templateUrl: "/app/templates/Home.html"
                        });

                        $routeProvider.when("/Home", {
                            controller: "HomeCtrl",
                            templateUrl: "/app/templates/Home.html"
                        });

                        $routeProvider.when("/About", {
                            controller: "AboutCtrl",
                            templateUrl: "/app/templates/About.html"
                        });

                        $routeProvider.when("/Contacts", {
                            controller: "ContactsCtrl",
                            templateUrl: "/app/templates/Contacts.html"
                        });

                        $routeProvider.when('/ChooseServer', {
                            controller: 'ChooseServerCtrl',
                            templateUrl: '/app/templates/ChooseServer.html'
                        });

                        $routeProvider.when('/Loggin', {
                            controller: 'LoginCtrl',
                            templateUrl: '/app/templates/Loggin.html'
                        });

                        $routeProvider.otherwise({ redirectTo: "/" });
                    }]);

 
    app.controller('AboutCtrl', function($scope, $rootScope) {
         
    });
 
    app.controller('ContactsCtrl', function($scope, $rootScope) {

        var val = document.getElementsByClassName("val");
        for(var i = 0; i < val.length; i++ ){
            val[i].addEventListener("blur", ValidateContacts);
        }

        function ValidateContacts(event){
            var errors = [];
            var mail_icon = document.getElementById("mail_icon");
            mail_icon.style.display = "none";

            var mail = document.getElementById("usernameInput");
            if(validator.Mail(mail.value) == false){
                errors.push("E-mail isn't correct");
                mail_icon.style.display = "inline-block";
            }
            
        }

        
    });

    app.controller('LoginCtrl', function($scope, $rootScope) {
         
    });

    app.controller('ChooseServerCtrl', function($scope, $rootScope){

    });

})();