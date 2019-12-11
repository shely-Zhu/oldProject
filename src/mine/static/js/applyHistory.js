/*
 * @Author: your name
 * @Date: 2019-12-09 15:53:31
 * @LastEditTime: 2019-12-10 21:03:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\mine\static\js\fundAccountDiagnosisResult.js
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathIncludJs/vendor/mui/mui.picker.min.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');


$(function() {

    var fundAccountDiagnosisResult = {
        $e: {
            holdingBox: $('#holdingBox'), // 账户持仓情况
            holdingBoxTemp: $('#holdingBox-template'), // 账户持仓情况模板
            diagnosis:$("#diagnosis-box") //诊断结论
        },
        gV: {
              dataPickData:"", //基金代码
              fundCode:"", //购买日期
              buyMoney:"",   //购买金额
        },
        init: function() {
            var that = this;

            that.events();
        },
       
       events:function(){
            var that = this;
            mui("body").on("mdClick",".historyItemList .right_left",function(){
                $(this).siblings().eq(1).show();
                $(this).hide();
                $(this).parent().siblings().eq(0).show()
            })
            mui("body").on("mdClick",".historyItemList .right_down",function(){
                $(this).siblings().eq(1).show();
                $(this).hide();
                $(this).parent().siblings().eq(0).hide()
            })
            //点击修改跳转到基金申请页面
            mui("body").on("mdClick",".editHistory",function(){
                window.location.href = site_url.fundAccountDiagnosisResult_url
            })
            //点击新增申请
            mui("body").on("mdClick",".addApply",function(){
                window.location.href = site_url.fundAccountDiagnosisResult_url
            })
         
       },
      
     
      
    };
    fundAccountDiagnosisResult.init();
});