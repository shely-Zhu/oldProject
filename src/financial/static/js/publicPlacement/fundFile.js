require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}
$(function () {
    let somePage = {
        //获取页面元素
        $e: {

        },
        //全局变量
        gV: {
            pieData: [
                {
                    name: "现金",
                    value: "0.2",
                    itemStyle: {
                        normal: {
                            color: {
                                colorStops: [{
                                    offset: 0,
                                    color: "#FBE2BD"
                                }, {
                                    offset: 1,
                                    color: "#D69549"
                                }],
                                global: false,
                                type: "linear",
                                x: 0,
                                x2: 1,
                                y: 0,
                                y2: 1
                            }
                        }
                    }
                },
                {
                    name: "股票",
                    value: "0.8",
                    itemStyle: {
                        normal: {
                            color: {
                                colorStops: [{
                                    offset: 0,
                                    color: "#D8D8D8"
                                }, {
                                    offset: 1,
                                    color: "#D8D8D8"
                                }],
                                global: false,
                                type: "linear",
                                x: 0,
                                x2: 1,
                                y: 0,
                                y2: 1
                            }
                        }
                    }
                }
            ],
            pieInnerData: [
                {
                    name: "现金",
                    value: "0.2",
                    itemStyle: {
                        normal: {
                            color: {
                                colorStops: [{
                                    offset: 0,
                                    color: "#CB9D65"
                                }, {
                                    offset: 1,
                                    color: "#D69549"
                                }],
                                global: false,
                                type: "linear",
                                x: 0,
                                x2: 1,
                                y: 0,
                                y2: 1
                            }
                        }
                    }
                },
                {
                    name: "股票",
                    value: "0.8",
                    itemStyle: {
                        normal: {
                            color: {
                                colorStops: [{
                                    offset: 0,
                                    color: "#C1C1C1"
                                }, {
                                    offset: 1,
                                    color: "#C1C1C1"
                                }],
                                global: false,
                                type: "linear",
                                x: 0,
                                x2: 1,
                                y: 0,
                                y2: 1
                            }
                        }
                    }
                }
            ]
        },
        //页面初始化函数
        init: function () {
            var that = this;
            that.events()
            that.getData()
        },
        drawCircle() {
            var that = this;
            var pieChart = echarts.init($('.circle')[0]);
            console.log(that.gV.pieData)
            // 指定图表的配置项和数据
            option = {
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['现金', '股票'],
                    icon: "roundRect",
                    itemWidth: 10,  // 设置宽度
                    itemHeight: 10, // 设置高度
                    itemGap: 15,//设置间距
                    x: '60%',
                    y: '35%',
                    formatter: function (name) {
                        if (name == "现金") {
                            return " {title|" + name + "}  {value|" + Number(that.gV.pieData[0].value) * 100 + "%}"
                        } else if (name == "股票") {
                            return " {title|" + name + "}  {value|" + Number(that.gV.pieData[1].value) * 100 + "%}"
                        }
                    },
                    textStyle: {
                        fontSize: 16,
                        rich: {
                            value: {
                                fontSize: 16,
                                fontWeight: 600
                            }
                        }
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['46%', '70%'],
                        center: ['30%', '47%'],
                        avoidLabelOverlap: false,
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false, //去掉引导线
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: that.gV.pieData
                    },
                    {
                        name: '',
                        type: 'pie',
                        hoverAnimation: false,
                        radius: ['40%', '46%'],
                        center: ['30%', '47%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: that.gV.pieInnerData,
                    }
                ]
            };
            // 绘制图表
            pieChart.setOption(option);
        },
        getData: function (t) {
            var that = this;
            var obj1 = [{ //基金基本概况查询
                url: site_url.prfFundBasicProfile_api,
                data: {
                    fundCode: getQueryString('fundCode')
                },
                callbackDone: function (json) {

                    json = json.data
                    console.log(json)

                    var tplm = $("#dataLists1").html();
                    var template = Handlebars.compile(tplm);
                    json.assetValue = (json.assetValue / 100000000).toFixed(2)
                    var html = template(json);
                    $(".tplBox1").html(html);

                },
            }];
            $.ajaxLoading(obj1);
            var obj2 = [{ //基金投资组合信息查询
                url: site_url.prfFnvestmentPortfolio_api,
                data: {
                    fundCode: getQueryString('fundCode')
                },
                callbackDone: function (json) {

                    json = json.data
                    console.log(json)

                    var tplm = $("#dataLists2").html();
                    var template = Handlebars.compile(tplm);
                    json.assetValue = (json.assetValue / 100000000).toFixed(2)
                    var html = template(json);
                    $(".tplBox2").html(html);

                },
            }];
            $.ajaxLoading(obj2);
            // var obj3 = [{
            //     url: site_url.prfFundBasicProfile_api,
            //     data: {
            //         fundCode: getQueryString('fundCode')
            //     },
            //     callbackDone: function (json) {

            //         json = json.data
            //         console.log(json)

            //         var tplm = $("#dataLists1").html();
            //         var template = Handlebars.compile(tplm);
            //         json.assetValue = (json.assetValue / 100000000).toFixed(2)
            //         var html = template(json);
            //         $(".tplBox1").html(html);

            //     },
            // }];
            // $.ajaxLoading(obj3);
            // var obj4 = [{
            //     url: site_url.prfFundBasicProfile_api,
            //     data: {
            //         fundCode: getQueryString('fundCode')
            //     },
            //     callbackDone: function (json) {

            //         json = json.data
            //         console.log(json)

            //         var tplm = $("#dataLists1").html();
            //         var template = Handlebars.compile(tplm);
            //         json.assetValue = (json.assetValue / 100000000).toFixed(2)
            //         var html = template(json);
            //         $(".tplBox1").html(html);

            //     },
            // }];
            // $.ajaxLoading(obj4);
        },
        events: function () {
            var that = this;

            //tab点击切换
            mui("body").on('tap', '.tabs>li', function () {
                $(this).addClass('active').siblings().removeClass('active');
                $(".wrap>.panel").eq($(this).index()).addClass('active').siblings().removeClass('active');
                if ($(this).index() == 1) {
                    that.drawCircle()
                }
            })
        }
    };
    somePage.init();
});