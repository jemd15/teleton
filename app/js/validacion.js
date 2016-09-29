angular.module('validacion',['ngStorage'])

.controller('ValidarReg', ['$scope','$http','$sessionStorage','$state','$location','envService', function ($scope,$http,$sessionStorage,$state,$location,envService) {

    if($sessionStorage.islogin == 1)
    {
        $scope.islogin= true;
        $scope.usuario = $sessionStorage.nombre;
        $scope.email = $sessionStorage.email;
    }

    $scope.logout=function () {
        $sessionStorage.$reset();
        location.reload();
    }


     $scope.Validar=function () {
         if($sessionStorage.islogin != 1)
         {
             $('#login-modal').openModal();

         }
         else {
              var apiUrl = envService.read('apiUrl');
             $http.get(apiUrl + "/users/?email="+$sessionStorage.email)
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
