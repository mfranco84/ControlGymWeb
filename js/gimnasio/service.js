(function(){
  "use strict";
  angular.module('gimnasio.services')
    .service('gimnasioServicio', GimnasioServicio);
    GimnasioServicio.$inject = ['$resource', 'sesionServicio'];

    function GimnasioServicio ($resource, sesionServicio){
      var baseUrl = 'http://localhost:50639/api';
      // var baseUrl = 'http://controlgymapi.azurewebsites.net/api';
      var service = $resource(sesionServicio.obtenerUrlBase() + '/gimnasio/:id');

      return service;
    }
})();