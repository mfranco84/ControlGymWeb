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
        },
        getProgramas: {
          method: 'GET',
          url: sesionServicio.obtenerUrlBase() + '/miembro/:IdMiembro/programas',
          isArray: true,
          params: {IdMiembro: '@IdMiembro'},
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
})();