/**
* 消息中心
* @author yanruiting 2019-11-18
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

//var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
	let somePage = {
		//获取页面元素
		$e:{
			noticeDetailConId: $("#informsDetailCon"),
            informsDetailTemplateId:$('#informsDetail-template'),//消息中心模板Id
		},
		//全局变量
		gV:{
            mesType: splitUrl['mesType'], // 1产品公告；2活动通知；3交易动态4;系统通知
            noticeId: splitUrl['noticeId'],
        },
		//页面初始化函数
		init:function(){
            var that=this;          
            that.getInformsDetail();
            that.getTitle()
        },
        getTitle() {
            switch(this.gV.mesType) {
                case '1': $("#HeadBarpathName").html("产品公告详情");break;
                case '2': $("#HeadBarpathName").html("活动通知详情");break;
                case '3': $("#HeadBarpathName").html("交易动态详情");break;
                case '4': $("#HeadBarpathName").html("系统通知详情");break;
            }
        },
        // 获取通知详情
        getInformsDetail() {
        	var that=this;
            if(that.gV.mesType == 4) { // 消息通知列表
                var ajaxUrl = site_url.getSystemNotification_api
            } else if (that.gV.mesType == 1 || that.gV.mesType == 2 || that.gV.mesType == 3) { // 非通知消息列表
                var ajaxUrl = site_url.getNoticeAndTransDynamic_api
            }
            var obj=[{
                url: ajaxUrl,
                data:{
                    id: that.gV.noticeId
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data=json.data; 
                    $("#informsDetailContent")[0].innerHTML = data.mesContent
                     //generateTemplate(data,that.$e.noticeConTemplateId,that.$e.noticeItemListTemplateId);               
                },
                callbackFail: function(json) {
                    //tipAction(json.message);
                }
            }];                        
            $.ajaxLoading(obj); 
        },
	};
	somePage.init();
});