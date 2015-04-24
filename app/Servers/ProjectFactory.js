(function(){

	angular.module('app').factory('ProjectFactory', ['$http', 'RequestFetcherService', function($http, service){

		
		return{

			getFolderContents: function($params){
				return $http({
					url: service.getFolderContentsUrl($params)},
					method: "GET",
					data: service.getParamsToGetFolderContents($params)
					).success(function(response){
					return service.fetchFolderContent(response.data);
				});
			},
			getFile: function($params){
				return $http({
					url: service.getFileUrl($params)},
					method: "GET",
					data: service.getParamsToGetFile($params)
					).success(function(response){
					return service.fetchFileContent(response.data);
				});				
				},
			createFolder: function($params){ //params = content, base_tree
				return $http({
					url: service.getCreateFolderUrl($params),
					method: "POST",
					data: service.getParamsToCreateFolder($params)
				}).success(function(response){
					return service.FetchCreateFolderResponse(response);
				});
			},
			createFile: function(){
				return $http({
					url: service.getCreateFileUrl($params),
					method: "POST",
					data: service.getParamsToCreateFile($params)
				}).success(function(response){
					return service.FetchCreateFileResponse(response);
				});
			},
			updateFile: function($params){
				return $http({
					url:service.getUpdateFileUrl($params),
					method: "PATCH",
					data: service.getParamsToUpdateFile($params)
				}).success(function(response){
					return service.FetchUpdateFileResponse($params)
				});
			},
			deleteFile: function($params){
				return $http({
					url:service.getDeleteFileUrl($params),
					method: "DELETE",
					data: service.getParamsToDeleteFile($params)
				}).success(function(response){
					return service.FetchDeleteFileResponse($params)
				});
			}
		};


	}]);

	})();