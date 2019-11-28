//  查看已签署材料
// @author caoqihai 2019-11-28

require('@pathIncludJs/base.js');

require('@pathCommonJsCom/utils.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');

//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
require('@pathCommonJsCom/goTopMui.js');
require('@pathCommonJs/components/headBarConfig.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


    $(function(){
        var regulatory = {
            $e:{
                listSlot: $('.contentWrap'), // 列表
                listTemp: $('#list-template'), // 模板赋值
                listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
                noData: $('.noData'), //没有数据的结构
            },
            gV: {
                pageNo: 1, //当前页码，默认为1
                pageSize: 10,
                search: false, // 搜索
            },
            init:function(){
                var that = this;
                
    
                that.beforeFunc();
                that.initMui(); // 兼容下面函数调用
    
                //
                that.events();
    
            },
            beforeFunc: function(t) {
                var that = this;
                //设置切换区域的高度
                //计算节点高度并设置
                var height = window.innerHeight - $('.banner').height();
    
                if (!$('.list .contentWrapper').hasClass('setHeight')) {
                    $('.list .contentWrapper').height(height).addClass('setHeight');
                }
            },
            //初始化mui的上拉加载
            initMui: function() {
                var that = this
                
                mui.init({
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
                    // that.$e.listLoading.show();
    
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
                //数据初始化
            getData:function(t){
                
                var that = this
    
                mui('.contentWrapper').pullRefresh().pullupLoading();
               
                
                var obj = [{
                    url: site_url.queryGrowthDetailList_api, //成长值流水
                    data: {
                        "pageNo": that.gV.pageNo,
                        "pageSize": 10,
    
                    },
                    needDataEmpty: false,
                    callbackDone: function(json) {
                        var dataList;
    
                        // 待定
                        if (json.data.totalCount == 0) { // 没有记录不展示
                            that.$e.noData.show();
                            return false;
                        } else {
                            dataList = json.data.pageList;
                        }
    
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
                            that.gV.pageNo++;
    
                            //去掉mui-pull-bottom-pocket的mui-hidden
                            $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                            // 将列表插入到页面上
                            generateTemplate(dataList, that.$e.listSlot, that.$e.listTemp);
                        }, 200)
    
                    },
                    callbackFail: function(json) {
                        tipAction(json.msg);
                    },
                    callbackNoData:function(json){
                        $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        t.endPullupToRefresh(true);
                        that.$e.listLoading.hide();
                        that.$e.noData.show();
                        
                    },
                }]
                $.ajaxLoading(obj);
    
            },
            events: function(targetUrl) {
                var that = this;
    
    
    
                mui("body").on('tap','.posioneright', function(){
    
                    window.location.href = site_url.articleTemplate_url+ '?articleBelong=9&applyType=0';
                });
    
            },
        }
        //调用函数
        regulatory.init();
})