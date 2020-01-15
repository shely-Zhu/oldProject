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
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function() {
    var somePage = {
        $e: {
            recordList: $('.contentWrap'), // 调仓记录
            investmentPlanTemp: $('#investmentPlan-template'), // 最新调仓模板
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构

        },
        gV: { // 全局变量
            dataList: []
        },
        init: function() {
            var that = this;
            that.getData();
            that.events();
        },

        getData: function(t) {
            var that = this;
            $(".listLoading").hide();
            var obj = [{
                url: site_url.protocolList_api,
                data: {
                    "pageNo": 1, //非必须，默认为1
                    "pageSize": 100, //非必须，默认为10
                    "fixStatus": 'H' //定投协议状态 A-正常状态 H-终止状态
                },
                needDataEmpty: true,
                needLoading: false,
                callbackDone: function(json) {
                    var data = json.data.pageList;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].fixState == 'H') {
                            data[i].fixStateStr = "已终止"
                            that.gV.dataList.push(data[i])
                        }
                    }
                    generateTemplate(that.gV.dataList, that.$e.recordList, that.$e.investmentPlanTemp);

                },
                callbackNoData: function(json) {}
            }];
            $.ajaxLoading(obj);
            //that.gV.dataList = JSON.parse(sessionStorage.getItem('stopList'));
            // 将列表插入到页面上

        },
        events: function() {
            // 跳转详情页
            mui("body").on("mdClick", ".investmentPlan-item", function(e) {
                var scheduledProtocolId = $(this).data('id');
                window.location.href = site_url.pofCastSurelyDetails_url + '?scheduledProtocolId=' + scheduledProtocolId;
            }, {
                htmdEvt: 'myInvestmentPlan_01'
            });
        },
    };
    somePage.init();

})