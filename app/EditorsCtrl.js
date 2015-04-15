(function(){
	angular.module('app').controller('EditorsCtrl', ["$scope",EditorsCtrl]);

	function EditorsCtrl($scope){

		var editor = ace.edit("editor");
		editor.setTheme("ace/theme/tomorrow_night");
    	editor.getSession().setMode("ace/mode/javascript");
	}

})();