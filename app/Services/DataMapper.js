(function(){

	angular.module('app').factory('DataMapper', ['ServiceProvider', function(service){

		var Project = service.getService('Folder', undefined);
		return{
			FetchFolderContent: function(data){
				var content = [];
				
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