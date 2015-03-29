    
    var module = angular.module('app', [])
                    .config(["$routeProvider", function ($routeProvider) {
                           $routeProvider.when("/", {
                            controller: "HomeController",
                            templateUrl: "/templates/Home.html"
                            });
                            $routeProvider.when("/Home", {
                            controller: "HomeController",
                            templateUrl: "/templates/Home.html"
                            });

                            $routeProvider.when("/About", {
                            controller: "AboutController",
                            templateUrl: "/templates/About.html"
                            });

                            $routeProvider.when("/Contacts", {
                            controller: "ContactsController",
                            templateUrl: "Contacts.html"
                            });

                            $routeProvider.otherwise({ redirectTo: "/" });
                            }]);

    scotchApp.controller('HomeController', function($scope) {
        // nista pametno sad zasad
    });

    scotchApp.controller('AboutController', function($scope) {
        
    });

    scotchApp.controller('ContactsController', function($scope) {
        
    });