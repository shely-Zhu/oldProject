/*
 * @page: 我的定投计划
 * @Author: liliang
 * @Date:   2019-11-23
 * @Last Modified by:   
 * @description:
 */
require('@pathCommonBase/base.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
// 切换
require('@pathCommonJsCom/goTopMui.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');
$(function () {
    var somePage = {
        $e: {
            recordList: $('.contentWrap'), // 调仓记录
            investmentPlanTemp: $('#investmentPlan-template'), // 最新调仓模板
            noData: $(".noData"),
            endPlan: $(".endPlan"),  //已终止的定投计划
            stopPlan:$(".stoppPlan"), //已暂停的定投计划
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构

        },
        gV: { // 全局变量
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            listLength: 0,
            fixStateNum : 0,
            stopNum:0,//暂停的定投计划数
            stopPlanList:[],    // 已终止的定投计划
            stopPlanList_1:[],  //已暂停的定投计划
            accountType:"",
            paddingStatus:false,  //有进行中的计划状态
        },
        init: function () {
            var that = this;

            var wHeight = window.screen.height;

            //处理7p 8p页面初始底部白条
            if( $('html').height() < wHeight ){
                $('html').height( wHeight );
            }

            that.initMui();
            that.getUserInfo();
            that.events();
        },
        //初始化mui的上拉加载
        initMui: function () {
            var that = this;
            var height = windowHeight - $(".newPlan").height() - $(".topTitle").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
            $.pullRefresh({
                wrapper: $('.list'),
                class: 'listItem',
                template: that.$e.investmentPlanTemp, 
                pageSize: that.gV.pageSize,
                callback: function(def, t){

                    //请求已终止的定投列表，获取数量
                    that.getStopList();


                    var obj = [{
                        url: site_url.protocolList_api,
                        data: {
                            "pageNo": that.gV.pageCurrent, //非必须，默认为1
                            "pageSize": 10,//非必须，默认为10
                            "fixStatus": 'A' //定投协议状态 A-正常状态 H-终止状态
                        },
                        needDataEmpty: true,
                        needLoading: false,
                        callbackDone: function(json) {    
                            var data = json.data.pageList;
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none");
                                that.$e.noData.show();
                            } else {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].fixState == 'A') {
                                        data[i].fixStateStr = "进行中";
                                        data[i].show = true;
                                        that.gV.paddingStatus = true;
                                    } 

                                    //已终止的数据后台不会返回，这里H的判断实际上不需要
                                    // else if (data[i].fixState == 'H') {
                                    //     data[i].fixStateStr = "已终止"
                                    //     data[i].show = false
                                    //     that.gV.fixStateNum ++
                                    //     that.gV.stopPlanList.push(data[i])
                                    // } 
                                    //
                                    else {
                                        data[i].fixStateStr = "暂停";
                                        data[i].show = true;
                                        that.gV.stopNum ++;
                                        that.gV.stopPlanList_1.push(data[i]);
                                    }
                                    if(data[i].totalTradeTimes.length == 0){
                                        data[i].totalTradeTimes_s = false;
                                    }else{
                                        data[i].totalTradeTimes_s = true;
                                    }
                                }
                                // if (that.gV.fixStateNum > 0) {
                                //     that.$e.endPlan.show()
                                //     // var height = windowHeight - $(".newPlan").height() - $(".topTitle").height() - $(".endPlan").height();
                                //     // $('.list .contentWrapper').height(height)
                                //     $(".stopPlan").html(that.gV.fixStateNum)

                                // } else {
                                //     that.$e.endPlan.hide()
                                // }
                                if(that.gV.stopNum>0){
                                    //that.$e.stopPlan.show()
                                    // var height = windowHeight - $(".newPlan").height() - $(".topTitle").height() - $(".endPlan").height();
                                   // $('.list .contentWrapper').height(height)
                                   // $(".stopPlan_1").html(that.gV.stopNum)
                                }else{
                                    that.$e.stopPlan.hide();
                                }
                                if(!that.gV.paddingStatus&&that.gV.stopNum==0){
                                    $(".list").css("display", "none");
                                    that.$e.noData.show();
                                    return ;
                                }
                                def && def.resolve( data, that.gV.pageCurrent); 
                                if (that.gV.pageCurrent == 1) {
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].fixStateStr == "暂停") {
                                            $(".content-t span").eq(i).addClass("suspend");
                                        }
                                    }
                                } else {
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].fixStateStr == "暂停") {
                                            $(".content-t span").eq(i + 15 * that.gV.pageCurrent - 15).addClass("suspend")
                                        }
                                    }
                                }
                                that.gV.pageCurrent++;

                                
                            }
                            
                        },
                        callbackNoData: function( json ){
                            if(that.gV.pageCurrent == 1) {
                                $(".list").css("display", "none");
                                that.$e.noData.show();
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
            /*if (!$('.list .contentWrapper').hasClass('setHeight')) {
                $('.list .contentWrapper').height(height).addClass('setHeight');
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
                            // that.$e.listLoading.show();
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


                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });*/
        },

        //获取中止状态的定投数量
        getStopList: function(){
            var that = this;
            var obj = [{
                url: site_url.protocolList_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": 10,//非必须，默认为10
                    "fixStatus": 'H' //定投协议状态 A-正常状态 H-终止状态
                },
                needDataEmpty: true,
                needLoading: false,
                callbackDone: function(json) {    
                    var data = json.data.pageList;

                    if( data && data.length ){
                        // $.each( data, function(i, el){
                        //     if (el.fixState == 'H') {
                        //         that.gV.fixStateNum ++;
                        //     } 
                        // })
                        
                        that.gV.fixStateNum  = json.data.totalCount;
                        
                        if (that.gV.fixStateNum > 0) {
                            //展示已终止的定投数量
                            that.$e.endPlan.show();
                            // var height = windowHeight - $(".newPlan").height() - $(".topTitle").height() - $(".endPlan").height();
                            // $('.list .contentWrapper').height(height)
                            $(".stopPlan").html( that.gV.fixStateNum );
                        } else {
                            that.$e.endPlan.hide();
                        }
                    }

                    // if (that.gV.fixStateNum > 0) {
                    //     //展示已终止的定投数量
                    //     that.$e.endPlan.show()
                    //     // var height = windowHeight - $(".newPlan").height() - $(".topTitle").height() - $(".endPlan").height();
                    //     // $('.list .contentWrapper').height(height)
                    //     $(".stopPlan").html(that.gV.fixStateNum)
                    // } else {
                    //     that.$e.endPlan.hide()
                    // }
                },
                callbackNoData: function( json ){
                },
                callbackFail: function(json) {
                },
            }];
            $.ajaxLoading(obj); 
        },

        /*getData: function (t) {
            var that = this;

            var obj = [{
                url: site_url.protocolList_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": 10,//非必须，默认为10
                },
                //async: false,
                needDataEmpty: true,
                needLoading: false,
                callbackDone: function (json) {
                    debugger
                    that.$e.listLoading.hide();
                    var data;
                    if (json.data.pageList.length == 0) { // 没有记录不展示
                        $(".contentWrapper").hide()
                        that.$e.nothing.show();
                        return false;
                    } else if (json.status == "0000" && json.data.pageList.length > 0) {
                        data = json.data.pageList;
                        that.$e.nothing.hide();
                    }
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
                            t.endPullupToRefresh(false);
                        }
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].fixState == 'A') {
                                data[i].fixStateStr = "进行中"
                                data[i].show = true
                            } else if (data[i].fixState == 'H') {
                                data[i].fixStateStr = "已终止"
                                data[i].show = false
                                that.gV.fixStateNum ++
                                that.gV.stopPlanList.push(data[i])
                            } else {
                                data[i].fixStateStr = "暂停"
                                data[i].show = false
                            }
                            if(data[i].totalTradeTimes.length == 0){
                                data[i].totalTradeTimes_s = false
                            }else{
                                data[i].totalTradeTimes_s = true
                            }
                        }
                        if (that.gV.fixStateNum > 0) {
                            that.$e.endPlan.show()
                            var height = windowHeight - $(".newPlan").height() - $(".topTitle").height() - $(".endPlan").height();
                            $('.list .contentWrapper').height(height)
                            $(".stopPlan").html(that.gV.fixStateNum)

                        } else {
                            that.$e.endPlan.hide()
                        }

                        if (that.gV.pageCurrent == 1) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].fixStateStr == "暂停") {
                                    $(".content-t span").eq(i).addClass("suspend")
                                } else {

                                }
                            }
                        } else {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].fixStateStr == "暂停") {
                                    $(".content-t span").eq(i + 15 * that.gV.pageCurrent - 15).addClass("suspend")
                                } else {

                                }

                            }
                        }
                         // 将列表插入到页面上
                         generateTemplate(data, that.$e.recordList, that.$e.investmentPlanTemp);

                        // 页面++
                        that.gV.pageCurrent++;

                },
                callbackNoData:function(json){
                    that.$e.nothing.show();
                    //tipAction(json.message);
                },
                callbackFail:function(json){
                    tipAction(json.message);
                },

            }];
            $.ajaxLoading(obj);
        },*/
        // 获取认证信息
        getUserInfo: function() {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.queryUserBaseInfo_api,
                data: {},
                callbackDone: function(json) {
                    var data = json.data;
                    that.gV.accountType = data.accountType;
                }
            }]
            $.ajaxLoading(obj);
        },
        events: function () {
            var that = this;
            //新增 跳原生定投排行页
            mui("body").on("mdClick", ".newPlan", function () {
                if(that.gV.accountType == 0 ||that.gV.accountType == 2){
                    tipAction("暂不支持机构客户进行交易");
                    return
                }
                window.location.href = site_url.investmentPlanRanking_url + '?flag=2';
            }, {
                htmdEvt: 'myInvestmentPlan_01'
            });

            // 跳转详情页
            mui("body").on("mdClick", ".investmentPlan-item", function (e) {
                var scheduledProtocolId = $(this).data('id');
                window.location.href = site_url.pofCastSurelyDetails_url + '?scheduledProtocolId=' + scheduledProtocolId;
            }, {
                htmdEvt: 'myInvestmentPlan_02'
            });
            
            //跳往已终止的定投计划
            mui("body").on("mdClick", ".goEndPlan", function () {
                window.location.href = site_url.myInvestmentPlanH_url ;
            
               // sessionStorage.setItem('stopList',JSON.stringify(that.gV.stopPlanList))
            }, {
                htmdEvt: 'myInvestmentPlan_03'
            });

        }
    };
    somePage.init();

})