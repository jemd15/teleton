angular.module('AppFace', ['facebook','ngStorage',])



    .config([
        'FacebookProvider',
        function(FacebookProvider) {
            var myAppId = '1267990573260917';

            // You can set appId with setApp method
            // FacebookProvider.setAppId('myAppId');

            /**
             * After setting appId you need to initialize the module.
             * You can pass the appId on the init method as a shortcut too.
             */
            FacebookProvider.init(myAppId);

        }
    ])

    // .run(function run($http, $cookies) {

    //     // For CSRF token compatibility with Django
    //     $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
    // })


    .controller('LoginFaceCtrl', ['$scope', '$timeout', 'Facebook', '$http','$sessionStorage','$location',
        function($scope, $timeout, Facebook, $http, $sessionStorage,$location) {

            // Define user empty data :/
            $scope.user = {};

            // Defining user logged status
            $scope.logged = false;

            // And some fancy flags to display messages upon user status change
            $scope.byebye = false;
            $scope.salutation = false;

            /**
             * Watch for Facebook to be ready.
             * There's also the event that could be used
             */
                // $scope.$watch(
                //     function() {
                //         return Facebook.isReady();
                //     },
                //     function(newVal) {
                //         if (newVal)
                //             $scope.facebookReady = true;
                //     }
                // );

            var userIsConnected = false;

            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    userIsConnected = true;
                }
            });

            /**
             * IntentLogin
             */
            $scope.IntentLogin = function() {
                if (!userIsConnected) {
                    $scope.login();
                }
            };

            /**
             * Login
             */
            $scope.login = function () {
                Facebook.login(function (response) {
                    if (response.status == 'connected') {
                        $('#login-modal').closeModal();
                        $('#cargando-modal').openModal();
                        $scope.logged = true;
                        $scope.me();
                    }

                },{scope: 'email'});
            };

            /**
             * me
             */
            $scope.me = function () {
                Facebook.api('/me?fields=email', {fields: 'email,name'}, function (response) {
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */
                    $scope.$apply(function () {
                        $scope.nombre =response.name;
                        $scope.user = response;
                        $sessionStorage.email=response.email;
                        $sessionStorage.nombre=response.name;


                    });

                });
            };


            /**
             * Logout
             */
            $scope.logout = function() {
                Facebook.logout(function() {
                    $scope.$apply(function() {
                        $scope.user = {};
                        $scope.logged = false;
                    });
                });
            };

            /**
             * Taking approach of Events :D
             */
            $scope.$on('Facebook:statusChange', function(ev, data) {
                console.log('Status: ', data);
                if (data.status == 'connected') {
                    $scope.$apply(function() {
                        $scope.salutation = true;
                        $scope.logged = true;
                        $scope.byebye = false;
                        $scope.me();

                        var obj = {
                            'access_token': data.authResponse.accessToken,
                            'code': data.authResponse.signedRequest

                        }

                        console.log("login"+obj);


                        //POST EN API DJANGO-------
                        $http.post("http://pyhackaton2016-hackatonteleton.rhcloud.com/rest-auth/facebook/", obj)
                            .success(function(data, status, headers) {
                                var nombre= $sessionStorage.nombre;
                                $scope.logout();
                                $sessionStorage.token = data.key;
                                $sessionStorage.islogin = 1;

                                $('#cargando-modal').closeModal();

                                swal({
                                        title: "Bienvenido!\n"+nombre,
                                        type: "success",
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "Aceptar",
                                        closeOnConfirm: true},
                                    function(){
                                        var url = $location.path();
                                        console.log(url);
                                        if (url.indexOf('/detalle-idea')!=-1) {location.reload();
                                        }
                                        else{

                                            $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.email)
                                                .success(function (data, status, headers) {
                                                    if(data.results[0].commune !=""){
                                                        $location.path("/sube-tu-idea")

                                                    }
                                                    else{
                                                        $location.path("/registrarse")
                                                    }
                                                })
                                                .error(function (data, status, header) {
                                                    console.log(data);
                                                });

                                        }


                                    });
                            })
                            .error(function(data, status, header) {
                                console.log(data);
                            });

                    });
                } else {
                    $scope.$apply(function() {
                        $scope.salutation = false;
                        $scope.byebye = true;

                        // Dismiss byebye message after two seconds
                        $timeout(function() {
                            $scope.byebye = false;
                            $scope.logged = false;
                        }, 2000)
                    });
                }


            });


        }
    ])

    /**
     * Just for debugging purposes.
     * Shows objects in a pretty way
     */
    .directive('debug', function() {
        return {
            restrict: 'E',
            scope: {
                expression: '=val'
            },
            template: '<pre>{{debug(expression)}}</pre>',
            link: function(scope) {
                // pretty-prints
                scope.debug = function(exp) {
                    return angular.toJson(exp, true);
                };
            }
        }
    })

;