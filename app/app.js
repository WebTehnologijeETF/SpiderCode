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

            var msg_icon = document.getElementById("msg_icon");
            msg_icon.style.display = "none";

            var sub_icon = document.getElementById("sub_icon");
            sub_icon.style.display = "none";

            var sub_icon = document.getElementById("rad_icon");
            rad_icon.style.display = "none";
            
            var sub_icon = document.getElementById("ph_icon");
            ph_icon.style.display = "none";
            
            /*Mail Validation*/
            var mail = document.getElementById("usernameInput");
            if(validator.Mail(mail.value) == false){
                errors.push("E-mail isn't correct");
                mail_icon.style.display = "inline-block";
            }
            
            /*Radio Validation*/
            var r1 = document.getElementById("r1");
            var r2 = document.getElementById("r2");
            if(!r1.checked && !r2.checked){
                errors.push("You need to select who are you");
                rad_icon.style.display = "inline-block";
            }
            /*Phone validation*/
            var phone = document.getElementById("phoneInput");
            /*Cross-Validation*/
            if(r2.checked){
                if(phone.value.length < 1){
                    errors.push("Phone is required if you are company");
                    ph_icon.style.display = "inline-block";
                }
            }

            if(phone.value.length > 1 && !validator.Phone(phone.value)){
                errors.push("Phone is not OK. Valid format is (000)-000-000 or 000-000-000")
                ph_icon.style.display = "inline-block";
            }
            /*Message Validation*/
            var msg = document.getElementById("messageInput");
            if(msg.value.length < 1){
                errors.push("Message is required");
                msg_icon.style.display = "inline-block";
            }
            


            /Error output*/
            var e = document.getElementById("errors");
            e.innerHTML = "";
            e.style.display = "none";

            if(errors.length >= 1){
                e.style.display = "block";

                for(var i = 0; i < errors.length; i++){
                    e.innerHTML +=  errors[i] + "<br>" ;
                }
            }

        }



        
    });

    app.controller('LoginCtrl', function($scope, $rootScope) {
         
    });

    app.controller('ChooseServerCtrl', function($scope, $rootScope){

    });

})();