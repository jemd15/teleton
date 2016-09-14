angular.module('registro',['ngStorage'])

    .controller('RegistroCtrl', ['$scope','$sessionStorage','$http', function ($scope,$sessionStorage,$http) {
        $scope.checkboxU = {
            ischeck : false
        };
        $scope.comunas =["ALGARROBO", "ALHUE", "ALTO BIOBIO", "ALTO DEL CARMEN", "ALTO HOSPICIO", "ANCUD", "ANDACOLLO", "ANGOL", "ANTOFAGASTA", "ANTUCO", "ARAUCO", "ARICA", "AYSEN", "BUIN", "BULNES", "CABILDO", "CABO DE HORNOS", "CABRERO", "CALAMA", "CALBUCO", "CALDERA", "CALERA DE TANGO", "CALLE", "LARGA", "CAMARONES", "CAMINA", "CANELA", "CANETE", "CARAHUE", "CARTAGENA", "CASABLANCA", "CASTRO", "CATEMU", "CAUQUENES", "CERRILLOS", "CERRO NAVIA", "CHAITEN", "CHANARAL", "CHANCO", "CHEPICA", "CHIGUAYANTE", "CHILE CHICO", "CHILLAN", "CHILLAN VIEJO", "CHIMBARONGO", "CHOLCHOL", "CHONCHI", "CISNES", "COBQUECURA", "COCHAMO", "COCHRANE", "CODEGUA", "COELEMU", "COIHUECO", "COINCO", "COLBUN", "COLCHANE", "COLINA", "COLLIPULLI", "COLTAUCO", "COMBARBALA", "CONCEPCION", "CONCHALI", "CONCON", "CONSTITUCION", "CONTULMO", "COPIAPO", "COQUIMBO", "CORONEL", "CORRAL", "COYHAIQUE", "CUNCO", "CURACAUTIN", "CURACAVI", "CURACO DE VELEZ", "CURANILAHUE", "CURARREHUE", "CUREPTO", "CURICO", "DALCAHUE", "DIEGO DE ALMAGRO", "DONIHUE", "EL BOSQUE", "EL CARMEN", "EL MONTE", "EL QUISCO", "EL TABO", "EMPEDRADO", "ERCILLA", "ESTACION CENTRAL", "FLORIDA", "FREIRE", "FREIRINA", "FRESIA", "FRUTILLAR", "FUTALEUFU", "FUTRONO", "GALVARINO", "GENERAL LAGOS", "GORBEA", "GRANEROS", "GUAITECAS", "HIJUELAS", "HUALAIHUE", "HUALANE","HUALPEN", "HUALQUI", "HUARA", "HUASCO", "HUECHURABA", "ILLAPEL", "INDEPENDENCIA", "IQUIQUE", "ISLA DE MAIPO", "ISLA DE PASCUA", "JUAN FERNANDEZ", "LA CALERA", "LA CISTERNA", "LA CRUZ", "LA ESTRELLA", "LA FLORIDA", "LA GRANJA", "LA HIGUERA", "LA LIGUA", "LA PINTANA", "LA REINA", "LA SERENA", "LA UNION", "LAGO RANCO", "LAGO VERDE", "LAGUNA BLANCA", "LAJA", "LAMPA", "LANCO", "LAS CABRAS", "LAS CONDES", "LAUTARO", "LEBU", "LICANTEN", "LIMACHE", "LINARES", "LITUECHE", "LLANQUIHUE", "LLAY-LLAY", "LO BARNECHEA", "LO ESPEJO", "LO PRADO", "LOLOL", "LONCOCHE", "LONGAVI", "LONQUIMAY", "LOS ALAMOS", "LOS ANDES", "LOS ANGELES", "LOS LAGOS", "LOS MUERMOS", "LOS SAUCES", "LOS VILOS", "LOTA", "LUMACO", "MACHALI", "MACUL", "MAFIL", "MAIPU", "MALLOA", "MARCHIGUE", "MARIA ELENA", "MARIA PINTO", "MARIQUINA", "MAULE", "MAULLIN", "MEJILLONES", "MELIPEUCO", "MELIPILLA", "MOLINA", "MONTE PATRIA", "MULCHEN", "NACIMIENTO", "NANCAGUA", "NATALES", "NAVIDAD", "NEGRETE", "NINHUE", "NIQUEN", "NOGALES", "NUEVA IMPERIAL", "NUNOA", "OHIGGINS", "OLIVAR", "OLLAGUE", "OLMUE", "OSORNO", "OVALLE", "PADRE HURTADO", "PADRE LAS CASAS", "PAIHUANO", "PAILLACO", "PAINE", "PALENA", "PALMILLA", "PANGUIPULLI", "PANQUEHUE", "PAPUDO", "PAREDONES", "PARRAL", "PEDRO AGUIRRE CERDA", "PELARCO", "PELLUHUE", "PEMUCO", "PENAFLOR", "PENALOLEN","PENCAHUE", "PENCO", "PERALILLO", "PERQUENCO", "PETORCA", "PEUMO", "PICA", "PICHIDEGUA", "PICHILEMU", "PINTO", "PIRQUE", "PITRUFQUEN", "PLACILLA", "PORTEZUELO", "PORVENIR","POZO ALMONTE", "PRIMAVERA", "PROVIDENCIA", "PUCHUNCAVI", "PUCON", "PUDAHUEL", "PUENTE ALTO", "PUERTO MONTT", "PUERTO OCTAY", "PUERTO VARAS", "PUMANQUE", "PUNITAQUI", "PUNTA ARENAS", "PUQUELDON", "PUREN", "PURRANQUE", "PUTAENDO", "PUTRE", "PUYEHUE", "QUEILEN", "QUELLON", "QUEMCHI", "QUILACO", "QUILICURA", "QUILLECO", "QUILLON", "QUILLOTA", "QUILPUE", "QUINCHAO", "QUINTA DE TILCOCO", "QUINTA NORMAL", "QUINTERO", "QUIRIHUE", "RANCAGUA", "RANQUIL", "RAUCO", "RECOLETA", "RENAICO", "RENCA", "RENGO", "REQUINOA", "RETIRO", "RINCONADA", "RIO BUENO", "RIO CLARO", "RIO HURTADO", "RIO IBANEZ","RIO NEGRO", "RIO VERDE, ROMERAL",  "SAAVEDRA","SAGRADA FAMILIA", "SALAMANCA", "SAN ANTONIO", "SAN BERNARDO", "SAN CARLOS", "SAN CLEMENTE", "SAN ESTEBAN", "SAN FABIAN", "SAN FELIPE", "SAN FERNANDO", "SAN FRANCISCO DE MOSTAZAL", "SAN GREGORIO", "SAN IGNACIO", "SAN JAVIER", "SAN JOAQUIN", "SAN JOSE DE MAIPO", "SAN JUAN DE LA COSTA", "SAN MIGUEL", "SAN NICOLAS", "SAN PABLO", "SAN PEDRO", "SAN PEDRO DE ATACAMA", "SAN PEDRO DE LA PAZ", "SAN RAFAEL", "SAN RAMON", "SAN ROSENDO", "SAN VICENTE", "SANTA BARBARA", "SANTA CRUZ", "SANTA JUANA", "SANTA MARIA", "SANTIAGO", "SANTIAGO OESTE", "SANTIAGO SUR", "SANTO DOMINGO", "SIERRA GORDA", "TALAGANTE", "TALCA", "TALCAHUANO", "TALTAL", "TEMUCO", "TENO", "TEODORO SCHMIDT", "TIERRA AMARILLA", "TIL-TIL", "TIMAUKEL", "TIRUA", "TOCOPILLA", "TOLTEN", "TOME", "TORRES DEL PAINE", "TORTEL", "TRAIGUEN", "TREHUACO", "TUCAPEL", "VALDIVIA", "VALLENAR", "VALPARAISO", "VICHUQUEN", "VICTORIA", "VICUNA", "VILCUN", "VILLA ALEGRE", "VILLA ALEMANA", "VILLARRICA", "VINA DEL MAR", "VITACURA", "YERBAS BUENAS", "YUMBEL", "YUNGAY", "ZAPALLAR"];

//PATCH USER

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
            console.log(obj.age);
            if($sessionStorage.isloginface === 1)
            {
                var config = {
                    headers : {
                        'Authorization': 'token '+$sessionStorage.tokenface
                    }
                };
                $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.emailface)
                    .success(function (data, status, headers) {
                        console.log(data.results[0].id);
                        $scope.id= data.results[0].id;
                    })
                    .error(function (data, status, header) {
                        console.log(data);
                    });
                function patch(){
                    $http.patch('http://pyhackaton2016-hackatonteleton.rhcloud.com/editusers/'+ $scope.id+'/',obj,config)
                        .success(function (data, status, headers,config) {
                            console.log(data);
                            location.reload();
                        })
                        .error(function (data, status, header, config) {
                            console.log(data);
                        });
                }
                setTimeout(patch, 2000);
            }
            if($sessionStorage.islogingoogle === 1)
            {
                config = {
                    headers : {
                        'Authorization': 'token '+$sessionStorage.tokengoogle
                    }
                };
                $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/users/?email='+$sessionStorage.emailgoogle)
                    .success(function (data, status, headers) {
                        console.log(data.results[0].id);
                        $scope.id= data.results[0].id;

                    })
                    .error(function (data, status, header) {
                        console.log(data);
                    });
                patch();
                setTimeout(patch, 3000);
            }
            // setTimeout(location.reload.bind(location), 5000);
        };
    }]);