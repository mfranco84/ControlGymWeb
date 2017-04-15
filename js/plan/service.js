(function(){
  "use strict";
  angular.module('plan.services')
    .service('planServicio', PlanServicio);
    
    PlanServicio.$inject = ['$resource', 'sesionServicio'];

    function PlanServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/PlanNutricional/:IdPlanNutricional', {
          IdPlanNutricional: '@IdPlanNutricional',
        },
        {
        put: {
          method: 'PUT',
          //params: {IdPlanNutricional: '@IdPlanNutricional'} //additional parameters
        },
        getDetalles: {
          method: 'GET',
          url: sesionServicio.obtenerUrlBase() + '/PlanNutricional/:IdPlanNutricional/PlanNutricionalDetalle',
          isArray: true,
          params: {IdPlanNutricional: '@IdPlanNutricional'},
        }
      });

      return service;
    }

  angular.module('plan.services')
    .service('planNutricionalDetalleServicio', PlanNutricionalDetalleServicio);
    PlanNutricionalDetalleServicio.$inject = ['$resource', 'sesionServicio'];
    function PlanNutricionalDetalleServicio ($resource, sesionServicio){
      var service = $resource(sesionServicio.obtenerUrlBase() + '/PlanNutricionalDetalle/:IdPlanNutricionalDetalle', {
          IdPlanNutricionalDetalle: '@IdPlanNutricionalDetalle',
        },
        {
        put: {
          method: 'PUT',
        },
        delete: {
          method: 'DELETE',
        },
      });

      return service;
    }
})();