
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
		 getElements: {
        noData: $('.noData'), //没有数据的结构
        listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        midContent: $('.midContent'), // 导航
    },
    setting: { //一些设置
        navAllList: ['风险揭示书', '产品信息', '管理报告', '资金分配', '重要公告及通知', '恒天简报'],
        ajaxParamList: ['19,20,10,22', '1', '12,13,28,14', '30', '16,17,31,32,29', '33,34,35,36,37'], // 请求参数
        navList: [], //导航
        list_template: '',
        html: '',
        pageSize: 10,
    },
    status: {
        fundCode: splitUrl()['fundCode'], // 当前页面的基金代码
        current_index: 0, //左右滑动区域的索引
        current_label: 0, //标签对应的编号，ajax请求需要
    },
		//页面初始化函数
		init: function() {
			//启用事件处理
			this.getData();
			this.events();
			this.initMui();
		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;
			mui.init();
			$(".mui-slider").on("slide",function(e){
				$("b").removeClass('borderBottom')
				$("b").eq(e.detail.slideNumber).addClass('borderBottom')
				// console.log($.tabScroll({}))
				// .addClass('borderBottom').siblings().removeClass('borderBottom');
				console.log(e.srcElement,"2")
			})
//			mui.init({
//				pullRefresh: {
//					container: '.contentWrapper',
//					up: {
//						//auto: false,
//						contentrefresh: '拼命加载中',
//						contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
//						callback: function() {
//							//执行ajax请求
//							that.getData(this);
//						}
//					}
//				}
//			});

			//init后需要执行ready函数，才能够初始化出来
//			mui.ready(function() {
//
//				//隐藏当前的加载中loading
//				if(!$('.list').hasClass('hasPullUp')) {
//					$('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
//				}
//
//				//显示loading
//				that.$e.listLoading.show();
//
//				//这一句初始化并第一次执行mui上拉加载的callback函数
//				mui('.contentWrapper').pullRefresh().pullupLoading();
//
//				//隐藏loading，调试接口时需要去掉
//				//setTimeout(function(){
//				that.$e.listLoading.hide();
//				//}, 2000);
//
//				//为$id添加hasPullUp  class
//				$('.list').addClass('hasPullUp');
//			});
		},
		//获取数据函数
		getData: function(t) {
			var that = this
			var obj = [{
				url: site_url.queryReourceLabels_api,
				// url: site_url.queryReourceList_api,
				data: {"projectId":21072},
				// data:{"projectId":21072,"fileType":"1"},
				//async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
					var labelArr = json.data;
					for (var i =0; i < labelArr.length ; i++) {
						if(labelArr[i] == -1) {
							labelArr.splice(i,1);
						}
					}
	
					if(labelArr.length == 0){
						$('.without.noData').show();
					}else{
						labelArr.map(function(x) {
							var ele = {};
	
							ele.type = that.setting.navAllList[x];
							ele.code = x;
	
							that.setting.navList.push(ele);
						});
	
					//	that.beforeFunc(); //拼模板，初始化左右滑动mui组件
						// that.getData($('#scroll1')); //初始化第一屏
					}
				}
			}]
			$.ajaxLoading(obj);
		},
		//注册事件
		events: function() {
			
		}
	};
	somePage.init();
});