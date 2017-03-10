(function(){
  "use strict";
  angular.module('administrador.services')
    .service('administradorServicio', AdministradorServicio);
    AdministradorServicio.$inject = ['$resource', 'sesionServicio'];

    function AdministradorServicio ($resource, sesionServicio){
      var baseUrl = 'http://localhost:50639/api';
      // var baseUrl = 'http://controlgymapi.azurewebsites.net/api';
      var service = $resource(sesionServicio.obtenerUrlBase() + '/administrador/:id');

      return service;
    }
})();