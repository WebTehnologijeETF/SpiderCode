(function(){

	angular.module('app').factory('DataMapper', ['ServiceProvider', function(service){



		return{
			FetchFolderContent: function(data){
				return data;
			},
			FetchTree:  function(data){
				return data;
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