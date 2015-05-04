(function(){
    'use strict';
    
    var app = angular.module('app', ['ngRoute'])
<<<<<<< HEAD
                    .run(['$rootScope', function($rootScope) {
=======
                    .run(function($rootScope) {
                        
                         $rootScope.ServerName = ''; // "DefaultServerName";
                         $rootScope.Folder = 'Folder';
                         $rootScope.DataMapper = 'DataMapper'; 
                         $rootScope.ProjectFactory = 'ProjectFactory';       
                         $rootScope.UrlGenerator = 'UrlGenerator'; 
                       
>>>>>>> origin/master
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

    app.controller('LoginCtrl', function($scope, $rootScope) {
         
    });

    app.controller('ChooseServerCtrl', function($scope, $rootScope){

    });

    app.service('ServerInfo', [function(){
   
        var setServerName = function(value) {
                $rootScope.ServerName = value;
                $rootScope.Folder = $rootScope.$service(ServerName + 'Folder');
                $rootScope.DataMapper = $rootScope.$service(ServerName + 'DataMapper');
                $rootScope.ProjectFactory = $rootScope.$service(ServerName + 'ProjectFactory');
                $rootScope.UrlGenerator = $rootScope.$service(ServerName + 'UrlGenerator');
            };

            }
 
    ]);


})();