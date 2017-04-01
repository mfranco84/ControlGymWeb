(function(){
  "use strict";
  angular.module('administrador.services')
    .service('administradorServicio', AdministradorServicio);
    
    AdministradorServicio.$inject = ['$resource', 'sesionServicio'];

    function AdministradorServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/administrador/:id');

      return service;
    }
})();