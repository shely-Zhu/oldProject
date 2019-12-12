/*
 * @Author: your name
 * @Date: 2019-11-26 14:42:56
 * @LastEditTime: 2019-11-30 15:43:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\financial\static\js\publicPlacement\demandFinancing.js
 */
require('@pathCommonBase/base.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');

var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
     var regulatory = {
         gv:{
              
         },
         $e:{
            cashListConList:$("#cashListConList"), //模板列
            cashListCon:$("#cashListCon"), //模板容器
            fundValue:$(".topCon .fundValue")
         },
         queryFundTransferAssets:function(){
             var that = this;
             var obj =[{
                 url:site_url.queryFundTransferAssets_api,
                 needDataEmpty:true,
                 callbackDone:function(json){
                     var data = json.data;
                     debugger
                     if(json.status == '0000'){
                       that.$e.fundValue.html(data.enableAssetsStr)
                       data.list.forEach(function(item){
                        item.currentAmountStr = item.currentAmount.toFixed(2);
                        item.currentShareStr = item.currentShare.toFixed(2);
                        item.enableShareStr = item.enableShare.toFixed(2);
                       });
                        
                       that.totalAssets(data.list)
                     }
                   
                 }
             }];
             $.ajaxLoading(obj);
         },
         totalAssets:function(data){
            var that = this;
            var obj =[{
                url:site_url.pofTotalAssets_api,
                needDataEmpty:true,
                callbackDone:function(json){
                    var list = json.data;
                    debugger
                    if(json.status == '0000'){
                    //   that.$e.fundValue.html(data.enableAssetsStr)
                    //   data.list.forEach(function(item){
                    //    item.currentAmountStr = item.currentAmount.toFixed(2);
                    //    item.currentShareStr = item.currentShare.toFixed(2);
                    //    item.enableShareStr = item.enableShare.toFixed(2);
                    //   });
                       // generateTemplate(data.list, that.$e.cashListCon, that.$e.cashListConList);
                    }
                  
                }
            }];
            $.ajaxLoading(obj);
         },
         webinit: function () {
			var that = this;
	        that.queryFundTransferAssets()
		 },
     }
     //调用函数
	regulatory.webinit();


})