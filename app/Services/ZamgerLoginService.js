(function(){

	angular.module('app').factory('ZamgerLoginService', ['$http', 'ServiceProvider', function($http, service){
		 var url = service.getService('UrlGenerator', undefined);
		 var mapper = service.getService('DataMapper', undefined);
	return{

			login: function($params){
				alert('Saying hi from ZamgerLoginService!');
				var JSONdata = mapper.getParamsForLogin($params);
				var dataAsURL = 'login='+ JSONdata.login +"&pass=" + JSONdata.pass;
				return $http({
					url: url.LoginUrl(),
					method: "POST",
					data: dataAsURL,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				});
			},
			
		};


	}]);

	})();