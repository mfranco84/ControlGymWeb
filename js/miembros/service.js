(function(){
  "use strict";
  angular.module('miembros.services')
    .service('miembroServicio', MiembroServicio);
    
    MiembroServicio.$inject = ['$resource', 'sesionServicio'];

    function MiembroServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/miembro/:IdMiembro', {
          IdMiembro: '@IdMiembro',
        },
        {
        put: {
          method: 'PUT',
          //params: {idMiembro: '@idMiembro'} //additional parameters
        }
      });

      return service;
    }
})();