/**
 * 自选公募-超宝详情
 * @author wangjiajia 2019-11-20
 */


require('@pathCommonBase/base.js');

// require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var frozenAccount = require('@pathCommonJs/components/frozenAccount.js');
var authenticationProcess = require('@pathCommonCom/authenticationProcess/authenticationProcess.js');



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
            qrnhArr: {
                oneMonth : {},
                threeMonth: {},
                sixMonth: {},
                oneYear: {},
                sinceNow: {}
            },
            symboltype : 'none',	//echarts 节点样式
        },
        init: function() {
            var that = this;
            //事件绑定
            that.ruleReq()
            that.getDataReq()
            console.log("你是真的不执行吗?")
            that.getTimeReq()
            that.event();
            //that.getUserInfo(); //获取用户类型
        },
        drawLine: function(data) {
            var that = this;
            //判断有多少数据 只有一个值时 symbol 为circle 多组值时 symbol为 none
			if(data.profitThoudDate.length == 1 ){
				that.gL.symboltype = 'circle'
			}	
            var xAxisData = data.profitThoudDate,
                seriesData = data.sevenIncomeRate,
                maxNum = data.sevenIncomeRate[0],
                minNum = data.sevenIncomeRate[0],
                myChart = echarts.init($("#qrnhLine")[0])
            // 七日年化最大值，最小值
            for( var j = 0 ; j < seriesData.length; j++) {
                if(seriesData[j] > maxNum) {
                    maxNum = seriesData[j]
                }
            }
            for( var m = 0 ; m < seriesData.length; m++) {
                if(seriesData[m] < minNum) {
                    minNum = seriesData[m]
                }
            }
            console.log("最大值",maxNum,"最小值", minNum)
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
                    top: '4%',
                    left: '1%',
                    right: '0%',
                    bottom: '6%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
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
                            if(index == Math.floor(xAxisData.length/2) || index == 0 || index == xAxisData.length-1) {
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
                    max:maxNum,
                    min:minNum,
                    /*splitNumber: 6,*/
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
                        }
                    },
                    interval: (Number(maxNum) - Number(minNum))/5
                },
                series: [{
                    type: 'line',
                    lineStyle: {
                        color: '#677EC4'
                    },
                    itemStyle: {
                        show: false
                    },
                    symbol: that.gL.symboltype,
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
                    data: seriesData
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
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
                    var data = json.data;
                    that.gL.fundCode = data.fundCode;
                    that.gL.fundName = data.fundName;
                    that.gL.transformMoney = data.totalMoney;
                    $(".totalM").text(data.totalMoneyMask ? data.totalMoneyMask : "--");
                    if(Number(data.totalMoneyMask) <= 0){//判断当持仓金额小于等于零时
                        $('.footerBtnLeft').css('background','#ccc');//按钮背景置灰
                        $('.footerBtnLeft').css('pointer-events','none');//按钮禁止点击
                    }else{
                        $('.footerBtnLeft').css('background','#fff');//按钮背景置灰
                        $('.footerBtnLeft').css('pointer-events','auto');//按钮禁止点击
                    }
                    $(".incomeMask").text(data.incomeMask ? data.incomeMask : "--")
                    $(".addupIncomeMask").text(data.holdIncome ? data.holdIncome : "--")
                    $("#HeadBarpathName").text(data.fundName ? data.fundName : "--")
                    $(".titleTwo").text(data.fundCode ? data.fundCode : "--")
                    $(".totalM").css({ "background": "linear-gradient(360deg, rgba(186,140,112,1) 0%, rgba(244,210,192,1) 100%)", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent" })
                },
            }];
            $.ajaxLoading(obj);
        },

        getTimeReq: function(t) {
            var that = this;
            var num = that.gL.dataRange;
            var newData = {
                sevenIncomeRate: [], //存放折线图七日年化
                profitThoudDate: [], //存放折线图收益日期
            }
            //判断是否已经有数据了，有的话不再请求接口
            if( num == 1 && that.gL['qrnhArr'].oneMonth.profitThoudDate && that.gL['qrnhArr'].oneMonth.profitThoudDate.length){
                //请求的是近一个月的数据
                that.drawLine( that.gL['qrnhArr'].oneMonth );
                return false;
            } else if( num == 3 && that.gL['qrnhArr'].threeMonth.profitThoudDate && that.gL['qrnhArr'].threeMonth.profitThoudDate.length){
                //近三个月
                that.drawLine( that.gL['qrnhArr'].threeMonth );
                return false;
            } else if( num == 6 && that.gL['qrnhArr'].sixMonth.profitThoudDate && that.gL['qrnhArr'].sixMonth.profitThoudDate.length ){
                //近六个月
                that.drawLine( that.gL['qrnhArr'].sixMonth );
                return false;
            } else if( num == 12 && that.gL['qrnhArr'].oneYear.profitThoudDate && that.gL['qrnhArr'].oneYear.profitThoudDate.length){
                //近一年
                that.drawLine( that.gL['qrnhArr'].oneYear );
                return false;
            } else if( num == 13 && that.gL['qrnhArr'].sinceNow.profitThoudDate && that.gL['qrnhArr'].sinceNow.profitThoudDate.length){
                //成立至今
                that.drawLine( that.gL['qrnhArr'].sinceNow );
                return false;
            }
            var obj = [{
                url: site_url.prfFundNetWorthTrendChart_api,
                data: {
                    //fundCode:"000847",
                    fundCode: that.gL.fundCode,
                    dataRange: that.gL.dataRange,
                    end: that.gL.end
                },
                needLogin: true,
                callbackDone: function(json) {
                    var jsonData = json.data.pageList;
                    $.each( jsonData, function(i, el){
                        if(i == 0) {
                            el.trdDt = '             ' + el.trdDt
                        } else if (i == jsonData.length - 1) {
                            el.trdDt = el.trdDt + '                   '
                        }
                        newData.sevenIncomeRate.push( el.annYldRat);
                        newData.profitThoudDate.push( el.trdDt);
                    })
                    switch(Number(that.gL.dataRange)) {
                        case 1: that.gL['qrnhArr'].oneMonth = newData;break;
                        case 3: that.gL['qrnhArr'].threeMonth = newData;break;
                        case 6: that.gL['qrnhArr'].sixMonth = newData;break;
                        case 12: that.gL['qrnhArr'].oneYear = newData;break;
                        case 13: that.gL['qrnhArr'].sinceNow = newData;break;
                    }
                    that.drawLine(newData)
                    /*that.gL.time = [];
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
                    that.gL.maxNum = maxNum;
                    that.gL.minNum = minNum;*/
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
         	 // 客户预约产品所需条件
		 getConditionsOfOrder: function(fundCode) {
            var type = type;
            var that = this;
      
            //发送ajax请求
            var obj = [{
                url: site_url.queryCustomerAuthInfo_api,
                data: {
                    fundCode: fundCode,
                },
                //contentTypeSearch: true,
                //needLogin: true, //需要判断是否登陆
                callbackDone: function(json) { //成功后执行的函数
                    var jsonData = json.data,
                        notice = "",
                        noticeObj = "",
                        isPopup = "", //弹框售前告知书
                        isRiskPopup = "", //期限不符弹框
                        PopupElasticLayer = "",
                        objElasticLayer = "", // 产品风险等级与个人承受能力匹配弹框
                        isReal = "", //是否实名认证，因为如果机构切一键认证是实名，点击需要提示弹框。
                        singleaAuthenPath = "", //一键认证跳转链接
                        singleaAuthen = false; //条件框是否展示
                          $(".isRiskMatchBox").show();
                          $(".isRiskMatch_mask").show();
                          if(jsonData.isRiskMatch == "1"){
                                //风险等级匹配
                                $(".isRiskMatchBox_match").show()
                                $(".isRiskMatchBox_noMatch").hide()
                                $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力相匹配")
                            }else if(jsonData.isRiskMatch == "0"){
                                $(".isRiskMatchBox_noMatch").show()
                                $(".isRiskMatchBox_match").hide()
                                $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力不相匹配")
                                $(".isRiskMatchResult").html("查看评测结果")
                                $(".isRiskMatchResult").attr("type","noRisk")
                            }else if(jsonData.isRiskMatch == "2"){
                                $(".isRiskMatchBox_noMatch").show()
                                $(".isRiskMatchBox_match").hide()
                                $(".isRiskMatchBox_header").html("您的风险测评已过期,请重新进行风险测评")
                                $(".isRiskMatchResult").html("重新风测")
                                $(".isRiskMatchResult").attr("type","repeatRisk")
                            }
      
                },
                callbackFail: function(json) { //失败后执行的函数
                   tipAction(json.message);
          that.data.canClick = true; //变为可点击
      
                },
                callbackNoData:function(argument) {
                    tipAction(json.message);
          that.data.canClick = true; //变为可点击
                }
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

                // 账户过期弹窗
                var result = frozenAccount("saleFreeze", window.location.href, false,'superStreasureDetail_6');
                if( !result ) {
                    window.location.href = site_url.pofCashTransformOut_url + '?fundCode=' + that.gL.fundCode + '&productName=' + new Base64().encode(that.gL.fundName);
                };

            }, {
                'htmdEvt': 'superStreasureDetail_2'
            })
                //点击转入跳转
            mui("body").on('mdClick', '.shiftToBtn', function(e) {
                $(".isRiskMatch_mask").hide();
                $(".isRiskMatchBox").hide();
                // 先判断是否司法冻结以及身份过期，再判断一键认证
                var result = frozenAccount("buyFreeze", window.location.href, false,'superStreasureDetail_7');
                if( !result ) {
                    var url = site_url.pofCashTransformIn_url+ "?fundName=" +that.gL.fundName + "&fundCode=" +that.gL.fundCode;
                    authenticationProcess(that.gL.fundCode, url, true,'superStreasureDetail')
                };

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
                window.location.href = site_url.returnsDetail_url + "?fundCode=" + that.gL.fundCode + "&isSuper=1";
            }, {
                'htmdEvt': 'superStreasureDetail_5'
            })
        }
    }
    privateDetail.init()
})