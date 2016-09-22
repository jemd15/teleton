/**
 * Created by juliogf on 15-09-16.
 */
angular.module('detalle-idea',['youtube-embed'])

    .controller('IdeaCtrl', ['$scope','$location','$http', function ($scope,$location,$http) {
        var id_idea = $location.search().id;
        $scope.id_idea =id_idea;
        $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/ideas/'+id_idea+"/")
            .success(function (data, status, headers, config) {
                $scope.nombre= data.title;
                $scope.descripcion_corta=data.short_description;
                $scope.descripcion= data.description;
                $scope.url_vid = data.url_video;
                $scope.img_prin= data.main_image;
                $scope.autor=    data.user.first_name+" "+data.user.last_name;
                $scope.comuna = data.user.commune;
                $scope.votos = data.num_vote;

                if(data.category ==1){ $scope.categoria = "Educación";}
                if(data.category ==2){ $scope.categoria ="Vida diaria";}
                if(data.category ==3){ $scope.categoria = "Trabajo";}
                if(data.category ==4){ $scope.categoria = "Transporte";}
                if(data.category ==5){ $scope.categoria = "Comunicación";}
                if(data.category ==6){ $scope.categoria = "Entretención";}

                if(data.beneficiary ==1){$scope.beneficiario = "Sordo-Mudo"}


            })
            .error(function (data, status, header, config) {
                  console.log("FALLO:"+data);
            });

        $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/imagenes/?idea__id='+id_idea)
            .success(function (data, status, headers, config) {
               console.log(data.results);
                $scope.imagenes =data.results;
                $scope.img1 = data.results[0].image;
                $scope.img2 = data.results[1].image;
                $scope.img3 = data.results[2].image;

            })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);
            });

    }])


    .controller('VotosCtrl', ['$scope','$location','$http','$sessionStorage', function ($scope,$location,$http,$sessionStorage) {
        var id_idea = $location.search().id;
      $scope.Votar = function () {
          var vote = {
              idea: id_idea
          }

          $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/ideas/'+id_idea+"/")
              .success(function (data, status, headers, config) {
                $scope.votos = data.num_vote + 1;
                  var config = {
                      headers: {
                          'Authorization': 'token ' + $sessionStorage.token
                      }
                  }
                  $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/insert_voto/', vote, config)
                      .success(function (data, status, headers, config) {
                               var obj = {
                                   num_vote : $scope.votos
                               }
                          var config = {
                              headers: {
                                  'Authorization': 'token ' + $sessionStorage.token
                              }
                          }
                          $http.patch('http://pyhackaton2016-hackatonteleton.rhcloud.com/ideas/'+id_idea+"/",obj,config)
                              .success(function (data, status, headers,config) {
                                  console.log(data);
                                  swal({
                                          title: "Has Votado!\n"+$sessionStorage.nombre,
                                          type: "success",
                                          confirmButtonColor: "#DD6B55",
                                          confirmButtonText: "Aceptar",
                                          closeOnConfirm: true},
                                      function(){

                                          location.reload();
                                      });


                              })
                              .error(function (data, status, header, config) {
                                  console.log(data);
                              });
                      })
                      .error(function (data, status, header, config) {
                          console.log(data);
                      });
              })
              .error(function (data, status, header, config) {
                  console.log("FALLO:"+data);
              });





      }//funcion votar()


    }])

    .controller('CommentCtrl', ['$scope','$location','$http','$sessionStorage', function ($scope,$location,$http, $sessionStorage) {
        var id_idea = $location.search().id;
        $scope.nombre_user = $sessionStorage.nombre;

            $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/comentarios/?idea__id='+id_idea)
                .success(function (data, status, headers, config) {
                    console.log(data.results);
                    $scope.comentarios = data.results;
                })
                .error(function (data, status, header, config) {
                    console.log("FALLO:"+data);
                });


        $scope.PostComentario = function () {

            var obj = {
                idea:id_idea,
                commentary:$scope.postcomentario
            }

            if ($sessionStorage.islogin === 1) {
                config = {
                    headers: {
                        'Authorization': 'token ' + $sessionStorage.token
                    }
                }
            }


            $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/insert_comentario/', obj, config)
                .success(function (data, status, headers, config) {
                    console.log(data);
                    location.reload();
                })
                .error(function (data, status, header, config) {
                    console.log(data);
                });
        }



    }])

    .controller('ValidarVotoCtrl', ['$scope','$location','$http','$sessionStorage', function ($scope,$location,$http, $sessionStorage) {
        $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/votos/?user__email='+$sessionStorage.email)
            .success(function (data, status, headers, config) {
                console.log(data.results);
                if (typeof data.results[0] !== 'undefined') {
                    $scope.isvote = true;
                }
                else {
                    $scope.isvote = false;
                }
            })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);
            });

    }]);



