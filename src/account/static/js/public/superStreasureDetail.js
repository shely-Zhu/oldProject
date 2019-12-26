/**
 * 自选公募-超宝详情
 * @author wangjiajia 2019-11-20
 */


require('@pathCommonBase/base.js');

require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');



$(function() {

    var privateDetail = {
        gL: {
            shuju: [],
            time: [],
            cashFundDetail: "",
            fundCode: splitUrl["fundCode"],
            numAttr: "", //点击选项卡切换时存储字段
            dataRange: "1",
            end: "",
            fundName: "",
            transformMoney: "",
            accountType: '',
            maxNum:null,
            minNum:null,
        },
        init: function() {
            var that = this;
            //事件绑定
            that.ruleReq()
            that.getDataReq()
            console.log("你是真的不执行吗?")
            that.getTimeReq()
            that.event();
            that.getUserInfo(); //获取用户类型
        },
        drawLine: function() {
            var that = this;
            // 基于准备好的dom，初始化echarts实例
            // console.log($('#qrnhLine'))
            var myChart = echarts.init($("#qrnhLine")[0]);
            // 指定图表的配置项和数据
            var option = {
                title: {
                    // text: 'ECharts 入门示例'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '<p style="font-size:0.36rem;color: #364D97;">{c}%</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
                    backgroundColor: 'rgba(218,181,124, 0.1)',
                    // renderMode : 'richText', 
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
                    top: '5%',
                    left: '1%',
                    right: '0%',
                    bottom: '6%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: that.gL.time,
                    axisLine: {
                        lineStyle: {
                            color: '#e5e5e5'
                        }
                    },
                    axisLabel: {
                        showMinLabel: true,
                        showMaxLabel: true,
                        show: true,
                        color: '#9B9B9B', //这里用参数代替了
                        //margin: 20,
                        //rotate: 0.5,
                        textStyle: {
                          fontSize : 10      //更改坐标轴文字大小
                        },
                        interval: function(index, value) {
                            if(index == Math.floor(that.gL.time.length/2) || index == 0 || index == that.gL.time.length-1) {
                                return true
                            } else {
                                return false
                            }
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    max:that.gL.maxNum,
                    min:that.gL.minNum,
                    axisTick: {
                        show: false
                    },
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
                        formatter: function(value, index) {
                            // if(value != 0){
                                return value.toFixed(4) + '%';
                            // }
                        },
                    },
                },
                series: [{
                    type: 'line',
                    lineStyle: {
                        color: '#677EC4'
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
                                    offset: 0,
                                    color: '#5B83FF' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#fff' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    data: that.gL.shuju
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        // 获取认证信息
        getUserInfo: function() {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.queryUserBaseInfo_api,
                data: {},
                callbackDone: function(json) {
                    var data = json.data
                    that.gL.accountType = data.accountType
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        //获取初始数据
        getDataReq: function() { //数据接口
            var that = this;
            var obj = [{
                url: site_url.getAssetsCashInfo_api,
                data: {
                    //fundCode:"003075",
                    fundCode: that.gL.fundCode,
                },
                needLogin: true,
                callbackDone: function(json) {
                    var data = json.data
                    that.gL.fundCode = data.fundCode,
                    that.gL.fundName = data.fundName,
                    that.gL.transformMoney = data.totalMoney,
                    $(".totalM").text(data.totalMoneyMask ? data.totalMoneyMask : "--")
                    if(Number(data.totalMoneyMask) <= 0){//判断当持仓金额小于等于零时
                        $('.footerBtnLeft').css('background','#ccc');//按钮背景置灰
                        $('.footerBtnLeft').css('pointer-events','none');//按钮禁止点击
                    }else{
                        $('.footerBtnLeft').css('background','#fff');//按钮背景置灰
                        $('.footerBtnLeft').css('pointer-events','auto');//按钮禁止点击
                    }
                    $(".incomeMask").text(data.incomeMask ? data.incomeMask : "--")
                    $(".addupIncomeMask").text(data.addupIncomeMask ? data.addupIncomeMask : "--")
                    $("#HeadBarpathName").text(data.fundName ? data.fundName : "--")
                    $(".titleTwo").text(data.fundCode ? data.fundCode : "--")
                    $(".totalM").css({ "background": "linear-gradient(360deg, rgba(186,140,112,1) 0%, rgba(244,210,192,1) 100%)", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent" })
                }
            }];
            $.ajaxLoading(obj);
        },

        getTimeReq: function(t) {
            var that = this;
            var obj = [{
                url: site_url.prfFundNetWorthTrendChart_api,
                data: {
                    //fundCode:"000847",
                    fundCode: that.gL.fundCode,
                    dataRange: that.gL.dataRange,
                    end: that.gL.end,
                },
                needLogin: true,
                callbackDone: function(json) {
                    var jsonData = json.data.pageList;
                    that.gL.time = [];
                    that.gL.shuju = [];
                    for (var i = 0; i < jsonData.length; i++) {
                        if(i == 0) {
                           that.gL.time.push('             ' + jsonData[i].trdDt) 
                        } else if (i == jsonData.length - 1) {
                            that.gL.time.push(jsonData[i].trdDt + '                   ')
                        } else {
                            that.gL.time.push(jsonData[i].trdDt)
                        }
                        that.gL.shuju.push(jsonData[i].annYldRat)
                    }
                    console.log(that.gL.shuju,"能排序吗")
                    var temp = that.gL.shuju[0];
                    var maxNum = that.gL.shuju[0];
                    var minNum = that.gL.shuju[0];
                    //that.gL.shuju.forEach(item => maxNum = item > maxNum ? item : maxNum)
                    //that.gL.shuju.forEach(item => minNum = item < minNum ? item : minNum)
                    for( var j = 0 ; j < that.gL.shuju.length; j++) {
                        if(that.gL.shuju[j] > maxNum) {
                            maxNum = that.gL.shuju[j]
                        }
                    }
                    for( var m = 0 ; m < that.gL.shuju.length; m++) {
                        if(that.gL.shuju[m] < minNum) {
                            minNum = that.gL.shuju[m]
                        }
                    }
                    console.log("最大值",maxNum)
                    console.log("最小值",minNum)
                    that.gL.maxNum = maxNum;
                    that.gL.minNum = minNum;
                    that.drawLine()
                }
            }];
            $.ajaxLoading(obj);
        },
        ruleReq: function() {
            var that = this;
            var obj = [{
                url: site_url.findProtocolBasic_api,
                data: {
                    code: that.gL.fundCode,
                    //code:"003075",
                    template: "0",
                },
                needLogin: true,
                callbackDone: function(json) {
                    var data = json.data;
                    generateTemplate(data, $(".rulestestWrap"), $('#adjustment-template'));
                },
            }];
            $.ajaxLoading(obj);
        },
        event: function() {
            var that = this;
            //选项卡切换
            mui("body").on('mdClick', '.lineDraw .time', function(e) {
                $('.lineDraw .time').removeClass('active');
                $(this).addClass('active');
                if (that.gL.numAttr != $(this).attr('num')) {
                    if ($(this).attr('num') == 13) {
                        that.gL.dataRange = ""
                        that.gL.end = new Date().toLocaleString().split(" ")[0].replace(/\//g, '-');
                        that.getTimeReq()
                        that.gL.numAttr = 13
                    } else {
                        that.gL.dataRange = $(this).attr('num')
                        that.gL.end = ""
                        that.getTimeReq()
                        that.gL.numAttr = $(this).attr('num')
                    }
                }
            }, {
                'htmdEvt': 'superStreasureDetail_0'
            })
            mui("body").on('mdClick', '.materialContent', function(e) {
                    var id = $(this).attr('data-id');
                    window.location.href = site_url.superContent_url + "?id=" + id;

                }, {
                    'htmdEvt': 'superStreasureDetail_1'
                })
                //点击转出跳转
            mui("body").on('mdClick', '.rollOutBtn', function(e) {
                    var obj = {
                        "money": that.gL.transformMoney,
                        "productName": that.gL.fundName,
                        "fundCode": that.gL.fundCode
                    };
                    sessionStorage.setItem("transformMessage", JSON.stringify(obj));
                    window.location.href = site_url.pofCashTransformOut_url;
                }, {
                    'htmdEvt': 'superStreasureDetail_2'
                })
                //点击转入跳转
            mui("body").on('mdClick', '.shiftToBtn', function(e) {
                    if (that.gL.accountType === 0 || that.gL.accountType === 2) {
                        tipAction('暂不支持机构客户进行交易');
                    } else {
                        window.location.href = site_url.pofCashTransformIn_url+ "?fundName=" +that.gL.fundName + "&fundCode=" +that.gL.fundCode;
                        //window.location.href = site_url.pofCashTransformIn_url+ "?fundName=" +"jfskdjfhk"+ "&fundCode=" +"003075";

                    }

                }, {
                    'htmdEvt': 'superStreasureDetail_3'
                })
                //点击历史记录
            mui("body").on('mdClick', '.recordBtn', function(e) {
                window.location.href = site_url.superRecord_url+ "?fundCode=" +that.gL.fundCode;
            }, {
                'htmdEvt': 'superStreasureDetail_4'
            })
                //点击收益明细
            mui("body").on('mdClick', '.addLi', function(e) {
                window.location.href = site_url.returnsDetail_url + "?fundCode=" + that.gL.fundCode;
            }, {
                'htmdEvt': 'superStreasureDetail_4'
            })
        }
    }
    privateDetail.init()
})