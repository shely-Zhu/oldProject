/*
 * @page:收益明细
 * @Author: wangjiajia
 */

require('@pathIncludJs/base.js');

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
            recordList: $('.contentWrap'), // 模板盒子
            adjustmentTemp: $('#adjustment-template'), 
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        gV: { // 全局变量
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            listLength: 0,
            projectId: splitUrl['projectId'],
        },
        init: function() {
            var that = this;
            that.initMui();
            // that.events();
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;

            var height = windowHeight - $(".HeadBarConfigBox").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }

            mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '暂无更多数据', //可选，请求完毕若没有更多数据时显示的提醒内容；
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
                url: site_url.dealDetailList_api,
                data: { 
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": "10",//非必须，默认为10
                    "projectId": that.gV.projectId,//项目id
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
                                    t.endPullupToRefresh(false);
                                }
                            } else {
                                //其他页-没有更多数据
                                t.endPullupToRefresh(true);
                            }
                        } else { // 还有更多数据
                            t.endPullupToRefresh(false);
                        }
                        var len = json.data.pageList;
                        for(var i =0;i<len.length;i++){
                            if(len[i].redemptionType == 0){
                                len[i].redemptionType = "普通赎回"
                            }else if(len[i].redemptionType == 1){
                                len[i].redemptionType = "快速赎回"
                            }
                        }
                        for(var i =0;i<len.length;i++){
                            if(len[i].tradeType == "0"){
                                len[i].tradeType = "赎回"
                            }else if(len[i].tradeType == "1"){                               
                                len[i].tradeType = "申购"
                            }else if(len[i].tradeType == "2"){
                                len[i].tradeType = "分红"
                            }
                        }
                          //去掉mui-pull-bottom-pocket的mui-hidden
                          $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 将列表插入到页面上
                        generateTemplate(data, that.$e.recordList, that.$e.adjustmentTemp);
                        console.log(that.gV.pageCurrent)
                        if(that.gV.pageCurrent == 1){
                            for(var i =0;i<len.length;i++){
                                if(len[i].tradeType == "赎回"){
                                    $(".photoleft").eq(i).addClass("test")
                                }else if(len[i].tradeType == "申购"){                               
                                    $(".photoleft").eq(i).addClass("testone")
                                }else if(len[i].tradeType == "分红"){
                                    $(".photoleft").eq(i).addClass("testoneo")
    
                                }
                            }
                        }else{
                            for(var i =0;i<len.length;i++){
                                if(len[i].tradeType == "赎回"){
                                    $(".photoleft").eq(i+15*that.gV.pageCurrent-15).addClass("test")
                                }else if(len[i].tradeType == "申购"){                               
                                    $(".photoleft").eq(i+15*that.gV.pageCurrent-15).addClass("testone")
                                }else if(len[i].tradeType == "分红"){
                                    $(".photoleft").eq(i+15*that.gV.pageCurrent-15).addClass("testoneo")
    
                                }
                            }
                        }
                        // 页面++
                        that.gV.pageCurrent++;
                    }, 200)
                },
                     
            }];
            $.ajaxLoading(obj);
        },
    };
    somePage.init();
});