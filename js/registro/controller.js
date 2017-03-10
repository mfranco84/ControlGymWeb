(function(){
  "use strict";
  angular.module('registro.controllers')
    .controller('RegistroController', RegistroController);

    RegistroController.$inject = ['$resource', '$sessionStorage', '$state', 'gimnasioServicio', 'membresiaServicio', 'administradorServicio'];
    function RegistroController ($resource, $sessionStorage, $state, gimnasioServicio, membresiaServicio, administradorServicio){
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
        var gimnasio = {
          IdMembresia: registroCtrl.membresia.IdMembresia,
          Nombre: registroCtrl.nombreGimnasio,
        };

        var administrador = {
          IdGimnasio: null,
          Correo: registroCtrl.correo,
          Clave: registroCtrl.clave,
          Nombre: registroCtrl.nombreAdministrador,
          Telefono: registroCtrl.telefono,
          CedulaJuridica: registroCtrl.identificacion,
          Direccion: registroCtrl.direccion,
        };
        gimnasioServicio.save(gimnasio).$promise.then(function(gim){
          console.log('Gimnasio: ', gim);
          administrador.IdGimnasio = gim.IdGimnasio;
          administradorServicio.save(administrador).$promise.then(function(adm){
            console.log('Adminitrador: ', adm);

          });
        });
      };
    }

})();