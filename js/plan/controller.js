(function(){
  "use strict";
  angular.module('plan.controllers')
    .controller('PlanesController', PlanesController)
    .controller('PlanDetalleController', PlanDetalleController);

    PlanesController.$inject = ['$state', '$stateParams', 'miembroServicio'];
    function PlanesController ($state, $stateParams, miembroServicio){
      var planesCtrl = this;
      planesCtrl.planes = [];
      
      miembroServicio.getPlanes({IdMiembro:$stateParams.id}).$promise.then(function(data){
        planesCtrl.planes = data;
      });

      planesCtrl.abrirPlanDetalles = function (IdPlan) {
        if (IdPlan) {
          var planSelected = planesCtrl.planes.find(function(item){
            return item.IdPlanNutricional === IdPlan;
          });
          $state.go('app.planes.detalle', {id: $stateParams.id, plan: planSelected});
        } else {
          $state.go('app.planes.detalle', {id: $stateParams.id});
        }
      };
    }

    PlanDetalleController.$inject = ['$state', '$stateParams', '$sessionStorage', '$mdToast', 'planServicio', 'planNutricionalDetalleServicio'];
    function PlanDetalleController ($state, $stateParams, $sessionStorage, $mdToast, planServicio, planNutricionalDetalleServicio){
      var planDetalleCtrl = this;
      planDetalleCtrl.detalles = [];
      planDetalleCtrl.plan = {
        IdMiembro: $stateParams.id,
      };
      var idDetallesRemover = [];
      
      if ($stateParams && $stateParams.plan) {
        planDetalleCtrl.plan = $stateParams.plan;
        var fechaI = planDetalleCtrl.plan.FechaInicio.replace(new RegExp('-', 'g'), '/').substring(0, 10);
        planDetalleCtrl.plan.FechaInicio = new Date(fechaI);
        var fechaF = planDetalleCtrl.plan.FechaFin.replace(new RegExp('-', 'g'), '/').substring(0, 10);
        planDetalleCtrl.plan.FechaFin = new Date(fechaF);
        planServicio.getDetalles({IdPlanNutricional:planDetalleCtrl.plan.IdPlanNutricional}).$promise.then(function(data){
          planDetalleCtrl.detalles = data;
        });
      }

      planDetalleCtrl.agregarDetalle = function () {
        planDetalleCtrl.detalles.push({
          IdPlanNutricional: planDetalleCtrl.plan.IdPlanNutricional,
        });
      };

      planDetalleCtrl.eliminarDetalle = function (detalle) {
        if (detalle.IdPlanNutricionalDetalle) {
          idDetallesRemover.push(detalle.IdPlanNutricionalDetalle);
        }
        planDetalleCtrl.detalles = planDetalleCtrl.detalles.filter(function(item){
          return detalle.Detalle !== item.Detalle;
        });
      };

      planDetalleCtrl.guardarPlan = function () {
        if (planDetalleCtrl.form.$valid) {
          planDetalleCtrl.enProceso = true;
          if (planDetalleCtrl.plan.IdPlanNutricional) {
            planServicio.put({IdPlanNutricional:planDetalleCtrl.plan.IdPlanNutricional}, planDetalleCtrl.plan)
            .$promise.then(function(data){
              console.log('actualizado: ', data);
              saveDetalles(data.IdPlanNutricional);
            });
          } else {
            planServicio.save(planDetalleCtrl.plan)
            .$promise.then(function(data){
              console.log('creado: ', data);
              saveDetalles(data.IdPlanNutricional);
            });
          }
        }
      };

      function saveDetalles (IdPlanNutricional) {
        planDetalleCtrl.detalles.forEach(function(detalle){
          detalle.IdPlanNutricional = IdPlanNutricional;
          if (detalle.IdPlanNutricionalDetalle) {
            planNutricionalDetalleServicio.put({IdPlanNutricionalDetalle:detalle.IdPlanNutricionalDetalle}, detalle);
            console.log('put :' + detalle.IdPlanNutricionalDetalle);
          } else {
            console.log('post:');
            planNutricionalDetalleServicio.save(detalle);
          }
        });
        removerDetalles();        
        $mdToast.showSimple('El plan nutricional ' + planDetalleCtrl.plan.Nombre + ' ha sido guardado exitosamente.');
        $state.go('app.miembros.detalle', {id: planDetalleCtrl.plan.IdMiembro});
      }

      function removerDetalles () {
        idDetallesRemover.forEach(function(idDetalle){
          planNutricionalDetalleServicio.delete({IdPlanNutricionalDetalle:idDetalle});
        });
      }

    }

})();