angular.module('validacion',['ngStorage','ngSanitize'])

.controller('ValidarReg', ['$scope','$http','$sessionStorage','$state','$location','envService', function ($scope,$http,$sessionStorage,$state,$location,envService) {

    /*$scope.islogin= false;
    if($sessionStorage.islogin == 1)
    {

            $scope.islogin= true;
            $scope.usuario = $sessionStorage.nombre;
            $scope.email = $sessionStorage.email;

    }*/
    //NUMERO DE IDEAS
    var apiUrl = envService.read('apiUrl');
    /*$http.get(apiUrl + "/ideas/?state=1")
        .success(function (data, status, headers) {
            $scope.num_ideas=data.count;
        })
        .error(function (data, status, header) {
            console.log("FALLO"+data);
        });
        */

    $scope.logout=function () {
        $sessionStorage.$reset();
        $state.go('inicio', {}, {reload: true});
    }




     $scope.Validar=function () {
         console.log("fui presionado");
         if($sessionStorage.islogin != 1)
         {
             $('#login-modal').openModal();

         }
         else {

              var apiUrl = envService.read('apiUrl');
             $http.get(apiUrl + "/users/?email="+$sessionStorage.email)
                 .success(function (data, status, headers) {

                     if(data.results[0].commune !=""){
                         $sessionStorage.isreg=1;
                         $state.go('sube-tu-idea', {}, {reload: true});

                     }
                     else{
                         $sessionStorage.isreg=0;
                         $state.go('registrarse', {}, {reload: true});


                     }
                 })
                 .error(function (data, status, header) {
                     console.log("FALLO"+data);
                 });

         }
     }

}]);
