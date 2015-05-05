(function(){

	angular.module('app').factory('ProjectFactory', ['$http', 'ServiceProvider', function($http, service){

		 var mapper = service.getService('DataMapper', undefined);
		 var url = service.getService('UrlGenerator', undefined);
		
		return{

			getFolderContents: function($params){
				return $http.get(url.getFolderContentsUrl($params))
				.success(function(response){
					return mapper.FetchFolderContent(response.data);
				});
			},
			getFile: function($params){
				return $http.get(url.getFileUrl($params))
				.success(function(response){
					return mapper.FetchFileContent(response.data);
				});				
				},
			createFolder: function($params){ //params = content, base_tree
				return $http({
					url: url.getCreateFolderUrl($params),
					method: "POST",
					data: mapper.getParamsToCreateFolder($params)
				}).success(function(response){
					return mapper.FetchCreateFolderResponse(response);
				});
			},
			createFile: function(){
				return $http({
					url: url.getCreateFileUrl($params),
					method: "POST",
					data: mapper.getParamsToCreateFile($params)
				}).success(function(response){
					return mapper.FetchCreateFileResponse(response);
				});
			},
			updateFile: function($params){
				return $http({
					url:url.getUpdateFileUrl($params),
					method: "PATCH",
					data: mapper.getParamsToUpdateFile($params)
				}).success(function(response){
					return mapper.FetchUpdateFileResponse(response)
				});
			},
			deleteFile: function($params){
				return $http({
					url:url.getDeleteFileUrl($params),
					method: "DELETE",
					data: mapper.getParamsToDeleteFile($params)
				}).success(function(response){
					return mapper.FetchDeleteFileResponse(response)
				});
			}
		};


	}]);

	})();