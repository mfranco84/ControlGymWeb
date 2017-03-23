(function(){
  "use strict";
  angular.module('clase.services')
    .service('claseServicio', ClaseServicio);
    ClaseServicio.$inject = ['$resource', '$sessionStorage'];

    function ClaseServicio ($resource, $sessionStorage){
      var baseUrl = 'http://localhost:50639/api';
      // var baseUrl = 'http://controlgymapi.azurewebsites.net/api';
      var service = $resource(baseUrl + '/clase/:idClase', {
          idClase: '@idClase',
        },
        {
        getHorarios: {
          method: 'GET',
          url: baseUrl + '/clase/:idClase/horarios',
          isArray: true,
          params: {idClase: '@idClase'},
        }
      });

      return service;
    }
})();