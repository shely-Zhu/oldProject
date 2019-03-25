/***
*图片拼接模板
*@author purpleZhao 2017-06-08
*
*/
/***
*本页面逻辑是所有通过上一个页面传过来的可变入参查询图片的模板
*要求：需要通过地址栏将adPosition 传过来
*
*/
require('../vendor/config.js');

//zepto模块
require('../vendor/zepto/callback.js'); 
require('../vendor/zepto/deferred.js'); 

//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');


$(function(){

	var model = {

        webInit:function(){

        	var that=this;
        	
        	if(window.location.href.indexOf('adPosition') == -1){

        		console.log("地址栏中没有带过adPosition的值，请查看跳转前的链接");
        		return false;

        	}else{
				//发送ajax请求
	            var obj = [{ 
	                url: site_url.imgModel_api,//图片接口
	                needLogin:true,//需要判断是否登陆
	    		    data: 
	    		    	{
						    "hmac":"", //预留的加密信息
						    "params":{//请求的参数信息
								"adPosition":splitUrl()['adPosition'],//adPosition 
								"limitCount":"100",//展示幅数---默认传给后台几个极大值   
							}
	    				},
	                callbackDone: function(json){  //成功后执行的函数

	                	window.document.title=decodeURIComponent(splitUrl()['title']);

	                    $.each(json.data,function(i,el){

	                    	var img = "";

	                    	img += "<img src='" + el.imgUrl +"'>" ;
	                    	$(".imgContent").append(img);
		                    
	                    });
	 
	                },
	                callbackFail: function(json){  //失败后执行的函数
							tipAction(json.msg);
	                }
	            }];
	            $.ajaxLoading(obj);        		
        	}



        }
	};

	//调用数据
	model.webInit();
})