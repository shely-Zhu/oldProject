/*
 * @page: 恒小智组合详情页
 * @Author: songxiaoyu
 * @Date:   2018-10-10 13:58:04
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-12-05 17:01:49
 * @description:
 * url里面需要带  riskLevel参数
 */

require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var tipAction = require('../../../common/js/components/tipAction.js');
var splitUrl = require('../../../common/js/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

//echarts图表
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('zrender/lib/vml/vml');


$(function() {
    var combinationDetails = {
        $e: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            top: $('.top'), //顶部
            combiT: $('.combiT'), // 标题
            assetRatio: $('.assetRatio'), // 资产配置区域
            adjustmentWrap: $('.adjustmentWrap'), // 最新调仓
            allocationTemp: $('#allocation-template'), // 资产配置模板
            adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
            bottom: $('.bottom'), // 底部按钮

        },
        gV: { // 全局变量
            riskLevel: splitUrl['riskLevel'], // 客户风险等级 
            groupCode: splitUrl['combCode'], // 组合编号，从我的持仓进
        },
        drawArr: [], //保存画图数据
        noData: [], //保存画图数据
        tip: '组合收益',
        init: function() {
            var that = this;
            // 根据页面从我的页面，还是，从制定计划页面
            that.judgePage();
            that.events();
        },
        judgePage: function() {
            var that = this;
            if (that.gV.riskLevel) { // 从制定计划入，根据客户等级获得组合编号，获取详情
                that.getCombinFundList();
                that.$e.bottom.show();
            } else if (that.gV.groupCode) { // 从我的组合进，根据我的页面传过来组合编号，获取详情
                that.getCombinFundDetails();
            }
        },
        /**
         * [getCombinFundList 先根据风险等级获得用户匹配组合编号，然后渲染页面]
         * @author songxiaoyu 2019-01-07
         */
        getCombinFundList: function() {
            var that = this;

            var obj = [{ // 组合产品列表
                url: site_url.combinFundList_api,
                data: {
                    "riskLevel": that.gV.riskLevel, //客户风险等级 
                },
                async: false, // 同步
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data = json.data.combinFundList[0],
                        nav = data.nav, //昨日净值
                        dayRate = data.dayRate, //日涨幅
                        tradingDay = data.tradingDay; //净值日期

                    that.gV.groupCode = data.groupCode; //组合编号

                    // 请求资产配置接口
                    that.getCombinFundDetails();
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        // 组合详情信息,曲线图接口
        getCombinFundDetails: function() {
            var that = this;
            var obj = [{ // 组合详情信息查询
                url: site_url.combinFundDetails_api,
                data: {
                    "groupCode": that.gV.groupCode, //组合代码 
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data = json.data.combinFundDetails,
                        nav = data.nav, //昨日净值
                        dayRate = data.dayRate, //日涨幅
                        tradingDay = data.tradingDay; //净值日期

                    that.gV.groupName = data.groupName; //组合名称

                    // 赋值
                    that.setHtml(nav, dayRate, tradingDay);

                    // 给基金分组加颜色
                    $.each(data.prdDetailList, function(i, j) {
                        var i = Number(j.prdAttr);
                        j['colorName'] = 'color' + i;
                    })

                    // 基金分组渲染
                    generateTemplate(data, that.$e.assetRatio, that.$e.allocationTemp);
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }, { // 系统调仓记录列表
                url: site_url.combinTransferList_api,
                data: {
                    "combCode": that.gV.groupCode, //组合代码 
                    // "pageNo": "1", //非必须，默认为1
                    // "pageSize": "10" //非必须，默认为10
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data = [];

                    if (json.data.totalCount == 0) { // 没有记录不展示
                        return false;
                    } else {
                        data.push(json.data.transferRecordList[0]);
                    }
                    // 判断调仓升降，添加颜色
                    $.each(data[0].fundList, function(i, j) {
                        var m = Number(j.fundOriginalScale),
                            n = Number(j.fundNewScale);

                        if (m > n) {
                            j['colorName'] = 'greenColor';
                        } else if (m < n) {
                            j['colorName'] = 'redColor';
                        }
                    })

                    // 最新调仓渲染
                    generateTemplate(data, that.$e.adjustmentWrap, that.$e.adjustmentTemp);
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];

            // 组合收益走势曲线图 1
            obj.push(that.getDrawData(1));
            $.ajaxLoading(obj);
        },
        // 给dom赋值
        setHtml: function(nav, dayRate, tradingDay) {
            var that = this;
            // 赋值
            that.$e.top.find('.nav').html(nav);
            that.$e.top.find('.dayRate').html(dayRate);
            that.$e.top.find('.tradingDay').html(tradingDay);
            that.$e.combiT.html(that.gV.groupName);
        },
        // 请求画图接口
        getDrawData: function(num) { //num为传进来的数据范围
            var that = this;
            (num == 20) ? num = '': num; //成立以来 入参传20

            var obj = { //画图
                url: site_url.trendGraphInfo_api,
                data: {
                    groupCode: that.gV.groupCode, // 组合编号
                    dataRange: num || '', // 数据范围  //默认开始是一个月
                },
                // needDataEmpty: true,
                needLogin: true,
                // async: false, 
                callbackDone: function(json) {
                    // 将空(成立以来)转为20，
                    (num == '') ? num = 20: num;
                    that.draw(json.data, num);

                    // 根据选项显示
                    that.switchData(num)
                },
                callbackFail: function(json) {
                    that.$e.listLoading.hide();
                    tipAction(json.msg);

                },
                callbackNoData: function(json) {
                    //显示暂无数据
                    $('.lineWrapper').html(that.$e.noData.clone(false))
                        .find('.noData').show();

                    //$('.lineWrapper').siblings('.line').hide();
                    that.$e.listLoading.hide();
                    //设置暂无数据
                    that.noData.push({
                        num: num,
                        hasData: false
                    })
                }
            };
            return obj;
        },
        draw: function(jsonData, num) {
            var that = this;

            that.drawArr[num] = {
                totalDayRateArr: [], // 组合收益走势
                navArr: [], // 净值走势
                xArr: [] //x轴数据
            };

            //处理jsonData
            $.each(jsonData, function(i, el) {

                // 累计收益
                that.drawArr[num].totalDayRateArr.push(isNaN(el.totalDayRate) ? 0 : el.totalDayRate);
                // 净值
                that.drawArr[num].navArr.push(isNaN(el.nav) ? 0 : el.nav);

                //x轴数据
                that.drawArr[num].xArr.push({
                    value: el.tradingDay,
                    textStyle: { fontSize: 10 }
                })

            })
        },
        /**
         * [drawAction 折线图渲染]
         * @author songxiaoyu 2018-11-06
         * @param  {[type]} num  [月份]
         * @param  {[type]} chartData [数据，可能是不同数据类型 navArr totalDayRateArr]
         * @return {[type]}      [description]
         */
        drawAction: function(num, type, tip) {
            var that = this;


            var showData = true;

            $.each(that.noData, function(i, el) {
                if (el.num == num && el.hasData == false) {
                    //无数据，显示暂无数据
                    $('.lineWrapper').html(that.$e.noData.clone(false)).find('.noData').show();
                    showData = false;
                }
            })

            if (!showData) {
                //不画图
                that.$e.listLoading.hide();
                return false;
            }

            $('.lineWrapper').html(that.$e.noData.clone(false)).find('.noData').show();

            var xArr = that.drawArr[num].xArr;
            // 累计净值
            // var data = that.drawArr[num].totalDayRateArr;
            var data = that.drawArr[num][type];

            // var name = '组合收益';
            var name = tip;

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init($('.lineWrapper')[0]);

            var option = {

                tooltip: {
                    trigger: 'axis',
                    // formatter: "日期：{b} <br/>{a}: {c}%",
                    formatter: function(params) {
                        var data = params[0];
                        console.log(data)
                        if (type == 'navArr') { // 净值
                            return '日期：' + data["name"] + '<br/>' + data["seriesName"] + '：' + data["value"]
                        } else {
                            return '日期：' + data["name"] + '<br/>' + data["seriesName"] + '：' + data["value"] + '%'
                        }
                    },
                    backgroundColor: 'rgba(229,229,229,0.6)',
                    confine: true,
                    padding: 8,
                    textStyle: {
                        color: '#7d7c7d'
                    },
                },
                title: {
                    show: false,
                },
                grid: {
                    show: true,
                    left: 0,
                    right: "12%",
                    containLabel: true,
                },
                xAxis: [{
                    //position:'bottom',
                    type: 'category',
                    data: xArr,
                    axisLabel: {
                        //show: false,
                        interval: that.drawArr[num].xArr.length - 2,
                        margin: 14,
                        textStyle: {
                            color: '#7d7c7d'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        interval: Math.ceil(that.drawArr[num].xArr.length / 6)
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                }],
                yAxis: {
                    type: 'value',
                    precision: 4,
                    axisTick: {
                        show: false
                    },
                    min: "dataMin",
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#7d7c7d'
                        },
                        formatter: function(value, index) {
                            if (value == 0) {
                                return value;
                            }

                            if (type == 'totalDayRateArr') {
                                //组合收益
                                return v = value.toFixed(2) + '%';
                            } else {
                                //净值
                                return v = value.toFixed(4);
                            }
                        }
                    }
                },
                series: [{
                    name: name,
                    type: 'line',
                    smooth: true,
                    data: data,
                    //clipOverflow: false,
                    lineStyle: {
                        normal: {
                            color: '#f4cf5c'
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#f4cf5c',
                        },
                    }
                }]
            };

            myChart.setOption(option);
            that.$e.listLoading.hide();
        },
        // 切换净值和组合收益数据
        switchData: function(num) {
            var that = this;

            var type = $('.lineTitle span.active').attr('type');

            if (type == 'netValueTrend') { // 净值走势
                that.drawAction(num, 'navArr', '净值');
            } else { // 组合收益
                that.drawAction(num, 'totalDayRateArr', '组合收益');
            }
        },
        events: function() {
            var that = this;
            // 买入按钮-跳转买入页面
            mui("body").on('tap', '.bottom', function() {
                window.location.href = site_url.buyCombination_url + '?groupCode=' + that.gV.groupCode + '&combinationName=' + encodeURI(that.gV.groupName);
            })

            // 折线图标题
            mui("body").on('tap', '.lineTitle span', function(e) {
                var $this = $(this);

                $this.addClass('active').siblings().removeClass('active');
                that.switchData(1);
                $('.drawLine .timeBtn').eq(0).addClass('active').siblings().removeClass('active')

            })

            //点击时间，画折线图
            mui("body").on('tap', '.drawLine .timeBtn', function() {
                var time = $(this).attr('time');
                that.$e.listLoading.show();

                // 画图--请求过的不再请求
                if (typeof(that.drawArr[time]) == 'object') {
                    // that.drawAction(time);
                    that.switchData(time)
                } else {
                    $.ajaxLoading([that.getDrawData(Number(time))]);
                }

                //改变对应的颜色
                $(this).siblings('.timeBtn').removeClass('active');
                $(this).addClass('active');
            })

            // 调仓记录查看更多
            mui("body").on('tap', '.latestAdjustment .more', function() {
                window.location.href = site_url.adjustmentRecord_url + '?groupCode=' + that.gV.groupCode;
            })
        },
    };
    combinationDetails.init();
});