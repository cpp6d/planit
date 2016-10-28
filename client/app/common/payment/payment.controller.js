(function() {
 'use strict';

  angular
    .module('app.payment')
    .controller('PaymentController', PaymentController);

  PaymentController.$inject = ['$scope', '$state', 'paymentService'];

  function PaymentController($scope, $state, paymentService) {
    var vm = this;
    vm.paymentInit = paymentService.paymentInit;

  }
})();
