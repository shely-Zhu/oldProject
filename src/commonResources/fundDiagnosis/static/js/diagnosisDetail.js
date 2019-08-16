/*
 * @page: 基金诊断
 * @Author: songxiaoyu
 * @Date:   2019-08-09 11:54:51
 * @Last Modified by:   songxiaoyu
 * @description:
 */

require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var radarChart = require('@pathCommonJsCom/echartCom/radarChart.js');
var lineChart = require('@pathCommonJsCom/echartCom/lineChart.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function() {

    var hotDiagnosis = {
        $e: {
            ddTop: $('.dd_top'), // 顶部区域
            ddEvaluate: $('.dd_evaluate'), // 评价
            ddLine: $('.dd_line'), // 折现图
            firstTemp: $('#first-template'), // 基金区域
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            noData: $('.noData'), //没有数据的结构
        },
        gV: {
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            search: false, // 搜索
        },
        page: 1,
        init: function() {
            var that = this;
            that.getData();
           
        },
        
        getData: function(t) {
            var that = this;

            var obj = [{
                url: site_url.queryFundBaseInfo_api, //基金诊断-基金基本信息
                data: {
                    "fundCode": '001050',
                },
                // needDataEmpty: false,
                callbackDone: function(json) {
                    var dataInfo = json.data;

                    generateTemplate(dataInfo, that.$e.ddTop, that.$e.firstTemp);
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            },{
                url: site_url.queryRadarChartList_api, //基金诊断-雷达图
                data: {
                    "fundCode": '001050',
                },
                // needDataEmpty: false,
                callbackDone: function(json) {
                    debugger;
                    var dataList = json.data;
                    var echartData = [[],[],[]]; //将数据按顺序传入

                    $.each(dataList,function(i,j){ // 将数据组装成雷达图需要的数据
                        echartData[i].push(j.stability); // 稳定性
                        echartData[i].push(j.earningPower); // 收益表现
                        echartData[i].push(j.decisionCapability); //择股择时能力
                        echartData[i].push(j.companyPower); // 基金公司实力
                        echartData[i].push(j.antiRiskCapability); // 抗风险性
                    })

                    // todo,有没有可能没有值
                    radarChart(echartData);
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            },{
                url: site_url.querySynthesizeQualitativeEvaluate_api, //基金诊断-综合定性评价
                data: {
                    "fundCode": 'G10006',
                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    that.$e.ddEvaluate.html(json.data.content);
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            },{
                url: site_url.queryCumulativeProfitCurveList_api, //基金诊断-累计收益曲线
                data: {
                    "fundCode": '001050',
                    "timeSection": '1',/// 时间区间（1：近一月，2：近一年，3：成立以来）
                },
                // needDataEmpty: false,
                callbackDone: function(json) {
                    console.log(json.data);
                    
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;
           
        },
    };
    hotDiagnosis.init();
});