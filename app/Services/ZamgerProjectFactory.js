(function(){

	angular.module('app').factory('ZamgerProjectFactory', ['$http', 'ServiceProvider', function($http, service){

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
				return $http.get(url.getCreateFolderUrl($params))
					.success(function(response){
					return mapper.FetchCreateFolderResponse(response);
				});
			},
			createFile: function(){
				return $http.get(url.getCreateFileUrl($params)).success(function(response){
					return mapper.FetchCreateFileResponse(response);
				});
			},
			updateFile: function($params){
				return $http.get(url.getUpdateFileUrl($params)).success(function(response){
					return mapper.FetchUpdateFileResponse(response)
				});
			},
			deleteFile: function($params){
				return $http(url.getDeleteFileUrl($params)).success(function(response){
					return mapper.FetchDeleteFileResponse(response)
				});
			}
		};


	}]);

	})();