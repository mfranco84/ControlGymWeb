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

    MiembroDetalleController.$inject = ['$state', '$stateParams', '$sessionStorage', '$mdToast', 'miembroServicio'];
    function MiembroDetalleController ($state, $stateParams, $sessionStorage, $mdToast, miembroServicio){
      var miembroDetalleCtrl = this;
      miembroDetalleCtrl.miembro = {
        IdGimnasio: $sessionStorage.usuario.IdGimnasio,
      };
      
      if ($stateParams && $stateParams.miembro) {
        miembroDetalleCtrl.miembro = $stateParams.miembro;
      } else if($stateParams && $stateParams.id) {
        miembroServicio.get({IdMiembro:$stateParams.id}).$promise.then(function(data){
          miembroDetalleCtrl.miembro = data;
        });
      }

      miembroDetalleCtrl.abrirProgramasMiembro = function () {
        $state.go('app.programas.lista', {id: miembroDetalleCtrl.miembro.IdMiembro});
      };

      miembroDetalleCtrl.abrirPlanesMiembro = function () {
        $state.go('app.planes.lista', {id: miembroDetalleCtrl.miembro.IdMiembro});
      };

      miembroDetalleCtrl.guardarMiembro = function () {
        if (miembroDetalleCtrl.form.$valid) {
          miembroDetalleCtrl.enProceso = true;
          if (miembroDetalleCtrl.miembro.IdMiembro) {
            // miembroServicio.put({IdMiembro:miembroDetalleCtrl.miembro.IdMiembro}, miembroDetalleCtrl.miembro); // Ambas funcionan
            miembroDetalleCtrl.miembro.$put().then(function(data){
              console.log('actualizado: ', data);
              $mdToast.showSimple('El miembro ' + data.Nombre + ' ha sido actualizado exitosamente.');
              $state.go('app.miembros.lista');
            });
          } else {
            miembroServicio.save({IdMiembro:miembroDetalleCtrl.miembro.IdMiembro}, miembroDetalleCtrl.miembro)
            .$promise.then(function(data){
              console.log('creado: ', data);
              $mdToast.showSimple('El miembro ' + data.Nombre + ' ha sido creado exitosamente.');
              $state.go('app.miembros.lista');
            });
          }
        }
      };

    }

})();