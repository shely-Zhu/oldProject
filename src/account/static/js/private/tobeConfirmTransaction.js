/*
 * @page: 已确认交易(定融定投)
 * @Author: peicongcong
 * @Date:   2019-11-19
 * @Last Modified by:   
 * @description:
 */

require('@pathIncludJs/base.js');

//ajax调用
require('@pathCommonJs/ajaxLoading.js');

//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
// 切换

require('@pathCommonJsCom/goTopMui.js');

require('@pathCommonJs/components/headBarConfig.js');

//黑色提示条的显示和隐藏
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var tipAction = require('@pathCommonJsCom/tipAction.js');
var transcationTem = require('@pathCommonJsCom/account/transcationTem.js');


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
                pageNo: 1,
                pageSize: 10,
            },
            aThis: null,
            list_template: '', //列表的模板，生成后存放在这里
            listToTop: '', // 滑动区域距离顶部距离
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

                //隐藏loading，调试接口时需要去掉
                //setTimeout(function(){
                that.getElements.listLoading.hide();
                //}, 2000);


                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });
        },
        getData: function(t, type) {
            var that = this;
            var obj = [{
                url: site_url.getTradeList_api,
                data: {
                    "pageNo": that.gV.aP.pageNo, //非必须，默认为1
                    "pageSize": "10", //非必须，默认为10
                    isConfirm: that.gV.type,
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
                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 将列表插入到页面上
                        transcationTem(data, that.getElements.contentWrap, that.getElements.transTemp, type)

                    }, 200)


                }

            }];
            $.ajaxLoading(obj);
        },
        openTipCon: function(type, content, id) {
            $('#tipCon .tipCon').html(content);
            $('.mask').show();
            $('#tipCon').show();
            mui("body").on('tap', '.tipContainer .todo', function(e) {
                if (type == 'assign') {
                    //转让

                } else if (type == 'assignee') {
                    //受让
                }
                $('.mask').hide();
                $('#tipCon').hide();
            })

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
                    that.gV.aP.pageNo = 1;
                    that.getData(that.gV.aThis, 1);
                })
                //取消受让、取消预约、取消转让
            mui("body").on('tap', '.cancelBtn', function(e) {
                var type = $(this).attr('data-type');
                var id = $(this).attr('data-id');
                if (type == 'assign') { //转让
                    that.openTipCon('assign', '您确定要取消转让申请吗？', id);
                } else if (type == 'assignee')
                    that.openTipCon('assign', '您确定要取消受让申请吗？', id);
            })
            mui("body").on('tap', '.tipContainer .cancel', function(e) {
                $('.mask').hide();
                $('#tipCon').hide();

            })
        }
    };
    data.init();
});