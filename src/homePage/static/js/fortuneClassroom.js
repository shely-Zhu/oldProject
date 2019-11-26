/**
* 财富学院早知道
* @author yanruiting 2019-11-26
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {
	let somePage = {
		//获取页面元素
		$e: {
			tab:$('.tabHeader .tab'),
			tabBody:$('.tabBody .tabContent'),			
			contentWrap:$('#drapUpWrapper>div'),
			HeadBarpathName:$("#HeadBarpathName")
		},
		//全局变量
		gV: {
			
		},
		//页面初始化函数
		init: function() {	
			var that = this;
			that.events()
			that.initMui()
		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;
			mui.init();
			//模拟点击对应的type。定位到当前type下
			$(".mui-slider").on("slide",function(e){
				var $this = $(this);
				$("b").removeClass('borderBottom');
				$("b").eq(e.detail.slideNumber).addClass('borderBottom');
			})
		},
		//注册事件
		events: function() {
			
		}
	};
	somePage.init();
});