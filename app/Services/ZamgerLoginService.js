(function(){

	angular.module('app').factory('ZamgerLoginService', ['$http', 'ServiceProvider', function($http, service){
		 var url = service.getService('UrlGenerator', undefined);
		 var mapper = service.getService('DataMapper', undefined);
	return{

			login: function($params){
				alert('Saying hi from ZamgerLoginService!');
				var JSONdata = getParamsForLogin($params);
				return $http({
					url: url.LoginUrl(),
					method: "POST",
					data: {"login" : JSONdata.login, "pass" : JSONdata.pass}
				});
			},
			
		};


	}]);

	})();