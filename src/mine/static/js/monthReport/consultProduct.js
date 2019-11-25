/**
* 月度报告详情页我
* @author zhangyanping 2019-11-19
*/

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

var monthReportDetail = {
	
	init: function(){  //初始化函数
		var that = this;
		
		//事件监听
		that.events();
	},
	events: function(){  //绑定事件
		var that = this;
		mui("body").on('tap', '.submitBtn' , function(){

			that.getElements.productName = $(this).attr('productName');

			var obj = [{
				
				url: site_url.reportContactNow_api,
				data: {
					hmac:"",
					params:{
						empNo: that.getElements.plannerNum,  //理顾工号
						empName: that.getElements.plannerName,  // 理顾姓名
						productName: that.getElements.productName,  // 产品名称
					}
				},
				needLogin: true, //需要判断登录情况
				needDataEmpty: false,//不需要判断data是否为空
				callbackDone: function(json){
					$(".contactNow").hide();
					$(".mask").hide();
					$(".btns .error-tip").html('');
					$('.btns .save').removeClass("btn_grey").attr('disabled',false);
				
				},
				callbackFail: function(json){
					
				},
						
			}]
			$.ajaxLoading(obj);

		})
	},
}

monthReportDetail.init();

