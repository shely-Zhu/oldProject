/**
 * 公募资产详情页
 *
 * @author shiyunrui 20191123
 *
 * 具体可以参考 privateDetail.js
 */

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');
//是否大于0的判断器 用于设置涨红跌绿 可以参考publicAssets.js
Handlebars.registerHelper("if_than_0", function (value, options) {
    if (value > 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
//获取地址栏参数
getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}
$(function () {
    var fundCode
    var regard = {
        gV: {
            json: {},
            type: 'qrnh',//'qrnh'七年 'wfsy'万份
            time: 1,// 1月份 3 季度 6半年 12 一年 0成立以来
        },
        init: function () {
            var that = this;
            //页面初始化

            that.getData();



        },
        changeVal: function (prop, num, isfalse) {
            isfalse = isfalse === undefined ? true : false
            key = this.gV.json[prop]
            var value = key.toFixed(num)
            if (isfalse) {
                if (key > 0) {
                    value = "+" + value
                }
            }
            this.gV.json[prop] = value
        },
        getData: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.newfundDetails_api,
                data: {
                    fundCode: getQueryString('fundCode') ? getQueryString('fundCode') : '000847'
                },
                callbackDone: function (json) {
                    that.gV.json = json.data
                    var tplm = $("#dataLists").html();
                    var template = Handlebars.compile(tplm);
                    that.changeVal('annYldRat', 4)
                    that.changeVal('unitYld', 4, false)
                    that.changeVal('chgRat1w', 2)
                    that.changeVal('chgRat3m', 2)
                    that.changeVal('chgRat1y', 2)
                    that.changeVal('chgRatBgn', 2)
                    that.gV.json.trDate = that.gV.json.trDate.slice(5)
                    var html = template(that.gV.json);

                    $(".tplBox").html(html);
                    that.getData1();
                    that.getData2('qrnh', 1);
                    that.events();
                    $.each($(".net_worth_area .net_worth_item .value"), function (i, v) {
                        if (Number($(v).text().slice(0, $(v).text().length - 1)) >= 0) {
                            $(v).addClass('value_red')
                        } else {
                            $(v).addClass('value_green')
                        }
                    });
                    $("#HeadBarpathName").html(that.gV.json.secuSht);
                },
                callbackFail: function (json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        events: function () {
            var that = this;
            var json = that.gV.json
            var fundCode = getQueryString('fundCode') ? getQueryString('fundCode') : '000847'
            var fundComId = json.fmcComId ? json.fmcComId : 'gz04tVwXga'
            var secuId = json.secuId ? json.secuId : '000846.OF'
            var fundName = json.chiName ? json.chiName : '中融货币市场基金'
            // 基金经理
            mui("body").on("tap", ".fundManager", function (e) {
                window.location.href = site_url.pofFundManager_url + '?fundCode=' + fundCode
            });
            // 基金公司
            mui("body").on("tap", ".fundCompany", function (e) {
                window.location.href = site_url.pofFundCompany_url + '?fundComId=' + fundComId
            });
            // 基金档案
            mui("body").on("tap", ".fundFile", function (e) {
                window.location.href = site_url.pofFundFile_url + '?secuId=' + secuId + '&fundCode=' + fundCode;
            });
            // 交易规则
            mui("body").on("tap", ".dealRegArea .rule", function (e) {
                window.location.href = site_url.pofTransactionRules_url + '?fundCode=' + fundCode
            });
            // 定投
            mui("body").on("tap", ".footer .fixed_investement_btn", function (e) {
                window.location.href = site_url.pofOrdinarySetThrow_url + '?fundCode=' + fundCode + '&fundName=' + fundName + '&type=add';
            });
            // 买入
            mui("body").on("tap", ".footer .buy_btn", function (e) {
                window.location.href = site_url.fundTransformIn_url + '?fundCode=' + fundCode + '&fundName=' + fundName;
            });
            // 七日年华 万份收益
            mui("body").on("tap", "#redeemNav .navSpan ", function (e) {
                $(this).addClass('active').siblings().removeClass('active');
                var type = Number($(this).attr('type')) === 1 ? 'qrnh' : 'wfsy'
                var time = that.gV.time
                var end = new Date().toLocaleString().split(" ")[0].replace(/\//g, '-')
                that.gV.type = type
                if (time) {
                    that.getData2(type, time);
                } else {
                    that.getData2(type, time, end);
                }
            });
            //月 季 本年 一年 成立以来
            mui("body").on("tap", ".lineWrap .tab span ", function (e) {
                $(this).addClass('active').siblings().removeClass('active');

                var time = Number($(this).attr('time'))
                var end = new Date().toLocaleString().split(" ")[0].replace(/\//g, '-')
                that.gV.time = time
                if (time) {
                    that.getData2(that.gV.type, time);
                } else {
                    that.getData2(that.gV.type, time, end);
                }
            });

        },
        getData1: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.fundNetWorthList_api,
                data: {
                    fundCode: getQueryString('fundCode') ? getQueryString('fundCode') : '000847',
                    pageCurrent: 1,
                    pageSize: 3,
                },
                callbackDone: function (json) {
                    json = json.data.pageList
                    var tplm = $("#dataLists1").html();
                    var template = Handlebars.compile(tplm);
                    $.each(json, function (i, v) {
                        if (v.dayChgRat > 0) {
                            v.dayChgRat = "+" + v.dayChgRat
                        }
                    })

                    var html = template(json);
                    $(".tplBox1").html(html);
                    $.each($(".history_item .value"), function (i, v) {
                        if (Number($(v).text().slice(0, $(v).text().length - 1)) >= 0) {
                            $(v).addClass('value_red')
                        } else {
                            $(v).addClass('value_green')
                        }
                    });
                },
                callbackFail: function (json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getData2: function (type, time, end) {
            time = time === 0 ? "" : time
            var that = this;
            var dataOpt = {
                fundCode: getQueryString('fundCode') ? getQueryString('fundCode') : '000847',
                dataRange: time,
                end: end || ""
            };
            // 请求页面数据
            var obj = [{
                url: site_url.prfFundNetWorthTrendChart_api,
                data: dataOpt,
                callbackDone: function (json) {
                    json = json.data.pageList
                    var newData = {
                        seven: [], //存放折线图七日年化
                        date: [], //存放折线图收益日期
                        big: [] //存放折线图万份收益
                    }
                    $.each(json, function (i, v) {
                        newData.date.push(v.trdDt)
                        newData.seven.push(v.annYldRat)
                        newData.big.push(v.unitYld)
                    })
                    // newData.date = [json[0].trdDt, json[Math.ceil(json.length / 2)].trdDt, json[json.length - 1].trdDt]
                    // newData.seven = [json[0].annYldRat, json[Math.ceil(json.length / 2)].annYldRat, json[json.length - 1].annYldRat]
                    // newData.big = [json[0].unitYld, json[Math.ceil(json.length / 2)].unitYld, json[json.length - 1].unitYld]

                    that.drawLine(type, newData)

                },
                callbackFail: function (json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        //画折线图
        //type必传
        drawLine: function (type, data) {
            var that = this;
            if (type == 'qrnh') {
                //画的是七日年化折线图
                $("#qrnhLine").removeClass("hide")
                $(".noDataHintEcharts").addClass("hide")
                var chartId = $('#qrnhLine')[0],
                    xAxisData = data.date,
                    seriesData = data.seven;
            } else if (type == 'wfsy') {
                //画的是万份收益折线图
                $("#wfsyLine").removeClass("hide")
                $(".noDataHintEcharts").addClass("hide")
                var chartId = $('#wfsyLine')[0],
                    xAxisData = data.date,
                    seriesData = data.big;
            }
            var myChart = echarts.init(chartId);
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: '<p style="font-size:0.36rem;color: #DAB57C;">{c}%</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
                    backgroundColor: 'rgba(218,181,124, 0.1)',
                    // renderMode : 'richText', 
                    extraCssText: [7, 15, 15, 15],
                    textStyle: {
                        color: '#FADFBB'
                    },
                    confine: true,
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#fff' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#F1CDA8' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#D2B280' // 0% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    }
                },
                grid: {
                    top: '10%',
                    left: '5%',
                    right: '5%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#FADFBB'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#9B9B9B',   //这里用参数代替了
                        margin: 20
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#FADFBB'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#9B9B9B',
                        formatter: '{value}%',
                    },
                },
                series: [{
                    type: 'line',
                    lineStyle: {
                        color: '#FADFBB'
                    },
                    itemStyle: {
                        show: false
                    },
                    symbol: 'none',
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#F2E3CA' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#fff' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    data: seriesData
                }]
            });
        },

    }
    /*调用*/
    regard.init()
})
