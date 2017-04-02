(function(){
  "use strict";
  angular.module('programa.controllers')
    .controller('ProgramasController', ProgramasController)
    .controller('ProgramaDetalleController', ProgramaDetalleController);

    ProgramasController.$inject = ['$state', '$stateParams', 'miembroServicio'];
    function ProgramasController ($state, $stateParams, miembroServicio){
      var programasCtrl = this;
      programasCtrl.programas = [];
      
      miembroServicio.getProgramas({IdMiembro:$stateParams.id}).$promise.then(function(data){
          programasCtrl.programas = data;
      });

      programasCtrl.abrirProgramaRutinas = function (IdPrograma) {
        if (IdPrograma) {
          var programaSelected = programasCtrl.programas.find(function(item){
            return item.IdProgramaEjercicio === IdPrograma;
          });
          $state.go('app.programas.detalle', {id: $stateParams.id, programa: programaSelected});
        } else {
          $state.go('app.programas.detalle', {id: $stateParams.id});
        }
      };
    }

    ProgramaDetalleController.$inject = ['$state', '$stateParams', '$sessionStorage', 'programaServicio', 'rutinaServicio'];
    function ProgramaDetalleController ($state, $stateParams, $sessionStorage, programaServicio, rutinaServicio){
      var programaDetalleCtrl = this;
      programaDetalleCtrl.programa = {
        IdMiembro: $stateParams.id,
      };
      
      if ($stateParams && $stateParams.programa) {
        programaDetalleCtrl.programa = $stateParams.programa;
        var fechaI = programaDetalleCtrl.programa.FechaInicio.replace(new RegExp('-', 'g'), '/').substring(0, 10);
        programaDetalleCtrl.programa.FechaInicio = new Date(fechaI);
        var fechaF = programaDetalleCtrl.programa.FechaFin.replace(new RegExp('-', 'g'), '/').substring(0, 10);
        programaDetalleCtrl.programa.FechaFin = new Date(fechaF);
        programaServicio.getRutinas({IdPrograma:programaDetalleCtrl.programa.IdProgramaEjercicio}).$promise.then(function(data){
          programaDetalleCtrl.rutinas = data;
        });
      }

      programaDetalleCtrl.agregarRutina = function () {
        programaDetalleCtrl.rutinas.push({
          IdProgramaEjercicio: programaDetalleCtrl.programa.IdProgramaEjercicio,
          NombreRutina: "",
          DetalleRutina: ""
        });
      };

      programaDetalleCtrl.guardarPrograma = function () {
        if (programaDetalleCtrl.form.$valid) {
          if (programaDetalleCtrl.programa.IdProgramaEjercicio) {
            programaServicio.put({IdPrograma:programaDetalleCtrl.programa.IdProgramaEjercicio}, programaDetalleCtrl.programa)
            .$promise.then(function(data){
              console.log('actualizado: ', data);
              //saveRutinas();
            });
          } else {
            programaServicio.save(programaDetalleCtrl.programa)
            .$promise.then(function(data){
              console.log('creado: ', data);
              //saveRutinas();
            });
          }
        }
      };

      function saveRutinas () {
        programaDetalleCtrl.horarios.forEach(function(horario){
          if (horario.IdHorarioClase) {
            rutinaServicio.put({IdHorarioClase:horario.IdHorarioClase}, horario);
            console.log('put :' + horario.IdHorarioClase);
          } else {
            console.log('post:');
            rutinaServicio.save(horario);
          }
        });
        $state.go('app.miembros.lista');
      }

    }

})();