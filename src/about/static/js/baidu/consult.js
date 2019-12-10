/* 百度推广页
  *zhangyanping 2017/12/7
*/
require('@pathCommonBase/base.js');
require('@pathIncludJs/vendor/config.js');
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js'); 
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js'); 
//校验
require('@pathCommonJs/input.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js');

//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');

// require('@pathCommonJs/components/elasticLayerTypeTwo.js');

$(function(){

	var consult = {

		getElements : {
			submitBtn : $(".submitBtn"), //立即提交
			errorTip  : $(".againEnter"),//服务器返回错误校验的错误提示DOM
			type: splitUrl()['type'],
		 

		},
 
		init : function(){            
			var that = this;

			that.apply();
 
		},

		apply:function(){
			var that = this;


			$('.mui-control-item img').on('click',function(){
				window.location.href ="https://wap.chtfund.com/club/views/club.html";
			})

			if(that.getElements.type == "consult" ){
				$('.content').html('预约咨询');
				$('.email').hide();
				$('.email input').attr('needCheck','false');
				that.events();
			}
			else if(that.getElements.type == "apply"){
				$('.content').html('申请获取报告');
				that.events();
			}


		},

		events:function(){
			var that = this;

			that.getElements.submitBtn.on('click',function(){

				var result = $.checkInput();
				console.log(result);

				if(!result){//未通过校验   
					console.log('未通过校验');
					return false;
				}

				var $this = $(this);
				$this.attr("disabled", true).addClass('disable');


				//获取表单value值 
				$.each(result,function(i,el){
					if(el.check == 'name'){
					  nameValue = el.result; //姓名
					}
					else if(el.check == 'phone'){
					  phoneValue = el.result; //手机号
					}
					else if( el.check == 'twyzm'){
						twyzm = el.result; //图文验证码
					}
					else if(el.check == 'dxyzm'){
					  dxValue = el.result; //短信验证码
					}
					else if(el.check == 'email'){
					  emailValue = el.result; //邮箱
					}

				});

				if(that.getElements.type == "consult" ){
					var param = {
						hmac : "",
						params:{
							pName : nameValue, // 姓名
							phone: phoneValue,//手机号
							imgCode: twyzm, //图文验证码
							code: dxValue,//短信验证码
							type:"1",  //类型  预约咨询
						}
					}
				}
				else if(that.getElements.type == "apply"){
					 var param = {
						hmac : "",
						params:{
							pName : nameValue,  //姓名   
							phone : phoneValue,//账号
							imgCode: twyzm, //图文验证码
							code : dxValue,  //短信验证码
							email : emailValue,  //邮箱
							type: "2",   // 申请获取报告
						} 
					}
				}

				
				//发送ajax请求
				var obj = [{
					url: site_url.baiduPromotion_api,
					data: param,
					needDataEmpty: false, //不判断data是否为空
					callbackDone: function(json){
						//跳转到来之前的url
						window.location.href ="/about/views/baidu/result.html";
					},
					callbackFail: function(json){
						that.getElements.errorTip.show().find('.tipWrapper').html(json.message);
						setTimeout(function(){
							//黑色条隐藏
							that.getElements.errorTip.hide();
							$this.removeAttr("disabled").removeClass('disable');
						}, 2000)
					}
				}]
				$.ajaxLoading(obj);


			})

		}

	}

	/*调用*/
	consult.init();

})

