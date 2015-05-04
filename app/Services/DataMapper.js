(function(){

	angular.module('app').factory('DataMapper', [ function($rootScope){

		var Project = $rootScope.Folder;
		return{
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