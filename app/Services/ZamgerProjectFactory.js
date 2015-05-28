(function(){

	angular.module('app').factory('ZamgerProjectFactory', ['$http', 'ServiceProvider', function($http, service){

		 var mapper = service.getService('DataMapper', undefined);
		 var url = service.getService('UrlGenerator', undefined);
		
		return{

			getFolderContents: function($params){
				return $http.get(url.getFolderContentsUrl($params))
				.success(function(response){
					if(response.data.success === "true")
					return mapper.FetchFolderContent(response.data.data, $params.path);
					else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert(data.message);
					//TO DO: this
				});
			},
			getTree: function(){
				return $http.get(url.getTreeUrl())
				.success(function(response){
					if(response.data.success === "true")
					return mapper.FetchTree(response.data.data);
					else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert(data.message);
					//TO DO: this
				});
			},
			getFile: function($params){
				return $http.get(url.getFileUrl($params))
				.success(function(response){
					if(response.data.success === "true")
					return mapper.FetchFileContent(response.data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert(data.message);
					//TO DO: this
				
				});;				
				},
			createFolder: function($params){ //params = content, base_tree
				return $http.get(url.getCreateFolderUrl($params))
				.success(function(response){
					if(response.data.success === "true")
					return mapper.FetchCreateFolderResponse(response.data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert(data.message);
					//TO DO: this
				
				});;
			},
			createFile: function($params){
				return $http.get(url.getCreateFileUrl($params))
				.success(function(response){
					if(response.data.success === "true")
					return mapper.FetchCreateFileResponse(response.data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert(data.message);
					//TO DO: this
				
				});;
			},
			updateFile: function($params){
				return $http.get(url.getUpdateFileUrl($params))
				.success(function(response){
					if(response.data.success === "true")
					return mapper.FetchUpdateFileResponse(response.data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert(data.message);
					//TO DO: this
				
				});;
			},
			deleteFile: function($params){
				return $http.get(url.getDeleteFileUrl($params))
				.success(function(response){
					if(response.data.success === "true")
					return mapper.FetchDeleteFileResponse(response.data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert(data.message);
					//TO DO: this
				
				});;
			}
		};




	}]);

	})();