angular.module('SubirIdea', ['naif.base64'])

    .controller('UpIdeaCtrl', ['$scope', '$sessionStorage', '$http', function ($scope, $sessionStorage, $http) {

        $scope.categorias = [
            {val: '1', name: 'Educación'},
            {val: '2', name: 'Vida diaria'},
            {val: '3', name: 'Trabajo'},
            {val: '4', name: 'Transporte'},
            {val: '5', name: 'Comunicación'},
            {val: '6', name: 'Entretención'}

        ]

        $scope.beneficiarios = [
            {val: '1', name: 'Sordo-Mudo'}


        ]


        $scope.UpIdea = function ($location) {
            var config;
            var obj = {
                title: $scope.nombre,
                short_description: $scope.descripcion_corta,
                description: $scope.descripcion,
                url_video: $scope.url_vid,
                beneficiary: $scope.beneficiario,
                category: $scope.categoria,
                main_image: $scope.img_prin.base64

            }


            console.log(obj);
            if ($sessionStorage.isloginface === 1) {
                config = {
                    headers: {
                        'Authorization': 'token ' + $sessionStorage.tokenface
                    }
                }
            }
            if ($sessionStorage.islogingoogle === 1) {
                config = {
                    headers: {
                        'Authorization': 'token ' + $sessionStorage.tokengoogle
                    }
                }
            }


            $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/upload_idea/', obj, config)
                .success(function (data, status, headers, config) {
                    console.log(data);
                    var img2 = {
                        image: $scope.img_2.base64,
                        idea: data.id
                    }
                    var img3 = {
                        image: $scope.img_3.base64,
                        idea: data.id
                    }
                    var img2 = {
                        image: $scope.img_4.base64,
                        idea: data.id
                    }


                    $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/upload_image/', img2, config)
                        .success(function (data, status, headers, config) {
                            console.log(data);
                        })
                        .error(function (data, status, header, config) {
                            console.log(data);
                        });
                    $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/upload_image/', img2, config)
                        .success(function (data, status, headers, config) {
                            console.log(data);
                        })
                        .error(function (data, status, header, config) {
                            console.log(data);
                        });
                    $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/upload_image/', img3, config)
                        .success(function (data, status, headers, config) {
                            console.log(data);
                            swal({
                                    title: "Noticia Subida con exito!",
                                    type: "success",
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Ver Idea",
                                    closeOnConfirm: true
                                },
                                function () {

                                    location.href = '/#/detalle-proyecto?id='+data.idea;
                                });
                        })
                        .error(function (data, status, header, config) {
                            console.log(data);
                        });


                })
                .error(function (data, status, header, config) {
                    console.log(data);
                });

            // setTimeout(location.reload.bind(location), 5000);


        }
    }]);

