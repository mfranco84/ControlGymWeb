(function () {
  'use strict';

  angular.module('ControlGymApp', [
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'ngResource',
    'ngStorage',

    // Application Modules
    'ControlGymApp.services',
    'ControlGymApp.controllers',
    'login',
    'registro',
    'gimnasio',
    'miembros',
    'administrador',
  ]);
  angular.module('ControlGymApp.services', []);
  angular.module('ControlGymApp.controllers', []);
  angular.module('ControlGymApp.components', []);

  angular.module('ControlGymApp').config(RouteConfiguration);
  RouteConfiguration.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];
  function RouteConfiguration ($urlRouterProvider, $stateProvider, $httpProvider) {
    // Set Authorization header to all calls
    var interceptor = [
      '$q',
      '$rootScope',
      '$sessionStorage',
      function($q, $rootScope, $sessionStorage) {
        var service = {
          // run this function before making requests
          'request': function(config) {
            config.headers['Content-Type']= 'application/json; charset=utf-8';
            config.headers['Authorization'] = $sessionStorage.auth || 'none';
            return config;
          }
        };
        return service;
      }
    ];

    $httpProvider.interceptors.push(interceptor);

    // Route Configuration
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'js/login/tmp/login.html',
        controller: 'LoginController as loginCtrl'
      })
      .state('registro', {
        url:'/registro',
        templateUrl: 'js/registro/tmp/registro.html',
        controller: 'RegistroController as registroCtrl'
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

  angular.module('ControlGymApp').run(RunConfiguration);
  RunConfiguration.$inject = ['$rootScope', '$state', '$sessionStorage'];
  function RunConfiguration ($rootScope, $state, $sessionStorage) {
    // Prevenir que un usuario sin token pueda entrar a la aplicacion
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){
      if (!$sessionStorage.auth && toState.name !== 'login') {
        console.log('toState: ', toState);
        console.log('fromState: ', fromState);
        event.preventDefault();
        $state.transitionTo('login');
      }
    });
  }
}());
