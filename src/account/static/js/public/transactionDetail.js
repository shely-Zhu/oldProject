/**
* 自选公募-交易记录
* @author wangjiajia 2019-11-20
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
			recordList: $('.contentWrap'),
			adjustmentTemp: $('#adjustment-template'),
		},
		//全局变量
		gV: {
			data:[1,2],
		},
		//页面初始化函数
		init: function() {
			//启用事件处理			
			this.events()
			this.initMui()
		},
		//初始化mui的上拉加载
		// initMui: function() {
		// 	var that = this;
		// 	mui.init();
		// 	$(".mui-slider").on("slide",function(e){
		// 		$("b").removeClass('borderBottom')
		// 		$("b").eq(e.detail.slideNumber).addClass('borderBottom')
        //         console.log(e.srcElement,"2")
        //         console.log(event.detail.slideNumber)
		// 	})
		// },
		    //初始化mui的上拉加载
			initMui: function() {
				var that = this;
				mui.init();
				$(".mui-slider").on("slide",function(e){
					$("b").removeClass('borderBottom')
					$("b").eq(e.detail.slideNumber).addClass('borderBottom')
					// console.log(e.srcElement,"2")
					console.log(event.detail.slideNumber)
					if(event.detail.slideNumber === 1){
						$("#item1").empty()
						$("#item3").empty()
						$("#item4").empty()
						$("#item2").empty()
						
						$("#item2").prepend($("<div class='list'><div class='contentWrapper'><div class='contentWrap'></div><div class='goTopBtn iconfont'></div></div></div>"))						     
					}else if(event.detail.slideNumber === 2){
						$("#item1").empty()
						$("#item2").empty()
						$("#item4").empty()
						$("#item3").empty()
						$("#item3").prepend($("<div class='list'><div class='contentWrapper'><div class='contentWrap'></div><div class='goTopBtn iconfont'></div></div></div>"))
					}else if(event.detail.slideNumber === 3){
						$("#item1").empty()
						$("#item2").empty()
						$("#item3").empty()
						$("#item4").empty()
						$("#item4").prepend($("<div class='list'><div class='contentWrapper'><div class='contentWrap'></div><div class='goTopBtn iconfont'></div></div></div>"))
					}else if(event.detail.slideNumber === 0){
						$("#item2").empty()
						$("#item3").empty()
						$("#item4").empty()
						$("#item1").empty()
						$("#item1").prepend($("<div class='list'><div class='contentWrapper'><div class='contentWrap'></div><div class='goTopBtn iconfont'></div></div></div>"))
					}
					// that.getData()
					// that.gV.data = []
					that.initMui()

				})
				var height = windowHeight - $(".title").height() - $(".topTitle").height();
				if (!$('.list').hasClass('setHeight')) {
					$('.list').height(height).addClass('setHeight');
				}
	
				mui.init({
					pullRefresh: {
						container: '.contentWrapper',
						up: {
							//auto: false,
							contentrefresh: '拼命加载中',
							contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
							callback: function() {
								//执行ajax请求
								that.getData(this);
							}
						}
					}
				});
	
				//init后需要执行ready函数，才能够初始化出来
				mui.ready(function() {
	
					//隐藏当前的加载中loading
					if (!$('.list').hasClass('hasPullUp')) {
						$('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
					}
	
					//显示loading
					// that.$e.listLoading.show();
	
					//这一句初始化并第一次执行mui上拉加载的callback函数
					mui('.contentWrapper').pullRefresh().pullupLoading();
	
					//隐藏loading，调试接口时需要去掉
					//setTimeout(function(){
					that.$e.listLoading.hide();
					//}, 2000);
	
	
					//为$id添加hasPullUp  class
					$('.list').addClass('hasPullUp');
				});
			},
		//获取数据函数
		getData: function(t) {
            var that = this;

            var obj = [{ // 系统调仓记录列表
                url: site_url.queryTradeApplyByCode_api,
                data: {
					"fundCode":"",
					"tradeNo":"",
                    "pageCurrent": that.gV.pageCurrent, //非必须，默认为1
					"pageSize": "10",//非必须，默认为10
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
					var data;
					console.log(json)
                    if (json.data.pageList.length == 0) { // 没有记录不展示
                        $(".list").hide()
                        // that.$e.noData.show();
                        return false;
                    } else {
						data = json.data.pageList
						// that.gV.data = json.data.pageList
						console.log(1111)
						console.log(that.gV.data)
                    }
                    setTimeout(function() {

                        if (data.length < that.gV.pageSize) {

                            if (that.gV.pageCurrent == 1) { //第一页时

                                if (data.length == 0) {
                                    // 暂无数据显示
                                    // that.$e.noData.show();
                                    return false;

                                } else { // 没有更多数据了
                                    t.endPullupToRefresh(true);
                                }
                            } else {
                                //其他页-没有更多数据
                                t.endPullupToRefresh(true);
                            }
                        } else { // 还有更多数据
                            console.log(999)
                            t.endPullupToRefresh(false);
                        }

                        // 页面++
                        that.gV.pageCurrent++;

                        // 将列表插入到页面上
                        generateTemplate(data, that.$e.recordList, that.$e.adjustmentTemp);
						// generateTemplate(that.gV.data, $(".contentWrap"), that.$e.adjustmentTemp);
                    }, 200)
                },

            }];
            $.ajaxLoading(obj);
        },
		//注册事件
		events: function() {
			
		}
	};
	somePage.init();
});
