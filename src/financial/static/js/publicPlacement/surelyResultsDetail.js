/**
* 定投结果 
* @author wangjiajia 2019-11-23
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var commonElasticLayer = require('@pathCommonJs/components/commonElasticLayer.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {
    var somePage = {
      $e: {
    
      },  
      gV: { // 全局变量
         
      },
      init:function(){
        var that = this;
        that.event()
        var obj={
          title:"网络不给力，请稍后重试",
          yesTxt:'重试',
          noTxt:"取消"
        }
        commonElasticLayer(obj,that.objcallback)
      },
      event:function(){
        var a = 1;
        if(a == 2){
            $(".resultTop").hide()
            $(".resultTopTwo").show()
            $(".changeNone").removeClass("changeNone")
        }
      },
      objcallback(json){
        console.log(json)
      }
    }
    somePage.init()
  })