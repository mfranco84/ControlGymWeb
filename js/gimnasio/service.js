(function(){
  "use strict";
  angular.module('gimnasio.services')
    .service('gimnasioServicio', GimnasioServicio);
    
    GimnasioServicio.$inject = ['$resource', 'sesionServicio'];

    function GimnasioServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/gimnasio/:id');

      return service;
    }
})();