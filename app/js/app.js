angular.module('ideaton',['rutas','AppFace', 'AppGoogle','validacion','registro','SubirIdea','detalle-idea','inicio','detalle-categoria','contador','detalle-noticia'])

.run(function($rootScope,$sessionStorage){
    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.islogin= false;
        if($sessionStorage.islogin == 1)
        {

            $rootScope.islogin= true;
            $rootScope.usuario = $sessionStorage.nombre;
            $rootScope.email = $sessionStorage.email;

        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});