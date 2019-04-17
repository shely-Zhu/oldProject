/**
 * 修改网站交易密码js文件
 * @author yangjinlai 2017-02-24
 */

require('../../../../include/js/vendor/config.js');
//zepto模块
require('../../../../include/js/vendor/zepto/callback.js'); 
require('../../../../include/js/vendor/zepto/deferred.js'); 

//确认是否离开当前页面的函数
require('../../../../common/js/input.js');
require('../../../../common/js/components/utils.js');
require('../../../../common/js/ajaxLoading.js');

//黑色提示条的显示和隐藏
var tipAction = require('../../../../common/js/components/tipAction.js');


$(function(){
	
	var changeDeal = {
		
		getElements : {
			goRemember: '.goRemember', //记得网站交易密码
			goForget: '.goForget', //忘记网站交易密码
			rememberSubmit: '.rememberAction .sureBtn', //记得网站交易密码，提交按钮
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
			
			//记得网站交易密码  点击
			mui("body").on('tap', that.getElements.goRemember, function(){
				$('.initAction').hide();
				$('.rememberAction').show();
			})
			
			//忘记网站交易密码  点击
			mui("body").on('tap', that.getElements.goForget, function(){
				//跳转
				window.location.href = site_url.forgetDealPassword_url;
			})

			//记得网站交易密码  点击按钮提交
			mui("body").on('tap', that.getElements.rememberSubmit, function(){

				var result = $.checkInput();
				if( !result ){
					//校验未通过
					return false;
				} 

				var $this = $(this);

				//按钮变色
				$this.attr("disabled", true).addClass('disable');

				//校验通过，提交服务器
				var oldPassword = '', newPassword = '';
				$.each( result, function(i,el){
					if( el.check == 'oldDealPassword'){
						oldPassword = el.result;
					}else if( el.check == 'newDealPassword'){
						newPassword = el.result;
					}
				})
				var obj = [{
					url: site_url.changeDealPassword_api,
					data: {   
						hmac: "", //预留的加密信息 非必填项
						params:{
						    oldPassword: oldPassword,        //客户旧密码 必填项
						    newPassword: newPassword       //客户新密码 必填项
						}//请求的参数信息
					},
					needLogin: true,
					needDataEmpty: false,
					callbackDone: function(json){
						
						//成功，跳转到设置页面
						window.location.href = site_url.mySetUp_url;
					},
					callbackFail: function(json){
						tipAction(json.message, function(){
							$this.removeAttr("disabled").removeClass('disable');
						})
					}
				}]
				$.ajaxLoading(obj);
				
			})


		}
	}
	
	changeDeal.init();
})
