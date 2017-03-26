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

    ClaseDetalleController.$inject = ['$sessionStorage', '$stateParams', 'claseServicio'];
    function ClaseDetalleController ($sessionStorage, $stateParams, claseServicio){
      var claseDetalleCtrl = this;
      claseDetalleCtrl.clase = {
        IdGimnasio: $sessionStorage.usuario.IdGimnasio,
      };
      claseDetalleCtrl.horarios = null;
      claseDetalleCtrl.horaPattern = '[0-2][0-9]:[0-5][0-9]';
      
      if ($stateParams && $stateParams.clase) {
        console.log($stateParams.clase);
        claseDetalleCtrl.clase = $stateParams.clase;
        claseServicio.getHorarios({idClase:claseDetalleCtrl.clase.IdClase}).$promise.then(function(data){
          claseDetalleCtrl.horarios = data;
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
              saveHorarios();
            });
          } else {
            claseServicio.save(claseDetalleCtrl.clase)
            .$promise.then(function(data){
              console.log('creado: ', data);
              //$state.go('app.clases');
            });
          }
        }
      };

    }

})();