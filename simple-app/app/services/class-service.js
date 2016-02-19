angular.module('simple-app')
  .service('ClassService', ['$http', function($http){
    return {
      get: function() {
        return $http.get('/app/fake-api/classes.json');
      }
    }
  }])