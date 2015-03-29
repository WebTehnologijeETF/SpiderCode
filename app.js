    'use strict';
    
    var app = angular.module('app', ['ngRoute'])
                    .config(['$routeProvider', function ($routeProvider) {
                           $routeProvider.when('/', {
                            controller: 'HomeController',
                            templateUrl: '/templates/Home.html'
                            });
                            $routeProvider.when('/Home', {
                            controller: 'HomeController',
                            templateUrl: '/templates/Home.html'
                            });

                            $routeProvider.when('/About', {
                            controller: 'AboutController',
                            templateUrl: '/templates/About.html'
                            });

                            $routeProvider.when('/Contacts', {
                            controller: 'ContactsController',
                            templateUrl: '/templates/Contacts.html'
                            });

                            $routeProvider.when('/ChooseServer', {
                            controller: 'ChooseServerController',
                            templateUrl: '/templates/ChooseServer.html'
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