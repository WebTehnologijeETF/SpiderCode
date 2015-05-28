(function(){
    
 
    var ChooseServerCtrl = function($scope, service) {
    //services - begin
        var ProjectFactory = service.getService('ProjectFactory', undefined);
     //services - end


   }
 
    ChooseServerCtrl.$inject = ['$scope', 'ServiceProvider'];
    angular.module('app').controller('ChooseServerCtrl', ChooseServerCtrl);
 
})();