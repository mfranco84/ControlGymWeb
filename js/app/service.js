(function(){
  "use strict";
  angular.module('ControlGymApp.services')
    .service('sesionServicio', SessionServicio);
    SessionServicio.$inject = ['$resource'];

    function SessionServicio ($resource){
      var baseUrl = 'http://localhost:50639/api';
      var baseUrl = 'http://controlgymapi.azurewebsites.net/api';
      var service = $resource(baseUrl + '/miembro/:id');

      var obtenerUrlBase = function(){
        var baseUrl = 'http://controlgymapi.azurewebsites.net/api';
        return 'http://localhost:50639/api';
      };

      return {
        obtenerUrlBase : obtenerUrlBase
      };
    }
})();