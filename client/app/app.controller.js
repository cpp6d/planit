(function() {
  'use strict';

  angular
    .module('app')
    .controller('ParentController', ParentController);

  ParentController.$inject = ['$scope', '$state'];

  function ParentController($scope, $state) {
    var parent = this;
    $scope.test = 'test';
    $scope.selectedActivity = 'booger';
    $scope.uuid = 'poop';

    $scope.$watch('selectedActivity', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.$broadcast('selectedActivityChange', { val: newVal });
      }
    });

    $scope.$watch('uuid', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.$broadcast('uuidChange', { val: newVal });
      }
    });

    $scope.console = function() {
      console.log('$scope.selectedActivity: ', $scope.selectedActivity);
    }

    console.log('scope', $scope);
  }
})();
