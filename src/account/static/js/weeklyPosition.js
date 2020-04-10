/*
 * @page: 持仓周报
 * @Author: zhubingshuai
 * @Date:   2020-04-09
 * @description:
 * 持仓周报页面
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var setCookie = require('@pathCommonJsCom/setCookie.js');
var frozenAccount = require('@pathCommonJs/components/frozenAccount.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
var authenticationProcess = require('@pathCommonCom/authenticationProcess/authenticationProcess.js');

$(function() {

    var somePage = {
        gV: { // 全局变量
          
            data: '', //请求到的总资产data
            isShowInfo: true, //是否展示信息 默认展示
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            echartsData: {
                oneLine: {}, //产品折线
                sinceNow: {}
            },

        },
        init: function() {
            var that = this;
            console.log('weeklyposition')
            that.getData(); // 获取持仓周报信息
        },
        // 获取持仓周报数据
        getData: function() {
            debugger
            var that = this;
            var obj = [{
                    url: site_url.getWeeklyPositionInfo_api, //查询银行卡列表
                    // data: {
                    //     useEnv: 1
                    // },
                    callbackDone: function(json) { //成功后执行的函数
                        console.log(json)
                        // if (json.data.pageList.length) {
                        //     //获取银行卡后四位
                        //     Handlebars.registerHelper("get_last_4_value", function(value, options) {
                        //         if (value.length > 4) {
                        //             return ' - ' + value.substring(value.length - 4);
                        //         }
                        //         return '';
                        //     });
                        //     json.data.pageList.unshift({ 'bankName': '全部', 'bankAccountMask': '' })
                        //     var tplm = $("#bankLists").html();
                        //     var template = Handlebars.compile(tplm);
                        //     var html = template(json.data.pageList);
                        //     $("#bank_list").html(html);
                        // }
                    }
                },
                // { // 公募总资产
                //     url: site_url.pofTotalAssets_api,
                //     data: {
                //         bankAccount: bankAccount,
                //     },
                //     //async: false,
                //     needDataEmpty: true,
                //     needLoading: false, // 接口请求完不隐藏loading
                //     callbackDone: function(json) {
                //         if (json.status == '1000') {
                //             $('.noData').show();
                //             return;
                //         }
                //         that.gV.listLoading.hide();
                //         that.gV.data = json.data;
                //         //设置比较器
                //         // Handlebars.registerHelper("if_than_0", function(value, options) {
                //         //     if (value > 0) {
                //         //         return options.fn(this);
                //         //     } else {
                //         //         return options.inverse(this);
                //         //     }
                //         // });
                //         // that.chooseTipDesc();
                //         that.renderView();
                //         that.getData2('1', 1)
                //         // that.events();
                //     },
                //     callbackNoData: function(json) {
                //         $('.noData').show();
                //     }
                // }
            ];
            $.ajaxLoading(obj);
        },
        getData2: function(type, time, end) {
            time = time === 0 ? "" : time;
            var that = this;
            //判断是否已经有数据了，有的话不再请求接口
            if (time == '' && that.gV['echartsData'].sinceNow.date && that.gV['echartsData'].sinceNow.date.length) {
                // 成立至今
                that.$e.netLoading.hide();
                that.drawLine(type, that.gV['echartsData'].sinceNow);
                return false;
            }
            var dataOpt = {
                fundCode: splitUrl['fundCode'],
                dataRange: time,
                end: end || ""
            };
            var newData = {
                date: [], //存放折线图收益日期
                seven: [], //存放折线图七日年化  单位净值
                big: [], //存放折线图万份收益  累计净值
            }

            that.$e.netLoading.show();

            // 请求页面数据
            var obj = [{
                url: site_url.prfFundNetWorthTrendChart_api,
                data: dataOpt,
                callbackDone: function(json) {
                    json = json.data.pageList;
                    //拼数据
                    $.each(json, function(i, v) {
                        newData.date.push(v.trdDt);
                        if (that.fundType) {
                            newData.seven.push(v.annYldRat);
                            newData.big.push(v.unitYld);
                        } else {
                            newData.seven.push(v.unitNav);
                            newData.big.push(v.accuUnitNav);
                        }
                    })
                    
                    that.drawLine(type, newData);

                },
                callbackNoData: function() {
                    $("#line1").hide()
                    $(".noDataHintEcharts").show()
                }
            }]
            $.ajaxLoading(obj);
        },
        //画折线图,type必传
        drawLine: function(type, data) {
            var that = this;
            //判断有多少数据 只有一个值时 symbol 为circle 多组值时 symbol为 none
            if (data.date.length == 1) {
                that.gV.symboltype = 'circle';
            }
            if (type == '1') {
                //画的是七日年化折线图 或者单位净值
                var xAxisData = data.date,
                    seriesData = data.seven;
            } else if (type == '2') {
                //画的是万份收益折线图 或者累计净值
                var xAxisData = data.date,
                    seriesData = data.big;
            }
            var myChart = echarts.init($('.line_area')[0], {}, { width: $(".line_area").width(), height: $(".line_area").height() });
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: '<p style="font-size:0.36rem;color: #4A61A9;">{c}</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
                    backgroundColor: 'rgba(218,181,124, 0.1)',
                    extraCssText: [7, 15, 15, 15],
                    textStyle: {
                        color: '#5B83FF'
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
                                    offset: 0,
                                    color: '#fff' // 0% 处的颜色
                                }, {
                                    offset: 0.5,
                                    color: '#081F6B' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#5B83FF' // 0% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    }
                },
                grid: {
                    top: '10%',
                    left: '5%',
                    right: '11%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    // data: xAxisData,
                    data: ['周一', '周二'],
                    axisLine: {
                        lineStyle: {
                            color: '#e5e5e5'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#9B9B9B', //这里用参数代替了
                        margin: 20,
                        // align: 'right',
                        showMaxLabel: true,
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    min: 'dataMin',
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#e5e5e5'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#9B9B9B',
                        formatter: '{value}',
                    },
                },
                series: [{
                    type: 'line',
                    lineStyle: {
                        color: '#677EC4'
                    },
                    itemStyle: {
                        normal: {
                            color: "#677EC4",
                        }
                    },
                    symbol: that.gV.symboltype,
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#dfe7ff' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#fafbfe' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    data: seriesData
                }]
            });
        },
        renderView: function() {
            var that = this;
            //渲染整个页面 flag=true 渲染真实数据  flag=false 渲染成为***
            if (that.gV.isShowInfo) {
                //最新市值(元)
                $('.be_confirmed_amount .value').html(that.gV.data.inTransitTotal);
                //认购本金(元)
                $('.first_h_profit_box .h_profit_value').html(that.addSymbol(that.gV.data.todayProfit, that.gV.data.todayProfitMask));

                //现金宝列表渲染
                var tplm = $("#cashLists").html();
                var template = Handlebars.compile(tplm);
                var html = template(that.gV.data.cashDetails);
                $("#cashPageLists").html(html);
                // if (that.gV.data.fundDetailList.length == 0 && that.gV.data.cashDetails.length == 0) {
                //     $(".noData").show()
                //     $('footer').hide()
                // }
            } else {
                //所有标位显示的区域都更换为****
                $('.show_item').html('****');
                $('.position_h').css('color', '#272727');
            }
        },
        addSymbol: function(value, valueMask) {
            //添加正负号
            if (value > 0) {
                return "+" + valueMask;
            } else {
                return valueMask;
            }
        }
    };
    somePage.init();
});