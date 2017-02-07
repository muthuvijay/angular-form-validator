/*
* Form Validator directive
* Does Validation of form fields and return status
* Author : Muthu Vijayan
TODOs : Support Inline Validation & Message control later
*/
(function(angular){

'use strict';
    
angular.module('form-validator-directive',[])
.directive('mvFormValidator',['$rootScope',function($rootScope) {
    
    //link function
    function linkFn($scope,$elem,$attr,ctrl){

        var clazz = ($scope.config && $scope.config.trigger)?$scope.config.trigger:'trigger-validate'; 

        ctrl.$action = null; //action identifier
        ctrl.form = $attr.name || null; //Form identifier 
        ctrl.validateError = ($scope.config && $scope.config.validateError)?$scope.config.validateError:'validate-error';
        
        $elem.on('click',function(e){
            e.stopPropagation();
            var $target = angular.element(e.target);
            
            if($target.hasClass(clazz)){
                ctrl.$action = $target.attr('data-action') || null; //define followup action to be triggered
                
                ctrl.setupValidate();
            }
        });
        
    }

    return{
        restrict : 'AE',
        scope : {
            config : '=',
            callback : '='
        },
        link : linkFn,
        controller : 'ValidateController',
        bindToController: true
    }
}])
.directive('validate',['$rootScope', function($rootScope) {
   
    return{
        restrict : 'A',
        require : '^?mvFormValidator',
        link : function ($scope,$elem,$attr,$formCtrl){

            var elemObj = {
                elem   : $elem,
                check : $attr.Validate || null,
                errType : null, //set if not required
            };

            //Add this only for UI-SELECT
            if('ui-select' === $attr.ValidateElemType){
                elemObj.selectedObj = $scope.$select;
            }

            //if form is not wrapped with bcformvalidator, it throws error
            if($formCtrl){
                $formCtrl.setElement(elemObj);    
            }            
         }
    }
   

}])
}(angular));

