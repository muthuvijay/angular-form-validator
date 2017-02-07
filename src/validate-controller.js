(function(angular){

angular.module('form-validator-controller',[])
.controller('ValidateController',['$scope','ValidationRules','Messages',ValidateController]);

function ValidateController ($scope, ValidationRules, Messages) {
    var self = this;
        self.ValidationRules = ValidationRules;
        self.Messages = Messages;
        self.$elements = [];

    self.setElement = function($elem){
        self.$elements.push($elem);
    }

    self.isVisible = function (e) {
        return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
    }

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

    setupValidate : function (){
        
            var self =this,
                errStatus = true,
                msg = [];

            if(self.$elements.length){

                    for(var i=0,len=self.$elements.length; i< len;i++){

                        if(!self.isVisible(self.$elements[i].elem[0])) //skip element not visible on DOM
                            continue;

                        self.validate(self.$elements[i]);
                        
                        if(self.$elements[i].status == false){
                            errStatus = false;
                            //Avoid Duplicate Messages
                            if(msg.indexOf(self.$elements[i].msg) === -1)
                                msg.push(self.$elements[i].msg);
                        }
                    }
                    
                    var obj = {
                        status : errStatus,
                        msg : msg,
                        form : self.form,
                        action : self.$action
                    }
                    
                    if(!!self.callback)
                        self.callback.call(this,obj);
                    else    
                        return obj;
                }
        }
}


})(angular);