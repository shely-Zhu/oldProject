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
      adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
    },
    gV: { // 全局变量
      projectId: splitUrl['projectId']
    },
    init:function(){
      var that = this;
      that.event()
      that.getData()
      this.getDataLabels()
    },
    getData: function(t) {
      var that = this;
      var obj = [{ // 系统调仓记录列表
          url: site_url.productRecord_api,
          data: {
            "projectId":that.gV.projectId,//项目编号
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
  getDataLabels: function(t) {
    var that = this;
    var obj = [{ // 系统调仓记录列表
        url: site_url.queryReourceLabels_api,
        data: {
          "projectId":that.gV.projectId,//项目编号
        },
        //async: false,
        needDataEmpty: true,
        callbackDone: function(json) {
          var data = json.data
          console.log(data)
          var list = [];
          for(var i=0,len=data.length;i<len;i++){
              if(data[i] === 0){
                data[i] = "风险揭示书"
              }else if(data[i] === 1){
                data[i] = "产品信息"
              }else if(data[i] === 2){
                data[i] = "管理报告"
              }else if(data[i] === 3){
                data[i] = "资金分配"
              }else if(data[i] === 4){
                data[i] = "重要公告及通知"
              }else if(data[i] === 5){
                data[i] = "恒天简报 "
              }
              list.push({
                  a:data[i]
              })
          }
          console.log(list)
          generateTemplate(list,$(".materialWrap"), that.$e.adjustmentTemp);
        },
    }];
    $.ajaxLoading(obj);
},
    event:function(){
      $(".openOff").click(function(){
        if($(".openOff .open").text() != "收起"){
          $(".productCostDetail").addClass("openStyle")
          $(".productCostDetail").removeClass("productCostDetail");
          $(".openOff .open").text("收起")
          $(".openOff .imgWrap .img").addClass("changeImg")
          $(".openOff .imgWrap .img").removeClass("img")
        }else{
          $(".openStyle").addClass("productCostDetail")
          $(".openStyle").removeClass("openStyle");
          $(".openOff .open").text("展开")
          $(".openOff .imgWrap .changeImg").addClass("img")
          $(".openOff .imgWrap .changeImg").removeClass("changeImg")
        }
      }) 
    }
  }
  somePage.init()
})