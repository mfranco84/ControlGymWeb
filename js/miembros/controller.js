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

    MiembroDetalleController.$inject = ['$stateParams', 'miembroServicio'];
    function MiembroDetalleController ($stateParams, miembroServicio){
      var miembroDetalleCtrl = this;
      miembroDetalleCtrl.miembro = null;
      
      if ($stateParams && $stateParams.miembro) {
      console.log($stateParams.miembro);
      miembroDetalleCtrl.miembro = $stateParams.miembro;
    }

      miembroDetalleCtrl.abrirMiembro = function (idMiembro) {
        $state.go('app.miembros.detalle');
      };
    }

})();