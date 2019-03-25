/**
 * 设置--更换手机号码  
 * @author  yangjinlai 2017-03-07
 */

require('../../../../include/js/vendor/config.js');

//zepto模块
require('../../../../include/js/vendor/zepto/callback.js'); 
require('../../../../include/js/vendor/zepto/deferred.js');

require('../../../../common/js/input.js');
require('../../../../common/js/components/utils.js');
require('../../../../common/js/ajaxLoading.js');

//黑色提示条
var tipAction = require('../../../../common/js/components/tipAction.js');
require('../../../../common/js/components/elasticLayerTypeTwo.js');


$(function(){

	var setUp = {

		getElements: {
			submitBtn: '.sureBtn'
		},

		init: function(){
			var that = this;

			that.events();
		},

		events: function(){
			var that = this;

			//点击提交按钮
			mui("body").on('tap', that.getElements.submitBtn, function(){
				var that = this;

				var result = $.checkInput();
				if( !result ){
					//校验未通过
					return false;
				}	

				var $this = $(this);

				$this.attr("disabled", true).addClass('disable');

				//校验通过
				var phone = '', imgCode = "", code = "";
				$.each( result, function(i,el){
					if( el.check == 'newLinkPhone'){
						phone = el.result;
					}
					if( el.check == 'twyzm'){
						imgCode = el.result;
					}
					if( el.check == 'dxyzm'){
						code = el.result;
					}
				})
				var obj = [{
					url: site_url.modifyContactPhone_api,
					data: {    
						hmac:"",  //预留的加密信息 
					    params:{ //请求的参数信息 
							phone: phone, //手机号码
						 	imgCode: imgCode, //图文验证码
						 	code: code //验证码     
						}
					},
					needLogin: true,
					needDataEmpty: false, 
					callbackDone: function(json ){

						//跳转到设置页面
						window.location.href = site_url.mySetUp_url;
					},
					callbackFail: function(json){
						tipAction(json.msg, function(){
							$this.removeAttr("disabled").removeClass('disable');
						});
					}
				}]
				$.ajaxLoading(obj);
			})

			//点击帮助按钮
			mui("body").on('tap', '.formList .help', function(){
				
				var obj = {
					p: '<p>更换手机号码，即为更换联系人手机号码，更换后短信会发送到更换后的手机号码上，注册手机号码注册完成后不可更改，作为登录使用</p>'
				}
			    $.elasticLayerTypeTwo(obj);

			})
			
		}
	}

	setUp.init();

})