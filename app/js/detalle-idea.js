/**
 * Created by juliogf on 15-09-16.
 */
angular.module('detalle-idea',[])

    .controller('IdeaCtrl', ['$scope','$location','$http', function ($scope,$location,$http) {
        var id_idea = $location.search().id;
        $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/ideas/'+id_idea+"/")
            .success(function (data, status, headers, config) {
                $scope.nombre= data.title;
                $scope.descripcion_corta=data.short_description;
                $scope.descripcion= data.description;
                $scope.url_vid = data.url_video;
                $scope.beneficiario=data.beneficiary;
                $scope.categoria = data.category;
                $scope.img_prin=    data.main_image;
                $scope.autor=    data.user.email;
                $scope.comuna = data.user.commune;

            })
            .error(function (data, status, header, config) {
                  console.log("FALLO:"+data);
            });

        $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/imagenes/?idea__id='+id_idea)
            .success(function (data, status, headers, config) {
               console.log(data.results);
                $scope.imagenes =data.results;

            })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);
            });

    }])


    .controller('VotosCtrl', ['$scope','$location','$http', function ($scope,$location,$http) {



    }]);



