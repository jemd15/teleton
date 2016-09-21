/**
 * Created by juliogf on 15-09-16.
 */
angular.module('detalle-idea',[])

    .controller('IdeaCtrl', ['$scope','$location','$http', function ($scope,$location,$http) {
        var id_idea = $location.search().id;
        $scope.id_idea =id_idea;
        $http.get('http://pyhackaton2016-hackatonteleton.rhcloud.com/ideas/'+id_idea+"/")
            .success(function (data, status, headers, config) {
                $scope.nombre= data.title;
                $scope.descripcion_corta=data.short_description;
                $scope.descripcion= data.description;
                $scope.url_vid = data.url_video;
                $scope.img_prin=    data.main_image;
                $scope.autor=    data.user.email;
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

            })
            .error(function (data, status, header, config) {
                console.log("FALLO:"+data);
            });

    }])


    .controller('VotosCtrl', ['$scope','$location','$http', function ($scope,$location,$http) {

      $scope.votar = function () {
          var vote = {
              idea: $scope.id_idea
          }

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

          $http.post('http://pyhackaton2016-hackatonteleton.rhcloud.com/insert_voto/', vote, config)
              .success(function (data, status, headers, config) {
                  $scope.votos = $scope.votos + 1;

                  $http.patch('http://pyhackaton2016-hackatonteleton.rhcloud.com/ideas/'+$scope.id_idea+"/",obj,config)
                      .success(function (data, status, headers,config) {
                          console.log(data);
                          swal({
                                  title: "Datos Registrados\n"+$sessionStorage.emailface,
                                  type: "success",
                                  confirmButtonColor: "#DD6B55",
                                  confirmButtonText: "Subir Idea",
                                  closeOnConfirm: true},
                              function(){

                                  location.href = '/#/sube-tu-idea';
                              });


                      })
                      .error(function (data, status, header, config) {
                          console.log(data);
                      });
              })
              .error(function (data, status, header, config) {
                  console.log(data);
              });



      }


    }]);



