
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');

$(function() {

    var somePage = {
        $e: {
            adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
            recordList: $('.contentWrap'), // 调仓记录
            adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        gV: { // 全局变量
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            listLength: 0,
            fundCode: splitUrl['fundCode'],
        },
        init: function() {
            var that = this;
            that.initMui();
            //that.getData()
            // that.events();
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;
            var height = windowHeight;
            if (splitUrl['isSuper']){
                //是超宝页面进来的
                $(".messageTitle").hide();
            } else {
                height -= $(".title").height() - $(".topTitle").height()-$(".messageTitle").height();
            }
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
            $.pullRefresh({
                wrapper: $('.list'),
                class: 'listItem',
                template: that.$e.adjustmentTemp, 
                callback: function(def, t){
                    var obj = [{
                        //现金宝和普通基金接口不同 但是入参一样 这里区分一下
                        url: splitUrl['isSuper']? site_url.cashQueryIncomeList_api:site_url.queryIncomeList_api,
                        data: {
                            "pageCurrent": that.gV.pageCurrent, //非必须，默认为1
                            "pageSize": that.gV.pageSize,//非必须，默认为10
                            "fundCode":that.gV.fundCode,//项目编号
                        },                        
                        needDataEmpty: true,
                        needLoading: false,
                        callbackDone: function(json) {     
                            //两个接口的回参结构不一样 区分一下
                            var data = (splitUrl['isSuper']? json.data.list: json.data.pageList) ||[];
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none")
                                that.$e.noData.show()
                            } else {
                                Handlebars.registerHelper("if_red", function (value, options) {
                                    if (value > 0) {
                                        return options.fn(this);
                                    } else {
                                        return options.inverse(this);
                                    }
                                });
                                def && def.resolve( data, that.gV.pageCurrent);
                                that.gV.pageCurrent++;
                            }
                        },
                        callbackNoData: function( json ){  
                            if(that.gV.pageCurrent == 1) {
                                $(".list").css("display", "none")
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

            var obj = [{ // 系统调仓记录列表
                url: site_url.queryIncomeList_api,
                data: {
                    "pageCurrent": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": 10,//非必须，默认为10
                    "fundCode":that.gV.fundCode,//项目编号
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;
                    if (json.data.list.length == 0) { // 没有记录不展示
                        $(".list").hide()
                        that.$e.noData.show();
                        return false;
                    } else if(json.status == "0000"&&json.data.list.length > 0){
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

            }];
            $.ajaxLoading(obj);
        },*/
    };
    somePage.init();
});