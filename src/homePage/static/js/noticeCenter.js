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

$(function(){
	let somePage = {
		//获取页面元素
		$e:{
			noticeConTemplateId: $("#noticeCon"), // 消息中心盒子
            noticeItemListTemplateId:$('#noticeItemList-template'),//消息中心模板Id
		},
		//页面初始化函数
		init:function(){         
            this.getnoticeItemData();
            this.events()
        },
        // 获取消息getnoticeItemData中心列表
        getnoticeItemData() {
        	var that=this;
            var obj=[{
                url: site_url.getNoticeTypeList_api,
                data:{},
                needDataEmpty: true,
                callbackDone: function(json) {
                    console.log(json.data)
                    var data=that.dealData(json.data);  
                    generateTemplate(data,that.$e.noticeConTemplateId,that.$e.noticeItemListTemplateId);               
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                }
            }];                        
            $.ajaxLoading(obj); 
        },
        dealData(data) {
            $.each(data, function(a, b) {
                switch(b.mesType) {
                    case 0: b.logoSrc = '/homePage/static/img/home_icon_system@2x.png';break;
                    case 1: b.logoSrc = '/homePage/static/img/home_icon_product@2x.png';break;
                    case 2: b.logoSrc = '/homePage/static/img/home_icon_activity@2x.png';break;
                    case 3: b.logoSrc = '/homePage/static/img/home_icon_transaction@2x.png';break;
                }
                if(b.readStatus == 0) {
                    b.badgeSrc = '/homePage/static/img/home_icon_Badge@2x.png'
                } else {
                    b.badgeSrc = ''
                }
            })
            return data;
        },
        events() {
            var that = this;
            //跳转到各类通知页面 mesType 0系统通知，1产品公告，2活动通知，3交易动态 
            mui("body").on('tap', '.noticeItem' , function(){
                window.location.href = site_url.systemInforms_url + '?mesType=' + $(this).attr('mesType');
            })
        },
	};
	somePage.init();
});