angular.module('validacion',['ngStorage'])

.controller('ValidarReg', ['$scope','$http','$sessionStorage','$state','$location', function ($scope,$http,$sessionStorage,$state,$location) {

     $scope.islogin = false;
	 if($sessionStorage.islogin === 1)
	 {
	 	 $scope.islogin= true; 
         $scope.isReg= false;            
          $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.email)
            .success(function (data, status, headers) {

                if(data.results[0].commune !=""){
                        $scope.isReg= true;
                        console.log($scope.isReg); 
                }
                else{ $scope.isReg= false;
                console.log($scope.isReg); }
            })
            .error(function (data, status, header) {
                console.log("FALLO"+data);
            });

      }




       
   
           
        
}]);