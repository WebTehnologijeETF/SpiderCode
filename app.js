    'use strict';
    
 var app = angular.module('app', ['ngRoute'])
                           .run(function($rootScope) {
                           $rootScope.onloadfunc = function()
                            {
                                console.log('onload from root');
                            };
                            })
                           .config(['$routeProvider', function ($routeProvider) {
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
 
                            $routeProvider.when('/ChooseServer', {
                            controller: 'ChooseServerController',
                            templateUrl: '/templates/ChooseServer.html'
                            });

                            $routeProvider.when('/Loggin', {
                            controller: 'LoginController',
                            templateUrl: '/templates/Loggin.html'
                            });

                            $routeProvider.otherwise({ redirectTo: "/" });
                            }]);


 
    app.controller('HomeController', function($scope, $rootScope) {


               //dummmy dataa 

        $scope.Projects = [];

        for(var i = 0; i < 5; i++)
            {
                $scope.f121 = {Name: 'Folder1.2.1', Files:[], Folders:[]};
                $scope.f12 = {Name: 'Folder1.2', Files:[], Folders:[$scope.f121]};
                $scope.f11 = {Name: 'Folder1.1', Files:[], Folders:[]};
                $scope.f1 =  {Name: 'Folder1', Files: [{Name : 'file1'},{Name: 'file2'}], Folders: [$scope.f11,$scope.f12] };
                $scope.f2 =  {Name: 'Folder2', Files: [{Name:'file1'},{Name:'file2'}],Folders:[]};
                $scope.f3 = {Name: 'Folder3', Files: [{Name:'file1'},{Name:'file2'}],Folders:[]};

                $scope.Projects[i] = { Folders: [$scope.f1, $scope.f2, $scope.f3], 
                Files: [{Name:'file1'},{Name:'file2'}, {Name:'file3'},{Name:'file4'}], Name: 'Project'+i, Path: 'Project'+i};
            }

     

        
        $scope.list = function(refElement, refFolder){
            if(refElement.className.match(/(?:^|\s)unexpanded(?!\S)/) )
            {
                var className = refElement.className.replace( /(?:^|\s)unexpanded(?!\S)/ , ' expanded' );
                refElement.setAttribute("class", className);  

                if(refFolder.Folders === [] && refFolder.Files === [])
                {
                    // folder.Path = refFolder.Path + '/' + folder.Name
                    //HTTP GET folderov content na osnovu path-a + appear(refElement, refFolder)
                }
                else
                {

                    if( refElement.querySelectorAll("ul").length === 0)
                    {

                        //napravi djecu na osnovu dobavljenih foldera i fajlova
                        appear(refElement, refFolder);
                    }
                    else
                    { // postoje djeca
                        refElement.querySelector("ul").style.display = "block";
                    }
                }
            }
            else
            {

                dissappear(refElement);
            }
            return false;
        };

        var  appear = function(refElement, refFolder)
        {
            var lista = document.createElement("ul");
            for(var i = 0; i < refFolder.Folders.length; i++)
           {
                var node = document.createElement("LI");
                node.setAttribute("class", "explist unexpanded");               
                var b = document.createElement("button");
                b.setAttribute("class", "link");
                b.innerHTML = refFolder.Folders[i].Name;
                b.folder = refFolder.Folders[i];
                b.addEventListener( "click", function() {
                return $scope.list(this.parentNode, this.folder);
                }, false);
                node.appendChild(b);
                lista.appendChild(node);
            }
            for(var j = 0; j < refFolder.Files.length; j++)
            {
                var node = document.createElement("LI");
                var b = document.createElement("button");
                b.setAttribute("class", "link");
                b.innerHTML = refFolder.Files[j].Name;
                b.file = refFolder.Files[j];
                b.addEventListener( "click", function() {
                alert('Upaljeno!'); }, false);
                node.appendChild(b);
                lista.appendChild(node);
            }
            refElement.appendChild(lista);
        }


        var  dissappear = function(refElement)
        {         
                var className = refElement.className.replace( /(?:^|\s)expanded(?!\S)/g , ' unexpanded' );
                refElement.setAttribute("class", className);
                var elements = refElement.querySelectorAll(".expanded");
                for(var i = 0; i < elements.length; i++)
                    {
                        elements[i].querySelector("ul").style.display = "none";
                        className = elements[i].className.replace( /(?:^|\s)expanded(?!\S)/g , ' unexpanded' );
                        elements[i].setAttribute("class", className);  
                    }
                refElement.querySelector("ul").style.display = "none";
   
        }

       $scope.onloadfunc = function(){
        console.log('onload from scope in ctrl');
       var elements = document.querySelectorAll("ul.projectTree");



       if(elements.length != 0)
       {
        var list = elements[0];
       for(var i = 0; i < $scope.Projects.length; i++)
        {
                var node = document.createElement("LI");
                node.setAttribute("class", "explist unexpanded");               
                var b = document.createElement("button");
                b.setAttribute("class", "link");
                b.innerHTML = $scope.Projects[i].Name;
                b.folder = $scope.Projects[i];
                b.addEventListener( "click", function() {
                return $scope.list(this.parentNode, this.folder);
                }, false);
                node.appendChild(b);
                list.appendChild(node);
                
        }
    }
    };
        
    });
 
    app.controller('AboutController', function($scope, $rootScope) {
         
    });
 
    app.controller('ContactsController', function($scope, $routeProvider) {
         
    });

        app.controller('LoginController', function($scope, $routeProvider) {
         
    });