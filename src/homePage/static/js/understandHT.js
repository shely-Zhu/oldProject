
require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {
	let somePage = {
		//获取页面元素
		$e: {
			tab:$('.tabHeader .tab'),
			tabBody:$('.tabBody .tabContent')
		},
		//全局变量
		gV: {
			
		},
		//页面初始化函数
		init: function() {			
			this.events()
			this.initMui()
		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;
			mui.init();
			$(".mui-slider").on("slide",function(e){
				$("b").removeClass('borderBottom')
				$("b").eq(e.detail.slideNumber).addClass('borderBottom')
			})
		},
		//获取数据函数
		getData: function(t) {
			var that = this
		},
		//注册事件
		events: function() {
			
		}
	};
	somePage.init();
});