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
        var $action = null;
        var form = (!!$attr.form) ? $attr.form : null; 
        
        $elem.on('change',function(e){
            e.stopPropagation();
            var $target = angular.element(e.target);
            
            if($target.hasClass('mv-trigger-validate')){
                $action = $target.attr('data-action') || null; //define followup action to be triggered
                
                ctrl.setupValidate();
            }
        });
        
    }

    return{
        restrict : 'AE',
        scope : {
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

