/*
 * @page: 我的定投计划
 * @Author: liliang
 * @Date:   2019-11-23
 * @Last Modified by:   
 * @description:
 */
require('@pathCommonJsCom/utils.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js');
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js');
//路径配置文件
require('@pathIncludJs/vendor/config.js');
//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
// 切换
require('@pathCommonJsCom/tabScroll.js');
require('@pathCommonJsCom/goTopMui.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeFive.js');
require('@pathCommonJs/components/headBarConfig.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function () {
    var somePage = {
        $e: {
            recordList: $('.contentWrap'), // 调仓记录
            investmentPlanTemp: $('#investmentPlan-template'), // 最新调仓模板
            noDataOne: $('.noDataOne'), //没有数据的结构
            nothing: $('.nothing'), //没有计划
            endPlan: $(".endPlan"),  //已终止的定投计划
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构

        },
        gV: { // 全局变量
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            listLength: 0,
        },
        init: function () {
            var that = this;
            that.initMui();
            //that.getData()
            that.events();
        },
        //初始化mui的上拉加载
        initMui: function () {
            var that = this;

            var height = windowHeight - $(".title").height() - $(".topTitle").height() - $(".newPlan").height() - $(".noDataMore").height();
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
                        callback: function () {
                            //执行ajax请求
                            that.getData(this);
                        }
                    }
                }
            });

            //init后需要执行ready函数，才能够初始化出来
            mui.ready(function () {

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
            });
        },
        getData: function (t) {
            var that = this;

            var obj = [{
                url: site_url.protocolList_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": 10,//非必须，默认为10
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function (json) {
                    console.log(json);

                    var data;
                    if (json.data.pageList.length == 0) { // 没有记录不展示
                        $(".list").hide()
                        that.$e.nothing.show();
                        return false;
                    } else if (json.status == "0000" && json.data.pageList.length > 0) {
                        data = json.data.pageList;
                        that.$e.nothing.hide();
                    }
                    setTimeout(function () {

                        if (data.length < that.gV.pageSize) {

                            if (that.gV.pageCurrent == 1) { //第一页时

                                if (data.length == 0) {
                                    // 暂无数据显示
                                    return false;

                                } else { // 没有更多数据了
                                    t.endPullupToRefresh(true);
                                    that.$e.noDataOne.show();
                                }
                            } else {
                                //其他页-没有更多数据
                                t.endPullupToRefresh(true);
                            }
                        } else { // 还有更多数据
                            console.log(999)
                            t.endPullupToRefresh(false);
                        }
                        var len = json.data.pageList;
                        var fixStateNum = 0;
                        for (var i = 0; i < len.length; i++) {
                            if (len[i].fixState == 'A') {
                                len[i].fixState = "正常"
                            } else if (len[i].fixState == 'H') {
                                len[i].fixState = "终止"
                                fixStateNum + 1
                            } else {
                                len[i].fixState = "暂停"
                            }
                        }
                        if (fixStateNum > 0) {
                            that.$e.endPlan.show()
                            $(".stopPlan").html(fixStateNum)

                        } else {
                            that.$e.endPlan.hide()
                        }

                        // 将列表插入到页面上
                        generateTemplate(data, that.$e.recordList, that.$e.investmentPlanTemp);

                        if (that.gV.pageCurrent == 1) {
                            for (var i = 0; i < len.length; i++) {
                                if (len[i].fixState == "暂停") {
                                    $(".content-t span").eq(i).addClass("suspend")
                                } else {

                                }
                            }
                        } else {
                            for (var i = 0; i < len.length; i++) {
                                if (len[i].fixState == "暂停") {
                                    $(".content-t span").eq(i + 15 * that.gV.pageCurrent - 15).addClass("suspend")
                                } else {

                                }

                            }
                        }

                        // 页面++
                        that.gV.pageCurrent++;



                    }, 200)

                },

            }];
            $.ajaxLoading(obj);
        },
        transcoding: function (t) {
            if (t == 'A') {
                return '正常'
            } else if (t == 'H') {
                return '终止'
            } else {
                return '暂停'
            }

        },
        transcodingClass: function (t) {
            if (t == 'P') {
                return 'suspend'
            } else {
                return ''
            }
        },
        events: function () {
            var that = this;
            //新增 跳原生定投排行页
            mui("body").on("tap", ".newPlan", function () {
                window.location.href = site_url.investmentPlanRanking_url;
            });

            // 跳转详情页
            mui("body").on("tap", ".investmentPlan-item", function (e) {
                var scheduledProtocolId = $(this).data('id');
                window.location.href = site_url.pofCastSurelyDetails_url + '?scheduledProtocolId=' + scheduledProtocolId;
            });

        },
    };
    somePage.init();

})