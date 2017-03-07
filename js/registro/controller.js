(function(){
  "use strict";
  angular.module('registro.controllers')
    .controller('RegistroController', RegistroController);

    RegistroController.$inject = ['$resource', '$sessionStorage', '$state', 'gimnasioServicio', 'membresiaServicio'];
    function RegistroController ($resource, $sessionStorage, $state, gimnasioServicio, membresiaServicio){
      var registroCtrl = this;
      
      membresiaServicio.query().$promise.then(function(data){
        console.log('membresias: ', data);
        registroCtrl.membresias = data;
      });

      registroCtrl.loadUsers = function() {
        // Use timeout to simulate a 650ms request.
        return $timeout(function() {

          registroCtrl.membresias;

        }, 650);
      };

      registroCtrl.crear = function () {
        var registroData = {
          Correo: registroCtrl.Correo,
          Clave: registroCtrl.Clave
        };
        gimnasioServicio.save(registroData).$promise.then(function(data){
          console.log('data: ', data);
        });
      };
    }

})();