(function(angular){

    angular.module('form-validator-example',['form-validator'])
    .controller('exampleController',['$scope',function(scope){

        scope.obj = {
            configs : {
                trigger : 'trigger-validate',
                validateError : 'validate-error'
            },

            saveCallback : function(response){
                console.log(response);
            }
        };

        

    }]);

})(angular);