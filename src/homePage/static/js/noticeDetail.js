/**
* 消息中心-通知详情
* @author yanruiting 2019-11-18
* 从通知列表页面携带参数   noticeId 消息id mesType 0系统通知，1产品公告，2活动通知，3交易动态
*/
require('@pathCommonBase/base.js');
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
                case '0': $("#HeadBarpathName").html("系统通知详情");break;
                case '1': $("#HeadBarpathName").html("产品公告详情");break;
                case '2': $("#HeadBarpathName").html("活动通知详情");break;
                case '3': $("#HeadBarpathName").html("交易动态详情");break;
            }
        },
        // 获取通知详情
        getInformsDetail() {
        	var that=this;
            var obj=[{
                url: site_url.getNoticeAndTransDynamic_api,
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