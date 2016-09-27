angular.module('ideaton',['rutas','AppFace', 'AppGoogle','validacion','registro','SubirIdea','detalle-idea','inicio','detalle-categoria','contador','detalle-noticia'])

.run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});