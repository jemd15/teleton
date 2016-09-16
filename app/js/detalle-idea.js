/**
 * Created by juliogf on 15-09-16.
 */
angular.module('detalle-idea',[])

    .controller('IdeaCtrl', ['$scope', function ($scope,$location) {
        var ideaId = $location.search().id;
        console.log(ideaId);
    }]);



