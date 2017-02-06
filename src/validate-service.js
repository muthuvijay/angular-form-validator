(function(angular){

angular.module('form-validator-services',[])
.service('ValidateService',function(){

    this.method = null;
    
    this.setMethod = function(fn){
        this.method = fn;
    }
    
    this.getMethod = function(){
        return this.method;
    }

    return this;
});

})(angular);