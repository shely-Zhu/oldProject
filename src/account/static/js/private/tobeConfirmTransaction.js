/*
 * @page: 已确认交易、待确认交易
 * @Author: peicongcong
 * @Date:   2019-11-19
 * @Last Modified by:   
 * @description:
 */

require('@pathCommonBase/base.js');

//ajax调用
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');



//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
// 切换

require('@pathCommonJsCom/goTopMui.js');

//黑色提示条的显示和隐藏
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var transcationTem = require('@pathCommonJsCom/account/transcationTem.js');
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');

$(function() {
    var data = {
        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            transTemp: $('#trans-template'), //模板
            contentWrap: $('.contentWrapper li'), //内容区域
        },
        gV: { //一些设置
            aP: {
                pageNum: 1,
                pageSize: 10,
            },
            aThis: null,
            list_template: '', //列表的模板，生成后存放在这里
            listToTop: '', // 滑动区域距离顶部距离-
            navToTop: '', // 滑动nav距离顶部距离
            type: 0, //是否确认
            businessType: $('.hopperCon li.active').attr('data'),
        },
        html: '', //存放生成的html
        init: function() { //初始化函数

            var that = this;
            //初始化第一屏区域的上拉加载
            that.initMui();
            // 如果是已确认交易展示筛选漏斗


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
            //地址栏里confirmed代表已确认  toBeConfirmed代表待确认
            if (splitUrl['type'] == 'confirmed') {
                $('.hopper').show();
                $('#HeadBarpathName').attr("data", '已完成交易').html('已完成交易');
                that.gV.type = 1;
            } else if (splitUrl['type'] == 'toBeConfirmed') {
                $('.hopper').hide();
                $('#HeadBarpathName').attr("data", '待确认交易').html('待确认交易');
                that.gV.type = 0;
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
                            that.gV.aThis = this;
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
                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });
        },
        getData: function(t, type) {
            var that = this;
            var obj = [{
                url: site_url.getTradeList_api,
                data: {
                    "pageNum": that.gV.aP.pageNum, //非必须，默认为1
                    "pageSize": "10", //非必须，默认为10
                    "isConfirm": that.gV.type,
                    "businessType": that.gV.businessType,
                },
                callbackDone: function(json) {
                    var data;
                    if (json.data.pageList && json.data.pageList.length == 0) { // 没有记录不展示
                        $(".list").hide()
                        that.getElements.noData.show();
                        return false;
                    } else {
                        data = json.data.pageList;
                    }
                    setTimeout(function() {
                        if (data.length < that.gV.aP.pageSize) {
                            if (that.gV.aP.pageNum == 1) { //第一页时
                                if (data.length == 0) {
                                    // 暂无数据显示
                                    that.getElements.noData.show();
                                    return false;

                                } else { // 没有更多数据了
                                    t.endPullupToRefresh(true);
                                }
                            } else {
                                //其他页-没有更多数据
                                t.endPullupToRefresh(true)
                            }
                        } else { // 还有更多数据;
                            t.endPullupToRefresh(false);
                        }
                        // 页面++
                        that.gV.aP.pageNum++;
                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 将列表插入到页面上
                        transcationTem(data, that.getElements.contentWrap, that.getElements.transTemp, type)

                    }, 200)


                },
                callbackNoData: function() {
                    that.getElements.noData.show();
                }

            }];
            $.ajaxLoading(obj);
        },
        events: function() { //绑定事件
            var that = this;
            alwaysAjax('.mui-table-view-cell');
            mui("body").on('tap', '.hopper', function(e) {
                    $('.mask').show();
                    $('.hopperCon').show();

                })
                //点击筛选数据
            mui("body").on('tap', '.hopperCon li', function(e) {
                    $('.list').show();
                    that.getElements.noData.hide();
                    $(this).addClass('active').siblings('li').removeClass('active');
                    $('.mask').hide();
                    $('.hopperCon').hide();
                    that.gV.businessType = $(this).attr('data');
                    // 重置上拉加载
                    that.gV.aP.pageNum = 1;
                    that.getElements.contentWrap.html('');
                    //重新初始化
                    that.getElements.listLoading.show();
                    that.getData(that.gV.aThis);
                    mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 0);
                })
                // 点击遮罩隐藏
            mui("body").on('tap', '.mask', function(e) {
                    $('.mask').hide();
                    $('.hopperCon').hide();
                })
                //取消受让、取消预约、取消转让
            mui("body").on('tap', '.cancelBtn', function(e) {
                    var type = $(this).attr('data-type');
                    var id = $(this).attr('data-id');
                    if (type == 'assign') { //转让
                        var obj = {
                            p: '<p>您确定要取消转让申请吗？</p>',
                            yesTxt: '确认',
                            celTxt: '取消',
                            hideCelButton: false,
                            zIndex: 100,
                            callback: function(t) {

                            },
                        };
                        $.elasticLayer(obj)


                    } else if (type == 'assignee') {
                        var obj = {
                            p: '<p>您确定要取消受让申请吗？</p>',
                            yesTxt: '确认',
                            celTxt: '取消',
                            hideCelButton: false,
                            zIndex: 100,
                            callback: function(t) {

                            },
                        };
                        $.elasticLayer(obj)
                    } else if (type == 'appointment') {
                        var obj = {
                            p: '<p>您确定要预约吗？</p>',
                            yesTxt: '确认',
                            celTxt: '取消',
                            hideCelButton: false,
                            zIndex: 100,
                            callback: function(t) {

                            },
                        };
                        $.elasticLayer(obj)
                    }


                })
                //点击状态文字出现弹框
            mui("body").on('tap', '.openTip', function(e) {
                    $('.mask').show();
                    var conText = $(this).siblings('.tipContent').html();
                    var obj = {
                        p: '<p>' + conText + '</p>',
                        yesTxt: '我明白了',
                        hideCelButton: true,
                        zIndex: 100,
                        callback: function(t) {

                        },
                    };
                    $.elasticLayer(obj);

                })
                //功能按钮
            mui("body").on('tap', '.toDetail', function(e) {
                var type = $(this).attr('type');
                var id = $(this).attr('reserveId');
                if (type == 'toCertif') { //去合格投资者认证

                } else if (type == 'toSign') { //去签合同
                    window.location.href = site_url.seeSign_url + '?reserveId=' + id;
                } else if (type == 'toSee') { //查看合同

                } else if (type == 'toUploadM') { //去上传汇款凭证

                }

            })
        }
    };
    data.init();
});