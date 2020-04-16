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
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var lineChart = require('@pathCommonJsCom/echartCom/lineChart.js');



$(function() {

    var somePage = {
        $e: {
            marketList: $('.marketCapitalList'), // 市值列表
            marketTemplate: $('#marketTemplate'), // 市值构成temp
            productList: $('.newsList'), // 产品列表
            listTemplate: $('#listTemplate'), // 产品temp
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            noData: $('.noData'), //没有数据的结构
        },
        gV: { // 全局变量
            data: '', //请求到的总资产data
            isShowInfo: true, //是否展示信息 默认展示
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            list_template: '', //列表的模板，生成后存放在这里
            noData: [
                []
            ], //保存画图数据
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
                    data: {
                        customerNo: splitUrl['customerNo'] || "" // 客户编号
                    },
                    callbackDone: function(json) { //成功后执行的函数
                        var jsonData = json.data
                          // 市值构成 start
                          generateTemplate(jsonData.list, that.$e.marketList, that.$e.marketTemplate);
                           // 市值构成 end
                          
                          // 市场观点
                        //   $('.get_marketView').html(jsonData.marketView)
                        //   jsonData.list.forEach((item,v)=>{
                        //     $(".bar_progressbar span").eq(v).css({'width':item.marketValueRatio+"%"})
                        //   })
                        for(var i = 0; i < jsonData.list.length; i++){
                            $(".bar_progressbar span").eq(i).css({'width':jsonData.list[i].marketValueRatio+"%"})
                        }
                        // var test2 = '客户持仓周报-证券投资'
                        $("#HeadBarpathName").html("<span>客户持仓周报-证券投资</span>" + "</br><span>" + jsonData.period + "</span>");
                        // 最新市值(元)
                        $('.amount_value').html(jsonData.marketValue ? jsonData.marketValue : '--' );
                        //昨日总收益(元)
                        $('.h_profit_value').html(jsonData.totalShare ? jsonData.totalShare : '--');
                    }
                },
                {
                    url: site_url.getSecuProdViews_api, //产品list接口
                    needLogin: true, //需要判断是否登陆
                    // needLoading: false, // 接口请求完不隐藏loading
                    // needDataEmpty: false,
                    data: {
                        customerNo: splitUrl['customerNo'] || "" // 客户编号
                    },
                    callbackDone: function (json) {
                        var jsonData = json.data, num = 0 // 获取数据
                        var tpl   =  $("#listTemplate").html();
                        // 预编译模板
                        var template = Handlebars.compile(tpl);
                        // 传入需要填充的数据匹配
                        var html = template(jsonData.prodList);
                        // 插入模板到指定位置
                        $("#newsList").html(html); 

                        // generateTemplate(jsonData.list, $($(""))that.$e.productList, that.$e.listTemplate);                       
                        var drawArr = [{
                            "xArr": ['周一', '周二', '周三'],
                            "first": [120, 132, 101],
                            "second": [-220, 182, -191],
                            "position": true

                        }]
                        var flag = drawArr["position"]
                        num = 0
                        console.log(flag ? 1:0)
                        // jsonData.prodList.forEach((item, v)=>{
                        //     // console.log(item);
                        //     if (item.productViewpoint.length <= 95) {
                        //         item.productViewpoint = item.productViewpoint
                        //     } else {
                        //         item.productViewpoint = item.productViewpoint.substr(0,95)+"..."
                        //     }
                        //     lineChart(drawArr, num, that.gV.noData, '基金收益率', $($(".dd_line"))[v]);
                        // });
                        
                        for(var i = 0; i < jsonData.prodList.length; i++){
                            
                            var prodPerformanceList = jsonData.prodList[i].prodPerformanceList
                            for ( var v = 0; v < prodPerformanceList.length; v++){
                                if (prodPerformanceList[v].profitLossPercentage.indexOf("+") != -1) {
                                    $(".dd_red span").eq(i).addClass("text_red").html(prodPerformanceList[v].profitLossPercentage)
                                } else {
                                    $(".dd_red span").eq(i).addClass("text_green").html(prodPerformanceList[v].profitLossPercentage)
                                }
                                if (prodPerformanceList[v].hs300PerformancePercent.indexOf("+") != -1) {
                                    $(".dd_grey span").eq(i).addClass("text_red").html(prodPerformanceList[v].hs300PerformancePercent)
                                } else {
                                    $(".dd_grey span").eq(i).addClass("text_green").html(prodPerformanceList[v].hs300PerformancePercent)
                                }
                            }
                            if (jsonData.prodList[i].productViewpoint.length <= 95) {
                                jsonData.prodList[i].productViewpoint = jsonData.prodList[i].productViewpoint
                            } else {
                                jsonData.prodList[i].productViewpoint = jsonData.prodList[i].productViewpoint.substr(0,95) + "..."
                            }
                            lineChart(drawArr, num, that.gV.noData, '', $($(".dd_line")[i]));
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
                window.location.href = site_url.articleTemplate_url + '?id=&articleBelong=30&&applyType=0';
             }, {
                 'htmdEvt': 'viewpointMore_0'
             })
			// 产品观点more事件
			mui("body").on('mdClick', '.product_more', function() {
               var projectCode = $(this).attr("data-fundCode")
            //    console.log(projectCode)
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