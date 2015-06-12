(function(){

    var app = angular.module('app');

    app.controller('ContactsCtrl', function($scope, $rootScope, $http) {

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

            var dummyCpp = "#include <iostream>\n\n int d(int x){\n    return 2*x; \n}\n\nint main(){\n   std::cout << d(2);\n}\n\n";
            //var json = JSON.stringify($scope.task);
            //alert(json);

            var zip = new JSZip();
            alert(dummyCpp);

            zip.file("zad.cpp",dummyCpp);
            var a = zip.generate({type:"blob"});

            $http({
                url: "http://php-vljubovic.rhcloud.com/bs/submit.php",
                method: "POST",
                data: {program_data : a}, 
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).
            success(function(data, status, headers, config) {
                alert("Uspjelo!!!: "+ data);
            }).
            error(function(data, status, headers, config) {
                alert("Error se desio: " +  status);
                alert(status);
            });
        } 
    });
}());