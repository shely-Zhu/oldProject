
var splitUrl = require('../../../common/js/components/splitUrl.js');

$(function(){
	var realNameResult={
		getElements:{
			fontName : $(".fontName") , //客户姓名
			fontTel  : $(".fontTel")
		},

		init:function(){
			this.getElements.fontName.html(decodeURIComponent(decodeURIComponent(splitUrl()['fontName'])).replace(/\\u002a/g, '*'));
			this.getElements.fontTel.html(decodeURIComponent(splitUrl()['fontTel']).replace(/\\u002a/g, '*'));
		}
	}
	realNameResult.init();
})