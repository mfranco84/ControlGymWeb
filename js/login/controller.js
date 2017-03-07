(function(){
  "use strict";
  angular.module('login.controllers')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$resource', '$sessionStorage', '$state', 'loginServicio'];
    function LoginController ($resource, $sessionStorage, $state, loginServicio){
      var loginCtrl = this;
      
      loginCtrl.autenticar = function () {
        var loginData = {
          Correo: loginCtrl.Correo,
          Clave: loginCtrl.Clave
        };
        loginServicio.post(loginData).$promise.then(function(data){
          console.log('data: ', data);
          console.log('$sessionStorage: ', $sessionStorage);
        });
      };
    }

})();