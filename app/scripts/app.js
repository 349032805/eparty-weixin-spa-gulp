'use strict';

angular
  .module('eparty', [
    'ui.router',
    'ngMessages'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/index");
     $stateProvider
        .state("index", {
            url: "/index",
            templateUrl: "/views/index.html",
            controller: 'IndexCtrl'
        })
        .state("test", {
            url: "/test",
            templateUrl: "/views/test.html",
            controller: 'TestCtrl'
        })
         .state("waiterRanking", {
            url: "/waiterRanking",
            templateUrl: "/views/waiterRanking.html",
            controller: 'WaiterRankingCtrl'
        })
          .state("hasOrder", {
            url: "/hasOrder",
            templateUrl: "/views/hasOrder.html",
            controller: 'HasOrderCtrl'
        });
       
        $urlRouterProvider.otherwise("/index");
  });
