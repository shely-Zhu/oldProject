/* 
	*举贤荐才
	*zhangyanping 2018/01/22
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/mui/mui.picker.min.js');   
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js'); 
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js'); 
//校验
require('@pathCommonJs/input.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');

//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');


$(function(){

	var recruit = {

		isLogin:null,//0--登录，1--未登录

		getElements : {
			submitBtn : $(".submitBtn"), //立即提交
			errorTip  : $(".againEnter"),//服务器返回错误校验的错误提示DOM

		},
 
		init : function(){            
			var that = this;

			that.checkLogin(false);

			that.events();

		},

		checkLogin : function(params){
			var that = this;
			var obj = [
				{
					url: site_url.checkUserInfo_api,
					data:null,
					async: true,
					loginNotJump:params, //true不跳，false--跳
					needDataEmpty:false,
					needLogin:true,//需要判断是否登录
					dataType: 'jsonp',
            		needCrossDomain: true,
					callbackDone: function(json){
						that.isLogin = json.code;
						if(that.isLogin == "CS0000"){ //已登录
							if( $("#script_login").length !=0 && $("#script_login").attr("src").indexOf("appLogOut") !=-1 ){//此时表示APP也是未登录
								return false;
							}
						}else{
							if(window.currentIsApp){
								$("#script_login").attr("src","appLogOut");
								return false;
							}else{
								window.location.href=site_url.login_html_url+'?originUrl=' + new Base64().encode(window.location.href);
							}
						}	
					},
					   
				}
			];
			$.ajaxLoading(obj);
		},


		events:function(){
			var that = this;

			$(".submitBtn").on('click',function(){

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
					if(el.check == 'recomName'){
						recomNameValue = el.result; //被推荐人姓名
					}
					else if(el.check == 'recomPhone'){
						recomPhoneValue = el.result; //被推荐人联系方式
					}
					else if(el.check == 'recomBank'){
						recomBankValue = el.result; //被推荐人所在银行
					}
					else if(el.check == 'status'){
						statusValue = el.result; //被推荐人目前岗位
					}
					else if(el.check == 'perName'){
						perNameValue = el.result; //您的服务理顾姓名
					}
					else if(el.check == 'perPhone'){
					  perPhoneValue = el.result; //您的联系方式
					}
					else if(el.check == 'perDepart'){
					  perDepartValue = el.result; //服务理顾所在营业部
					}
					else if(el.check == 'provinceSelect'){
					  provinceValue = el.result; //所在省份
					}

				});

				var param = {
					hmac : "",
					params:{
						nameApplicant : recomNameValue,  // 被推荐人姓名
						mobileApplicant: recomPhoneValue, //被推荐人联系方式
						bankApplicant : recomBankValue,   //被推荐人所在银行
						positionApplicant : statusValue,  //被推荐人目前岗位
						brokerName : perNameValue,  //您的服务理顾姓名
						empnoApplicant : perPhoneValue,  //您的联系方式
						brokerNo : perDepartValue, //服务理顾所在营业部
						provinceApplicant : provinceValue,  //所在省份
					}
				};

				
				//发送ajax请求
				var obj = [{
					url: site_url.talentRecommend_api,
					data: param,
					async: true, //true-异步  false-同步
					needDataEmpty: false, //不判断data是否为空
					loginNotJump: false, //判断CF0004后是否需要跳转到登录页面，true--不跳转, false---跳转
					needLogin:true,////需要判断登录是否过期
					callbackDone: function(json){
						if(json.data.talentStatus == '1'){
							$.elasticLayerTypeTwo({
								id: "tip",
								title: '提示',
								p: '<p>感谢您的推荐！</p>',
								buttonTxt: '知道了',
								zIndex: 100,
								callback: function(t) {
									window.location.href = site_url.recruit_url;
								}
							})
							// tipAction('感谢您的推荐！');
						}else{
							$.elasticLayerTypeTwo({
								id: "tip",
								title: '提示',
								p: '<p>感谢您的推荐！您推荐的人才已经被其他客户推荐过了。请您继续推荐更优秀的人才，谢谢！</p>',
								buttonTxt: '知道了',
								zIndex: 100,
								callback: function(t) {
									window.location.href = site_url.recruit_url;
								}
							})
		
						}						
					},
					callbackFail: function(json){
						if(that.isLogin == "CS0000"){ //已登录
							if( $("#script_login").length !=0 && $("#script_login").attr("src").indexOf("appLogOut") !=-1 ){//此时表示APP也是未登录
								return false;
							}
						}else{
							if(window.currentIsApp){
								return false;
							}else{
								window.location.href=site_url.login_html_url+'?originUrl=' + new Base64().encode(window.location.href);
							}
						}	
						that.getElements.errorTip.show().find('.tipWrapper').html(json.message);
						setTimeout(function(){
							//黑色条隐藏
							that.getElements.errorTip.hide();
							$this.removeAttr("disabled").removeClass('disable');
						}, 2000)
					}
				}]
				$.ajaxLoading(obj);


			});
			
			$(".recruitBtn").on('click',function(){
				window.location.href = site_url.recruitIndex_url;
			})

		},

	}

	/*调用*/
	recruit.init();

})



