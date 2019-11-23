require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

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

            var height = windowHeight - $(".title").height() - $(".topTitle").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }

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
            });
        },
        getData: function(t) {
            var that = this;

            var obj = [{ // 系统调仓记录列表
                url: site_url.curveHistoryList_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": 10,//非必须，默认为10
                    "projectId":20354,//项目编号
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
                        console.log(that.gV.pageCurrent)
                        // 将列表插入到页面上
                        generateTemplate(data, that.$e.recordList, that.$e.adjustmentTemp);

                    }, 200)

                },

            }];
            $.ajaxLoading(obj);
        },
    };
    somePage.init();
});