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
    init:function(){
      var that = this;
    //   that.event()
    //   that.getData()
    },
    getData: function(t) {
      var that = this;
      var obj = [{ // 系统调仓记录列表
          url: site_url.productRecord_api,
          data: {
            "projectId":"10103",//项目编号
          },
          //async: false,
          needDataEmpty: true,
          callbackDone: function(json) {
            console.log(json.data)
            var data = json.data
            $(".productName").text(data.productName)
            $(".investTactics").text(data.investTactics)
            $(".productTerms").text(data.productTerms)
            $(".custodianUser").text(data.custodianUser)
            $(".custodianOrg").text(data.custodianOrg)
            $(".shareRegisterOrg").text(data.shareRegisterOrg)
            $(".productRecord").text(data.productRecord)
            $(".riskLevel").text(data.riskLevel)
            $(".newScale").text(data.newScale)
            $(".productCharges").text(data.productCharges)
          },
      }];
      $.ajaxLoading(obj);
  },
    event:function(){
    //   $(".openOff").click(function(){
    //     if($(".openOff .open").text() != "收起"){
    //       $(".productCostDetail").addClass("openStyle")
    //       $(".productCostDetail").removeClass("productCostDetail");
    //       $(".openOff .open").text("收起")
    //       $(".openOff .imgWrap .img").addClass("changeImg")
    //       $(".openOff .imgWrap .img").removeClass("img")
    //     }else{
    //       $(".openStyle").addClass("productCostDetail")
    //       $(".openStyle").removeClass("openStyle");
    //       $(".openOff .open").text("展开")
    //       $(".openOff .imgWrap .changeImg").addClass("img")
    //       $(".openOff .imgWrap .changeImg").removeClass("changeImg")
    //     }
    //   }) 
    }
  }
  somePage.init()
})