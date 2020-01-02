/*
 * @Author: your name
 * @Date: 2019-12-09 15:53:31
 * @LastEditTime: 2019-12-16 15:46:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\mine\static\js\fundAccountDiagnosisResult.js
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js'); 
// require('@pathCommonJs/components/headBarConfig.js');
require('@pathIncludJs/vendor/mui/mui.picker.min.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function() {

    var fundAccountDiagnosisResult = {
        $e: {
            historyTemplate:$("#historyTemplate"), //申请历史模板
            historyBox:$(".historyBox"), //申请历史容器
            noData: $(".noData")
        },
        gV: {
              dataPickData:"", //基金代码
              fundCode:"", //购买日期
              buyMoney:"",   //购买金额
              applyId:"25",   //需要编辑的基金的申请id
              listData:[],
        },
        init: function() {
            var that = this;
            that.queryAllByCustomerNo();
            that.events();
        },
        queryAllByCustomerNo:function(){
            //所有基金诊断记录
            var that = this;
            var obj = [{
                url:site_url.queryAllByCustomerNo_api,
                needDataEmpty: true,
                callbackDone:function(json){
                    var objData = json.data;
                    
                    for(var key of Object.keys(objData)){
                       var obj = {
                           tital: key,
                           dataList:objData[key]
                       };
                       that.gV.listData.push(obj)
                    }
                    generateTemplate(that.gV.listData, that.$e.historyBox, that.$e.historyTemplate);
                    console.log("9090",that.gV.listData)
                },
                callbackNoData: function() {
                    that.$e.noData.show()
                }
            }];
            $.ajaxLoading(obj);
        },
       events:function(){
            var that = this;
            mui("body").on("mdClick",".historyItemList .right_left",function(){
                $(this).siblings().eq(1).show();
                $(this).hide();
                $(this).parent().siblings().eq(0).show()
            },{
                'htmdEvt': 'applyHistory_01'
            })
            mui("body").on("mdClick",".historyItemList .right_down",function(){
                $(this).siblings().eq(1).show();
                $(this).hide();
                $(this).parent().siblings().eq(0).hide()
            },{
                'htmdEvt': 'applyHistory_02'
            })
            //点击修改跳转到基金申请页面
            mui("body").on("mdClick",".editHistory",function(){
                var id = $(this).attr("applyId");
                window.location.href = site_url.fundAccountDiagnosisResult_url+"?type=edit"+"&applyId="+id
            },{
                'htmdEvt': 'applyHistory_03'
            })
            //点击新增申请
            mui("body").on("mdClick",".addApply",function(){
                window.location.href = site_url.fundAccountDiagnosisResult_url+"?type=add"
            },{
                'htmdEvt': 'applyHistory_04'
            })
         
       },
      
     
      
    };
    fundAccountDiagnosisResult.init();
});