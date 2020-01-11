
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');
// var commonHistoryDetailList=require('@pathCommonJs/components/commonHistoryDetailList.js');
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
            // pageSize: 10,
            pageSize: 20, //10条时充不满屏幕，改为20条
            listLength: 0,
            projectId: splitUrl['projectId'],
        },
        init: function(url) {
            var that = this;
            that.initMui( site_url.curveHistoryList_api );
            //that.getData()
            that.events();
        },
        //初始化mui的上拉加载
        initMui: function(url) {
            var that = this;
            var height = windowHeight - $(".title").height() - $(".topTitle").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
            $.pullRefresh({
                wrapper: $('.list'),
                class: 'listItem',
                template: that.$e.adjustmentTemp, 
                callback: function(def, t){
                    var obj = [{
                        url: url,
                        data: {
                            "pageNo": that.gV.pageCurrent, //非必须，默认为1
                            "pageSize": that.gV.pageSize,//非必须，默认为10
                            "projectId":that.gV.projectId,//项目编号
                        },                        
                        needDataEmpty: true,
                        needLoading: false,
                        callbackDone: function(json) {     
                            var data = json.data.pageList;
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none")
                                that.$e.noData.show()
                            } else {
                                $.each((data), function(a, b) {
                                    if(b.incomeUnit == '') {
                                        b.incomeUnit = '--'
                                    }
                                })
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
                            that.getData(this, url);
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
        /*getData: function(t, url) {
            var that = this;
            var obj = [{ // 系统调仓记录列表
                url: url,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": 10,//非必须，默认为10
                    "projectId":that.gV.projectId,//项目编号
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;
                    if (json.data.pageList.length == 0) { // 没有记录不展示
                        $(".list").hide()
                        that.$e.noData.show();
                        return false;
                    } else if(json.status == "0000"&&json.data.pageList.length > 0){
                        data = json.data.pageList;
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
                }

            }];
            $.ajaxLoading(obj);
        },*/
        events:function(){
            //alwaysAjax($(".contentWrap"))
        }
    };

    somePage.init();
});