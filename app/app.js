(function(){
    'use strict';
    
    var app = angular.module('app', ['ngRoute'])
         .run(['$rootScope', function($rootScope) {

                        $rootScope.LoggedIn = false;
                        $rootScope.Username = undefined;
                        $rootScope.onloadfunc = function() //funkcija koja se pokrece nakon loadanja template html-a i overrideana je u svakom kontroleru za svaki template html
                        {
                            console.log('onload from root');
                        };
                    }])
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

    app.service('ServiceProvider', [function(){

       var injector = angular.injector(['app', 'ng']);

       var ServerName = "Zamger"; // "DefaultServerName";

        var setServerName = function(serverName) {

            ServerName = value;
        };

        return{
            getService : function(serviceName, altName){
            return injector.get(ServerName + serviceName);
                }
                

            };
 }
    ]);



})();