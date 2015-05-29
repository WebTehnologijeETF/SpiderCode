(function(){

	angular.module('app').factory('ZamgerLoginService', ['$http', 'ServiceProvider', function($http, service){
		 var url = service.getService('UrlGenerator', undefined);
		 var mapper = service.getService('DataMapper', undefined);
	return{

			login: function($params){
				alert('Saying hi from ZamgerLoginService!');
				return $http({
					url: url.LoginUrl(),
					method: "POST",
					data: mapper.getParamsForLogin($params)
				});
			},
			
		};


	}]);

	})();