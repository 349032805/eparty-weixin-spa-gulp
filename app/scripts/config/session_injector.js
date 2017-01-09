  'use strict';

angular.module('eparty').factory('sessionInjector', ['sessionService', function(sessionService) {
    var sessionInjector = {
        request: function(config) {
            if (!sessionService.isAnonymus()) {
                config.headers['x-session-token'] = sessionService.getAccessToken();
            }
            return config;
        }
    };
    return sessionInjector;
}]);
angular.module('eparty').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);