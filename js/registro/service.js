(function(){
  "use strict";
  angular.module('registro.services')
    .service('membresiaServicio', MembresiaServicio);
    
    MembresiaServicio.$inject = ['$resource', 'sesionServicio'];

    function MembresiaServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/membresia/:id');

      return service;
    }
})();