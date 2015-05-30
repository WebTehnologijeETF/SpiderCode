(function(){
    
 
    var LoginCtrl = function($scope, $rootScope, service) {

    //services - begin
        var loginService = service.getService('LoginService', undefined);
    //services - end

    $scope.Username = '';
    $scope.Password = '';

    //methods it provides

     $scope.Login = function(Username, Pass){
        var r = loginService.login({login: Username, pass: Pass}).success(function(data)
        {
            alert('I am here!' + Username);
            if(data.success = true)
            {
                $rootScope.PHPSESSID = data.sid;
                $rootScope.Username = Username;
                $rootScope.LoggedIn = true;
                alert(data.server_message);
            }
            else
            {
                $scope.Username = '';
                $scope.Password = '';
                alert(data.message);
            }
        })
        .error(function(status, headers, config){
                    alert('status: ' + status);
                    //TO DO: this
                });
    }    

     $scope.submit = function() {

        $scope.Login(this.Username, this.Password);
      };

   
   }
 
    LoginCtrl.$inject = ['$scope', '$rootScope', 'ServiceProvider'];
    angular.module('app').controller('LoginCtrl', LoginCtrl);
 
})();