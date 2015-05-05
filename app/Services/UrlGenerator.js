(function(){

	angular.module('app').factory('UrlGenerator', ['ServiceProvider',  function(service){

		return{
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