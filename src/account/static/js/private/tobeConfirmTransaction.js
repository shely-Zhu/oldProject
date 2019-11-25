/*
 * @page: 已确认交易(定融定投)
 * @Author: peicongcong
 * @Date:   2019-11-19
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
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var tipAction = require('@pathCommonJsCom/tipAction.js');
// var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var transcationTem = require('../common/transcationTem.js');
// 
$(function() {
    var data = {
        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            transTemp: $('#trans-template'), //模板
            contentWrap: $('.contentWrap'), //内容区域
        },
        gV: { //一些设置
            aP: {
                pageNo: 1,
                pageSize: 10,
            },
            list_template: '', //列表的模板，生成后存放在这里
            listToTop: '', // 滑动区域距离顶部距离
            navToTop: '', // 滑动nav距离顶部距离
            type: splitUrl['type'], //是否确认
            businessType: $('.hopperCon li.active').attr('data'),
        },
        html: '', //存放生成的html
        init: function() { //初始化函数

            var that = this;
            //初始化第一屏区域的上拉加载
            that.initMui();
            // 如果是已确认交易展示筛选漏斗
            if (that.gV.type == 'confirmed') {
                $('.hopper').show();
                $('#HeadBarpathName').attr("data", '已完成交易').html('已完成交易');
            } else if (that.gV.type == 'toBeConfirmed') {
                $('.hopper').hide();
                $('#HeadBarpathName').attr("data", '待确认交易').html('待确认交易');
            }

            //事件监听
            that.events();
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;
            var height = windowHeight - $(".topTitle").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
                $('.warp').height(height);
            }


            mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            // debugger
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
                that.getElements.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.contentWrapper').pullRefresh().pullupLoading();

                //隐藏loading，调试接口时需要去掉
                //setTimeout(function(){
                that.getElements.listLoading.hide();
                //}, 2000);


                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });
        },
        getData: function(t) {
            var that = this;

            var obj = [{ // 系统调仓记录列表
                url: site_url.getConfirmTrade_api,
                data: {
                    "pageNo": that.gV.aP.pageNo, //非必须，默认为1
                    "pageSize": "10", //非必须，默认为10
                    isConfirm: that.gV.isConfirm,
                    businessType: Number(that.gV.businessType),
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;
                    if (json.data.tradeList.length == 0) { // 没有记录不展示
                        $(".list").hide()
                        that.getElements.noData.show();
                        return false;
                    } else {
                        data = json.data.tradeList;
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
                            t.endPullupToRefresh(false);
                        }
                        // 页面++
                        that.gV.aP.pageNo++;
                        // 将列表插入到页面上
                        transcationTem(data, that.getElements.contentWrap, that.getElements.transTemp)

                    }, 200)

                },

            }];
            $.ajaxLoading(obj);
        },
        events: function() { //绑定事件
            var that = this;
            mui("body").on('tap', '.hopper', function(e) {
                $('.mask').show();
                $('.hopperCon').show();

            })
            mui("body").on('tap', '.hopperCon li', function(e) {
                $(this).addClass('active').siblings('li').removeClass('active');
                $('.mask').hide();
                $('.hopperCon').hide();
                that.gV.businessType = $(this).attr('data');
                // $('.contentWrap').html('');
                that.gV.aP.pageNo = 1;
                that.getData();
            })
        }
    };
    data.init();
});