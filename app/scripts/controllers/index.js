'use strict';

angular.module('eparty')
  .controller('IndexCtrl', function ($scope,$timeout,$rootScope) {
  	 // setTimeout(function() {
  	 // 	.....
    // }, 2000);


  	 if(!$rootScope.showTimes){
  	 	$timeout(function() {
         $rootScope.showTimes = 1;
        }, 2000);
  	}
    
  });
