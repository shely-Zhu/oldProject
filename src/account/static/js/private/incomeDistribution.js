/*
 * @page: 收益分配明细
 * @Author: liliang
 * @Date:   2019-11-20
 * @Last Modified by:   
 * @description:
 */


require('@pathCommonBase/base.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');



$(function() {
    var data = {
        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            transTemp: $('#trans-template'), //模板
            contentWrapper: $('.contentWrapper'), //内容区域
            recordList: $('.recordList'), // 调仓记录
        },
        gV: { //一些设置
            aP: {
                pageNo: 1,
                pageSize: 3,
            },
            list_template: '', //列表的模板，生成后存放在这里
            listToTop: '', // 滑动区域距离顶部距离
            navToTop: '', // 滑动nav距离顶部距离
            wrapperName: null

        },
        html: '', //存放生成的html
        init: function() { //初始化函数

            var that = this;

            //初始化第一屏区域的上拉加载
            that.initMui();


            //事件监听
            that.events();
        },


        //初始化mui的上拉加载
        initMui: function() {
            var that = this;
            var height = windowHeight - $(".HeadBarConfigBox").height();
            if (!$(".list").hasClass('setHeight')) {
                $(".list").height(height).addClass('setHeight');
            }
            $.pullRefresh({
                wrapper: $('.list'),
                class: 'list-wrap',
                template: that.getElements.transTemp, 
                pageSize: that.gV.aP.pageSize,
                callback: function(def, t){
                    var obj = [{
                        url: site_url.yieldAssignList_api,
                        needLoading: false,
                        data: {
                            "projectId":splitUrl()["projectId"] ,
                            "pageNo": that.gV.aP.pageNo, //非必须，默认为1
                            "pageSize": that.gV.aP.pageSize//非必须，默认为10
                        },                        
                        needDataEmpty: true,
                        callbackDone: function(json) {     
                            var data = json.data.pageList;
                            if(that.gV.aP.pageNo == 1 && data.length == 0) {
                                $(".list").css("display", "none");
                                that.getElements.noData.show();
                            } else {
                                def && def.resolve( data, that.gV.aP.pageNo);
                                that.gV.aP.pageNo++;
                            }
                        },
                        callbackNoData: function( json ){  
                            if(that.gV.aP.pageNo == 1) {
                                $(".list").css("display", "none");
                            }
                            def && def.reject( json, that.gV.aP.pageNo );
                        },
                        callbackFail: function(json) {
                            def && def.reject( json, that.gV.aP.pageNo );
                        },
                    }];
                    $.ajaxLoading(obj); 
                }
            })
            /*var that = this;
            var height = windowHeight - $(".topTitle").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
                $('.listBox').height(height);
            }
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
				that.getElements.listLoading.show();

				//这一句初始化并第一次执行mui上拉加载的callback函数
				mui('.contentWrapper').pullRefresh().pullupLoading();

				//隐藏loading，调试接口时需要去掉
				//setTimeout(function(){
				that.getElements.listLoading.hide();
				//}, 2000);

				//为$id添加hasPullUp  class
				$('.list').addClass('hasPullUp');
			});*/
        },
        /*getData: function(t) {
            var that = this;
            var obj = [{ // 系统调仓记录列表
                url: site_url.yieldAssignList_api,
                data: {
                    "projectId":splitUrl()["projectId"] ,
                    "pageNo": that.gV.aP.pageNo, //非必须，默认为1
                    "pageSize": that.gV.aP.pageSize//非必须，默认为10
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    console.log(json)
                    var data;
                    if (json.data.length == 0) { // 没有记录不展示
                        $(".list").hide()
                        that.getElements.noData.show();
                        return false;
                    } else {
                        data = json.data.pageList
                    }
                    setTimeout(function() {
                        if (data.length < that.gV.aP.pageSize) {

                            if (that.gV.aP.pageNo == 1) { //第一页时

                                if (data.length == 0) {
                                    // 暂无数据显示
                                    that.getElements.noData.show();
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
                        that.gV.aP.pageNo++;
                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                            // 将列表插入到页面上
                        generateTemplate(data, that.getElements.recordList, that.getElements.transTemp);

                    }, 200)

                },
                callbackNoData:function(){
                   // 暂无数据显示
                   that.getElements.noData.show();
                },

            }];
            $.ajaxLoading(obj);
        },*/
        events: function() { //绑定事件
            var that = this;
            //无缝滚动
            //alwaysAjax(".recordList")

        }
    };
    data.init();
});