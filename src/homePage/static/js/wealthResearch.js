/*
 * @Author: sunfuping 
 * @Date: 2019-11-25 20:16:06 
 * @Last Modified by: sunfuping
 * @Last Modified time: 2019-11-25 20:56:00
 * 财富研究
 */

require('@pathIncludJs/vendor/config.js');
//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function() {
    let somePage = {
        //获取页面元素
        $e: {
            tab: $('.tabHeader .tab'),
            tabBody: $('.tabBody .tabContent'),
            contentWrap: $('.contentWrapper'),
            contentWrap1: $('.contentWrapper1'),
            contentWrap2: $('.contentWrapper2'),
            contentWrap3: $('.contentWrapper3'),
            item: $('.mui-control-item'),
            temp: $('#item-template'),
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构

        },
        //全局变量
        gV: {
            indexNo: '',
            pageSize: 10,
            pageCurrent: 1,
            aThis: '',
        },
        //页面初始化函数
        init: function() {
            var that = this;
            that.events()
            that.initMui('.list', '.contentWrapper');
            that.initMui('.list1', '.contentWrapper1');
            that.initMui('.list2', '.contentWrapper2');
            that.initMui('.list3', '.contentWrapper3');
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
                            that.gV.aThis = this;
                            //执行ajax请求
                            if (wrapperName == '.contentWrapper') {
                                that.getInformsListData(this);
                            } else if (wrapperName == '.contentWrapper1') {
                                that.getInformsListData1(this);
                            } else if (wrapperName == '.contentWrapper2') {
                                that.getInformsListData2(this);
                            } else if (wrapperName == '.contentWrapper3') {
                                that.getInformsListData3(this);
                            }

                        }
                    }
                }
            });
            // init后需要执行ready函数，才能够初始化出来
            mui.ready(function() {
                //隐藏当前的加载中loading
                if (!$(listClassName).hasClass('hasPullUp')) {
                    $(listClassName).find('.mui-pull-bottom-pocket').addClass('mui-hidden');
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
                $(listClassName).addClass('hasPullUp');
            });
        },
        // 获取消息中心列表
        getInformsListData(t) {
            var that = this;
            var obj = [{
                url: site_url.noticeAndTransDynamicList_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": "10", //非必须，默认为10
                },
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
                        // 将消息列表插入到页面上
                        generateTemplate(data, that.$e.contentWrap, that.$e.temp);

                    }, 200)

                }
            }];
            $.ajaxLoading(obj);
        },
        getInformsListData1(t) {
            var that = this;
            var obj = [{
                url: site_url.noticeAndTransDynamicList_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": "10", //非必须，默认为10
                },
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
                        // 将消息列表插入到页面上
                        generateTemplate(data, that.$e.contentWrap1, that.$e.temp);

                    }, 200)

                }
            }];
            $.ajaxLoading(obj);
        },
        //注册事件
        events: function() {
            var that = this;
            $(".mui-slider").on("slide", function(e) {
                var $this = $(this);
                $("b").removeClass('borderBottom');
                $("b").eq(e.detail.slideNumber).addClass('borderBottom');
                //模板渲染页面
                if (e.detail.slideNumber == 0) {
                    that.getInformsListData(that.gV.aThis);
                    $('#item1').show();
                } else if (e.detail.slideNumber == 1) {
                    that.getInformsListData1(that.gV.aThis);
                } else if (e.detail.slideNumber == 2) {
                    that.getInformsListData2(that.gV.aThis);
                } else if (e.detail.slideNumber == 3) {
                    that.getInformsListData3(that.gV.aThis);
                }

            })
        }
    };
    somePage.init();
});