/**
 * 实名认证---设置密码（公募开户）
 * @author yangjinlai 2017-03-08
 */


require('../../../../include/js/vendor/config.js');
//require('../../../../include/js/vendor/base64/base64.js');

//zepto模块
require('../../../../include/js/vendor/zepto/callback.js'); 
require('../../../../include/js/vendor/zepto/deferred.js'); 

require('../../../../common/js/input.js');
require('../../../../common/js/components/utils.js');
require('../../../../common/js/ajaxLoading.js');

//黑色提示条
var tipAction = require('../../../../common/js/components/tipAction.js');
var Base64 = require('../../../../include/js/vendor/base64/base64.js'); 

$(function(){

	var realName = {
		
		getElements : {
			submitBtn: '.sureBtn', //提交按钮
		},
		
		//初始化函数
		init: function(){
			var that = this;
			
			//页面打开后最先执行
			that.beforeSetFunc();
			
			//调用绑定事件函数
			that.eventsFunc();
		},
		

		//页面打开后最先执行的逻辑
		beforeSetFunc: function(){
			var that = this;
			
			//初始化mui
			mui.init();

		},
		
		
		//该函数里绑定事件
		eventsFunc: function(){
			var that = this;
			
			//确定按钮点击
			mui("body").on('tap', that.getElements.submitBtn, function(){
				var $this = $(this);
				
				var result = $.checkInput();
				if( !result ){
					//校验未通过
					return false;
				}
				
				$this.attr("disabled", true).addClass('disable');
				
				var password = '';
				//校验通过，获取数据并提交
				$.each(result, function(i, el){
					if( el.check == 'newDealPassword' ){
						password = el.result; //银行预留手机号码
					}
				})

				//发送请求
				var obj = [{
					url: site_url.directOpenAcct_api,
					data: {     
						hmac:"", //预留的加密信息
						params:{//请求的参数信息
							password: password
 						} 
					},
					needLogin: true,
					needDataEmpty: false,
					callbackDone: function(json){
						//私募公募都成功，跳转成功页面
						$this.removeAttr("disabled").removeClass('disable');
						window.location.href = site_url.realNameStepFour_url;
					},
					callbackFail: function(json){
						tipAction(json.msg, function(){
							$this.removeAttr("disabled").removeClass('disable');
						});
						
					},
				}]
				$.ajaxLoading(obj);
			})
			
			
		}
	}
	
	realName.init();

})