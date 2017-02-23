(function () {
  'use strict';

  angular.module('ControlGymApp', [
    'ngMaterial',
    'ui.router',

    // Application Modules
    'ControlGymApp.controllers',
    'miembros',
  ]);
  angular.module('ControlGymApp.services', []);
  angular.module('ControlGymApp.controllers', []);
  angular.module('ControlGymApp.components', []);

  angular.module('ControlGymApp').config(RouteConfiguration);
  RouteConfiguration.$inject = ['$urlRouterProvider', '$stateProvider'];
    function RouteConfiguration ($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('login', {
            url:'/login',
            templateUrl: 'tmp/login.html',
            // controller: 'loginController as loginCtrl'
        })
        .state('app', {
            url:'/app',
            templateUrl: 'tmp/app.html',
            controller: 'ControlGymController as controlGymCtrl'
        })
        .state('app.miembros', {
            url:'/miembros',
            templateUrl: 'tmp/miembros.html',
            // controller: 'MiembrosController as miembroCtrl'
        })
    }

}());
