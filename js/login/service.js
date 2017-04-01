(function(){
  "use strict";
  angular.module('login.services')
    .service('loginServicio', LoginServicio);
    
    LoginServicio.$inject = ['$sessionStorage', '$resource', 'sesionServicio'];

    function LoginServicio ($sessionStorage, $resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/LoginAdministrador', {}, {
        post: {
          method: 'POST',
          headers: {},
          transformRequest: function (data) {
            data.grant_type = 'password';
            return angular.toJson(data);
          },
          transformResponse: function (data) {
            data = angular.fromJson(data);
            if (data.Token) {
              $sessionStorage.auth = data.Token;
              $sessionStorage.usuario = data;
            }
            return data;
          },
        },
      });

      return service;
    }
})();