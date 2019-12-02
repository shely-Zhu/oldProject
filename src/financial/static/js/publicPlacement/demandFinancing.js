/*
 * @Author: your name
 * @Date: 2019-11-26 14:42:56
 * @LastEditTime: 2019-11-30 15:43:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\financial\static\js\publicPlacement\demandFinancing.js
 */
require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
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

         },
         queryFundTransferAssets:function(){
             var that = this;
             var obj =[{
                 url:site_url.queryFundTransferAssets_api,
                 needDataEmpty:true,
                 callbackDone:function(json){
                     console.log("88888",json)
                     var data = json.data;
                     if(data){
                         console.log("成功")
                        generateTemplate(data, that.$e.cashListCon, that.$e.cashListConList);
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