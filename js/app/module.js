(function () {
  'use strict';

  angular.module('ControlGymApp', [
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'ngResource',

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
          templateUrl: 'js/login/tmp/login.html',
          // controller: 'loginController as loginCtrl'
        })
        .state('app', {
          url:'/app',
          templateUrl: 'js/app/tmp/app.html',
          controller: 'ControlGymController as controlGymCtrl'
        })
        .state('app.miembros', {
          url:'/miembros',
          template: '<ui-view/>'
        })
        .state('app.miembros.lista', {
          url:'/lista',
          templateUrl: 'js/miembros/tmp/miembros.html',
          controller: 'MiembrosController as miembrosCtrl'
        })
        .state('app.miembros.detalle', {
          url: '/{id:[0-9]*}',
          templateUrl: 'js/miembros/tmp/miembro-detalle.html',
          controller: 'MiembroDetalleController as miembroDetalleCtrl',
          params: { miembro: null },
        });
    }

}());
