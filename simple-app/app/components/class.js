angular.module('simple-app')
  .controller('ClassCtrl', ['$scope', 'ClassService', function($scope, ClassService){
    ClassService.get()
      .then(function(response){
        $scope.classes = response.data;
      })
      .catch(function(error){
        console.log(error);
      });

  }])
