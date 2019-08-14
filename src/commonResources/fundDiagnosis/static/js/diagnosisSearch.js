/*
 * @page: 基金诊断搜索
 * @Author: songxiaoyu
 * @Date:   2019-08-09 11:54:51
 * @Last Modified by:   songxiaoyu
 * @description:
 */

require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function() {

    var hotDiagnosis = {
        $e: {
            hotFundList: $('.hotFundList .card-theme'), // 热门列表
            fundListTemp: $('#fundList-template'), // 基金区域
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            noData: $('.noData'), //没有数据的结构
        },
        gV: {
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            search: false, // 搜索
        },
        page: 1,
        init: function() {
            var that = this;
            that.beforeFunc();
            that.initMui(); // 兼容下面函数调用
            that.events();
        },
        beforeFunc: function(t) {
            var that = this;

            //设置切换区域的高度
            //计算节点高度并设置
            var height = windowHeight - $('.fixedWrap').height();

            if (!$('.list .contentWrapper').hasClass('setHeight')) {
                $('.list, .contentWrapper').height(height).addClass('setHeight');
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
                            that.getData(this);
                        }
                    }
                }
            });

            mui.ready(function() { //init后需要执行ready函数，才能够初始化出来

                //隐藏当前的加载中loading
                if (!$('.list').hasClass('hasPullUp')) {
                    $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }

                //显示loading
                that.$e.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.contentWrapper').pullRefresh().pullupLoading();

                that.$e.listLoading.hide();

                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });
        },
        // 获取搜索数据
        getData: function(t) {
            var that = this;
            debugger;
            mui('.contentWrapper').pullRefresh().pullupLoading();

            var obj = [{
                url: site_url.fundRecommend, //私募产品列表
                data: {
                    "pageCurrent": that.page,
                    "pageSize": 10,

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    var dataList;

                    if (json.data.totalCount == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        return false;
                    } else {
                        dataList = json.data.fundRecommendList;
                    }


                    setTimeout(function() {

                        if (dataList.length < that.gV.pageSize) {

                            if (that.gV.pageCurrent == 1) { //第一页时

                                if (dataList.length == 0) {
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
                        generateTemplate(dataList, that.$e.hotFundList, that.$e.fundListTemp);
                    }, 200)

                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        // 防抖
        debounce: function(fn, wait) {
            var timeout = null;
            var that = this;
            that.gV.search = true;

            return function() {
                console.log(that);
                console.log(timeout);
                if (timeout !== null) clearTimeout(timeout);

                timeout = setTimeout(fn.apply(that), wait);
            }
        },
        events: function() {
            var that = this;
            debugger;

            // 搜索框
            var $searchInput = document.getElementById("searchInput");

            $searchInput.oninput = that.debounce(that.initMui, 300);
        },
    };
    hotDiagnosis.init();
});