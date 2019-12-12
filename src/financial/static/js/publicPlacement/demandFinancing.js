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
              list:[]
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
                     if(json.status == '0000'){
                        that.$e.fundValue.html(data.enableAssetsStr)
                        that.gv.list = data.list
                        that.gv.list.forEach(function(item){
                            item.currentAmountStr = item.currentAmount.toFixed(2);
                            item.currentShareStr = item.currentShare.toFixed(2);
                            item.enableShareStr = item.enableShare.toFixed(2);
                            that.newfundDetails(item)
                        });
                        setTimeout(function(){
                            $(".listLoading").hide()
                            generateTemplate(that.gv.list, that.$e.cashListCon, that.$e.cashListConList);
                        },2000)
                     }
                   
                 }
             }];
             $.ajaxLoading(obj);
         },
         newfundDetails:function(item){
            var that = this;
            var obj =[{
                url:site_url.newfundDetails_api,
                data: {
					"fundCode":item.fundCode
				},
				needDataEmpty: true,
                callbackDone:function(json){
                    var data = json.data;
                    if(json.status == '0000'){
                        item.annYldRat = data.annYldRat + '%'
                    }
                }
            }];
            $.ajaxLoading(obj);
         },
         totalAssets:function(){
            var that = this;
            var obj =[{
                url:site_url.pofTotalAssets_api,
                needDataEmpty:true,
                callbackDone:function(json){
                    var list = json.data;
                    if(json.status == '0000'){
                    }
                  
                }
            }];
            $.ajaxLoading(obj);
         },
         webinit: function () {
            var that = this;
            $(".listLoading").show()
	        that.queryFundTransferAssets()
		 },
     }
     //调用函数
	regulatory.webinit();


})