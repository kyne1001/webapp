angular.module('simple-app', ['ui.router'])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home.html'
      })
      .state('class', {
        url: '/class',
        templateUrl: 'app/components/class.html',
        controller: 'ClassCtrl'
      })
      .state('teacher', {
        url: '/teacher',
        templateUrl: 'app/components/teacher.html',
        controller: 'TeacherCtrl'
      })
      .state('library', {
        url: '/library',
        templateUrl: 'app/components/library.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/components/about.html'
      })
  }]);