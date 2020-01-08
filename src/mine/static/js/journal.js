/**
 * 登录日志查询
 * @author 蔡文琦  2019-11-11
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');

$(function() {
	var somePage = {
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
			pageSize: 20,
			listLength: 0,
			pageCurrent: 1,
			tempArr: [],
		},
		//页面初始化函数
		init: function() {
			//启用事件处理
			$.each(this.$e.islogin, function(index, item) {
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
		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;
			var height = window.innerHeight - $('#HeadBarConfigBox').height()-$('.tips').height();

			if(!$('.list').hasClass('setHeight')) {
				$('.list').height(height).addClass('setHeight');
			}
			$.pullRefresh({
                wrapper: $('.list'),
                class: 'listItem',
                template: that.$e.adjustmentTemp, 
                pageSize: that.gV.pageSize,
                callback: function(def, t){
                	var afterData = []
                    var obj = [{
                        url: site_url.getUserTrackRecord_api,
						data: {
							"pageNum": that.gV.pageCurrent,
							"pageSize": that.gV.pageSize
						},
						//async: false,
						contentTypeSearch: true,
						needDataEmpty: false,  
						needLoading: false,                     
                        callbackDone: function(json) {     
                            var data = json.data.list;
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none")
                            } else {
                            	var beforeData = json.data.list;
								// for(var i = 0; i < beforeData.length; i++) {
									//拿到页面要显示的时间
									// beforeData[i].createTime1 = beforeData[i].createTime.split(" ")[1];
									// if(beforeData[i].createTime.split(" ")[0] == that.gV.tempArr[that.gV.tempArr.length - 1]) {
									// 	afterData.push({
									// 		time: "",
									// 		list: [beforeData[i]]
									// 	});
									// } else {
									// 	//当日期数组中没有新获取的数据中的时间时
									// 	if(that.gV.tempArr.indexOf(beforeData[i].createTime.split(" ")[0]) === -1) {
									// 		afterData.push({
									// 			time: beforeData[i].createTime.split(" ")[0],
									// 			list: [beforeData[i]]
									// 		});
									// 		that.gV.tempArr.push(beforeData[i].createTime.split(" ")[0]);
									// 	} else {
									// 		for(var j = 0; j < afterData.length; j++) {
									// 			console.log(afterData[j].time)
									// 			if(afterData[j].time == beforeData[i].createTime.split(" ")[0]) {
									// 				afterData[j].list.push(beforeData[i]);
									// 				break;
									// 			}
									// 		}
									// 	};
									// }
									// var obj = {time: '',list:[]};
								// }
								function distinct (arr) {
									for(var i = 0; i < arr.length; i++) {
										for(var j = i + 1; j < arr.length ; j++) {
											if(arr[i] === arr[j]) {
												arr.splice(j, 1)
												j--;
											}
										}
									}
								}
								var arr = []
								var timeArr = []
								for(var i = 0 ; i < beforeData.length; i++) {
									timeArr.push(beforeData[i].createTime.split(" ")[0])
								}

								distinct(timeArr)

								for(var j = 0; j < timeArr.length; j++) {
									var obj = {}
									obj.time = timeArr[j]
									var list = []
									for(var m = 0 ; m < beforeData.length; m++) {
										if(beforeData[m].createTime.split(" ")[0] == timeArr[j]) {
											beforeData[m].createTime1 = beforeData[m].createTime.split(" ")[1]
											list.push(beforeData[m])
										}
									}
									obj.list = list
									arr.push(obj)
								}
									
                                def && def.resolve( arr, that.gV.pageCurrent);
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
			});*/
		},
		//获取数据函数
		/*getData: function(t) {
			var that = this
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
					if(json.data.length == 0) { // 没有记录不展示
						that.$e.noData.show();
						$('.adjustmentRecord').hide();
						return false;
					} else {
						if(json.data.list&&json.data.list.length){
							var beforeData = json.data.list;
						}
						for(var i = 0; i < beforeData.length; i++) {
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
									for(var j = 0; j < afterData.length; j++) {
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
							t.dPullupToRefresh(false);
						}
						// 页面++
						that.gV.pageCurrent++;
						//去掉mui-pull-bottom-pocket的mui-hidden
						$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
						// 将列表插入到页面上
						console.log(afterData)
						generateTemplate(afterData, that.$e.recordList, that.$e.adjustmentTemp);
					}, 200)
				}
			}];
			$.ajaxLoading(obj);
		},*/
		//注册事件
		events: function() {

		}
	};
	somePage.init();
});