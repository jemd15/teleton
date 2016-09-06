angular.module('ideaton',
    ['ui.materialize',
        'ui.router'])

//controladores
    .controller('inicioCtrl', ["$scope", function ($scope) {
        $scope.select = {
            value: "Option1",
            choices: ["mejor votados", "fecha"]
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
            .state('registrar-usuario', {
                url: '/registrar-usuario',
                templateUrl: 'app/views/registrate.html'
            })
            .state('detalle-proyecto',{
                url: '/detalle-proyecto/:ideaID',
                templateUrl: 'app/views/detalle-proyecto.html',
                controller: 'detalleProyectoCtrl'
            });

        $urlRouterProvider.otherwise('/inicio')
    });