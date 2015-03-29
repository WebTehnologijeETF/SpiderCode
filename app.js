 var app = angular.module('app', ['ngRoute'])
                    .config(function ($routeProvider) {
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
                            templateUrl: "/templates/Contacts.html"
                            });
 
                            $routeProvider.otherwise({ redirectTo: "/" });
                            });
 
    app.controller('HomeController', function($scope) {

        $scope.Projects = [];

        for(var i = 0; i < 5; i++)
            {
                $scope.Projects[i] = { files: ['file1','file2', 'file3','file4'], name: 'Project'+i};
            }
    });
 
    app.controller('AboutController', function($scope) {
         
    });
 
    app.controller('ContactsController', function($scope) {
         
    });