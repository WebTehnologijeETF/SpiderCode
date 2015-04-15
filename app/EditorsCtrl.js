(function(){
	angular.module('app').controller('EditorsCtrl', ["$scope",EditorsCtrl]);

	function EditorsCtrl($scope){

		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
    	editor.getSession().setMode("ace/mode/javascript");
	}

})();