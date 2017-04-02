(function(){
  "use strict";
  angular.module('programa.services')
    .service('programaServicio', ProgramaServicio);
    
    ProgramaServicio.$inject = ['$resource', 'sesionServicio'];

    function ProgramaServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/ProgramaEjercicio/:IdPrograma', {
          IdPrograma: '@IdPrograma',
        },
        {
        put: {
          method: 'PUT',
          //params: {idPrograma: '@idPrograma'} //additional parameters
        },
        getRutinas: {
          method: 'GET',
          url: sesionServicio.obtenerUrlBase() + '/programa/:IdPrograma/rutinas',
          isArray: true,
          params: {IdPrograma: '@IdPrograma'},
          /*transformResponse: function (data) {
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
          },*/
        }
      });

      return service;
    }

  angular.module('programa.services')
    .service('rutinaServicio', RutinaServicio);
    RutinaServicio.$inject = ['$resource', 'sesionServicio'];
    function RutinaServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/Rutina/:IdRutina', {
          IdRutina: '@IdRutina',
        },
        {
        put: {
          method: 'PUT',
        }
      });

      return service;
    }
})();