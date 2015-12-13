var app = angular.module('myApp', [])
  .controller('master', master)
  .controller('counter', counter)
  .controller('sayHi', hello);

function master($scope) {
  $scope.$on('tellMaster', function(event, args) {
    $scope.$broadcast('show', args);
  })
}

function counter($scope) {
  $scope.disableText = true;
  $scope.showHide = function() {
    $scope.disableText = !$scope.disableText;
    $scope.$emit('tellMaster', { });
  }
}

function hello($scope) {
  $scope.isHiding = true;
  $scope.$on('show', function(event, args) {
    $scope.isHiding = !$scope.isHiding;
  })
}
