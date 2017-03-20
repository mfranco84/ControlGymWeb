(function(){
  "use strict";
  angular.module('miembros.services')
    .service('miembroServicio', MiembroServicio);
    MiembroServicio.$inject = ['$resource'];

    function MiembroServicio ($resource){
      var baseUrl = 'http://localhost:50639/api';
      // var baseUrl = 'http://controlgymapi.azurewebsites.net/api';
      var service = $resource(baseUrl + '/miembro/:IdMiembro', {
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