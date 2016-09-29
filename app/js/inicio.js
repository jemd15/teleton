/**
 * Created by juliogf on 23-09-16.
 */
angular.module('inicio',[])
    .controller('NoticiasCtrl', ['$scope','$http','$sessionStorage','envService', function ($scope,$http,$sessionStorage,envService) {
        var apiUrl = envService.read('apiUrl');
        $http.get(apiUrl + "/noticias/")
            .success(function (data, status, headers, config) {
                $scope.noticias = data.results;


            })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);
            });

    }])

.controller('JuradosCtrl', ['$scope','$http','$sessionStorage','envService', function ($scope,$http,$sessionStorage,envService) {
    var apiUrl = envService.read('apiUrl');
    $http.get(apiUrl + "/jurados/")
        .success(function (data, status, headers, config) {
            $scope.jurados = data.results;


        })
        .error(function (data, status, header, config) {
            console.log("FALLO:"+data);
        });

}]);
