/*
 * 我的奖励 
 * @author zhangyanping 2019-11-12
*/
require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJsCom/splitUrl.js');
var Base64 = require('@pathIncludJs/vendor/base64/base64.js');

$(function() {

    var reward = {
       
        init: function() {
            var that = this;
            that.initMui();
            that.events();
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;

            var height = windowHeight;
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
        getData: function(t) {
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
        },
        events: function() {
        	var that = this;

        },
    };
    reward.init();
});





