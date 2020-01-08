
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
/*var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');*/
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');

$(function() {
    var somePage = {
        $e: {
            adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
            recordList: $('.contentWrap'), // 调仓记录
            adjustmentTemp: $('#adjustment-template'), // 最新调仓模板  货币
            adjustmentTemp_1: $('#adjustment-template_1'),
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        gV: { // 全局变量
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 20,
            listLength: 0,
            fundCode: splitUrl['fundCode'],
            fundType:splitUrl['fundType'],  //0 非货币 1 货币
        },
        init: function() {
            var that = this;
            that.initMui();
            that.events();
        },
        events:function(){
            //alwaysAjax($('.contentWrap'),'.contentWrapper',100,100)
           
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;
            var height = windowHeight - $(".title").height() - $(".topTitle").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
            var template;
            if(that.gV.fundType=="1"){
                //货币
                template = that.$e.adjustmentTemp
            }else{
                template = that.$e.adjustmentTemp_1
            }
            $.pullRefresh({
                wrapper: $('.list'),
                class: 'listItem',
                template: template,
                pageSize: that.gV.pageSize,
                callback: function(def, t){
                    var obj = [{
                        url: site_url.fundNetWorthList_api,
                        data: {
                            "pageCurrent": that.gV.pageCurrent, //非必须，默认为1
                            "pageSize": that.gV.pageSize,//非必须，默认为10
                            "fundCode":that.gV.fundCode,//项目编号
                        },                        
                        needDataEmpty: true,
                        needLoading: false,
                        callbackDone: function(json) {     
                            var data = json.data.pageList;
                            var historyStr = that.gV.fundType=="1" ? '<li>日期</li><li>七日年化</li><li>万份收益(元)</li>' : '<li>日期</li><li>单位净值</li><li>累计净值</li><li>日涨幅</li>'
                            $(".titleContent").html(historyStr)
                            //data.fundType = that.fundType;
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none")
                                that.$e.noData.show()
                            } else {
                                def && def.resolve( data, that.gV.pageCurrent);
                                that.gV.pageCurrent++;
                            }
                            $.each($(".listItem .value"), function (i, v) {
                                if (Number($(v).text().slice(0, $(v).text().length - 1)) > 0) {
                                    $(v).addClass('value_red')
                                } else if(Number($(v).text().slice(0, $(v).text().length - 1)) == 0) {
                                    $(v).addClass('value_c')
                                }else{
                                    $(v).addClass('value_green')
                                }
                            });
                        },
                        callbackNoData: function( json ){  
                            var historyStr = that.gV.fundType=="1" ? '<li>日期</li><li>七日年化</li><li>万份收益(元)</li>' : '<li>日期</li><li>单位净值</li><li>累计净值</li><li>日涨幅</li>'
                            $(".titleContent").html(historyStr)
                            def && def.reject( json, that.gV.pageCurrent );
                            if(that.gV.pageCurrent==1) {
                                $(".list").css("display", "none")
                            }
                        },
                        callbackFail: function(json) {
                            def && def.reject( json, that.gV.pageCurrent );
                        }
                    }];
                    $.ajaxLoading(obj); 
                },
            })
            /*mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '暂无更多内容', //可选，请求完毕若没有更多数据时显示的提醒内容；
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
            });*/
        },
        /*getData: function(t) {
            var that = this;
            var obj = [{ //历史明细
                url: site_url.fundNetWorthList_api,
                data: {
                    "pageCurrent": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": 10,//非必须，默认为10
                    "fundCode":that.gV.fundCode,//项目编号
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    json.data.pageList=json.data.pageList||[]
                    var data;
                    if (json.data.pageList.length == 0) { // 没有记录不展示
                        $(".list").hide()
                        $(".title").hide()
                        that.$e.noData.show();
                        return false;
                    } else if(json.status == "0000"&&json.data.pageList.length > 0){
                        data = json.data.pageList;
                    }else if(json.status == "1000"){
                        $(".list").hide()
                        $(".title").hide()
                        that.$e.noData.show();
                        return false;
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
                                    $(".noDataOne").show()
                                }
                            } else {
                                //其他页-没有更多数据
                                t.endPullupToRefresh(true);
                            }
                        } else { // 还有更多数据
                            console.log(999)
                            t.endPullupToRefresh(false);
                        }

                        // 页面++
                        that.gV.pageCurrent++;
                        Handlebars.registerHelper("if_red", function (value, options) {
                            if (value > 0) {
                                return options.fn(this);
                            } else {
                                return options.inverse(this);
                            }
                        });
                        // 将列表插入到页面上
                        generateTemplate(data, that.$e.recordList, that.$e.adjustmentTemp);
                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                    }, 200)
                },
                callbackNoData:function(){
                    //没有数据时展示暂无数据
                            $(".list").hide()
                            $(".title").hide()
                            that.$e.noData.show();
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                    //隐藏loading，调试接口时需要去掉
                       setTimeout(function() {
                        that.$e.listLoading.hide();
                    }, 100);
                },
            }];
            $.ajaxLoading(obj);
        },*/
    };
    somePage.init();
});