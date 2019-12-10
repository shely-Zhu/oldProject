/**
* 月度报告列表页
* @author zhangyanping 2019-11-01
*/


require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');

//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');


$(function() {

	var somePage = {
		$e: {
			adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
			recordList: $('.recordList'), // 调仓记录
			adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
			noData: $('.noData'), //没有数据的结构
			listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
		},
		gV: { // 全局变量
			groupCode: splitUrl['groupCode'], // 组合编号，从我的持仓进
			pageCurrent: 1, //当前页码，默认为1
			pageSize: 10,
			listLength: 0,
		},
		init: function() {
			var that = this;
			that.initMui();
			//that.getUserInfo();
			that.events();
		},
		getUserInfo:function(){
			var that = this;
			var Obj=[{ // 是否新手账号
				url: site_url.user_api,
				data: {
					hmac: "", //预留的加密信息
					params: { //请求的参数信息
					}
				},
				needLogin: true, //判断登录是否过期
				callbackDone: function(json) { //成功后执行的函数
					var jsonData = json.data;

					//判断已成交客户
					if( jsonData.newComer == 0){
						//已成交客户
						that.initMui();
					}
					else{
						$('.noneList').show();
					}
				},
				callbackFail: function(json) { //失败后执行的函数
					return false;
				}
			}];
			$.ajaxLoading(Obj);

		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;

			var height = windowHeight;
			if (!$('.list').hasClass('setHeight')) {
				$('.list').height(height).addClass('setHeight');
			}

			$.pullRefresh({
                wrapper: $('.list'),
                class: 'listItem',
                template: that.$e.adjustmentTemp, 
                pageSize: that.gV.pageSize,
                callback: function(def, t){
                    var obj = [{
                        url: site_url.queryMonthlyReport_api,
						data: {},
						needDataEmpty: true,
                        callbackDone: function(json) {     
                            var data = json.data;
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none")
                            } else {
                                def && def.resolve( data, that.gV.pageCurrent);
                                // 第一个调仓记录默认展开
                                $('.list').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');
                                that.gV.pageCurrent++;
                            }
                        },
                        callbackNoData: function( json ){  
                            if(that.gV.pageCurrent == 1) {
                                $(".list").css("display", "none")
                            }
                            def && def.reject( json, that.gV.pageCurrent );
                        },
                        callbackFail: function(json) {
                            def && def.reject( json, that.gV.pageCurrent );
                        },
                    }];
                    $.ajaxLoading(obj); 
                }
            })

			/*mui.init({
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
				that.$e.listLoading.show();

				//这一句初始化并第一次执行mui上拉加载的callback函数
				mui('.contentWrapper').pullRefresh().pullupLoading();

				//隐藏loading，调试接口时需要去掉
				//setTimeout(function(){
				that.$e.listLoading.hide();
				//}, 2000);


				//为$id添加hasPullUp  class
				$('.list').addClass('hasPullUp');
			});*/
		},
		/*getData: function(t) {
			var that = this;

			var obj = [{ // 月度报告列表
				url: site_url.queryMonthlyReport_api,
				data: {},
				//async: false,
				needDataEmpty: true,
				callbackDone: function(json) {
					var data;

					if (json.data.length == 0) { // 没有记录不展示
						that.$e.noData.show();
						$('.adjustmentRecord').hide();
						return false;
					} else {
						data = json.data;
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

						// 页面++
						that.gV.pageCurrent++;

						//去掉mui-pull-bottom-pocket的mui-hidden
						$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
						// 将列表插入到页面上
						generateTemplate(data, that.$e.recordList, that.$e.adjustmentTemp);

						// 第一个调仓记录默认展开
						$('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');

					}, 200)

				},
					 
			}];
			$.ajaxLoading(obj);
		},*/
		events: function() {
			var that = this;

			mui("body").on('mdClick', '.monthlyReport', function() {
				var $this = $(this);
				window.location.href = site_url.monthReportDetail_url + '?reportId=' + $this.attr('reportId');
				
			},{
				'htmdEvt': 'monthReportList_01'
			})

			mui("body").on('mdClick', '.productBtn', function() {
				var $this = $(this);
				window.location.href = site_url.wealthIndex_url;
			},{
				'htmdEvt': 'monthReportList_02'
			})

		}
	};
	somePage.init();
});