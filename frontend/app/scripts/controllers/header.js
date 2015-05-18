'use strict';

/**
 * @ngdoc function
 * @name angJwtApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the angJwtApp
 */
angular.module('angJwtApp')
  .controller('HeaderCtrl', function ($scope, authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
  });
