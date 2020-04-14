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
var lineChart = require('@pathCommonJsCom/echartCom/lineChart.js');


$(function() {

    var somePage = {
        gV: { // 全局变量
            data: '', //请求到的总资产data
            isShowInfo: true, //是否展示信息 默认展示
            ddLine: $('.dd_line'), // 折现图
            // noData: $('.noData'), //没有数据的结构
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
            that.event();
        },
        // 获取持仓周报数据
        getData: function() {
            var that = this;
            var obj = [{
                    url: site_url.getWeeklyPosition_api, //头部金额
                    needLogin: true, //需要判断是否登陆
                    needLoading: false, // 接口请求完不隐藏loading
                    data: {
                        id: splitUrl['customerId'] || "" // 客户编号
                    },
                    callbackDone: function(json) { //成功后执行的函数
                        console.log(json.data)
                        var jsonData = json.data
                          // 市值构成 start
                          var tpl   =  $("#marketTemplate").html();
                          //预编译模板
                          var template = Handlebars.compile(tpl);
                          //传入需要填充的数据匹配
                          var html = template(jsonData.list);
                           // 市值构成 end
                          //插入模板到指定位置
                          $("#marketCapitalList").html(html);
                          // 市场观点
                          $('.get_marketView').html(jsonData.marketView)
                        // var test2 = '客户持仓周报-证券投资'
                        $("#HeadBarpathName").html("<span>客户持仓周报-证券投资</span>" + "</br><span>" + jsonData.period + "</span>");
                        // 最新市值(元)
                        $('.amount_value').html(jsonData.marketValue?jsonData.marketValue:'--' );
                        //昨日总收益(元)
                        $('.h_profit_value').html(jsonData.totalShare?jsonData.totalShare:'--');
                      
                    }
                },
                // {
                //     url: site_url.getArticle_api,
                //     data: {
                //         id: "",
                //         articleBelong: "30",
                //         applyType: "0",//h5是0
                //     },
                //     callbackDone: function (json) {
                //         console.log(json)
                //     },
                //     callbackFail: function(json) {
                //         // tipAction(json.msg);
                //     },
                //     callbackNoData: function(json) {
                //         // that.$e.ddEvaluate.html("暂无数据");
                //     }
                // },
                {
                    url: site_url.getSecuProdViews_api, //产品list接口
                    needLogin: true, //需要判断是否登陆
                    // needLoading: false, // 接口请求完不隐藏loading
                    // needDataEmpty: false,
                    data: {
                        id: splitUrl['customerId'] || "" // 客户编号
                    },
                    callbackDone: function (json) {
                        var jsonData = json.data // 获取数据
                        Handlebars.registerHelper("if_than_0", function(value, options) {
                            if (value > 0) {
                                return options.fn(this);
                            } else {
                                return options.inverse(this);
                            }
                        });
                        var tpl   =  $("#listTemplate").html();
                        //预编译模板
                        var template = Handlebars.compile(tpl);
                        //传入需要填充的数据匹配
                        var html = template(jsonData.prodList);
                        //插入模板到指定位置
                        $("#newsList").html(html); 

                        
                         
                        
                        var drawArr = [{
                            "xArr": ['周一', '周二', '周三'],
                            "first": [120, 132, 101],
                            "second": [-220, 182, -191],
                            // "third": [290, 330, 310],
                            "position": true

                        }]
                        var num = 0
                        jsonData.prodList.forEach((item, v)=>{
                            // console.log(item);
                            if (item.productViewpoint.length <= 95) {
                                item.productViewpoint = item.productViewpoint
                            } else {
                                item.productViewpoint = item.productViewpoint.substr(0,95)+"..."
                            }
                            lineChart(drawArr, num, that.gV.noData, '基金收益率', that.gV.ddLine[v]);
                        });
                        // var drawArr = jsonData.prodList;
                       
                        // jsonData.prodList.forEach((index)=>{
                        //     lineChart(drawArr, num, that.gV.noData, '基金收益率', that.gV.ddLine[index]);
                        // });
                        // lineChart(drawArr, num, that.gV.noData, '基金收益率', that.gV.ddLine);
                        // var myChart = echarts.init();
                        // var myChart = echarts.init(document.getElementById('dd_line'));
                        // option = {
                        //     title: {
                        //         text: '折线图堆叠'
                        //     },
                        //     tooltip: {
                        //         trigger: 'axis'
                        //     },
                        //     legend: {
                        //         data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                        //     },
                        //     grid: {
                        //         left: '3%',
                        //         right: '4%',
                        //         bottom: '3%',
                        //         containLabel: true
                        //     },
                        //     toolbox: {
                        //         feature: {
                        //             saveAsImage: {}
                        //         }
                        //     },
                        //     xAxis: {
                        //         type: 'category',
                        //         boundaryGap: false,
                        //         data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        //     },
                        //     yAxis: {
                        //         type: 'value'
                        //     },
                        //     series: [
                        //         {
                        //             name: '邮件营销',
                        //             type: 'line',
                        //             stack: '总量',
                        //             data: [120, 132, 101, 134, 90, 230, 210]
                        //         },
                        //         {
                        //             name: '联盟广告',
                        //             type: 'line',
                        //             stack: '总量',
                        //             data: [220, 182, 191, 234, 290, 330, 310]
                        //         }
                        //     ]
                        // };
                        // myChart.setOption(option);
                        
                    },
                    callbackFail: function(json) {
                        // tipAction(json.msg);
                    },
                    callbackNoData: function(json) {
                        // that.$e.ddEvaluate.html("暂无数据");
                    }
                }
            ];
            // obj.push(that.getDrawData());
            $.ajaxLoading(obj);
        },
        //所有点击事件
		event: function(){
            var that = this;
            // 市场观点more事件
			mui("body").on('mdClick', '.viewpoint_more', function() {
                var index = $(this).index();
                window.location.href = site_url.articleTemplate_url + '?id=&articleBelong=30&&applyType=0';
             }, {
                 // 'htmdEvt': 'privateDetail_0'
             })
			// 产品观点more事件
			mui("body").on('mdClick', '.product_more', function() {
               var index = $(this).index();
               var fundCode = $(this).attr("data-fundCode")
               console.log(fundCode)
               window.location.href = site_url.informationTemplate_url + '?viewpoint=0&projectId=' + fundCode;
            }, {
				// 'htmdEvt': 'privateDetail_0'
            })
            // 播放器
             mui("body").on('mdClick', '.image_content' , function(){
                window.location.href = site_url.privatePlacementDetailJumpVideo_url+"?cid=" + $(this).attr("videoId") 
            },{
                // 'htmdEvt': 'fortune_10'
            });
            
		},
    };
    somePage.init();
});