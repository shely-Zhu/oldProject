/**
* 财富学院早知道
* @author yanruiting 2019-11-25
*/


require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
$(function() {
	let somePage = {
		//获取页面元素
		$e: {
			fortuneFlowListWrapper: $(".knownList"), // 财富流向早知道列表容器
			fortuneFlowListTemp: $("#fortuneFlowList-template"), // 财富流向早知道列表模板
            noData: $('.noData'), //没有数据的结构
			listLoading: $('.listLoading') //所有数据区域，第一次加载的loading结构
		},
		//全局变量
		gV: {
            pageCurrent: 1,
            pageSize: 10,
			fortuneFlowList: [],
            articleBelong : splitUrl['articleBelong'], // 文章类型
            wrapperName:null
		},
		//页面初始化函数
		init: function() {	
			var that = this;
			that.initMui(".list", ".contentWrapper")
            that.events()
		},
        // 获取财富流向早知道的列表
        getFlowKnownList: function(t) {
            var that = this;
            var obj = [{
                url: site_url.queryFortuneArticleList_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": that.gV.pageSize, //非必须，默认为10
                    "articleBelong": that.gV.articleBelong
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;
                    if (json.data.total == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        return false;
                    } else {
                        data = that.dealTime(json.data.list);
                    }
                    setTimeout(function() {
                        if (data.length < that.gV.pageSize) {
                            that.gV.isBottomFlag = true
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
                        $(".lazyload").lazyload()
                        alwaysAjax(".knownList")
                    }, 200)
                },
                callbackNoData:function(){
                    //没有数据时展示暂无数据
                    $(".list").hide()
                    that.$e.noData.show();
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                    //隐藏loading，调试接口时需要去掉
                    setTimeout(function() {
                        that.$e.listLoading.hide();
                    }, 100);
                },
            }];
            $.ajaxLoading(obj); 
        },
        dealTime: function(data) {
            $.each(data, function(a, b) {
                if(b.articleTimeStr && b.articleTimeStr!= '') {
                    b.articleTimeStr = b.articleTimeStr.split(" ")[0].split("-")[1] + "." + b.articleTimeStr.split(" ")[0].split("-")[2]
                } else {
                    b.articleTimeStr = ""
                }
            })
            return data;
        },
		//初始化mui的上拉加载
		initMui: function(listClassName, wrapperName) {
            var that = this;
            that.gV.wrapperName=wrapperName;
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
            var that=this
            // 列表页跳转到详情页
			mui("body").on('mdClick', '.knownItem' , function(){
                var id = $(this).attr("id")
                window.location.href = site_url.articleTemplate_url + '?id=' + id + '&articleBelong=' + that.gV.articleBelong + '&applyType=1'
            },{
                'htmdEvt': 'fortune_09'
            })
		}
	};
    somePage.init();
    
});

