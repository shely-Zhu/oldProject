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
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
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
            echartData: [
                [],
                [],
                []
            ], // 雷达数据
            fundCode: splitUrl['fundCode'],
            tipArr: [], // 提示集合
            noDataArr: ['暂无数据，成立时间不满1年', '暂无数据，成立时间不满3年', '暂无数据，成立时间不满5年']
        },
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
                    "fundCode": that.gV.fundCode,
                },
                // needDataEmpty: false,
                callbackDone: function(json) {
                    var dataInfo = json.data,
                        fundLableList_new = dataInfo.fundLableList[0];

                    dataInfo["fundLableList_new"] = fundLableList_new; // 标签只展示第一个处理
                    dataInfo.newNetValue= dataInfo.newNetValue ? dataInfo.newNetValue : "--"
                    dataInfo.newOneDayGains= dataInfo.newOneDayGains ? dataInfo.newOneDayGains : "--"
                    dataInfo.yearEarnRate= dataInfo.yearEarnRate ? dataInfo.yearEarnRate : "--"
                    // 模板输出
                    generateTemplate(dataInfo, that.$e.ddTop, that.$e.firstTemp);
                    // 基金曲线名称赋值
                    $('.dd_line_legend .dd_red').html(dataInfo.fundName);
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }, {
                url: site_url.queryRadarChartList_api, //基金诊断-雷达图
                data: {
                    "fundCode": that.gV.fundCode,
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    var dataList = json.data,
                        standardDate = dataList && dataList[0] && dataList[0].standardDate || '--';
                    
                    $.each(dataList, function (i, j) { // 将数据组装成雷达图需要的数据
                        //根据ageLimit来分类
                        var index = j.ageLimit == 1 ? 0: j.ageLimit == 3 ? 1 : 2;
                        that.gV.echartData[index].push(j.stability); // 稳定性
                        that.gV.echartData[index].push(j.earningPower); // 收益表现
                        that.gV.echartData[index].push(j.decisionCapability); //择股择时能力
                        that.gV.echartData[index].push(j.companyPower); // 基金公司实力
                        that.gV.echartData[index].push(j.antiRiskCapability); // 抗风险性
                        that.gV.echartData[index].push(j.totalScore); // 总分
                    })

                    // todo,有没有可能没有值
                    radarChart(that.gV.echartData[0]);

                    // 日期赋值
                    $('.dd_date_1').html(standardDate)
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                },
                callbackNoData: function(json) { // 暂无数据
                    $('.chartWrapper i').html(that.gV.noDataArr[0])
                }
            }, {
                url: site_url.querySynthesizeQualitativeEvaluate_api, //基金诊断-综合定性评价
                data: {
                    "fundCode": that.gV.fundCode,
                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    that.$e.ddEvaluate.html(json.data.content);
                    // 日期赋值
                    $('.dd_date_2').html(json.data.standardDate)
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }, {
                url: site_url.queryDictionary_api, //基金诊断-字典接口
                data: {
                    "dicType": 'fundDiagnosisKey',
                },
                // needDataEmpty: false,
                callbackDone: function(json) {
                    var jsonData = json.data.list;

                    that.gV.tipArr = jsonData;
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

            var obj = { //画图
                url: site_url.queryCumulativeProfitCurveList_api, //基金诊断-累计收益曲线
                data: {
                    "fundCode": that.gV.fundCode,
                    "timeSection": num, /// 时间区间（1：近一月，2：近一年，3：成立以来）
                },
                callbackDone: function(json) {

                    var jsonData = json.data,
                        time = jsonData.time; // 统计时间

                    // 画图
                    that.dealData(json.data.fundProfitRateSection, num);
                    lineChart(that.gV.drawArr, num, that.gV.noData, '基金收益率', that.$e.ddLine);

                    // 时间赋值
                    $('.dd_date_3').html(time)

                },
                callbackFail: function(json) {
                    that.$e.listLoading.hide();
                    tipAction(json.message);
                },

            };
            return obj;
        },
        sendAjax:function(obj){
            $.ajaxLoading([obj]);
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
                // 沪深300指数累计收益--同类基金
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

            // 雷达图一年，3年，5年
            mui("body").on('tap', '.dd_choice_1 .mui-col-xs-3', function(e) {
                var i = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                // 切换图表
                if (that.gV.echartData[i].length != 0) {
                    radarChart(that.gV.echartData[i]);
                } else {
                    $('.chartWrapper i').html(that.gV.noDataArr[i])
                }
            })


            // 折线图 一月，一年，成立以来
            mui("body").on('tap', '.dd_choice_2 span', function(e) {
                var num = $(this).attr('num');
                $(this).addClass('active').siblings().removeClass('active');
                // 画图
                that.sendAjax(that.getDrawData(num))
            })

            // 文案提示
            mui("body").on('tap', '.dd_icon', function() {
                var i = $(this).attr('num');
                var value = that.gV.tipArr[i] && that.gV.tipArr[i].value;

                $.elasticLayerTypeTwo({
                    id: "tip",
                    title: '提示',
                    p: '<p>' + value + '</p>',
                    buttonTxt: '知道了',
                    zIndex: 100,
                });

            })
        },
    };
    hotDiagnosis.init();
});