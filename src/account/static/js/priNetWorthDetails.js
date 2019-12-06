/**
 * 私募资产净值明细 js
 * @author 蔡文琦  2019-11-22
 */


require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');

var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js')

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
            projectId: splitUrl['projectId'],
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
                url: site_url.queryHistoryNetValue_api,
                // url: site_url.queryReourceLabels_api,
                data: {
                    "pageNo": that.gV.pageCurrent, //非必须，默认为1
                    "pageSize": 10,//非必须，默认为10
                    "projectId":that.gV.projectId,//项目编号
                    "profitRange":1,//0:近1月 1:近3月 2:近6个月 3:近1年4：成立至今
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;
                    if (json.data.length == 0) { // 没有记录不展示
                        $(".list").hide()
                        that.$e.noData.show();
                        return false;
                    } else {
                        data = json.data.pageList
                        console.log(data)
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
                            t.endPullupToRefresh(false);
                        }

                        // 页面++
                        that.gV.pageCurrent++;

                        // 将列表插入到页面上
                        generateTemplate(data, that.$e.recordList, that.$e.adjustmentTemp);

                    }, 200)

                },

            }];
            console.log(obj)
            $.ajaxLoading(obj);
        },
        //注册事件
		events: function() {
			alwaysAjax($('.contentWrap'))
		}
    };
    somePage.init();
});