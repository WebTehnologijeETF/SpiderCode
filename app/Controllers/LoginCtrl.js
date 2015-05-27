(function(){
    
 
    var LoginCtrl = function($scope, service) {
    //services - begin
        var ProjectFactory = service.getService('ProjectFactory', undefined);
        var Folder = service.getService('Folder', undefined);
    //services - end

    
   }
 
    LoginCtrl.$inject = ['$scope', 'ServiceProvider'];
    angular.module('app').controller('LoginCtrl', LoginCtrl);
 
})();