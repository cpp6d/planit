(function() {
  'use strict';

  angular
    .module('app')
    .controller('ParentController', ParentController);

  ParentController.$inject = ['$scope', '$state'];

  function ParentController($scope, $state) {
    var parent = this;
    $scope.uuid = '';
    $scope.selectedActivity = '';
    $scope.selectedExpediaActivity = '';
    $scope.arrivalDate = new Date();
    $scope.departureDate = new Date();

    /* *
    * ParentController
    *   - $scope.uuid is set by AuthController
    *   - $scope.selectedActivity is set by ActivityController
    *   - $scope.selectedExpediaActivity is set by ActivityController
    *
    * ParentController watches for changes in these values and then broadcasts
    * these changes to its children.
    *
    * ActivityController and ItineraryController listen for changes in $scope.uuid.
    * ItineraryController listens for changes in $scope.selectedActivity and $scope.selectedExpediaActivity.
    * */

    $scope.$watch('uuid', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.$broadcast('uuidChange', { val: newVal });
      }
    });

    $scope.$watch('selectedActivity', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.$broadcast('selectedActivityChange', { val: newVal });
      }
    });

    $scope.$watch('selectedExpediaActivity', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.$broadcast('selectedExpediaActivityChange', { val: newVal });
      }
    });
  }
})();
