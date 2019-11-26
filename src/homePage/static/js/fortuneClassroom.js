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
			HeadBarpathName:$("#HeadBarpathName"),
			listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
		},
		//全局变量
		gV: {
			
		},
		//页面初始化函数
		init: function() {	
			var that = this;
			that.events()
			that.initMui(".list", ".contentWrapper")
			that.initMui(".list2", ".contentWrapper2")
		},
		//初始化mui的上拉加载
		initMui: function(listClassName, wrapperName) {
			var that = this;
            var height = windowHeight - $(".HeadBarConfigBox").height() - $(".mui-segmented-control").height();
            if (!$(listClassName).hasClass('setHeight')) {
                $(listClassName).height(height).addClass('setHeight');
            }
            mui.init({
                pullRefresh: {
                    container: wrapperName,
                    up: {
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            //执行ajax请求
                            //that.getInformsListData(this);
                        }
                    }
                }
            });
            //init后需要执行ready函数，才能够初始化出来
            mui.ready(function() {
                //隐藏当前的加载中loading
                if (!$(listClassName).hasClass('hasPullUp')) {
                    $(listClassName).find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }
                //显示loading
                that.$e.listLoading.show();
                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui(wrapperName).pullRefresh().pullupLoading();
                //隐藏loading，调试接口时需要去掉
                //setTimeout(function(){
                that.$e.listLoading.hide();
                //}, 2000);
                //为$id添加hasPullUp  class
                $(listClassName).addClass('hasPullUp');
            });
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