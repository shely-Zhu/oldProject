/**
 * 修改分红方式页面 js
 * @author 蔡文琦  2019-11-20
 */
require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {
	let somePage = {
		//获取页面元素
		$e: {
            
		},
		//全局变量
		gV: {
            flag:1
		},
		//页面初始化函数
		init: function() {
			var that = this;

			this.events()
			this.initMui()
		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;

			// mui.init({
			// 	pullRefresh: {
			// 		container: '.contentWrapper',
			// 		up: {
			// 			//auto: false,
			// 			contentrefresh: '拼命加载中',
			// 			contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			// 			callback: function() {
			// 				//执行ajax请求
			// 				that.getData(this);
			// 			}
			// 		}
			// 	}
			// });

			//init后需要执行ready函数，才能够初始化出来
			// mui.ready(function() {

			// 	//隐藏当前的加载中loading
			// 	if(!$('.list').hasClass('hasPullUp')) {
			// 		$('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
			// 	}

			// 	//显示loading
			// 	that.$e.listLoading.show();

			// 	//这一句初始化并第一次执行mui上拉加载的callback函数
			// 	mui('.contentWrapper').pullRefresh().pullupLoading();

			// 	//隐藏loading，调试接口时需要去掉
			// 	//setTimeout(function(){
			// 	that.$e.listLoading.hide();
			// 	//}, 2000);

			// 	//为$id添加hasPullUp  class
			// 	$('.list').addClass('hasPullUp');
			// });
		},
		//获取数据函数
		getData: function(t) {
			var that = this
			// $.ajaxLoading(obj);
		},
		//注册事件
		events: function() {
			let that = this;
		}
	};
	somePage.init();
});
