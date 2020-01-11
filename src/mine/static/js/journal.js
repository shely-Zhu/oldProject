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
			// this.islogin()
		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;
			var height = window.innerHeight - $('#HeadBarConfigBox').height()-$('.tips').height();

			$(".tips").css("top",$(".HeadBarConfigBox").height())
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
						// needLoading: false,                     
                        callbackDone: function(json) {     
                            var data = json.data.list;
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
								$(".list").css("display", "none")
								that.$e.noData.show();
                            } else {
								var beforeData = json.data.list;
								for (var i = 0; i < beforeData.length; i++) {
									if(beforeData[i].typeDes == "登录"){
										beforeData[i].typeDes = true
									}else{
										beforeData[i].typeDes = false
									}
								}
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
								that.$e.noData.show();
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
			
		},
		
		//注册事件
		events: function() {

		}
	};
	somePage.init();
});