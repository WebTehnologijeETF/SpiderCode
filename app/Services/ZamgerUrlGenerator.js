(function(){

	angular.module('app').factory('ZamgerUrlGenerator', ['ServiceProvider',  function(service){

		return{
			LoginUrl: function($params){
				return "http://zamger.etf.unsa.ba/zadaceApi/auth.php";
			},
			getFolderContentsUrl: function(somestuff){
				return ''; //TO DO: this
			},
			getFileUrl: function(somestuff){
				return '';
			},
			getCreateFolderUrl: function(somestuff){
				return '';
			},
			getCreateFileUrl: function(somestuff){
				return '';
			},
			getUpdateFileUrl: function(somestuff){
				return '';
			},
			getDeleteFileUrl: function(somestuff){
				return '';
			}			
		};
		}]);

	})();