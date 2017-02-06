(function(angular){

angular.module('form-validator-controller',[])
.controller('ValidateController',['$scope','ValidationRules','ValidateService','Messages',ValidateController]);

function ValidateController ($scope, ValidationRules, ValidateService, Messages) {
    var self = this;
        self.ValidationRules = ValidationRules;
        self.ValidateService = ValidateService;
        self.Messages = Messages;
        self.$elements = [];
        self.validateError = 'mv-validate-error';

    self.setElement = function($elem){
        self.$elements.push($elem);
    }

    self.triggercallback = function(){
        return $scope.setupValidate(true);
    }

        //Set the callback
    self.ValidateService.setMethod(self.triggercallback);

}

ValidateController.prototype = {
    constructor : ValidateController,

    validate : function (elemObj)
    {
        var self = this;

        if(elemObj)
        {
            var type = elemObj.check,
                status = false;
            
            //remove validate error
            angular.element(elemObj.elem).removeClass(self.validateError);

            switch(type)
            {
                default:    
                case 'required':
                    status = self.ValidationRules.required(elemObj);
                break;	
                    
                case 'email':
                    status = self.ValidationRules.checkEmail(elemObj);
                break;	
                    
                case 'phone':
                    status = self.ValidationRules.checkPhoneNumber(elemObj);
                break;	    
                    
                case 'number':
                    status = self.ValidationRules.checkNumber(elemObj);
                break;
                    
                case 'extension':
                    status = self.ValidationRules.checkPhoneExtension(elemObj);
                break;	    

            }
            
            //propagate status to controller
            elemObj.status = status;
            
            if(false == elemObj.status){
                angular.element(elemObj.elem).addClass(self.validateError);
                
                if(!elemObj.errType){
                    elemObj.msg = self.Messages.required;
                }else{
                    elemObj.msg = self.Messages[elemObj.errType];
                }
                
            }
        }
    },

    setupValidate : function (isManualTriggered){
        
            var self =this,
                errStatus = true,
                msg = [];

            if(self.$elements.length){

                    for(var i=0,len=self.$elements.length; i< len;i++){

                        if(!$(self.$elements[i].elem).is(':visible')) //skip element not visible on DOM
                            continue;

                        self.validate(self.$elements[i]);
                        
                        if(self.$elements[i].status == false){
                            errStatus = false;
                            //Avoid Duplicate Messages
                            if(_.indexOf(msg,self.$elements[i].msg) == -1)
                                msg.push($elements[i].msg);
                        }
                    }
                    
                    var obj = {
                        status : errStatus,
                        msg : msg,
                        form : form,
                        action : $action
                    }
                    
                    if(!isManualTriggered)
                        self.callback.call(this,obj);
                    else    
                        return obj;
                }
        }
}


})(angular);