/**
 * 设置--更换登录密码
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
var Base64=require('../../../../include/js/vendor/base64/base64.js');


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
				var old_password = '', new_password = "";
				$.each( result, function(i,el){
					if( el.check == 'oldLoginPassword'){
						old_password = el.result;
					}
					if( el.check == 'newLoginPassword'){
						new_password = el.result;
					}
				})
				var obj = [{ //设置--修改登录密码
					url: site_url.modifyPassword_api,
					data: {    
						hmac:"",  //预留的加密信息 
					    params:{ //请求的参数信息 
							old_password: new Base64().encode(old_password), 
						 	new_password: new Base64().encode(new_password), 
						}
					},
					needLogin: true,
					needDataEmpty: false, 
					callbackDone: function(json ){

						//跳转到设置页面
						window.location.href = site_url.mySetUp_url;
					},
					callbackFail: function(json){
						
						tipAction(json.message, function(){
							$this.removeAttr("disabled").removeClass('disable');
						});
					}
				}]
				$.ajaxLoading(obj);
			})
			
			
		}
	}

	setUp.init();

})