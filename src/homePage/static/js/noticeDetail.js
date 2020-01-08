/**
* 消息中心-通知详情
* @author yanruiting 2019-11-18
* 从通知列表页面携带参数   noticeId 消息id mesType 0系统通知，1产品公告，2活动通知，3交易动态
*/
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
	var somePage = {
		//获取页面元素
		$e:{
			noticeDetailConId: $("#informsDetailCon"),
            informsDetailTemplateId:$('#informsDetail-template'),//消息中心模板Id
		},
		//全局变量
		gV:{
            mesType: splitUrl['mesType'], // 1产品公告；2活动通知；3交易动态4;系统通知
            noticeId: splitUrl['noticeId'], // 消息id, 消息列表页跳转时查询
            batchNo: splitUrl['batchNo'], // 批次号，app推送时根据这个查询
        },
		//页面初始化函数
		init:function(){
            var that=this;          
            that.getInformsDetail();
            that.getTitle()
        },
        getTitle:function() {
            switch(this.gV.mesType) {
                case '0': $("#HeadBarpathName").html("系统通知详情");break;
                case '1': $("#HeadBarpathName").html("产品公告详情");break;
                case '2': $("#HeadBarpathName").html("活动通知详情");break;
                case '3': $("#HeadBarpathName").html("交易动态详情");break;
            }
        },
        // 获取通知详情
        getInformsDetail:function() {
        	var that=this;
            if(that.gV.noticeId) {
                var params = {
                    id: that.gV.noticeId
                }
            } else if (that.gV.batchNo) {
                var params = {
                    batchNo: that.gV.batchNo
                }
            }
            var obj=[{
                url: site_url.getNoticeAndTransDynamic_api,
                data:params,
                needLogin: true, //需要判断登录是否过期
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data=json.data; 
                    if(data.mesContent && data.mesContent != '') {
                        $("#informsDetailContent")[0].innerHTML = data.mesContent
                    } else {
                        $(".noData").show()
                        $("#informsDetailBox").hide()
                    }
                    //generateTemplate(data,that.$e.noticeConTemplateId,that.$e.noticeItemListTemplateId);               
                },
                callbackNoData: function() {
                    $(".noData").show()
                    $("#informsDetailBox").hide()
                }
            }];                        
            $.ajaxLoading(obj); 
        },
	};
	somePage.init();
});