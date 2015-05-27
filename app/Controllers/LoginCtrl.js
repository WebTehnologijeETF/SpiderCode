(function(){
    
 
    var LoginCtrl = function($scope, $rootScope, service) {

    //services - begin
        var loginService = service.getService('LoginService', undefined);
    //services - end

    //methods it provides

    $scope.Login = function(Username, Pass){
    	var r = loginService.login({login: Username, pass: Pass}).success(function(data)
    	{
    		$rootScope.Username = Username;
    	})
    }
    
   }
 
    LoginCtrl.$inject = ['$scope', 'ServiceProvider'];
    angular.module('app').controller('LoginCtrl', LoginCtrl);
 
})();