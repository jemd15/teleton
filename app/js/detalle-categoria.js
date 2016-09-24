/**
 * Created by juliogf on 23-09-16.
 */
angular.module('detalle-categoria',['rutas'])

    .controller('IdeasCtrl', ['$scope', '$sessionStorage', '$http','$stateParams', function ($scope, $sessionStorage, $http,$stateParams) {
        var categoria = $stateParams.categoriaName;
        var id_categoria;
        switch (categoria){
            case 'educacion':
                id_categoria=1;
                $scope.nombre_cat="Educación";
                break;
            case 'vida-diaria':
                id_categoria=2;
                $scope.nombre_cat="Vida Diaria";
                break;
            case 'trabajo':
                id_categoria=3;
                $scope.nombre_cat="Trabajo";
                break;
            case 'transporte':
                id_categoria=4;
                $scope.nombre_cat="Transporte";
                break;
            case 'comunicacion':
                $scope.nombre_cat="Comunicación";
                id_categoria=5;
                break;
            case 'entretencion':
                $scope.nombre_cat="Entretención";
                id_categoria=6;
                break;
            case 'todas':
                $scope.nombre_cat="Todas";
                id_categoria=6;
                break;
        }

        $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/ideas/?category__id='+id_categoria+'&state=1')
            .success(function (data, status, headers, config) {
               $scope.ideas = data.results;


            })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);
            });

        if( categoria == "todas"){
            $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/ideas/?state=1')
                .success(function (data, status, headers, config) {
                    $scope.ideas = data.results;


                })
                .error(function (data, status, header, config) {
                    console.log("FALLO:"+data);
                });

        }




    }]);