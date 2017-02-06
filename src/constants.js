(function(angular){

angular.module('form-validator-constants',[])
.constant('Messages',{
    required     : "Highlighted fields are required",
    email        : "Invalid Email Address",
    phone        : "Invalid Phone Number",
    number       : "Invalid Number",
    extension    : "Invalid Phone Extension"
});


})(angular);