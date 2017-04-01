(function(){
  "use strict";
  angular.module('ControlGymApp.services')
    .service('sesionServicio', SessionServicio);
    SessionServicio.$inject = [];

    function SessionServicio (){

      var obtenerUrlBase = function(){
        var baseUrl = 'http://controlgymapi.azurewebsites.net/api';
        // var baseUrl = 'http://localhost:50639/api';
        return baseUrl;
      };

      return {
        obtenerUrlBase : obtenerUrlBase
      };
    }
})();