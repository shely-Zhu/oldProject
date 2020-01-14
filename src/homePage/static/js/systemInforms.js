/**
 * 消息中心-系统通知
 * @author yanruiting 2019-11-15
 * 从消息中心页面携带参数   mesType 0系统通知，1产品公告，2活动通知，3交易动态
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');

$(function() {
    var somePage = {
        //获取页面元素
        $e: {
            informsListWrapperId: $("#informsListWrapper"), // 消息列表盒子
            informsListTemp: $('#informsList-template'), // 消息列表模板
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        //全局变量
        gV: {
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            mesType: splitUrl['mesType'] // 1产品公告；2活动通知；3交易动态4;系统通知
        },
        //页面初始化函数
        init: function() {
            var that = this;
            this.getTitle();
            that.initMui();
            this.events()
        },
        getTitle: function() {
            var mesType = Number(this.gV.mesType);
            switch (mesType) {
                case 0:
                    $("#HeadBarpathName").html("系统通知");
                    break;
                case 1:
                    $("#HeadBarpathName").html("产品公告");
                    break;
                case 2:
                    $("#HeadBarpathName").html("活动通知");
                    break;
                case 3:
                    $("#HeadBarpathName").html("交易动态");
                    break;
            };
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;
            var height = windowHeight - $(".HeadBarConfigBox").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
            $.pullRefresh({
                wrapper: $('.list'),
                class: 'listItem',
                template: that.$e.informsListTemp, 
                pageSize: that.gV.pageSize,
                callback: function(def, t){
                    var obj = [{
                        url: site_url.noticeAndTransDynamicList_api,
                        data: {
                            "pageNo": that.gV.pageCurrent, //非必须，默认为1
                            "pageSize": that.gV.pageSize, //非必须，默认为10
                            "mesType": that.gV.mesType
                        },                        
                        needDataEmpty: true,
                        needLoading: false,
                        callbackDone: function(json) {     
                            var data = json.data.list;
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none")
                                that.$e.noData.show()
                            } else {
                                def && def.resolve( that.dealData(data), that.gV.pageCurrent);
                                that.gV.pageCurrent++;
                            }
                            $(".netLoading").hide();
                        },
                        callbackNoData: function( json ){  
                            if(that.gV.pageCurrent == 1) {
                                $(".list").css("display", "none");
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
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            //执行ajax请求
                            that.getInformsListData(this);
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
                //隐藏loading，调试接口时需要去
                掉
                //setTimeout(function(){
                that.$e.listLoading.hide();
                //}, 2000);
                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });*/
        },
        // 获取消息中心列表
        /*getInformsListData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.noticeAndTransDynamicList_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": "10", //非必须，默认为10
                    "mesType": that.gV.mesType
                },
                needLogin: true, //需要判断登录是否过期
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;
                    console.log(json)
                    if (json.data.total == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        return false;
                    } else {
                        data = json.data.list;
                    }
                    // 处理日期
                    data = that.dealData(data);
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
                        generateTemplate(data, that.$e.informsListWrapperId, that.$e.informsListTemp);
                        alwaysAjax($("#informsListWrapper"))
                    }, 200)

                },
                callbackNoData: function(json) {
                    if(that.gV.pageCurrent == 1) {
                        $(".noDataCon").css("display", "block")
                        $(".mui-table-view").css({"transform": "none!important", "position": "static"})
                        $(".mui-table-view-cell").css({"background": "#eeeeee"})
                    }
                },
            }];
            $.ajaxLoading(obj);
        },*/
        dealData: function(data) {
            $.each(data, function(a, b) {
                b.date = b.createTimeStr.split(" ")[0];
                b.time = b.createTimeStr.split(" ")[1];
                if(b.readStatus == 0) {
                    b.badgeFlag = true;
                } else {
                    b.badgeFlag = false;
                }
            })
            return data;
        },
        events: function() {
            var that = this;
            //跳转到通知详情页面
            mui("body").on('mdClick', '.systemInformItem', function() {
                window.location.href = site_url.noticeDetails_url + '?noticeId=' + $(this).attr('noticeId') + '&mesType=' + that.gV.mesType;
            },{
                'htmdEvt': 'notice_01'
            })
        }
    };
    somePage.init();
});