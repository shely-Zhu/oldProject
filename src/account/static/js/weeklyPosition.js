/*
 * @page: 持仓周报
 * @Author: zhubingshuai
 * @Date:   2020-04-09
 * @description:
 * 持仓周报页面
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
// var setCookie = require('@pathCommonJsCom/setCookie.js');
// var frozenAccount = require('@pathCommonJs/components/frozenAccount.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
// var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var lineChart = require('@pathCommonJsCom/echartCom/lineChart.js');



$(function() {

    var somePage = {
        $e: {
            marketList: $('#marketCapitalList'), // 市值列表
            marketTemplate: $('#marketTemplate'), // 市值构成temp
            // productList: $('.newsList'), // 产品列表
            // listTemplate: $('#listTemplate'), // 产品temp
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            noData: $('.noData'), //没有数据的结构
        },
        gV: { // 全局变量
            data: '', //请求到的总资产data
            isShowInfo: true, //是否展示信息 默认展示           
            drawArr: {
                1: {}
            }, //保存画图数据

        },
        init: function() {
            var that = this;
            that.getData(); // 获取持仓周报信息
            that.event(); // 点击事件处理
        },
        // 获取持仓周报数据
        getData: function() {
            var that = this;
            var obj = [{
                    url: site_url.getWeeklyPosition_api, //头部金额
                    needLogin: true, //需要判断是否登陆
                    needLoading: false, // 接口请求完不隐藏loading
                    data:{},
                    callbackDone: function(json) { //成功后执行的函数
                        var jsonData = json.data
                        var marketList = jsonData.marketList
                        generateTemplate(marketList, that.$e.marketList, that.$e.marketTemplate);
                        // 市场观点
                        if (jsonData.marketList && marketList.length != 0) {
                            for(var i = 0; i < marketList.length; i++){
                                var tempValue = parseFloat(marketList[i].marketValueRatio)
                                mui($(".bar_progressbar").eq(i)).progressbar({progress:tempValue}).show();
                            }
                        } else {
                            $('.market_body').addClass('hide').hide()
                        }
                        // 最新市值(元)
                        $('.amount_value').html(jsonData.marketValue ? jsonData.marketValue : '--' );
                        //昨日总收益(元)
                        $('.h_profit_value').html(jsonData.totalShare ? jsonData.totalShare : '--');
                        $(".j_date").html(jsonData.period ? jsonData.period : '--')
                        
                        // 截取字符串,多出来的字符...显示
                        var tempmarketView = ''
                        if (jsonData.marketView.length !== 0) {
                            if (jsonData.marketView.length <= 85) {
                                tempmarketView = jsonData.marketView
                                $('.viewpoint_more').addClass("hide");
                            } else {
                                tempmarketView = jsonData.marketView.substr(0,85) + "..."
                            }
                            $(".get_marketView").html(tempmarketView)
                        } else {
                            $(".j_market_p").addClass("hide");
                        }
                    }
                },
                {
                    url: site_url.getSecuProdViews_api, //产品list接口
                    needLogin: true, //需要判断是否登陆
                    // needLoading: false, // 接口请求完不隐藏loading
                    // needDataEmpty: false,
                    data:{},
                    callbackDone: function (json) {
                        var jsonData = json.data // 获取数据
                        var tpl   =  $("#listTemplate").html();
                        // 预编译模板
                        var template = Handlebars.compile(tpl);
                        // 传入需要填充的数据匹配
                        var html = template(jsonData.prodList);
                        // 插入模板到指定位置
                        $("#newsList").html(html); 
                        // 使用generateTemplate，echarts报错
                        // generateTemplate(jsonData.list, $($(""))that.$e.productList, that.$e.listTemplate); 
                        for(var i = 0; i < jsonData.prodList.length; i++){
                            var prodPerformanceList = jsonData.prodList[i].prodPerformanceList
                            var xArr = [], first = [], second = [], drawArr = []
                            // 摘数据重组成折线图数据
                            if (prodPerformanceList && prodPerformanceList.length >= 2) {
                                for ( var v = 0; v < prodPerformanceList.length; v++){
                                    xArr.push(prodPerformanceList[v].profitLossDate)
                                    first.push(prodPerformanceList[v].profitLossPercentage)
                                    second.push(prodPerformanceList[v].hs300PerformancePercent)
                                    var tempObj = {
                                        "xArr": xArr,//时间
                                        "first": first,//本产品
                                        "second": second,//沪深300
                                        "position": true
                                    }
                                    drawArr.push(tempObj)
                                }
                                // 如果本产品为空不显示折线图
                                if (drawArr[i] && drawArr[i].first.length != 0){
                                    lineChart(drawArr, i, that.gV.noData, '', $($(".dd_line")[i]));
                                } else {
                                    $(".line_chart_wrap").eq(i).addClass('hide').hide()
                                }

                            } else {
                                $(".line_chart_wrap").eq(i).addClass('hide').hide()
                            }
                            // 本产品数据显示
                            if (jsonData.prodList[i].profitLossPercentageLast.length != 0) {
                                if (jsonData.prodList[i].profitLossPercentageLast.indexOf("-") != -1) {
                                    $(".dd_red span").eq(i).addClass("text_green").html(jsonData.prodList[i].profitLossPercentageLast + "%")
                                } else {
                                    $(".dd_red span").eq(i).addClass("text_red").html("+" + jsonData.prodList[i].profitLossPercentageLast + "%")
                                }
                            } else {
                                $(".dd_red").eq(i).addClass("hide").hide()
                            }
                           
                            // 300统计数据显示
                            if (jsonData.prodList[i].hs300PerformancePercentLast.length != 0) {
                                if (jsonData.prodList[i].hs300PerformancePercentLast.indexOf("-") != -1) {
                                    $(".dd_grey span").eq(i).addClass("text_green").html(jsonData.prodList[i].hs300PerformancePercentLast + "%")
                                } else {
                                    $(".dd_grey span").eq(i).addClass("text_red").html("+" + jsonData.prodList[i].hs300PerformancePercentLast + "%")
                                }
                            } else {
                                $(".dd_grey").eq(i).addClass("hide").hide()
                            }
                            
                            // 是否显示产品观点
                            if (jsonData.prodList[i].productViewpoint && jsonData.prodList[i].productViewpoint.length != 0) {
                                // 截取字符串,多出来的字符...显示
                                if (jsonData.prodList[i].productViewpoint.length <= 85) {
                                    jsonData.prodList[i].productViewpoint = jsonData.prodList[i].productViewpoint
                                    $('.product_more').eq(i).addClass("hide")
                                } else {
                                    jsonData.prodList[i].productViewpoint = jsonData.prodList[i].productViewpoint.substr(0,85) + "..."
                                }
                                $(".text_productViewpoint").eq(i).html(jsonData.prodList[i].productViewpoint)
                            } else {
                                $('.info_text').eq(i).addClass('hide')
                            }
                            // 联线是否显示
                            if (jsonData.prodList[i].pefConnectionList.length == 0) {
                                $(".video_body").eq(i).addClass("hide")
                            }
                            // 如果没有折线图，没有产品说明，没有私募回放就隐藏这个产品
                            if ($('.info_text').eq(i).hasClass('hide') && $('.line_chart_wrap').eq(i).hasClass('hide') && $('.video_body').eq(i).hasClass('hide')){
                                $('.j_list_body').eq(i).addClass('hide').hide()
                            }
                        }
                    },
                    callbackFail: function(json) {
                        // tipAction(json.msg);
                    },
                    callbackNoData: function(json) {
                        // that.$e.ddEvaluate.html("暂无数据");
                    }
                }
            ];
            $(".lazyload").lazyload();
            $.ajaxLoading(obj);
        },
        //所有点击事件
		event: function(){
            // var that = this;
            // 市场观点more事件
			mui("body").on('mdClick', '.viewpoint_more', function() {
                window.location.href = site_url.articleTemplate_url + '?id=null&articleBelong=30&applyType=0';
             }, {
                 'htmdEvt': 'viewpointMore_0'
             })
			// 产品观点more事件
			mui("body").on('mdClick', '.product_more', function() {
               var projectCode = $(this).attr("data-fundCode")
                window.location.href = site_url.informationTemplate_url + '?viewpoint=0&projectCode=' + projectCode;
            }, {
                'htmdEvt': 'productViewPoint_0'
            })
            // 播放器
             mui("body").on('mdClick', '.image_content' , function(){
                window.location.href = site_url.privatePlacementDetailJumpVideo_url+"?cid=" + $(this).attr("videoId")
            },{
                'htmdEvt': 'weeklyPositionProductPlay_0'
            });
            
		},
    };
    somePage.init();
});