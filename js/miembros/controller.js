(function(){
  "use strict";
  angular.module('miembros.controllers')
    .controller('MiembrosController', MiembrosController)
    .controller('MiembroDetalleController', MiembroDetalleController);

    MiembrosController.$inject = ['$state', 'miembroServicio'];
    function MiembrosController ($state, miembroServicio){
      var miembrosCtrl = this;
      miembrosCtrl.miembros = [];
      
      miembroServicio.query().$promise.then(function(data){
          miembrosCtrl.miembros = data;
      });

      miembrosCtrl.abrirMiembro = function (IdMiembro) {
        var miembroSelected = miembrosCtrl.miembros.find(function(item){
          return item.IdMiembro === IdMiembro;
        });
        $state.go('app.miembros.detalle', {id: IdMiembro, miembro: miembroSelected});
      };
    }

    MiembroDetalleController.$inject = ['$state', '$stateParams', '$sessionStorage', 'miembroServicio'];
    function MiembroDetalleController ($state, $stateParams, $sessionStorage, miembroServicio){
      var miembroDetalleCtrl = this;
      miembroDetalleCtrl.miembro = {
        IdGimnasio: $sessionStorage.usuario.IdGimnasio,
      };
      
      if ($stateParams && $stateParams.miembro) {
        miembroDetalleCtrl.miembro = $stateParams.miembro;
      }

      miembroDetalleCtrl.abrirProgramasMiembro = function () {
        $state.go('app.programas.lista', {id: miembroDetalleCtrl.miembro.IdMiembro});
      };

      miembroDetalleCtrl.abrirPlanesMiembro = function () {
        $state.go('app.planes.lista', {id: miembroDetalleCtrl.miembro.IdMiembro});
      };

      miembroDetalleCtrl.guardarMiembro = function () {
        if (miembroDetalleCtrl.form.$valid) {
          if (miembroDetalleCtrl.miembro.IdMiembro) {
            // miembroServicio.put({IdMiembro:miembroDetalleCtrl.miembro.IdMiembro}, miembroDetalleCtrl.miembro); // Ambas funcionan
            miembroDetalleCtrl.miembro.$put().then(function(data){
              console.log('actualizado: ', data);
            });
          } else {
            miembroServicio.save({IdMiembro:miembroDetalleCtrl.miembro.IdMiembro}, miembroDetalleCtrl.miembro)
            .$promise.then(function(data){
              console.log('creado: ', data);
              $state.go('app.miembros.lista');
            });
          }
        }
      };

    }

})();