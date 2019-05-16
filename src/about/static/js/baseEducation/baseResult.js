/*
*基民教育专题
*author:zhangyanping
*time：2018/5/21
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

		//初始化 
		init:function(){   
			var that=this;  
			
			that.getData();

		},

		//数据初始化
		getData:function(){//事件 
			var that=this;
			
			var obj = [{
				url: site_url.imgModel_api,//内容管理
				data:{
					"hmac":"", //预留的加密信息
					"params":{//请求的参数信息
						"adPosition":'appFundEducationFinish',//adPosition 
						"limitCount":"100",//展示幅数---默认传给后台几个极大值   
					}
				},
				needLogin:true,//需要判断是否登陆
				//needDataEmpty: false,//不需要判断data是否为空
				callbackDone: function(json){  //成功后执行的函数

					$.each(json.data,function(i,el){

						var img = "";

						img += "<img src='" + el.imgUrl +"'>" ;
						$(".imgContent").append(img);
						
					});
					
				}
				
			}];
			$.ajaxLoading(obj);

			
		},

	}
	//调用
	baseEducation.init();
})




 
