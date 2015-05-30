(function(){

	angular.module('app').factory('ZamgerDataMapper', ['ServiceProvider', function(service){

        var getContent = function(data, content, parentPath){
			 for(var i = 0; i < data.length; i++){
			 	if(data[i].type === "file")
			 		content.push(new File(data[i].name, parentPath + "\\" + data[i].id , data[i].contents, data[i].id));
			 	else
			 		if(data[i].type === "folder"){
			 			var c = [];
			 			getContent(data[i].contents, c,  parentPath + "\\" + data[i].id);

			 			var folder = new Folder(data[i].name, parentPath + "\\" + data[i].id, c, id);
			 			folder.setIsLoad(true);
			 			content.push(folder);
			 		}



			 }
			 return content;
		}

		 var getTreeContent = function(data, content, parentPath){
			 for(var i = 0; i < data.length; i++){
			 	if(data[i].type === "folder"){
			 			var c = [];
			 			getContent(data[i].contents, c,  parentPath + "\\" + data[i].id);

			 			var folder = new Folder(data[i].name, parentPath + "\\" + data[i].id, c, id);
			 			folder.setIsLoad(false);
			 			content.push(folder);
			 		}



			 }
			 return content;
		}
		return{
			getParamsForLogin: function(data){
				return {"login": data.login, "pass": data.pass};
			},
			FetchTree:  function(data){
					var content = [];
				content = getContent(data, content, '');

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