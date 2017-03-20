(function(){
  "use strict";
  angular.module('clase.services')
    .service('claseServicio', ClaseServicio);
    ClaseServicio.$inject = ['$resource'];

    function ClaseServicio ($resource){
      var baseUrl = 'http://localhost:50639/api';
      // var baseUrl = 'http://controlgymapi.azurewebsites.net/api';
      var service = $resource(baseUrl + '/clase/:id');

      return service;
    }
})();