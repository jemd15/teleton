/**
 * Created by juliogf on 15-09-16.
 */
angular.module('contador-ideas',[])

    .controller('ContadorIdeasCtrl', ['$scope','$location','$http','$stateParams','envService', function ($scope,$location,$http,$stateParams,envService) {
        var apiUrl = envService.read('apiUrl');

        $http.get(apiUrl + "/count_ideas/")
            .success(function (data, status, headers, config) {
                $scope.num_ideas= data.count;
              })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);
            });
    }]);
