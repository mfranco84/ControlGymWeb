(function(){
  "use strict";
  angular.module('registro.controllers')
    .controller('RegistroController', RegistroController);

    RegistroController.$inject = ['$resource', '$mdToast', '$state', 'gimnasioServicio', 'membresiaServicio', 'administradorServicio'];
    function RegistroController ($resource, $mdToast, $state, gimnasioServicio, membresiaServicio, administradorServicio){
      var registroCtrl = this;
      
      membresiaServicio.query().$promise.then(function(data){
        registroCtrl.membresias = data;
      });

      registroCtrl.loadUsers = function() {
        // Use timeout to simulate a 650ms request.
        return $timeout(function() {

          registroCtrl.membresias;

        }, 650);
      };

      // Verifica que la contrasena sea correcta
      registroCtrl.verificarContrasena = function(){
        registroCtrl.form.confirmar_contrasena.$setValidity('confirmada', true);
        if(registroCtrl.clave !== registroCtrl.claveConfirmacion){
          registroCtrl.form.confirmar_contrasena.$setValidity('confirmada', false);
        }
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
        registroCtrl.enProceso = true;
        gimnasioServicio.save(gimnasio).$promise.then(function(gim){
          console.log('Gimnasio: ', gim);
          administrador.IdGimnasio = gim.IdGimnasio;
          administradorServicio.save(administrador).$promise.then(function(adm){
            console.log('Adminitrador: ', adm);
            $mdToast.showSimple('El gimnasio ' + gim.Nombre + ' ha sido creado exitosamente.');
            $state.go('login');
          });
        });
      };
    }

})();