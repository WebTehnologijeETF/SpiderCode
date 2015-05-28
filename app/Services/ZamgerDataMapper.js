(function(){

	angular.module('app').factory('ZamgerDataMapper', ['ServiceProvider', function(service){

		return{
			getParamsForLogin: function(data){
				return {login: data.login, pass: data.pass};
			},
			FetchFolderContent: function(data){
				return data; //TO DO: this
			},
			FetchFileContent: function(data){
				return data;
			},
			FetchCreateFolderResponse: function(response){
				return response;
			},
			FetchCreateFileResponse: function(response){
				return response;
			},
			FetchUpdateFileResponse: function(response){
				return response;
			},
			FetchDeleteFileResponse: function(response){
				return response;
			}

		};
		}]);

	})();