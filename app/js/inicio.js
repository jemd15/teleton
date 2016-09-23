/**
 * Created by juliogf on 23-09-16.
 */
angular.module('inicio',[])
    .controller('NoticiasCtrl', ['$scope','$http','$sessionStorage', function ($scope,$http,$sessionStorage) {
        $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/noticias/')
            .success(function (data, status, headers, config) {
                $scope.noticias = data.results;
                console.log($scope.noticias);

            })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);
            });

    }])

.controller('JuradosCtrl', ['$scope','$http','$sessionStorage', function ($scope,$http,$sessionStorage) {
    $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/jurados/')
        .success(function (data, status, headers, config) {
            $scope.jurados = data.results;
            console.log($scope.jurados);

        })
        .error(function (data, status, header, config) {
            console.log("FALLO:"+data);
        });

}]);