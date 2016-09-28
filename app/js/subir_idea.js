angular.module('SubirIdea', ['naif.base64','youtube-embed'])

    .controller('UpIdeaCtrl', ['$scope', '$sessionStorage', '$http','$location', function ($scope, $sessionStorage, $http,$location) {




        $scope.categorias = [
            {val: '1', name: 'Educación'},
            {val: '2', name: 'Vida diaria'},
            {val: '3', name: 'Trabajo'},
            {val: '4', name: 'Transporte'},
            {val: '5', name: 'Comunicación'},
            {val: '6', name: 'Entretención'}

        ];

        $scope.beneficiarios = [
            {val: '1', name: 'Visual'},
            {val: '2', name: 'Auditiva'},
            {val: '3', name: 'Cognitiva'},
            {val: '4', name: 'Física'}
        ];



        $('.modal-trigger').leanModal({
                dismissible: false, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
                starting_top: '4%', // Starting top style attribute
                ending_top: '10%', // Ending top style attribute
                ready: function() {
                    $scope.player= "video";
                    if($scope.categoria ==1){$scope.categorianame='Educación'}
                    if($scope.categoria ==2){$scope.categorianame='Vida diaria'}
                    if($scope.categoria ==3){$scope.categorianame='Trabajo'}
                    if($scope.categoria ==4){$scope.categorianame='Transporte'}
                    if($scope.categoria ==5){$scope.categorianame='Comunicación'}
                    if($scope.categoria ==6){$scope.categorianame='Entretención'}
                    if($scope.beneficiario ==1){$scope.beneficiarioname='Visual'}
                    if($scope.beneficiario ==2){$scope.beneficiarioname='Auditiva'}
                    if($scope.beneficiario ==3){$scope.beneficiarioname='Cognitiva'}
                    if($scope.beneficiario ==4){$scope.beneficiarioname='Física'} }, // Callback for Modal open
                complete: function() {   $('#modal1').closeModal();} // Callback for Modal close
            }
        );


        $scope.cerrarmodal =function () {
            $('#preview').closeModal();
        }


        $scope.UpIdea = function () {
            var config;

            var obj = {
                title: $scope.nombre,
                short_description: $scope.descripcion_corta,
                description: $scope.descripcion,
                url_video: $scope.url_vid,
                beneficiary: $scope.beneficiario,
                category: $scope.categoria,
                main_image: $scope.img_prin.base64

            };



            config = {
                headers: {
                    'Authorization': 'token ' + $sessionStorage.token
                }
            }



            $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/upload_idea/', obj, config)
                .success(function (data, status, headers, config) {

                    var img2 = {
                        image: $scope.img_2.base64,
                        idea: data.id
                    };
                    var img3 = {
                        image: $scope.img_3.base64,
                        idea: data.id
                    };
                    var img4 = {
                        image: $scope.img_4.base64,
                        idea: data.id
                    };


                    $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/upload_image/', img2, config)
                        .success(function (data, status, headers, config) {

                        })
                        .error(function (data, status, header, config) {
                            console.log("FALLO"+data);
                        });
                    $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/upload_image/', img3, config)
                        .success(function (data, status, headers, config) {

                        })
                        .error(function (data, status, header, config) {
                            console.log("FALLO"+data);
                        });
                    $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/upload_image/', img4, config)
                        .success(function (data, status, headers, config) {

                            swal({
                                    title: "Idea Subida con exito!",
                                    text: "Tu Idea será moderadada, espéra los resultados en las proximas horas!",
                                    type: "success",
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Aceptar",
                                    closeOnConfirm: true
                                },
                                function () {
                                    $location.path("/inicio");
                                });
                        })
                        .error(function (data, status, header, config) {
                            console.log("FALLO"+data);
                        });


                })
                .error(function (data, status, header, config) {
                    console.log("FALLO"+data);
                });

            // setTimeout(location.reload.bind(location), 5000);


        }
    }]);

