angular.module('validacion',['ngStorage',])

.controller('ValidarReg', ['$scope','$http','$sessionStorage', function ($scope,$http,$sessionStorage) {
     $scope.islogin = false;
	 if($sessionStorage.isloginface === 1)
	 {
	 	 $scope.islogin= true; 
         $scope.isReg= false;            
          $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.emailface)
            .success(function (data, status, headers) {
            	console.log(data);
                if(data.results[0].commune !=""){
                        $scope.isReg= true;
                        console.log($scope.isReg); 
                }
                else{ $scope.isReg= false;
                console.log($scope.isReg); }
            })
            .error(function (data, status, header) {
               console.log(data);
            });

      }


       if($sessionStorage.islogingoogle === 1)
       {
       	 $scope.islogin= true;
       	 $scope.isReg= false;
           console.log($scope.isReg);
         $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.emailgoogle)
            .success(function (data, status, headers) {
            	
            	console.log(data.results[0].commune);
                if(data.results[0].commune != ""){
                	 console.log($scope.isReg);
                        $scope.isReg = true;
                }
                if(data.results[0].commune == ""){
                	 console.log($scope.isReg);
                        $scope.isReg = false;
                }
                
                  
           
            })
            .error(function (data, status, header) {
               console.log(data);
            });
       


       }

       
   
           
        
}]);