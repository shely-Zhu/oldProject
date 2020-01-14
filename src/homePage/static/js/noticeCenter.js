/**
* 消息中心
* @author yanruiting 2019-11-15
*/
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
	var somePage = {
		//获取页面元素
		$e:{
			noticeConTemplateId: $("#noticeCon"), // 消息中心盒子
            noticeItemListTemplateId:$('#noticeItemList-template'),//消息中心模板Id
		},
		//页面初始化函数
		init:function(){         
            this.getnoticeItemData();
            this.events();
        },
        // 获取消息getnoticeItemData中心列表
        getnoticeItemData:function() {
        	var that=this;
            var obj=[{
                url: site_url.getNoticeTypeList_api,
                data:{},
                needLogin: true, //需要判断登录是否过期
                needDataEmpty: true,
                callbackDone: function(json) {
                    console.log(json.data);
                    var data=that.dealData(json.data);  
                    generateTemplate(data,that.$e.noticeConTemplateId,that.$e.noticeItemListTemplateId);               
                }
            }];                        
            $.ajaxLoading(obj); 
        },
        dealData:function(data) {
            $.each(data, function(a, b) {
                var mesType = Number(b.mesType)
                switch(mesType) {
                    case 0: b.logoSrc = '/homePage/static/img/home_icon_system@2x.png'; b.mesTitle = "系统通知";break;
                    case 1: b.logoSrc = '/homePage/static/img/home_icon_product@2x.png'; b.mesTitle = "产品公告";break;
                    case 2: b.logoSrc = '/homePage/static/img/home_icon_activity@2x.png'; b.mesTitle = "活动通知";break;
                    case 3: b.logoSrc = '/homePage/static/img/home_icon_transaction@2x.png'; b.mesTitle = "交易动态";break;
                }
                if(b.readStatus == 0) {
                    b.badgeFlag = true;
                } else {
                    b.badgeFlag = false;
                }
            })
            console.log(data);
            return data;
        },
        events:function() {
            var that = this;
            //跳转到各类通知页面 mesType 0系统通知，1产品公告，2活动通知，3交易动态 
            mui("body").on('mdClick', '.noticeItem' , function(){
                window.location.href = site_url.systemInforms_url + '?mesType=' + $(this).attr('mesType');
            },{
                'htmdEvt': 'notice_00'
            });
        },
	};
	somePage.init();
});