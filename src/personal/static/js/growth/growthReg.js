/**
 * 成长值规则
 */


// 我的成长值  zyping 2019-6-11

//ajax调用
require('@pathCommonJsCom/utils.js'); 
//ajax调用
require('@pathCommonJs/ajaxLoading.js'); 
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js'); 
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js'); 
//路径配置文件
require('@pathIncludJs/vendor/config.js'); 
//黑色提示条
var tipAction = require('@pathCommonJsCom/tipAction.js');

$(function(){

	var growthValue={

		//元素获取
		getElements: {
		}, 

		webinit:function(){  
			var that = this;

			//请求成长值规则
			that.getData();

		},

		getData: function(){
			var that = this;

			//成长值规则查询
			var obj = [{ 
			    url: site_url.findLatestContentByCategory_api,
			    data: {
                    "category": "rule_growthValue",
                },
			    contentTypeSearch: true, 
			    needDataEmpty: false, //不需要判断data是否为空
			    callbackDone: function(json){  //成功后执行的函数

			    	var num = json.data.content;

			    	$('.txt').html(num);
			    }
			}];
			$.ajaxLoading(obj);
		},

	};
	growthValue.webinit();
})


