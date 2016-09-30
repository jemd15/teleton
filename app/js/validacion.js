angular.module('validacion',['ngStorage','ngSanitize'])

.controller('ValidarReg', ['$scope','$http','$sessionStorage','$state','$location','envService', function ($scope,$http,$sessionStorage,$state,$location,envService) {

    /*$scope.islogin= false;
    if($sessionStorage.islogin == 1)
    {

            $scope.islogin= true;
            $scope.usuario = $sessionStorage.nombre;
            $scope.email = $sessionStorage.email;

    }*/

    $scope.logout=function () {
        $sessionStorage.$reset();
        $state.go('inicio', {}, {reload: true});
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

                         $state.go('sube-tu-idea', {}, {reload: true});

                     }
                     else{
                         $state.go('registrarse', {}, {reload: true});


                     }
                 })
                 .error(function (data, status, header) {
                     console.log("FALLO"+data);
                 });

         }
     }

}]);
