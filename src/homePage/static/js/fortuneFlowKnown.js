/**
* 财富学院早知道
* @author yanruiting 2019-11-25
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
			fortuneFlowListWrapper: $(".knownList"), // 财富流向早知道列表容器
			fortuneFlowListTemp: $("#fortuneFlowList-template"), // 财富流向早知道列表模板
			listLoading: $('.listLoading') //所有数据区域，第一次加载的loading结构
		},
		//全局变量
		gV: {
            pageCurrent: 1,
            pageSize: 10,
			fortuneFlowList: [{
				imgSrc: "/homePage/static/img/bofang@2x.png",
				title: "",
				date: "11.13",
				content: "聪敏赚钱北向资金逆势买进看好节后？月度净流入再创新高啦啦啦啦啦啦啦啦"
			}]
		},
		//页面初始化函数
		init: function() {	
			var that = this;
			that.initMui(".list", ".contentWrapper")
            that.events()
			//
		},
        // 获取财富流向早知道的列表
        getFlowKnownList(t) {
            var that = this;
            var obj = [{
                url: site_url.queryFortuneArticleList_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": that.gV.pageSize, //非必须，默认为10
                    "articleBelong": 1
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;
                    if (json.data.total == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        return false;
                    } else {
                        data = json.data.pageInfo;
                    }
                    setTimeout(function() {
                        if (data.length < that.gV.pageSize) {
                            if (that.gV.pageCurrent == 1) { //第一页时
                                if (data.length == 0) {
                                    // 暂无数据显示
                                    that.$e.noData.show();
                                    return false;
                                } else { // 没有更多数据了
                                    t.endPullupToRefresh(true);
                                }
                            } else {
                                //其他页-没有更多数据
                                t.endPullupToRefresh(true);
                            }
                        } else { // 还有更多数据
                            t.endPullupToRefresh(false);
                        }
                        $('.list').find('.contentWrapper .mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 页面++
                        that.gV.pageCurrent++;
                        // 将消息列表插入到页面上
                        generateTemplate(data, that.$e.fortuneFlowListWrapper, that.$e.fortuneFlowListTemp)
                    }, 200)

                }
            }];
            $.ajaxLoading(obj); 
        },
		//初始化mui的上拉加载
		initMui: function(listClassName, wrapperName) {
			var that = this;
            var height = windowHeight - $(".HeadBarConfigBox").height();
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
                            that.getFlowKnownList(this);
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
		},
		//注册事件
		events: function() {
			
		}
	};
	somePage.init();
});