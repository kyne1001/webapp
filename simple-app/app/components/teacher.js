angular.module('simple-app')
  .controller('TeacherCtrl', ['$scope', 'TeacherService', function($scope, TeacherService){
    TeacherService.get()
      .then(function(response){
        $scope.teachers = response.data;
      })
      .catch(function(error){
        console.log(error);
      });

  }])
