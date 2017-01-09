'use strict';

angular.module('eparty')
  .controller('TestCtrl', function ($scope,$http,$location,$interval,$state,urlService) {

	 $scope.goPage = function ($event) {
        $scope.page = $event.target.getAttribute('data');
        // $scope.page = $event.target.innerText;
        // $scope.page = $event.target.innerHTML;
        alert($scope.page);
    }

    $scope.getModelValue = function () {
     var hello = $scope.hello;
     alert(hello);
   }

    //不建议使用
    //  $scope.getValue = function () {

    //  var targetEle = angular.element("#targetEle").val();
    //  var targetEle2 = angular.element("#targetEle2").text();
    //  alert(targetEle);
    //  alert(targetEle2);
    // }


     $http({
          method:'GET',
          url:urlService.baseUrl+'/api/v1/stores/6'
          // params:{},
          // responseType:'json'
      }).then(function(res){
      console.log(res.statusText);
      console.log(res.data);
        }, function(res){
        console.log("fail...");
      });

      $http.post(urlService.baseUrl+'/api/v1/stores/6',{
          // params:{},
          // responseType:'json'
      }).success(function(res){
          console.log(res);
        }).error(function(res){
        console.log("fail...");
      });


        // 在jsonp中，url的最后必须严格带上“&callback=JSON_CALLBACK”，而且名字不能改
    // var url = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1&callback=JSON_CALLBACK";
    // $http.jsonp(url)
    //    .success(function (data) { // 在这里定义JSON_CALLBACK。其实与GET差不多
    //         console.log('jsonp:', data)
    // })
    // .error(function (err) {
    //     console.log('error', err);
    // });

      //   $http({
      //     method:'POST',
      //     url:urlService.getBaseUrl()+'/annehttp/report/detail',
      //     // params:{},
      //     data:{
      //      "storeId":3,
      //       "startDate":"2016-11-01",
      //       "reportType":2
      //     },
      // }).then(function(resp){
      //    console.log(resp.statusText);
      //   }, function(resp){
      //    console.log("fail...");
      // });


      // $scope.user.push({
      //   name:'fan',
      //   age:20,
      //   sex:0
      // });

      //获取参数
    $scope.getParams = function () {
      var id  = $location.search().id;
      var tableCode  = $location.search().tableCode;
      alert(id);
      alert(tableCode);
    }

    //js跳转页面
     $scope.gotoPage = function () {
         $state.go('index');
         // window.location.href="#/index";
         // $location.path('/index')
    }

    //短信验证码倒计时
    $scope.getSmsCode = function() {
      $scope.smsCodeCountDown = 10;
      var countDown = $interval(function() {
        $scope.smsCodeCountDown--;
        if ($scope.smsCodeCountDown <= 0) {
          $interval.cancel(countDown);
        }
      }, 1000);
    }



  });
