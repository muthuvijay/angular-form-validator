(function(angular){

angular.module('form-validator-factory',[])
.factory('ValidationRules',['$rootScope', function($rootScope) {

    var ValidationRules = {

        required : function(elemObj)
        {
            var $elem = elemObj.elem,
                $val = getValue(elemObj);
            
            if(_.isUndefined($val) || _.isEmpty($val) || !$val){
                return false;
            }
            
            return true;
        },
        
        checkEmail : function(elemObj)
        {
             var $elem = elemObj.elem,
                    $val = getValue(elemObj);
                //if required attr is present, do a required check first
                if(!_doRequiredCheck(elemObj))
                    return false;
             
                //Empty field, but not mandatory. so, no need to proceed
                if(!$val){
                    return true;
                }
                
                var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
                if (pattern.test($val))
                { 
                    return true;
                }
            
            elemObj.errType = 'email';
            return false; 
         },
        
        checkPhoneNumber : function(elemObj)
         {
             var $elem = elemObj.elem,
                $val = getValue(elemObj);
                //if required attr is present, do a required check first
                if(!_doRequiredCheck(elemObj))
                    return false;
                
                //Empty field, but not mandatory. so, no need to proceed
                if(!$val){
                    return true;
                }

                var pattern = /^\d{10}$|^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/; 
                if (pattern.test($val))
                { 
                    return true;
                }
            
            elemObj.errType = 'phone';
            return false; 
         },
        
        checkNumber : function(elemObj)
         {
             var $elem = elemObj.elem,
                $val = getValue(elemObj);
                //if required attr is present, do a required check first
                if(!_doRequiredCheck(elemObj))
                    return false;
             
                //Empty field, but not mandatory. so, no need to proceed
                if(!$val){
                    return true;
                }
               
                if(!_doNumberCheck($val)){
                    elemObj.errType = 'number';
                    return false;    
               }
                    
            return true; 
         },
        
        checkPhoneExtension : function(elemObj)
         {
             var $elem = elemObj.elem,
                $val = getValue(elemObj);
                //if required attr is present, do a required check first
                if(!_doRequiredCheck(elemObj))
                    return false;
             
                //Empty field, but not mandatory. so, no need to proceed
                if(!$val){
                    return true;
                }
             
               if(!_doNumberCheck($val)){
                    elemObj.errType = 'number';
                    return false;    
               }

                var pattern = /^\d{4}$/; 
                if (pattern.test($val))
                { 
                    return true;
                }
            
            elemObj.errType = 'extension';
            return false; 
         },
    }
    
    //Get the Value to check against based on the input
    function getValue(elemObj){
        return (elemObj.selectedObj)?elemObj.selectedObj.selected:elemObj.elem.val();
    }
    
    //Required check
    function _doRequiredCheck(elemObj){
        
        if(elemObj.elem && elemObj.elem.attr('required') != undefined){
                    if(!ValidationRules.required(elemObj)){
                        return false; //No need to proceed
                    };
             }
        return true;
    }
    
    //do number check
    function _doNumberCheck(value){
        return !isNaN(value) && isFinite(value);
    }
    
    return ValidationRules;

}])


})(angular);