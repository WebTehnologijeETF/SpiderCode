(function(){

	angular.module('app').factory('ZamgerProjectFactory', ['$http', 'ServiceProvider', function($http, service){

		 var mapper = service.getService('DataMapper', undefined);
		 var url = service.getService('UrlGenerator', undefined);
		
		return{

			getFolderContents: function($params){
				return $http.get(url.getFolderContentsUrl($params))
				.success(function(response){
					var data = angular.fromJson(response.data);
					if(data.success === "true")
					return mapper.FetchFolderContent(data.data, $params.path);
					else
						alert(data.message);
					//TO DO: this
				})
				.error(function(status, headers, config){
					alert('status: ' + status);
					//TO DO: this
				});
			},
			getTree: function(){
				return $http.get(url.getTreeUrl())
				.success(function(response){
					var data = angular.fromJson(response.data);
					if(data.success === "true")
					return mapper.FetchTree(data.data);
					else
						alert(data.message);
					//TO DO: this
				})
				.error(function(status, headers, config){
					alert('status: ' + status);
					//TO DO: this
				});
			},
			getFile: function($params){
				return $http.get(url.getFileUrl($params))
				.success(function(response){
					var data = angular.fromJson(response.data);
					if(data.success === "true")
					return mapper.FetchFileContent(data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(status, headers, config){
					alert('status: ' + status);
					//TO DO: this
				
				});;				
				},
			createFolder: function($params){ //params = content, base_tree
				return $http.get(url.getCreateFolderUrl($params))
				.success(function(response){
					var data = angular.fromJson(response.data);
					if(data.success === "true")
					return mapper.FetchCreateFolderResponse(data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert('status: ' + status);
					//TO DO: this
				
				});;
			},
			createFile: function($params){
				return $http.get(url.getCreateFileUrl($params))
				.success(function(response){
					var data = angular.fromJson(response.data);
					if(data.success === "true")
					return mapper.FetchCreateFileResponse(data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert('status: ' + status);
					//TO DO: this
				
				});;
			},
			updateFile: function($params){
				return $http.get(url.getUpdateFileUrl($params))
				.success(function(response){
					var data = angular.fromJson(response.data);
					if(data.success === "true")
					return mapper.FetchUpdateFileResponse(data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert('status: ' + status);
					//TO DO: this
				
				});;
			},
			deleteFile: function($params){
				return $http.get(url.getDeleteFileUrl($params))
				.success(function(response){
					var data = angular.fromJson(response.data);
					if(data.success === "true")
					return mapper.FetchDeleteFileResponse(data.data);
				    else
						alert(data.message);
					//TO DO: this
				})
				.error(function(data, status, headers, config){
					alert('status: ' + status);
					//TO DO: this
				
				});;
			}
		};




	}]);

	})();