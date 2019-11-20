/*
 * @page:产品档案
 * @Author: wangjiajia
 */
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function() {
  var somePage = {
    $e: {
  
    },
    gV: { // 全局变量
       
    },

  }
  $(".openOff").click(function(){
      if($(".openOff").text() != "收起"){
        $(".productCostDetail").addClass("openStyle")
        $(".productCostDetail").removeClass("productCostDetail");
        $(".openOff").text("收起")
      }else{
        $(".openStyle").addClass("productCostDetail")
        $(".openStyle").removeClass("openStyle ");
        $(".openOff").text("展开")
      }
  }) 
})