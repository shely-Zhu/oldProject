/**
 * 登录日志查询
 * @author 蔡文琦  2019-11-11
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
			islogin: $(".islogin"),
			adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
			recordList: $('.recordList'), // 调仓记录
			adjustmentTemp: $('#adjustment-template'), // 模板赋值
			noData: $('.noData'), //没有数据的结构
			listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
		},
		//全局变量
		gV: {
			groupCode: splitUrl['groupCode'], // 组合编号，从我的持仓进
			pageNo: 1, //当前页码，默认为1
			pageSize: 10,
			listLength: 0,
			pageCurrent: 1,
			tempArr: [],
			//			afterData:[],
		},
		//页面初始化函数
		init: function() {
			//启用事件处理
			$.each(this.$e.islogin, (index, item) => {
				console.log($(item).html())
				if($(item).html() == "退出") {
					$(item).css({
						color: "red"
					})
				}
			});
			var that = this;

			this.events()
			this.initMui()
			this.beforeFunc()
		},
		beforeFunc: function(t) {
			var that = this;
			//设置切换区域的高度
			//计算节点高度并设置
			var height = window.innerHeight - $('#HeadBarConfigBox').height()-$('.tips').height();

			if(!$('.contentWrapper').hasClass('setHeight')) {
				$('.contentWrapper').height(height).addClass('setHeight');
			}
		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;

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
				if(!$('.list').hasClass('hasPullUp')) {
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
			});
		},
		//获取数据函数
		getData: function(t) {
			var that = this
			//			let tempArr = [];
			var afterData = [];
			var obj = [{ // 登录日志模拟数据
				url: site_url.getUserTrackRecord_api,
				data: {
					"pageNum": that.gV.pageCurrent,
					"pageSize": that.gV.pageSize
				},
				//async: false,
				contentTypeSearch: true,
				needDataEmpty: false,
				callbackDone: function(json) {

					//                  let obj = {}
					if(json.data.length == 0) { // 没有记录不展示
						that.$e.noData.show();
						$('.adjustmentRecord').hide();
						return false;
					} else {
						beforeData = json.data.list;
						console.log(beforeData)
						console.log(that.gV.tempArr[that.gV.tempArr.length - 1])
						for(let i = 0; i < beforeData.length; i++) {
							//拿到页面要显示的时间
							beforeData[i].createTime1 = beforeData[i].createTime.split(" ")[1];
							if(beforeData[i].createTime.split(" ")[0] == that.gV.tempArr[that.gV.tempArr.length - 1]) {
								afterData.push({
									time: "",
									list: [beforeData[i]]
								});
							} else {
								//当日期数组中没有新获取的数据中的时间时
								if(that.gV.tempArr.indexOf(beforeData[i].createTime.split(" ")[0]) === -1) {
									afterData.push({
										time: beforeData[i].createTime.split(" ")[0],
										list: [beforeData[i]]
									});
									that.gV.tempArr.push(beforeData[i].createTime.split(" ")[0]);
								} else {
									for(let j = 0; j < afterData.length; j++) {
										console.log(afterData[j].time)
										if(afterData[j].time == beforeData[i].createTime.split(" ")[0]) {
											afterData[j].list.push(beforeData[i]);
											break;
										}
									}
								};
							}
						}
					}
					setTimeout(function() {
						//
						if(beforeData.length < that.gV.pageSize) {

							if(that.gV.pageCurrent == 1) { //第一页时

								if(beforeData.length == 0) {
									// 暂无数据显示
									that.$e.noData.show();
									return false;

								} else { // 没有更多数据了
									t.endPullupToRefresh(true);
								}
							} else {
								//其他页-没有更多数据
								t.endPullupToRefresh(false);
							}
						} else { // 还有更多数据
							t.endPullupToRefresh(false);
						}

						// 页面++
						that.gV.pageCurrent++;

						//                        去掉mui-pull-bottom-pocket的mui-hidden
						$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
						// 将列表插入到页面上
						generateTemplate(afterData, that.$e.recordList, that.$e.adjustmentTemp);

						// 第一个调仓记录默认展开
						//                      $('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');

					}, 200)

				},

			}];
			$.ajaxLoading(obj);
		},
		//注册事件
		events: function() {
			let that = this;
			$('.iconfont').on('tap', function(el) {
				console.log("1111111")
			});
		}
	};
	somePage.init();
});