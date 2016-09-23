angular.module('AppGoogle', ['google-signin', 'ngStorage','rutas','oitozero.ngSweetAlert',])

    .config(['GoogleSigninProvider',
        function (GoogleSigninProvider) {
            GoogleSigninProvider.init({
                client_id: '708699237962-vvd72e3atlu3eao56gmpe1kb87il8l44.apps.googleusercontent.com',
            });
        }
    ])

    .controller('LoginGoogleCtrl', ['$scope', 'GoogleSignin', '$http', '$sessionStorage','$rootScope','$location',

        function ($scope, GoogleSignin, $http, $sessionStorage,$rootScope,$location) {
            $scope.googleLogin = function () {

                GoogleSignin.signIn().then(function (user) {
                        $('#login-modal').closeModal();
                        $('#cargando-modal').openModal();
                    $scope.nombreuser =user.w3.ig;
                    $sessionStorage.nombre = user.w3.ig;
                    $sessionStorage.email = user.w3.U3;
                        var obj = {

                            'email': user.w3.U3,
                            'password1': "default123456",
                            'password2': "default123456"

                        }

                        console.log(obj);

                        $http.post("http://pyhackaton2016-hackatonteleton.rhcloud.com/rest-auth/registration/", obj)
                            .success(function (data, status, headers) {
                                $sessionStorage.token = data.key;
                                $sessionStorage.islogin = 1;

                                $('#cargando-modal').closeModal();
                                swal({
                                        title: "Bienvenido!\n"+$scope.nombreuser,
                                        type: "success",
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "Aceptar",
                                        closeOnConfirm: true},
                                    function(){

                                        var url = $location.path();
                                        console.log(url);
                                        if(url=="/inicio"){
                                            $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.email)
                                                .success(function (data, status, headers) {
                                                    if(data.results[0].commune !=""){

                                                        $location.path("/sube-tu-idea");

                                                    }
                                                    else{

                                                        $location.path("/registrarse");
                                                       }
                                                })
                                                .error(function (data, status, header) {
                                                    console.log(data);
                                                });}
                                        else{
                                            location.reload();
                                        }
                                    });

                            })
                            .error(function (data, status, headers) {

                                 var obj2 = {
                                        'email': user.w3.U3,
                                        'password': "default123456"
                                            }

                                $http.post("http://pyhackaton2016-hackatonteleton.rhcloud.com/rest-auth/login/", obj2)
                                        .success(function (data, status, headers, config) {
                                                $sessionStorage.token = data.key;
                                                $sessionStorage.islogin = 1;

                                            $('#cargando-modal').closeModal();
                                            swal({
                                                    title: "Bienvenido!\n"+$scope.nombreuser,
                                                    type: "success",
                                                    confirmButtonColor: "#DD6B55",
                                                    confirmButtonText: "Aceptar",
                                                    closeOnConfirm: true},
                                                function(){
                                                    var url = $location.path();
                                                    console.log(url);
                                                    if(url=="/inicio"){
                                                        $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.email)
                                                            .success(function (data, status, headers) {
                                                                if(data.results[0].commune !=""){
                                                                    $location.path("/sube-tu-idea")

                                                                }
                                                                else{ $location.path("/registrarse")
                                                                    }
                                                            })
                                                            .error(function (data, status, header) {
                                                                console.log(data);
                                                            });}
                                                    else{
                                                        location.reload();
                                                    }

                                                });


                                        })
                                        .error(function (data, status, header, config) {
                                            console.log(data);
                                        });

                            });


                    },
                    function (err) {
                        console.log(err);
                    });

            };

        }
    ]);