/*
 * @page:产品档案
 * @Author: wangjiajia
 */

require('@pathIncludJs/base.js');

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
            // "projectId":"10103",//项目编号
           
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
            $(".productCostDetail").text(data.productCharges)
            var rowNum=Math.round($(".productCostDetail").height()/parseFloat($(".productCostDetail").css('line-height')));
            if(rowNum>=4){
              $(".openOff").show()
            }
          },
      }];
      $.ajaxLoading(obj);
  },
  getDataLabels: function(t) {
    var that = this;
    var obj = [{ // 系统调仓记录列表
        url: site_url.queryReourceList_api,
        data: {
         "projectId":that.gV.projectId,//项目编号
          //"projectId":"21970",//项目编号
          "fileType":"19,20,10,22,1",
        },
        contentTypeSearch: true,
        //async: false,
        needDataEmpty: true,
        callbackDone: function(json) {
          var data = json.data
          if(data.length >0){
            $(".productCostTitleOne").show()
          }
          console.log(data)
          generateTemplate(data,$(".materialWrap"), that.$e.adjustmentTemp);
        },
    }];
    $.ajaxLoading(obj);
},
    event:function(){
      mui("body").on('tap','.open',function(e){
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
      mui("body").on('tap','.materialContent',function(e){
        console.log($(this).attr('data-fileUrl'))
        window.location.href=`/${$(this).attr('data-fileUrl')}`
			})
    }
  }
  somePage.init()
})