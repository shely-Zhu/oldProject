/*
 * @page: 基金诊断
 * @Author: songxiaoyu
 * @Date:   2019-08-09 11:54:51
 * @Last Modified by:   songxiaoyu
 * @description:
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonJs/components/headBarConfig.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
// require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');


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
            var height = windowHeight - $(".fixedWrap").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }

            $.pullRefresh({
                wrapper: $('.list'),
                class: 'listItem',
                template: that.$e.fundListTemp, 
                pageSize: that.gV.pageSize,
                callback: function(def, t){
                    var obj = [{
                        url: site_url.fundRecommend_api, //热门诊断推荐
                        data: {
                            "pageCurrent": that.gV.pageCurrent,
                            "pageSize": 10,
                        },
                        needDataEmpty: false,
                        needLoading: false,
                        callbackDone: function(json) {     
                            var data = json.data.pageList;
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none");
                                that.$e.noData.show()
                            } else {
                                // 给data添加图片
                                $.each(data, function(i, el) {
                                    // 只有前3个需要加，大于3直接退出
                                    if (i > 2) {
                                        return false;
                                    }
                                    switch (el.serialNumber) {
                                        case '1':
                                            el.first = true;
                                            break;
                                        case '2':
                                            el.second = true;
                                            break;
                                        case '3':
                                            el.third = true;
                                            break;
                                    }
                                })
                                def && def.resolve( data, that.gV.pageCurrent);
                                that.gV.pageCurrent++;
                            }
                        },
                        callbackNoData: function( json ){  
                            if(that.gV.pageCurrent == 1) {
                                $(".list").css("display", "none");
                                that.$e.noData.show()
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
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {

                            // 热门诊断
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

                //隐藏loading，调试接口时需要去掉
                //setTimeout(function(){
                that.$e.listLoading.hide();
                //}, 2000);


                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });*/
        },
        /*getData: function(t) {
            var that = this;

            mui('.contentWrapper').pullRefresh().pullupLoading();

            var obj = [{
                url: site_url.fundRecommend_api, //热门诊断推荐
                data: {
                    "pageCurrent": that.gV.pageCurrent,
                    "pageSize": 10,

                },
                needDataEmpty: false,
                needLoading: false,
                callbackDone: function(json) {
                    var dataList;

                    // 待定
                    if (json.data.totalCount == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        return false;
                    } else {
                        dataList = json.data.pageList;
                    }

                    // 给data添加图片
                    $.each(dataList, function(i, el) {
                        // 只有前3个需要加，大于3直接退出
                        if (i > 3) {
                            return false;
                        }
                        switch (el.serialNumber) {
                            case '1':
                                el.first = true;
                                break;
                            case '2':
                                el.second = true;
                                break;
                            case '3':
                                el.third = true;
                                break;
                        }
                    })

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
        },*/
        // 获取专属报告
        getReport: function() {
            var obj = [{
                url: site_url.exclusiveDiagnosisReport_api, //基金诊断-获取专属诊断报告
                needDataEmpty: false,
                callbackDone: function(json) {
                    $.elasticLayerTypeTwo({
                        id: "tip",
                        title: '提示',
                        p: '<p>提交申请成功！该功能暂未开发查询功能，稍后我们会尽快将专属诊断报告发送至您的专属理顾</p>',
                        buttonTxt: '知道了',
                        htmdEvtYes:'hotDiagnosis_04',
                        zIndex: 100,
                    })
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);

        },
        events: function() {
            var that = this;

            mui("body").on("mdClick", ".topSearch", function() {
                window.location.href = site_url.diagnosisSearch_url;
            }, {
                'htmdEvt': 'hotDiagnosis_02'
            });

            // 跳转详情页
            mui("body").on("mdClick", ".hd_to_detail", function(e) {
                var fundCode = $($(this).find('.lightColor')[0]).html();
                window.location.href = site_url.diagnosisDetail_url + '?fundCode=' + fundCode;
            }, {
                'htmdEvt': 'hotDiagnosis_03'
            });

            // 获取专属报告
            mui("body").on("mdClick", ".btnBottom", function() {
                that.getReport();
            }, {
                'htmdEvt': 'hotDiagnosis_01'
            });
        }
    };
    hotDiagnosis.init();
});