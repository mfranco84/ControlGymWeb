(function(){
  "use strict";
  angular.module('clase.controllers')
    .controller('ClasesController', ClasesController)
    .controller('ClaseDetalleController', ClaseDetalleController);

    ClasesController.$inject = ['$state', 'claseServicio'];
    function ClasesController ($state, claseServicio){
      var clasesCtrl = this;
      clasesCtrl.clases = [];
      
      claseServicio.query().$promise.then(function(data){
          clasesCtrl.clases = data;
      });

      clasesCtrl.abrirClase = function (IdClase) {
        var claseSelected = clasesCtrl.clases.find(function(item){
          return item.IdClase === IdClase;
        });
        $state.go('app.clases.detalle', {id: IdClase, clase: claseSelected});
      };
    }

    ClaseDetalleController.$inject = ['$state', '$sessionStorage', '$stateParams', 'claseServicio', 'horarioServicio'];
    function ClaseDetalleController ($state, $sessionStorage, $stateParams, claseServicio, horarioServicio){
      var claseDetalleCtrl = this;
      claseDetalleCtrl.clase = {
        IdGimnasio: $sessionStorage.usuario.IdGimnasio,
      };
      claseDetalleCtrl.horarios = [];
      claseDetalleCtrl.horaPattern = '[0-2][0-9]:[0-5][0-9]';
      
      if ($stateParams && $stateParams.clase) {
        console.log($stateParams.clase);
        claseDetalleCtrl.clase = $stateParams.clase;
        claseServicio.getHorarios({idClase:claseDetalleCtrl.clase.IdClase}).$promise.then(function(data){
          claseDetalleCtrl.horarios = data;
        });
      } else if($stateParams && $stateParams.id) {
        claseServicio.get({idClase:$stateParams.id}).$promise.then(function(data){
          claseDetalleCtrl.clase = data[0];
          claseServicio.getHorarios({idClase:claseDetalleCtrl.clase.IdClase}).$promise.then(function(data){
            claseDetalleCtrl.horarios = data;
          });
        });
      }

      claseDetalleCtrl.agregarHorario = function () {
        claseDetalleCtrl.horarios.push({
          IdClase: claseDetalleCtrl.clase.IdClase,
          Dia: "",
          HoraInicio: "00:00",
          HoraFin: "00:00"
        });
      };

      claseDetalleCtrl.guardarClase = function () {
        if (claseDetalleCtrl.form.$valid) {
          if (claseDetalleCtrl.clase.IdClase) {
            // claseServicio.put({IdClase:claseDetalleCtrl.miembro.IdClase}, claseDetalleCtrl.miembro); // Ambas funcionan
            claseDetalleCtrl.clase.$put().then(function(data){
              saveHorarios(data.IdClase);
            });
          } else {
            claseServicio.save(claseDetalleCtrl.clase)
            .$promise.then(function(data){
              console.log('creado: ', data);
              saveHorarios(data.IdClase);
            });
          }
        }
      };

      function saveHorarios (IdClase) {
        claseDetalleCtrl.horarios.forEach(function(horario){
          horario.IdClase = IdClase;
          if (horario.IdHorarioClase) {
            horarioServicio.put({IdHorarioClase:horario.IdHorarioClase}, horario);
            console.log('put :' + horario.IdHorarioClase);
          } else {
            console.log('post:');
            horarioServicio.save(horario);
          }
        });
        $state.go('app.clases.lista');
      }

    }

})();