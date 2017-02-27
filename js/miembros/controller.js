(function(){
  "use strict";
  angular.module('miembros.controllers')
    .controller('MiembrosController', MiembrosController);
    MiembrosController.$inject = ['miembroServicio'];

    function MiembrosController (miembroServicio){
      var miembrosCtrl = this;
      
      miembroServicio.query().$promise.then(function(data){
          console.log(data);
      });
    }
})();