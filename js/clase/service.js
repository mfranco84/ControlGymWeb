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
        put: {
          method: 'PUT',
        },
        getHorarios: {
          method: 'GET',
          url: baseUrl + '/clase/:idClase/horarios',
          isArray: true,
          params: {idClase: '@idClase'},
          transformResponse: function (data) {
            data = angular.fromJson(data);
            // Transformando datos de cada horario
            data.forEach(function(horario){
              if (horario.HoraInicio) {
                horario.HoraInicio = horario.HoraInicio.substring(0, 5);
              }
              if (horario.HoraFin) {
                horario.HoraFin = horario.HoraFin.substring(0, 5);
              }
            });
            return data;
          },
        }
      });

      return service;
    }
})();