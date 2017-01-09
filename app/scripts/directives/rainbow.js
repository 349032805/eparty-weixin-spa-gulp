  'use strict';

  angular.module('eparty')
    .directive('rainbow', function () {
      return {
        restrict: 'E',
      	template: '<div>这是自定义指令!</div>',
      	 // templateUrl: 'views/xxx.html'
      	link:postLink
      };

	     function postLink(scope, element, attrs) {
	      element.css("color", attrs.color);
	    }

    });