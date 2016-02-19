angular.module('simple-app')
  .service('TeacherService', ['$http', function($http){
    return {
      get: function() {
        return $http.get('app/fake-api/teachers.json')
      }
    }
  }])
