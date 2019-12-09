/**
 * 公募资产详情页
 *
 * @author shiyunrui 20191123
 *
 * 具体可以参考 privateDetail.js
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var authenticationProcess = require('@pathCommonJs/components/authenticationProcess.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
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
console.log(authenticationProcess, "authenticationProcess");
$(function () {
    var fundCode
    var regard = {
        gV: {
            json: {},
            type: '1',//'1'七年 '2'万份
            time: 1,// 1月份 3 季度 6半年 12 一年 0成立以来
            idnoCheckflagArr: ['未认证', '已认证'],//是否实名认证 0-否 1-是 
            isRiskEndureArr: ['未风测', '已风测'],//是否风险测评 0-否 1-是    endurePubIsold 公募风险评测是否过期 0-否 1-是
            isPerfectArr: ['未完善', '已完善'],//是否完善个人信息 0-否 1-是 
            accreditedInvestorArr: ['未通过', '已通过', '已过期', '未做'],//是否合格投资者 空-未做； 0-未通过；1-已通过； 2-已过期 
            tipStatus: false,
            invTypCom:'' ,  // 基金类型
            secuSht:''   // 基金名简写
        },
        fundType: splitUrl['fundType'] == '10300' ? 1 : 0, //10300 货币基金类型，其余为普通基金类型
        init: function () {
            var that = this;
            //页面初始化
            that.getData();
            $('.tips').hide()

        },
        changeVal: function (prop, num, isfalse) {
            isfalse = isfalse === undefined ? true : false
            key = this.gV.json[prop]
            var value = key.toFixed(num)
            if (isfalse) {
                if (key > 0) {
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
                    fundCode: splitUrl['fundCode'],
                },
                callbackDone: function (json) {
                    that.gV.json = json.data
                    that.gV.json.fundType = that.fundType
                    if(that.gV.json.chgRat1d > 0){
                        that.gV.json.chgRat1d_s  = '+' + that.gV.json.chgRat1d.toFixed(2)
                    }
                    if(that.gV.json.annYldRat > 0){
                        that.gV.json.annYldRat_s  = '+' + that.gV.json.annYldRat.toFixed(2)
                    }
                    var tplm = $("#dataLists").html();
                    var template = Handlebars.compile(tplm);
                    that.changeVal('annYldRat', 4)
                    that.changeVal('unitYld', 4, false)
                    that.changeVal('chgRat1w', 2)
                    that.changeVal('chgRat3m', 2)
                    that.changeVal('chgRat1y', 2)
                    that.changeVal('chgRatBgn', 2)
                    that.gV.json.trDate = that.gV.json.trDate.slice(5)
                    that.gV.json.fundType = that.fundType
                    that.gV.invTypCom = json.data.invTypCom
                    that.gV.secuSht = json.data.secuSht
                    var html = template(that.gV.json); (html, "00");
                    
                    $(".tplBox").html(html);
                    that.getFundCollectionInit()
                    that.getData1();
                    that.getData2('1', 1);
                    that.events();
                    var historyStr = that.fundType ? '<div class="item_name">日期</div> <div class="item_name">万份收益</div><div class="item_name">七日年化</div>' : '<div class="item_name">日期</div><div class="item_name">单位净值</div><div class="item_name">累计净值</div><div class="item_name">日涨幅</div>'
                    $('.history_area >.history_item').html(historyStr);

                    var redeemNavArr = that.fundType ? ['七日年化', '万份收益'] : ['单位净值', '累计净值']
                    $($('#redeemNav span')[0]).text(redeemNavArr[0])
                    $($('#redeemNav span')[1]).text(redeemNavArr[1])
                    $.each($(".net_worth_area .net_worth_item .value"), function (i, v) {
                        if (Number($(v).text().slice(0, $(v).text().length - 1)) >= 0) {
                            $(v).addClass('value_red')
                        } else if(Number($(v).text().slice(0, $(v).text().length - 1)) == 0) {
                            $(v).addClass('value_c')
                        } else {
                            $(v).addClass('value_green')
                        }
                    });
                    $("#HeadBarpathName").html("<span>"+that.gV.json.secuSht+"</span>"+"</br><span>"+that.gV.json.trdCode+"</span>");
                    var saleFee = json.data.fundPurchaseFeeRate.detailList[0].fundFeeRate;
                    var discount = Number(json.data.fundPurchaseFeeRate.detailList[0].fundFeeRate.split("%")[0])*json.data.discount/100 + '%'
                    $(".divider-top").html(json.data.purSt + '、' + json.data.redemSt + '、' + '买入费率' + '(<span class="line-rate">' + saleFee + '</span>' + ' <span class="discount">' + discount + '</span>)')
                },
                callbackFail: function (json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        // 获取认证信息
        getUserInfo: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.user_api,
                data: {
                },
                callbackDone: function (json) {
                    json = json.data
                    json.isRiskEndure = (json.isRiskEndure === 1 && json.endurePubIsold === 0) ? 1 : 0 //已经风险测评且没有过期 才展示已风测
                    if (json.idnoCheckflag) {
                        $($('.tips .tips-li')[0]).hide()
                    } else {
                        $($('.tips .bank-status')[0]).text(that.gV.idnoCheckflagArr[json.idnoCheckflag])
                    }
                    if (json.isRiskEndure) {
                        $($('.tips .tips-li')[1]).hide()
                    } else {
                        $($('.tips .bank-status')[1]).text(that.gV.isRiskEndureArr[json.isRiskEndure])
                    }
                    if (json.isPerfect) {
                        $($('.tips .tips-li')[2]).hide()
                    } else {
                        $($('.tips .bank-status')[2]).text(that.gV.isPerfectArr[json.isPerfect])
                    }
                    if (json.accreditedInvestor) {
                        $($('.tips .tips-li')[3]).hide()
                    } else {
                        $($('.tips .bank-status')[3]).text(json.accreditedInvestor ? that.gV.accreditedInvestorArr[json.accreditedInvestor] : '未做')
                    }
                    if (json.idnoCheckflag || json.isRiskEndure || json.isPerfect || json.accreditedInvestor) {
                       // $('.tips').show()
                        that.gV.tipStatus = true
                    } else {
                        that.gV.tipStatus = true

                    }
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
            var fundCode = splitUrl['fundCode']
            var fundComId = json.fmcComId ? json.fmcComId : 'gz04tVwXga'
            var secuId = json.secuId ? json.secuId : '000846.OF'
            var fundName = json.chiName ? json.chiName : '中融货币市场基金'
            // 基金经理
            mui("body").on('mdClick', ".fundManager", function (e) {
                window.location.href = site_url.pofFundManager_url + '?fundCode=' + fundCode
            });
            // 基金公司
            mui("body").on('mdClick', ".fundCompany", function (e) {
                window.location.href = site_url.pofFundCompany_url + '?fundComId=' + fundComId
            });
            // 基金档案
            mui("body").on('mdClick', ".fundFile", function (e) {
                window.location.href = site_url.pofFundFile_url + '?secuId=' + secuId + '&fundCode=' + fundCode;
            });
            // 历史净值查看更多
            mui("body").on('mdClick', ".history_area .history_more", function (e) {
                window.location.href = site_url.mineHistoryDetail_url + '?fundCode=' + fundCode
            });
           
            // 交易规则
            mui("body").on('mdClick', ".dealRegArea .rule", function (e) {
                window.location.href = site_url.pofTransactionRules_url + '?fundCode=' + fundCode
            });
            // // 定投 买入
            // mui("body").on('mdClick', ".footer >div", function (e) {
            //     console.log($(this).attr('type'));
            //     var type = $(this).attr('type')
            //     if (type === 1 || type === 2) return
            //     that.getUserInfo()
            //     $('.tips').show()
            //     return
            //     window.location.href = site_url.pofOrdinarySetThrow_url + '?fundCode=' + fundCode + '&fundName=' + fundName + '&type=add';
            // });
            // 定投
            mui("body").on('mdClick', ".footer .fixed_investement_btn", function (e) {

                that.getUserInfo()
                if (that.gV.tipStatus) {
                    window.location.href = site_url.pofOrdinarySetThrow_url + '?fundCode=' + fundCode + '&fundName=' + fundName + '&type=add';
                }
            });
            // 买入
            mui("body").on('mdClick', ".footer .buy_btn", function (e) {
            
                //that.getUserInfo()
                window.location.href = site_url.fundTransformIn_url + '?fundCode=' + fundCode + '&fundName=' + fundName;
                if (that.gV.tipStatus) {
                    window.location.href = site_url.fundTransformIn_url + '?fundCode=' + fundCode + '&fundName=' + fundName;
                }
            });
            //认证
            mui("body").on('mdClick', ".tips .tips-li-right", function (e) {
                var type = $(this).attr('type')
                switch (type) {
                    case "1":
                        window.location.href = site_url.realName_url
                        break;

                    case "2":
                        window.location.href = site_url.realName_url
                        break;

                    case "3":
                        window.location.href = site_url.realName_url
                        break;

                    case "4":
                        window.location.href = site_url.realName_url
                        break;

                    default:
                        break;
                }
            });
            //一键认证
            mui("body").on('mdClick', ".tips .tips-btn", function (e) {
                window.location.href = site_url.realName_url
            });

            // 七日年华 万份收益
            mui("body").on('mdClick', "#redeemNav .navSpan ", function (e) {
                $(this).addClass('active').siblings().removeClass('active');
                var divs = $('.lineWrap .line_area>div')
                var index = $(this).index()
                $(divs[index]).show().siblings().hide()
                var type = Number($(this).attr('type'))
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
            mui("body").on('mdClick', ".lineWrap .tab span ", function (e) {
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

            //分享  -- 跳往原生页面
            mui("body").on('mdClick', ".share_area", function (e) {
                //要携带参数后期补上
                window.location.href = site_url.pofShare_url + '?fundCode=' + fundCode + '&shareTitle=' + that.gV.secuSht
            });
            //加自选  
            mui("body").on('mdClick', ".selected_area", function (e) {
                var prams ={
                    fundCode:fundCode,
                    collected:'',
                    fundNameShort:that.gV.secuSht,
                    invTypCom:that.gV.invTypCom,
                }
                if($(this).hasClass('active')){
                    $(this).removeClass('active') 
                    prams.collected = '0'
                }else{
                    $(this).addClass('active')
                    prams.collected = '1'
                }
                that.getFundCollection(prams)
            });

        },
        //收藏管理--判断是否被收藏
        getFundCollectionInit: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.prfFundCollectionQueryCode_api,
                data: {
                    
                },
                needLogin: false,
                callbackDone: function (json) {
                   var fundCode = splitUrl['fundCode'];
                   debugger
                   if(json.data.includes(fundCode)){
                    $(".selected_area").addClass('active')
                   }
                },
                callbackFail: function (json) {
                    tipAction(json.message);
                }
            }]
            $.ajaxLoading(obj);
        },
        //收藏管理
        getFundCollection: function (prams) {
            var that = this;
            var manageList = [];
            manageList.push(prams)
            // 请求页面数据
            var obj = [{
                url: site_url.prfFundCollectionMG_api,
                data: {
                    feedback:'',
                    manageList:manageList 
                },
                callbackDone: function (json) {
                    tipAction(json.message);
                },
                callbackFail: function (json) {
                    tipAction(json.message);
                }
            }]
            $.ajaxLoading(obj);
        },
        getData1: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.fundNetWorthList_api,
                data: {
                    fundCode: splitUrl['fundCode'],
                    pageCurrent: 1,
                    pageSize: 4,
                },
                callbackDone: function (json) {
                    json = json.data
                    var tplm = $("#dataLists1").html();
                    var template = Handlebars.compile(tplm);
                    $.each(json.pageList, function (i, v) {
                    })
                    json.fundType = that.fundType
                    var html = template(json);
                    $(".tplBox1").html(html);
                    $.each($(".history_item .value"), function (i, v) {
                        if (Number($(v).text().slice(0, $(v).text().length - 1)) > 0) {
                            $(v).addClass('value_red')
                        } else if(Number($(v).text().slice(0, $(v).text().length - 1)) == 0) {
                            $(v).addClass('value_c')
                        }else{
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
                fundCode: splitUrl['fundCode'],
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
                        date: [], //存放折线图收益日期
                        seven: [], //存放折线图七日年化  单位净值
                        big: [],//存放折线图万份收益  累计净值
                    }
                    $.each(json, function (i, v) {
                        newData.date.push(v.trdDt)
                        if (that.fundType) {
                            newData.seven.push(v.annYldRat)
                            newData.big.push(v.unitYld)
                        } else {
                            newData.seven.push(v.unitNav)
                            newData.big.push(v.accuUnitNav)
                        }
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
            if (type == '1') {
                //画的是七日年化折线图 或者单位净值
                var chartId = document.getElementById("line1"),
                    xAxisData = data.date,
                    seriesData = data.seven;
            } else if (type == '2') {
                //画的是万份收益折线图 或者累计净值
                var chartId = document.getElementById("line2"),
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