(function(){
  "use strict";
  angular.module( 'ControlGymApp.controllers' )
    .controller("ControlGymController", ControlGymController );

    ControlGymController.$inject = ['$scope', '$mdSidenav', '$state', '$sessionStorage'];

    function ControlGymController ($scope, $mdSidenav, $state, $sessionStorage) {
      var controlGymCtrl = this;
      controlGymCtrl.toggleSideNav = function toggleSideNav(){
        $mdSidenav('sideNav').toggle();
      };
      controlGymCtrl.abrirSeccion = function (estado){
        $state.go(estado);
        $mdSidenav('sideNav').toggle();
      };
      controlGymCtrl.logout = function (estado){
        $sessionStorage.$reset();
        $state.go('login');
      };
    }

})();