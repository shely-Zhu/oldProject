/*
*基民教育专题
*author:zhangyanping
*time：2018/5/18
*/


require('@pathIncludJs/vendor/config.js');
 
//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJs/components/utils.js'); 
require('@pathCommonJs/ajaxLoading.js');
//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');



$(function(){
	//风险评估测试题 ，测试完成点击提交显示测试结果
	var baseEducation={

		getElements:{
			clickImg:$('.learnBtn img'),
		},
		
		//初始化 
		init:function(){   
			var that=this;  
			
			that.getData();

			that.events();

		},

		//数据初始化
		getData:function(){//事件 
			var that=this;
			
			var obj = [{
				url: site_url.imgModel_api,//内容管理
				data:{
					"hmac":"", //预留的加密信息
					"params":{//请求的参数信息
						"adPosition":'appFundEducationLearn',//adPosition 
						"limitCount":"100",//展示幅数---默认传给后台几个极大值   
					}
				},
				needLogin:false,//需要判断是否登陆
				//needDataEmpty: false,//不需要判断data是否为空
				callbackDone: function(json){  //成功后执行的函数

					$.each(json.data,function(i,el){

						var img = "";

						img += "<img src='" + el.imgUrl +"'>" ;
						$(".imgContent").append(img);
						
					});
					
				},
				
			}];
			$.ajaxLoading(obj);

			
		},

		events:function(){
			that = this;


			that.getElements.clickImg.on("click tap", function() {

				that.checkLogin(false);

                // window.location.href = site_url.baseResult_url;
            })
		},

		checkLogin:function(params,callback){
			var that = this;
			var obj = [
				{
					url: site_url.checkUserInfo_api,
					data:null,
					async: false,
					needDataEmpty:false,
					loginNotJump:params, //true不跳，false--跳
					needLogin:true,//需要判断是否登录
					dataType: 'jsonp',
            		needCrossDomain: true,
					callbackDone: function(json){
						that.fundEducationRecord();
						(typeof(callback) == 'function') && callback();						
					},
					   
					callbackNoData:function(){
						console.log('我在nodata里面')
					},
					callbackLoginFunc:function(){
						//未登录
						if(that.isLogin != 1){
							that.judge();
						}
						
					},	
				}
			];
			$.ajaxLoading(obj);
		},
		
		judge:function(){
			var that = this;
			if(that.jumpParam == "true"){ //已登录
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
		},

		fundEducationRecord:function(){
			var that = this;

			var obj = [
				{
					url: site_url.fundEducationRecord_api,
					data:{},
					async: false,
					needDataEmpty:false,
					needLogin:true,//需要判断是否登录
					callbackDone: function(json){
						window.location.href = site_url.baseResult_url;
					},
					   
				}
			];
			$.ajaxLoading(obj);
		}

	}
	//调用
	baseEducation.init();
})




 
