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

var tipAction = require('../../../common/js/components/tipAction.js');

var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {

    var reward = {
        $e: {
            adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
            recordList: $('.recordList'), // 调仓记录
            rewardTemp: $('#reward-template'), // 最新调仓模板
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //

        },
        gV: { // 全局变量

            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            listLength: 0,
        },
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
                    container: '.rewardWrapper',
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
                mui('.rewardWrapper').pullRefresh().pullupLoading();

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
                url: site_url.getPrizeInfo_api,
                data: {
                    "pageNum": that.gV.pageCurrent,
                    "pageSize": that.gV.pageSize
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;

                    console.log(JSON.stringify(json.data.list.length));

                    if (json.data.list.length == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        //$('.reward').hide();
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

                        $.each(data, function(i, el) {

                            if (el.isAvailable == "0") {
                                el.AvailableValue = true; //有效
                                
                                el.xnParentClass = "virtual";
                                el.xnChildClass = "virRewardDetail";

                            } else if (el.isAvailable == "1") {

                                el.AvailableValue = false; //无效
                                el.imgvalue = true; //显示无效图片

                                el.xnParentClass = "invalid";
                                el.xnChildClass = "invalidRewardDetail";

                            }
                            if (el.prizeType == "1") { //实物奖品
                                el.prizeValue = true;
                            } else if (el.prizeType == "2") { //虚拟奖品
                                el.prizeValue = false;
                            }
                        });
                        console.log(JSON.stringify(data));


                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.rewardWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 将列表插入到页面上
                        generateTemplate(data, that.$e.recordList, that.$e.rewardTemp);

                        // 第一个调仓记录默认展开
                        //$('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');

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





