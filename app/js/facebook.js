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


    .controller('LoginFaceCtrl', ['$scope', '$timeout', 'Facebook', '$http','$sessionStorage',
        function($scope, $timeout, Facebook, $http, $sessionStorage) {

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
            $scope.login = function($location) {
                Facebook.login(function(response) {
                    if (response.status == 'connected') {
                        $scope.logged = true;
                        $scope.me();
                        $scope.logout();
                         // setTimeout(location.reload.bind(location), 6000);

                    }

                });
            };

            /**
             * me
             */
            $scope.me = function() {
                Facebook.api('/me?fields=name,email', function(response) {
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */
                    $scope.$apply(function() {
                        $scope.user = response;
                        $sessionStorage.emailface=response.email;
                    });

                });
            };

            /**
             * Logout
             */
            $scope.logout = function($location) {
                Facebook.logout(function() {
                    $scope.$apply(function() {
                        $scope.user = {};
                        $scope.logged = false;
                    });
                });
            }

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

                        //POST EN API DJANGO-------
                        $http.post("http://pyhackaton2016-hackatonteleton.rhcloud.com/rest-auth/facebook/", obj)
                            .success(function(data, status, headers) {
                        
                                $sessionStorage.tokenface = data.key;
                                $sessionStorage.isloginface = 1;
                                location.reload();
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