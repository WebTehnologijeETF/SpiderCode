(function(){

	angular.module('app').factory('ZamgerDataMapper', ['ServiceProvider', function(service){

        var getContent = function(data, content, parentPath){
			 for(var i = 0; i < data.length; i++){
	 			var path;
	 			if(parentPath != '')
	 			path = parentPath + "\\" + data[i].id;
	 		    else
	 		    path = data[i].id;

			 	if(data[i].type === "file")
			 		content.push(new File(data[i].name, path, data[i].contents, data[i].id));
			 	else
			 		if(data[i].type === "folder"){
			 			var c = [];
			 			c = getContent(data[i].contents, c,  path);

			 			var folder = new Folder(data[i].name, path, c, data[i].id);
			 			if(data[i].id.indexOf("task") > -1)
			 			folder.setIsLoad(false);
			 		    else
			 		    	folder.setIsLoad(true);
			 		  
			 			content.push(folder);
			 		}



			 }
			 return content;
		}

		 var getTreeContent = function(data, content, parentPath){
			 for(var i = 0; i < data.length; i++){
	 			var path;
	 			if(parentPath != '')
	 			path = parentPath + "\\" + data[i].id;
	 		    else
	 		    path = data[i].id;

			 	if(data[i].type === "folder"){
			 			var c = [];
			 			c = getTreeContent(data[i].contents, c,  path);

			 			var folder = new Folder(data[i].name, path, c, data[i].id);
			 			if(data[i].id.indexOf("task") > -1)
			 			folder.setIsLoad(false);
			 		    else
			 		    	folder.setIsLoad(true);
			 		  
			 			content.push(folder);
			 		}



			 }
			 return content;
		}
		return{
			getParamsForLogin: function(data){
				return 'login='+ data.login +"&pass=" + data.pass;
			},
			FetchTree:  function(data){
					var content = [];
				content = getTreeContent(data, content, '');

				return content;
			},
			FetchFolderContent: function(data, path){
				var content = [];
				content = getContent(data, content, path);

				return content;
			},
			FetchFileContent: function(data){
				var content = [];
				content = getContent(data, content, path);

				return content; // ako je ispravan file path onda bi trebalo content[0]
			},
			FetchCreateFolderResponse: function(data){
				return data;
			},
			FetchCreateFileResponse: function(data){
				return data;
			},
			FetchUpdateFileResponse: function(data){
				return data;
			},
			FetchDeleteFileResponse: function(data){
				return data;
			}

		};
		}]);

	})();