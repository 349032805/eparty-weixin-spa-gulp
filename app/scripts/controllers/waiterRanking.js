'use strict';

angular.module('eparty')
  .controller('WaiterRankingCtrl', function ($scope) {
    $scope.helloGril = "你好,妹纸";

  	var list = [
   {
     "name": "张三",
     "sex": 0,
     "score": 80,
     "date": 1483523354510
   },
   {
     "name": "尼古拉斯赵四",
     "sex": 0,
     "score": 99,
     "date": 1483423254510
   },
   {
     "name": "王五",
     "score": 76,
     "sex": 1,
     "date": 1483723454510
   },
    {
     "name": "田七",
     "score": 77,
     "sex": 1,
     "date": 1483926354510
   }
  ];

  $scope.list = list;

  });
