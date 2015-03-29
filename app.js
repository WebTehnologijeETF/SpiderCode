    
    var app = angular.module('app', [])
                    .config(['$routeProvider', function ($routeProvider) {
                           $routeProvider.when('/', {
                            controller: HomeController,
                            templateUrl: '/templates/Home.html'
                            });
                            $routeProvider.when('/Home', {
                            controller: HomeController,
                            templateUrl: '/templates/Home.html'
                            });

                            $routeProvider.when('/About', {
                            controller: AboutController,
                            templateUrl: '/templates/About.html'
                            });

                            $routeProvider.when('/Contacts', {
                            controller: ContactsController,
                            templateUrl: 'Contacts.html'
                            });

                            $routeProvider.otherwise({ redirectTo: '/' });
                            }]);

    app.controller('HomeController', function($scope) {
        // nista pametno sad zasad
    });

    app.controller('AboutController', function($scope) {
        
    });

    app.controller('ContactsController', function($scope) {
        
    });