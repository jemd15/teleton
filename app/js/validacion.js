angular.module('validacion',['ngStorage'])

.controller('ValidarReg', ['$scope','$http','$sessionStorage','$state','$location', function ($scope,$http,$sessionStorage,$state,$location) {
     $scope.Validar=function () {
         if($sessionStorage.islogin != 1)
         {
             $('#login-modal').openModal();

         }
         else {
             $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.email)
                 .success(function (data, status, headers) {

                     if(data.results[0].commune !=""){

                         $location.path("/sube-tu-idea")

                     }
                     else{
                         $location.path("/registrarse")
                     }
                 })
                 .error(function (data, status, header) {
                     console.log("FALLO"+data);
                 });

         }
     }







       
   
           
        
}]);