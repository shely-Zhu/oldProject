/**
* 月度报告详情页我
* @author zhangyanping 2019-11-19
*/



require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJsCom/splitUrl.js')();
var Base64 = require('@pathIncludJs/vendor/base64/base64.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');

var consultProduct = {
	
	init: function(){  //初始化函数
		var that = this;
		//事件监听
		that.events();
	},
	events: function(){  //绑定事件
		var that = this;
		mui("body").on('mdClick', '.submitBtn' , function(){
			var consultContent = $('.consultText').val();
			var empNo =  splitUrl['empNo']==undefined ? splitUrl['empNo'] :'';
			var empName =  splitUrl['empName']==undefined ? splitUrl['empName'] :'';
			debugger
			var productName =  new Base64().decode(splitUrl['productName']) ? new Base64().decode(splitUrl['productName']) :'';
			var obj = [{
				
				url: site_url.reportContactNow_api,
				data: {
					
					empNo: empNo,  //理顾工号
					empName: empName,  // 理顾姓名
					productName: productName,  // 产品名称
					content: consultContent,
				},
				needLogin: true, //需要判断登录情况
				needDataEmpty: false,//不需要判断data是否为空
				callbackDone: function(json){

					window.location.href = new Base64().decode(splitUrl['backUrl']);
				
				}
						
			}]
			$.ajaxLoading(obj);

		},{
			'htmdEvt': 'consultProduct_01'
		})
	}
}

consultProduct.init();

