/**
 * Created by juliogf on 15-09-16.
 */
angular.module('detalle-idea',[])

    .controller('IdeaCtrl', ['$scope','$location', function ($scope,$location) {
          console.log("hola");
        console.log("id:"+$location.search().id);
    }]);



