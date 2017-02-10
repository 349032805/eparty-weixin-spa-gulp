  'use strict';

   angular.module('eparty').service('urlService',function() { 
    
    //开发环境请求地址
    this.baseUrl = "http://192.168.132.101:8082";

    //生产环境请求地址
    //this.baseUrl = "http://";

  }  
);

