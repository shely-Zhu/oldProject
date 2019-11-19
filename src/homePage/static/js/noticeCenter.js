/**
* 消息中心
* @author yanruiting 2019-11-15
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

/*$(function(){
	let somePage = {
		//获取页面元素
		$e:{
			noticeConTemplateId: $("#noticeCon")
            noticeItemListTemplateId:$('#noticeItemList-template'),//消息中心模板Id
		},
		//全局变量
		gV:{},
		//页面初始化函数
		init:function(){
            var that=this;          
            that.getnoticeItemData();
        },
        // 获取消息中心列表
        getnoticeItemData() {
        	var that=this;
            var obj=[{
                url: site_url.findBenefitByLevel_api,
                data:{},
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data=json.data; 
                    generateTemplate(data,that.$e.noticeConTemplateId,that.$e.noticeItemListTemplateId);               
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                }
            }];                        
            $.ajaxLoading(obj); 
        },
	};
	somePage.init();
});*/