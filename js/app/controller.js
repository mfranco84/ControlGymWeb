(function(){
  "use strict";
  angular.module( 'ControlGymApp.controllers' )
    .controller("ControlGymController", ControlGymController );

    ControlGymController.$inject = ['$scope', '$mdSidenav', '$state'];

    function ControlGymController ($scope, $mdSidenav, $state) {
      var controlGymCtrl = this;
      controlGymCtrl.toggleSideNav = function toggleSideNav(){
        $mdSidenav('sideNav').toggle();
      };
      controlGymCtrl.abrirSeccion = function (estado){
        $state.go(estado);
        $mdSidenav('sideNav').toggle();
      };
    }

})();