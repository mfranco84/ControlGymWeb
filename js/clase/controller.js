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

    ClaseDetalleController.$inject = ['$stateParams', 'claseServicio'];
    function ClaseDetalleController ($stateParams, claseServicio){
      var claseDetalleCtrl = this;
      claseDetalleCtrl.clase = null;
      
      if ($stateParams && $stateParams.clase) {
      console.log($stateParams.clase);
      claseDetalleCtrl.clase = $stateParams.clase;
    }

      claseDetalleCtrl.abrirClase = function (idClase) {
        $state.go('app.clases.detalle');
      };
    }

})();