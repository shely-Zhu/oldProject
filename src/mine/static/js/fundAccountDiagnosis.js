/*
 * @page: 基金诊断
 * @Author: songxiaoyu
 * @Date:   2019-08-09 11:54:51
 * @Last Modified by:   songxiaoyu
 * @description:
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonJs/components/headBarConfig.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');


$(function() {

    var fundAccountDiagnosis = {
        $e: {
            holdingBox: $('#holdingBox'), // 账户持仓情况
            holdingBoxTemp: $('#holdingBox-template'), // 账户持仓情况模板
            diagnosis:$("#diagnosis-box") //诊断结论
        },
        gV: {
            pageCurrent:1,  // 账户持仓情况分页参数
            pageSize:5,    // 账户持仓情况分页参数
            holdList:[],   // 账户持仓情况
            color:['#f2cfa0','#c57f5a','#3e5498','#accdda','#accdda','#cbc0e0','#e8b1a1','#cdd2d4'],
            pie:{        //基金配置比例
               
                pieData: [],
            },
            heavyBar:{   //重仓行业配置
               
                barData: [],
            },
            volumeBar:{  //组合券种分布
               
                barData: [],
            }


            
        },
        init: function() {
            var that = this;
            that.getHoldData();  //账户持仓详情
            that.getPieData()   //基金配置比例详情
            that.getAssetData()  //资产配置比例
            that.getHeavyData()  // 重仓行业配置
            that.getVolumeData()  // 组合券种分布
            that.getAccountStyleData()  // 账户风格
            that.getDiagnosisData()  // 诊断结论
            // that.drawCircle();

            that.events();
        },
        getHoldData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.accountHoldShareDetail_api, 
                data: {
                    "pageCurrent": that.gV.pageCurrent,
                    "pageSize": that.gV.pageSize,

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    
                    var data = json.data;
                      // 将列表插入到页面上
                      generateTemplate(data, that.$e.holdingBox, that.$e.holdingBoxTemp);
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getPieData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.fundConfigRatioDetail_api, 
                data: {
                
                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    var data = json.data;
                    that.gV.pie.pieData = []
                    that.gV.pie.pieData.push({name: '股票型',value: data.stockRatio,itemStyle:that.getPieColor('stockRatio'),})
                    that.gV.pie.pieData.push({name: '混合型',value: data.mixRatio,itemStyle:that.getPieColor('mixRatio'),})
                    that.gV.pie.pieData.push({name: '债券型',value: data.bondRatio,itemStyle:that.getPieColor('bondRatio'),})
                    that.gV.pie.pieData.push({name: '保本型',value: data.breakEvenRatio,itemStyle:that.getPieColor('breakEvenRatio'),})
                    that.gV.pie.pieData.push({name: '商品型',value: data.goodsRatio,itemStyle:that.getPieColor('goodsRatio'),})
                    that.gV.pie.pieData.push({name: '另类投资型',value: data.currencyRatio,itemStyle:that.getPieColor('alternativeInvestRatio'),})
                    that.gV.pie.pieData.push({name: '货币市场型',value: data.currencyRatio,itemStyle:that.getPieColor('currencyRatio'),})

                   that.drawCircle()
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getAssetData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.assetConfigRatioDetail_api, 
                data: {
                
                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    if(json.status == '0000'){
                        var data = json.data;
                        $("#assets-box .stockAssetRatio").html(data.stockAssetRatio)
                        $("#assets-box .cashAssetRatio").html(data.cashAssetRatio)
                        $("#assets-box .bondAssetRatio").html(data.bondAssetRatio)
                        $("#assets-box .otherAssetRatio").html(data.otherAssetRatio)
                        var assets_width = $("#assets-box").width();
                        // $("#assets-box .stockAssetRatio .shape").width(Number(data.stockAssetRatio.split("%")[0])/100*assets_width) + 'rem';
                        // $("#assets-box .cashAssetRatio .shape").width(Number(data.stockAssetRatio.split("%")[0])/100*assets_width) + 'rem';
                        // $("#assets-box .bondAssetRatio .shape").width(Number(data.stockAssetRatio.split("%")[0])/100*assets_width) + 'rem';
                        // $("#assets-box .otherAssetRatio .shape").width(Number(data.stockAssetRatio.split("%")[0])/100*assets_width) + 'rem';
                        // $("#assets-box .stockAssetRatio .shape").width(Number(data.stockAssetRatio.split("%")[0])/100*assets_width + 'rem');
                        // $("#assets-box .cashAssetRatio .shape").width(Number(data.stockAssetRatio.split("%")[0])/100*assets_width + 'rem') ;
                        // $("#assets-box .bondAssetRatio .shape").width(Number(data.stockAssetRatio.split("%")[0])/100*assets_width + 'rem');
                        // $("#assets-box .otherAssetRatio .shape").width(Number(data.stockAssetRatio.split("%")[0])/100*assets_width  + 'rem');

                        $("#assets-box .stockAssetRatio .shape").width('1rem');
                        $("#assets-box .cashAssetRatio .shape").width('0.6rem') ;
                        $("#assets-box .bondAssetRatio .shape").width('0.5rem');
                        $("#assets-box .otherAssetRatio .shape").width('0.9rem');
                    }
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getHeavyData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.heavyIndustryConfigRatioDetail_api, 
                data: {

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getVolumeData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.bondTypeAndValue_api, 
                data: {

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getAccountStyleData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.bondTypeAndValue_api, 
                data: {

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getDiagnosisData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.diagnoseResult_api, 
                data: {

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;
            mui("body").on("mdClick", ".account-holdings .down", function() {
                if($(this).hasClass('up')){
                    $(this).removeClass('up')
                }else{
                    $(this).addClass('up')
                }
                that.gV.pageSize = 100000
                that.getHoldData();
            },{
                'htmdEvt': 'fundAccountDiagnosis_01'
            });


            // 获取专属报告
            mui("body").on("mdClick", ".btnBottom", function() {
                that.getReport();
            },{
                'htmdEvt': 'fundAccountDiagnosis_02'
            });
        },
        //给饼图付渐变色
        getPieColor(val){
            var itemStyle = { 
                normal: {
                    color: {
                        colorStops: [],
                        global: false,
                        type: "linear",
                        x: 0,
                        x2: 1,
                        y: 0,
                        y2: 1
                    }
                }
            }
            if(val == 'stockRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#fadeb7" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#eabe87" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#d7964b" })
                return itemStyle;
            };
            if(val == 'mixRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#ca835d" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#c57e59" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#c8815c" })
                return itemStyle;
            }
            if(val == 'bondRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#374d92" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#445a9d" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#5267a8" })
                return itemStyle;
            }
            if(val == 'breakEvenRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#c8e4eb" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#b6d3e0" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#a9c8d7" })
                return itemStyle;
            }
            if(val == 'goodsRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#bfb3db" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#c8bddf" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#d1c7e3" })
                return itemStyle;
            }
            if(val == 'alternativeInvestRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#e8af9f" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#ebb8a9" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#f0c1b4" })
                return itemStyle;
            }
            if(val == 'currencyRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#bfc4c6" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#c9ced0" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#dce1e3" })
                return itemStyle;
            }
        },
        drawCircle() {
            var that = this;
            var pieChart = echarts.init(document.getElementById('allocation-pie'));
            var optionData = []
            var pieData = that.gV.pie.pieData
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
                                return " {title|" + name + "}  {value|" + pieData[i].value + "}"
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
    };
    fundAccountDiagnosis.init();
});