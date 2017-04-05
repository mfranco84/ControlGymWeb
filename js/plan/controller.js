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
          var planSelected = planesCtrl.plans.find(function(item){
            return item.IdPlanEjercicio === IdPlan;
          });
          $state.go('app.planes.detalle', {id: $stateParams.id, plan: planSelected});
        } else {
          $state.go('app.planes.detalle', {id: $stateParams.id});
        }
      };
    }

    PlanDetalleController.$inject = ['$state', '$stateParams', '$sessionStorage', 'planServicio', 'rutinaServicio'];
    function PlanDetalleController ($state, $stateParams, $sessionStorage, planServicio, rutinaServicio){
      var planDetalleCtrl = this;
      planDetalleCtrl.rutinas = [];
      planDetalleCtrl.plan = {
        IdMiembro: $stateParams.id,
      };
      
      if ($stateParams && $stateParams.plan) {
        planDetalleCtrl.plan = $stateParams.plan;
        var fechaI = planDetalleCtrl.plan.FechaInicio.replace(new RegExp('-', 'g'), '/').substring(0, 10);
        planDetalleCtrl.plan.FechaInicio = new Date(fechaI);
        var fechaF = planDetalleCtrl.plan.FechaFin.replace(new RegExp('-', 'g'), '/').substring(0, 10);
        planDetalleCtrl.plan.FechaFin = new Date(fechaF);
        planServicio.getRutinas({IdPlan:planDetalleCtrl.plan.IdPlanEjercicio}).$promise.then(function(data){
          planDetalleCtrl.rutinas = data;
        });
      }

      planDetalleCtrl.agregarRutina = function () {
        planDetalleCtrl.rutinas.push({
          IdPlanEjercicio: planDetalleCtrl.plan.IdPlanEjercicio,
          NombreRutina: "",
          DetalleRutina: ""
        });
      };

      planDetalleCtrl.guardarPlan = function () {
        if (planDetalleCtrl.form.$valid) {
          if (planDetalleCtrl.plan.IdPlanEjercicio) {
            planServicio.put({IdPlan:planDetalleCtrl.plan.IdPlanEjercicio}, planDetalleCtrl.plan)
            .$promise.then(function(data){
              console.log('actualizado: ', data);
              saveRutinas(data.IdPlanEjercicio);
            });
          } else {
            planServicio.save(planDetalleCtrl.plan)
            .$promise.then(function(data){
              console.log('creado: ', data);
              saveRutinas(data.IdPlanEjercicio);
            });
          }
        }
      };

      function saveRutinas (IdPlanEjercicio) {
        planDetalleCtrl.rutinas.forEach(function(rutina){
          rutina.IdPlanEjercicio = IdPlanEjercicio;
          if (rutina.IdRutina) {
            rutinaServicio.put({IdRutina:rutina.IdRutina}, rutina);
            console.log('put :' + rutina.IdRutina);
          } else {
            console.log('post:');
            rutinaServicio.save(rutina);
          }
        });
        // $state.go('app.miembros.lista');
      }

    }

})();