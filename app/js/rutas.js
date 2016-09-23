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
    .controller('detalleProyectoCtrl', function ($http, $stateParams) {
        var vm = this;

        $http({
            url: "https://ideatonapi.herokuapp.com/ideas",
            method: 'get',
            params: {ideaID: $stateParams.ideaID}
        }).then(function (response) {
            vm.idea = response.data;
        });
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
            .state('ideas', {
                url: '/ideas',
                templateUrl: 'app/views/ideas.html'
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
                url: '/detalle-proyecto',
                templateUrl: 'app/views/detalle-proyecto.html',
                controller: 'detalleProyectoCtrl'
            })
            .state('detalle-categoriae',{
                url: '/detalle-categoria',
                templateUrl: 'app/views/detalle-categoria.html',
                controller: 'detalleCategoriaCtrl'
            })
            .state('detalle-categoria',{
                url: '/detalle-categoria',
                templateUrl: 'app/views/detalle-categoria.html',
                controller: 'detalleCategoriaCtrl'
            });

        $urlRouterProvider.otherwise('/inicio')
    });


var app = angular.module('App', ['circle.countdown']);
app.controller('AppController', ['$scope', function($scope){
    $scope.finished = function(){
        // Finish callback
    };
}]);