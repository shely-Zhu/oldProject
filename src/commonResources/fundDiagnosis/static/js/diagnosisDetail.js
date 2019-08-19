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
var echarts = require('echarts/lib/echarts');
var radarChart = require('@pathCommonJsCom/echartCom/radarChart.js');
var lineChart = require('@pathCommonJsCom/echartCom/lineChart.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function() {

    var hotDiagnosis = {
        $e: {
            ddTop: $('.dd_top'), // 顶部区域
            ddRadar: $('.dd_radar '), // 雷达图
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
            drawArr: [], //保存画图数据
            noData: [], //保存画图数据
            echartData:[[],[],[]] // 雷达数据
        },
        page: 1,
        init: function() {
            var that = this;
            that.getData();
            that.events();
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
            }, {
                url: site_url.queryRadarChartList_api, //基金诊断-雷达图
                data: {
                    "fundCode": '001050',
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    var dataList = json.data;

                    $.each(dataList, function(i, j) { // 将数据组装成雷达图需要的数据
                        that.gV.echartData[i].push(j.stability); // 稳定性
                        that.gV.echartData[i].push(j.earningPower); // 收益表现
                        that.gV.echartData[i].push(j.decisionCapability); //择股择时能力
                        that.gV.echartData[i].push(j.companyPower); // 基金公司实力
                        that.gV.echartData[i].push(j.antiRiskCapability); // 抗风险性
                    })

                    // todo,有没有可能没有值
                    radarChart(that.gV.echartData[0]);

                    // 日期赋值
                    $('.dd_date_1').html((dataList && dataList[0].standardDate))
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                },
                callbackNoData: function(json) { // 暂无数据
                    $('.chartWrapper i').html('暂无数据，成立时间不满1年')
                }
            }, {
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
            }]

            obj.push(that.getDrawData(1));
            $.ajaxLoading(obj);
        },
        getDrawData: function(num) { //num为传进来的数据范围
            var that = this;
            (num == 20) ? num = '': num; //成立以来 入参传20

            var obj = { //画图
                url: site_url.queryCumulativeProfitCurveList_api, //基金诊断-累计收益曲线
                data: {
                    "fundCode": '001050',
                    "timeSection": '1', /// 时间区间（1：近一月，2：近一年，3：成立以来）
                },
                callbackDone: function(json) {
                    // 将空(成立以来)转为20，
                    (num == '') ? num = 20: num;

                    that.dealData(json.data.fundProfitRateSection, num);

                    lineChart(that.gV.drawArr, num, that.gV.noData, '收益率', that.$e.ddLine);

                },
                callbackFail: function(json) {
                    that.$e.listLoading.hide();
                    tipAction(json.message);

                },
                callbackNoData: function(json) {
                    //显示暂无数据
                    $('.lineWrapper').html(that.$e.noData.clone(false))
                        .find('.noData').show();

                    that.$e.listLoading.hide();
                    //设置暂无数据
                    that.gV.noData.push({
                        num: num,
                        hasData: false
                    })
                }
            };
            return obj;
        },
        dealData: function(jsonData, num) {
            var that = this;

            that.gV.drawArr[num] = {
                first: [], // 基金收益
                second: [], // 上证指数累计收益
                third: [], // 沪深300指数累计收益
                xArr: [] //x轴数据
            };

            //处理jsonData
            $.each(jsonData, function(i, el) {
                // 基金收益
                that.gV.drawArr[num].first.push(isNaN(el.fundProfitRate) ? 0 : el.fundProfitRate);
                // 上证指数累计收益
                that.gV.drawArr[num].second.push(isNaN(el.shanghaiCompositeIndexAvgreturnRate) ? 0 : el.shanghaiCompositeIndexAvgreturnRate);
                // 沪深300指数累计收益
                that.gV.drawArr[num].third.push(isNaN(el.hs300IndexAvgreturnRate) ? 0 : el.hs300IndexAvgreturnRate);
                //x轴数据
                that.gV.drawArr[num].xArr.push({
                    value: el.currentDate,
                    textStyle: { fontSize: 10 }
                })

            })
        },
        events: function() {
            var that = this;

            mui("body").on('tap', '.dd_choice_1 .mui-col-xs-3', function(e) { // 一年，3年，5年
                debugger;
                var i = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                radarChart(that.gV.echartData[i]);

            })
        },
    };
    hotDiagnosis.init();
});