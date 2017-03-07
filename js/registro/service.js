(function(){
  "use strict";
  angular.module('registro.services')
    .service('membresiaServicio', MembresiaServicio);
    MembresiaServicio.$inject = ['$resource', 'sesionServicio'];

    function MembresiaServicio ($resource, sesionServicio){
      var baseUrl = 'http://localhost:50639/api';
      // var baseUrl = 'http://controlgymapi.azurewebsites.net/api';
      var service = $resource(sesionServicio.obtenerUrlBase() + '/membresia/:id');

      return service;
    }
})();