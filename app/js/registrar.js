angular.module('registro',['ngStorage','oitozero.ngSweetAlert'])
    .controller('RegistroCtrl', ['$scope','$sessionStorage','$timeout','$http', function ($scope,$sessionStorage,$timeout, $http) {

        $scope.checkboxU = {
            ischeck : false
        };

        //ejecutar este metodo una vez que la pagina se cargue completa
        angular.element(document).ready(function() {
            //obtener JSON con las comunas
            $http.get('app/js/static-json/comunas.json')
                .success(function (data, status, headers) {
                  $scope.comunas = data;
            });

            //obtener JSON con las universidades
            $http.get('app/js/static-json/universidades.json')
                .success(function (data, status, headers) {
                  $scope.universitys = data;
            });

            //obtener JSON con las carreras
            $http.get('app/js/static-json/carreras.json')
                .success(function (data, status, headers) {
                  $scope.carrers = data;
            });
        });

        $scope.UpdateUser = function ($location) {
            var obj = {
                first_name: $scope.nombre,
                last_name: $scope.apellido,
                phone: $scope.telefono,
                age: $scope.edad,
                commune: $scope.comuna,
                is_student:$scope.checkboxU.ischeck,
                career:$scope.carrera,
                university:$scope.universidad
            };
            if($sessionStorage.islogin === 1)
            {
                var config = {
                    headers : {
                        'Authorization': 'token '+$sessionStorage.token
                    }
                };
                $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.email)
                    .success(function (data, status, headers) {
                        $scope.id= data.results[0].id;
                        $http.patch('http://pyhackaton2016-hackatonteleton.rhcloud.com/editusers/'+ $scope.id+'/',obj,config)
                            .success(function (data, status, headers,config) {

                                swal({
                                        title: "Datos Registrados\n"+$sessionStorage.nombre,
                                        type: "success",
                                        confirmButtonColor: "#DD6B55",
                                        confirmButtonText: "Subir Idea",
                                        closeOnConfirm: true},
                                    function(){

                                        location.href = '/#/sube-tu-idea';
                                    });


                            })
                            .error(function (data, status, header, config) {
                                console.log("FALLO"+data);
                            });

                    })
                    .error(function (data, status, header) {
                        console.log("FALLO"+data);
                    });



            }

            // setTimeout(location.reload.bind(location), 5000);
        };

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            weekdaysFull: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            weekdaysLetter: ['D', 'L', 'M', 'MI', 'J', 'V', 'S'],
            today: 'hoy',
            clear: 'borrar',
            close: 'cerrar',
            firstDay: 1,
            format: 'dddd d !de mmmm !de yyyy',
            formatSubmit: 'yyyy/mm/dd'
        });
    }]);
