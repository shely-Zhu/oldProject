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
            itemStyle1: {
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
            },
            itemStyle2: {
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
            },
            pieData: [],
        },
        //页面初始化函数
        init: function () {
            var that = this;
            that.events()
            that.getData()
            that.getData2()
            that.getData3()
            that.getData4()
        },
        drawCircle() {
            var that = this;
            var pieChart = echarts.init($('.circle')[0]);
            var optionData = []
            var pieData = that.gV.pieData
            pieData.forEach(n => {
                optionData.push(n.name)
            })
            // 指定图表的配置项和数据
            option = {
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: optionData,
                    icon: "roundRect",
                    itemWidth: 10,  // 设置宽度
                    itemHeight: 10, // 设置高度
                    itemGap: 15,//设置间距
                    x: '60%',
                    y: '35%',
                    formatter: function (name) {
                        for (var i = 0; i < pieData.length; i++) {
                            if (name === pieData[i].name) {
                                return " {title|" + name + "}  {value|" + pieData[i].value + "%}"
                            }
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
                        data: pieData
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

                        data: pieData
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
                    fundCode: getQueryString('fundCode') ? getQueryString('fundCode') : '000847'
                },
                callbackDone: function (json) {

                    json = json.data
                    var tplm = $("#dataLists1").html();
                    var template = Handlebars.compile(tplm);
                    json.assetValue = (json.assetValue / 100000000).toFixed(2)
                    var html = template(json);
                    $(".tplBox1").html(html);

                },
            }];
            $.ajaxLoading(obj1);
        },
        getData2: function (t) {
            var that = this;
            var obj2 = [{ //基金投资组合信息查询
                url: site_url.prfFnvestmentPortfolio_api,
                data: {
                    fundCode: getQueryString('fundCode') ? getQueryString('fundCode') : '000847'
                },
                callbackDone: function (json) {

                    json = json.data
                    var pieData = []
                    json.assetAllocation.forEach((n, i) => {
                        var item
                        item = {
                            name: n.assetTypeName,
                            value: n.assetAllocationRatio,
                        }
                        if (i === 0) {
                            item = {
                                name: n.assetTypeName,
                                value: n.assetAllocationRatio,
                                itemStyle: that.gV.itemStyle1,
                            }
                        }
                        if (i === 1) {
                            item = {
                                name: n.assetTypeName,
                                value: n.assetAllocationRatio,
                                itemStyle: that.gV.itemStyle2,
                            }
                        }
                        pieData.push(item)
                    })
                    that.gV.pieData = pieData;
                    that.gV.pieData.forEach(function (item) {

                        item.value = Number(item.value)
                    })

                    var tplm = $("#dataLists2").html();
                    var template = Handlebars.compile(tplm);
                    json.assetValue = (json.assetValue / 100000000).toFixed(2)
                    var html = template(json);
                    $(".tplBox2").html(html);

                },
            }];
            $.ajaxLoading(obj2);
        },
        getData3: function (t) {
            var that = this;

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
        },
        getData4: function (t) {
            var that = this;

            var obj4 = [{
                url: site_url.prfFundNoticeList_api,
                data: {
                    secuId: getQueryString('secuId')
                },
                callbackDone: function (json) {

                    json = json.data.pageList
                    var tplm = $("#dataLists4").html();
                    var template = Handlebars.compile(tplm);
                    var html = template(json);
                    $(".tplBox4").html(html);

                },
            }];
            $.ajaxLoading(obj4);
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
                if ($(this).index() == 2) {
                    that.getData3()
                }
                if ($(this).index() == 3) {
                    that.getData4()
                }
            })
        }
    };
    somePage.init();
});