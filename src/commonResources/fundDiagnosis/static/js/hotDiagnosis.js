/*
 * @page: 基金诊断
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


$(function() {

    var hotDiagnosis = {
        $e: {
            top: $('.top'), // 总资产区域
            combiT: $('.combiT'), // 标题
            amountCom: $('.amountCom'), // 在途金额
            amountShare: $('.amountShare'), // 资产配置区域
            followAdjustment: $('.followAdjustment'), // 资产配置区域
            redemption: $('.redemption'), // 赎回按钮
            buyBtn: $('.buyBtn'), // 买入按钮
        },
        gV: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            closeBtn: $('.branchSearchArea .close'), //查询区域关闭按钮
        },
        page:1,
        init: function() {
            var that = this;
            that.beforeFunc();
            that.initMui();
            that.events();
        },
        beforeFunc: function() {
            var that = this;

            //设置切换区域的高度
            //计算节点高度并设置
            var height = windowHeight - $('.branchHeader').height();

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

                            //执行ajax请求
                            that.getData(this);
                        }
                    }
                }
            });
        },
        getData: function(key, t) {
            var that = this;

            //重设ajaxFail
            that.ajaxFail = false;

            var obj = [{
                url: site_url.fundRecommend, //私募产品列表
                data: {
                    "pageCurrent":that.page,
                    "pageSize":10,
                    
                },
                needDataEmpty: false,
                callbackDone: function(json) {

                    that.jsonData = json.data;

                    if (!$.util.objIsEmpty(that.jsonData.fundRecommendList)) {
                        //有数据，拼模板

                        var tplm = $("#fundList-template").html(),
                            template = Handlebars.compile(tplm);

                        that.html = template(that.jsonData.fundRecommendList);

                        setTimeout(function() {

                            if (that.jsonData.fundRecommendList.length < 10) {
                                t.endPullupToRefresh(true);

                            } else {
                                t.endPullupToRefresh(false);
                            }

                            that.page++;

                            if ($('.list').hasClass('refresh')) {
                                //当前为重新搜索，模板结构需要html进去
                                $('.branchBody').find('.contentWrapper .mui-table-view-cell .mui-card').html(that.html);

                                //去掉list的refresh class
                                $('.list').removeClass('refresh');

                                //隐藏回到顶部按钮
                                $('.goTopBtn').hide();

                            } else {
                                //非重新搜索，即上拉发起的请求，结果append进去
                                $('.branchBody').find('.contentWrapper .mui-table-view-cell .mui-card').append(that.html);

                            }

                            //$('.branchBody').find('.contentWrapper .mui-table-view-cell').html(that.html);    
                            $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');

                        }, 200)

                    } else {
                        //没有数据

                        if (that.page == 1) {
                            //第一页时
                            $('.branchBody .mui-table-view-cell .mui-card').html(that.getElements.noData).addClass('noCon');
                            $('.branchBody').find('.noData').show().find('.mui-card');
                            //t.disablePullupToRefresh();
                            //此处不能使用disablePullupToRefresh，会导致上拉失去作用
                            t.endPullupToRefresh(true);

                            //隐藏回到顶部按钮
                            $('.goTopBtn').hide();

                        } else {
                            //其他页
                            t.endPullupToRefresh(true);
                            $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        }
                    }

                    //去掉loading
                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                    }, 200);
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                    //that.ajaxFail = true;
                }
            }]
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;

            
        },
    };
    hotDiagnosis.init();
});