var app = angular.module('ideaton',['rutas','AppFace', 'AppGoogle','validacion','registro','SubirIdea','detalle-idea','inicio','detalle-categoria','contador','detalle-noticia' , 'environment', '720kb.socialshare']);

app.run(function($rootScope,$sessionStorage){
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


app.config(function(envServiceProvider) {
        // set the domains and variables for each environment
        envServiceProvider.config({
            domains: {
                development: ['localhost'],
                testing: ['ideaton-hackatonteleton.rhcloud.com'],
                production: ['www.ideaton.cl']
            },
            vars: {
                development: {
                    apiUrl: 'http://pyhackaton2016-hackatonteleton.rhcloud.com'
                },
                testing: {
                    apiUrl: 'http://pyhackaton2016-hackatonteleton.rhcloud.com'
                },
                production: {
                    apiUrl: 'http://api-ideaton2016.rhcloud.com'
                }
            }
        });

        //try to get the environment from Node.js URL
        //obtener JSON con las universidades
        // #var initInjector = angular.injector(['ng']);
        // #var $http = initInjector.get('$http');
        //
        // #$http.get('/environment')
        // #    .success(function (data, status, headers) {
        // #      console.log(data);
        // #});



        // run the environment check, so the comprobation is made
        // before controllers and services are built
        envServiceProvider.check();
    });
