/* 基本信息页面
 * author zhangweipeng 2017-05-31
 */

//黑色提示条
var tipAction = require('../../../../common/js/components/tipAction.js'); 
var splitUrl = require('../../../../common/js/components/splitUrl.js');
$(function(){
	var realNameResult={
		getElements:{
			fontName : $(".fontName") , //客户姓名
			fontTel  : $(".fontTel"),	//客户证件号码
			certType : $(".fontType"), //客户证件类型
		},

		init:function(){
			this.getElements.fontName.html(decodeURIComponent(decodeURIComponent(splitUrl()['fontName'])).replace(/\\u002a/g, '*'));
			this.getElements.fontTel.html(decodeURIComponent(splitUrl()['maskCertNo']).replace(/\\u002a/g, '*'));
			this.getElements.certType.html(decodeURIComponent(decodeURIComponent(splitUrl()['certType'])));
		}
	}
	realNameResult.init();
})