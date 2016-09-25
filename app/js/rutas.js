angular.module('rutas',['ui.materialize','ui.router'])

//controladores
    .controller('inicioCtrl', ["$scope", function ($scope) {
        $scope.universidades = {
            value: "universidad 1",
            choices: ["universidad 1", "universidad 2"]
        };
        $scope.carreras = {
            value: "carrera a",
            choices: ["carrera a", "carrera b"]
        };
    }])
    .controller('detalleProyectoCtrl', function ($scope, $stateParams) {
        $scope.id = $stateParams.ideaID;
    })
    .controller('subeTuIdeaCtrl', function () {

    })
    .controller('detalleCategoriaCtrl', function () {

    })

    //vistas
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('inicio', {
                url: '/inicio',
                templateUrl: 'app/views/inicio.html',
                controller: 'inicioCtrl'
            })
            .state('sube-tu-idea', {
                url: '/sube-tu-idea',
                templateUrl: 'app/views/sube-tu-idea.html'
            })
            .state('registrarse', {
                url: '/registrarse',
                templateUrl: 'app/views/registrarse.html'
            })
            .state('detalle-proyecto',{
                url: '/detalle-idea/:ideaID',
                templateUrl: 'app/views/detalle-proyecto.html',
                controller: 'detalleProyectoCtrl'
            })
            .state('noticias',{
                url: '/noticias',
                templateUrl: 'app/views/noticias.html'
            })
            .state('detalle-noticia',{
                url: '/detalle-noticia/:noticiaID',
                templateUrl: 'app/views/detalle-noticia.html'
            })
            .state('detalle-categoria', {
                url: '/detalle-categoria/:categoriaName',
                templateUrl: 'app/views/detalle-categoria.html',
                controller: 'IdeasCtrl'
            });

        $urlRouterProvider.otherwise('/inicio')
    });


var app = angular.module('App', ['circle.countdown']);
app.controller('AppController', ['$scope', function($scope){
    $scope.finished = function(){
        // Finish callback
    };
}]);