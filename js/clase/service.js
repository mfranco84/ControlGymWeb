(function(){
  "use strict";
  angular.module('clase.services')
    .service('claseServicio', ClaseServicio);
    
    ClaseServicio.$inject = ['$resource', 'sesionServicio'];
    
    function ClaseServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/clase/:idClase', {
          idClase: '@idClase',
        },
        {
        put: {
          method: 'PUT',
        },
        getHorarios: {
          method: 'GET',
          url: sesionServicio.obtenerUrlBase() + '/clase/:idClase/horarios',
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

  angular.module('clase.services')
    .service('horarioServicio', HorarioServicio);
    HorarioServicio.$inject = ['$resource', 'sesionServicio'];
    function HorarioServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/HorarioClase/:IdHorarioClase', {
          IdHorarioClase: '@IdHorarioClase',
        },
        {
        put: {
          method: 'PUT',
        }
      });

      return service;
    }
})();