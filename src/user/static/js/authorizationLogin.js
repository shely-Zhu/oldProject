/**
 * 积分商城  确认登录页面
 * @author yangjinlai 2017-07-20
 */

require('../../../include/js/vendor/config.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
//zepto模块--callback
require('../../../include/js/vendor/zepto/callback.js');
//zepto模块--deferred
require('../../../include/js/vendor/zepto/deferred.js');
var splitUrl = require('../../../common/js/components/splitUrl.js'); 
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');

$(function(){      

	var authorizationLogin = {

		arr: splitUrl(),

		init: function(){
			var that = this;

			that.events();
		},

		events: function(){
			var that = this;

			//点击确认登录按钮
			$('.button').on('click',function(){

				var $this = $(this);

				//按钮变色
                $this.attr("disabled", true).addClass('disable');

                //发送请求
				var obj = [{
					url: site_url.confirmLogin_api,
					data: {
						hmac: "",
						params: {
							accessId: that.arr['accessId'],//访问accessId
							clientId: that.arr['clientId'],//客户端id (通过【登录页面的url】地址参数获取)
							responseType: that.arr['responseType'],//响应类型 (通过【登录页面的url】地址参数获取)
							redirectUrl: that.arr['redirectUrl'],//重定向url (通过【登录页面的url】地址参数获取)
							operatorFrom: 6
						}
					},
					needDataEmpty: false, //不判断data是否为空
					callbackDone: function(json){
						//请求成功
						window.location.href = json.data.redirectUrl;
					},
					callbackFail: function(json){
						//请求失败
						tipAction( json.msg, function(){
                            $this.removeAttr("disabled").removeClass('disable');
                        });
					}
				}]
				$.ajaxLoading(obj);
			})
		} 
	}
	authorizationLogin.init();


})
