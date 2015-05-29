(function(){

	angular.module('app').factory('ZamgerUrlGenerator', ['ServiceProvider',  function(service){

		return{
			LoginUrl: function($params){
				return "https://zamger.etf.unsa.ba/zadaceApi/auth.php";
			},
			getFolderContentsUrl: function($params){
				return 'https://zamger.etf.unsa.ba/zadaceApi/index.php?action=getFolderContents&filepath=' + $params.path;
			},
			getTreeUrl: function(){
				return 'https://zamger.etf.unsa.ba/zadaceApi/index.php?action=getTree';
			},
			getFileUrl: function($params){
				return 'https://zamger.etf.unsa.ba/zadaceApi/index.php?action=getFile&filepath=' + $params.path;
			},
			getCreateFolderUrl: function($params){
				return 'https://zamger.etf.unsa.ba/zadaceApi/index.php?action=createFolder&filepath=' + $params.path + '&name=' + $params.name;
			},
			getCreateFileUrl: function($params){
				return 'https://zamger.etf.unsa.ba/zadaceApi/index.php?action=createFile&filepath=' + $params.path + '&name=' + $params.name + '&filecontents=' + $params.content;
			},
			getUpdateFileUrl: function($params){
				return 'https://zamger.etf.unsa.ba/zadaceApi/index.php?action=updateFile&filepath=' + $params.path + '&filecontents=' + $params.content;
			},
			getDeleteFileUrl: function($params){
				return 'https://zamger.etf.unsa.ba/zadaceApi/index.php?action=deleteFile&filepath=' + $params.path;
			},
			getDeleteFolderUrl: function($params){
				return '';
			}

		};
		}]);

	})();