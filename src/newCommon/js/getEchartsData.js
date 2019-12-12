/**
 * ajax请求的封装
 * @author  yangjinlai  
 * 
 * 参数说明：
 * 1. obj是传进来的ajax发送请求的配置，是一个数组，里面每一条数据都是一个对象，对应一个ajax请求，
 *      数组里有几个对象，就会发几个请求
 *    obj格式：
 *    var obj = [
     *    {
     *      url: site_url.banner_url,
            data: {
                ……
            },
            callbackDone: function(){},
            callbackFail: function(){},  
            ……
     *    },
     *    {
     *      url: site_url.banner_url,
            data: {
                ……
            },
            callbackDone: function(){},
            ……
     *    },
     *    ……
 *    ]
 * 2. headAjax标识是否是头部的接口，传true意思为头部，不传或者传其他值表示不是头部接口
 *    accountLeft标识是否是我的资产-左树的接口，true-是，false或不传-不是
 *    在判断整个页面的ajax初始化请求是否完成时，会根据headAjax和accountLeft判断是否有头部/左树接口
 *
 * 
 * obj中，每一条数据(ajax请求)的默认参数说明：
 *  url: '', //接口地址
    data: {}, //需要传给接口的数据
    type: 'POST', //post/get
    dataType: 'JSON', 
    async: true, //true-异步  false-同步
    needLogin: false, //发送请求时，需要判断登录是否过期  true-需要，false-不需要，默认false
    needCrossDomain: false,  //true-跨域, false-不跨域，默认false
    needDataEmpty: true, //需要判断data是否为空  true-需要  false-不需要，默认true
    needLoading: false, //不需要显示loading遮罩  true-需要，false-不需要，默认false
    
    callbackDone: function(){},  
    //接口成功的回调函数（如果needDataEmpty=true，则需要判断data.data是否为空，如果为空，不调用
    callbackDone，而调用callbackNoData） 
    
    callbackFail: function(){},  
    //请求失败，或接口成功但data.status=1时的回调函数
    
    callbackNoData: function(){}   
    //接口成功，但data.data没有数据时的回调函数（此时needDataEmpty=true）


 *                                   
 * 3个函数：
 * 1. ajaxFunc  发送请求
 * 2. sendAjax  循环obj 调用ajaxFunc，发送每一次的请求
 * 3. isEmpty 判断data.data是否为空
 *
 * 
 * 本插件使用方式：
 * $.ajaxLoading(obj);  
 * 
 * 修改：7/18，添加app交互判断登录状态的处理
 *
 * 2018-09-25 私募首页登录状态判断的接口等，因wap做单点登录，需改成sso的checkuserinfo;
 *             app没有做，需用之前的isLogin接口，所以将app域名下，checkuserinfo请求改成isLogin
 *
 */

require("./components/utils.js");
//echarts图表
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('zrender/lib/vml/vml');
//黑色提示条的显示和隐藏
var tipAction = require("./components/tipAction.js");
var Base64 = require("../../include/js/vendor/base64/base64.js");
var manualTriggerLogin = require("./components/manualTriggerLogin.js");
var splitUrl = require("./components/splitUrl.js")();

//如果是app，判断登录状态
//var appIsLogin = require("./components/app/needLogin.js");

(function($) {
    $.extend($, {
        getEchartsData: function(param) {
            var defaultData = {
                assetNowObj: {
                    el: "xzPie",
                    titleText: "客户资产配置现状",
                    color: [
                        "#968c8a",
                        "#94b6d1",
                        "#dd8045",
                        "#a4ab82",
                        "#d7b15c",
                        "#7ca59d",
                        "75c2ee",
                        "ad76dc"
                    ],
                    legendData: [],
                    seriesData: []
                },

                //推荐饼状图配置
                assetRecommendObj: {
                    el: "tjPie",
                    //titleText: this.title,
                    color: [
                        "#968c8a",
                        "#94b6d1",
                        "#dd8045",
                        "#a4ab82",
                        "#d7b15c",
                        "#7ca59d",
                        "75c2ee",
                        "ad76dc"
                    ],
                    legendData: [],
                    seriesData: []
                },

                //柱状图配置
                barObj: {
                    el: "bar",
                    titleText: "",
                    color: ["#fed95c", "#ff6905"],
                    xAxisData: [],
                    data1: [],
                    data2: []
                }
            };
            //请求画图数据
            var obj = [{
                url: site_url[param.url],
                data: {},
                //async: false,
                // needLogin:true,
                needDataEmpty: true,
                callbackDone: function(res) {
                    var data = res.data;
                    //先把这些数据清空
                    defaultData.assetRecommendObj.legendData = [];
                    defaultData.assetRecommendObj.seriesData = [];
                    defaultData.assetNowObj.legendData = [];
                    defaultData.assetNowObj.seriesData = [];
                    defaultData.barObj.xAxisData = [];
                    defaultData.barObj.data1 = [];
                    defaultData.barObj.data2 = [];

                    data.forEach(function(course, index, arr){
                        //这里的数据都是字典值，需要添加对应的文案
                        //资产分类
                        param.data.descArr.assetClassifyDic.forEach(function(list, i, listArr){
                                if (list.keyNo == course.assetClassify) {
                                    course.assetClassifyText = list.keyValue;
                                }
                            }
                        );
                        //资产类别
                        param.data.descArr.assetTypeDic.forEach(function(list, i, listArr){
                            if (list.keyNo == course.assetType) {
                                course.assetTypeText = list.keyValue;
                            }
                        });
                        //画推荐饼图时，有金额推荐比例，拼画图需要的legend和series数据
                        //  debugger
                        if (course.assetRecommend != 0 && course.assetRecommend != null) {
                            //饼图的数据
                            defaultData.assetRecommendObj.legendData.push(
                                course.assetTypeText
                            );
                            defaultData.assetRecommendObj.seriesData.push({
                                value: course.assetRecommend,
                                name: course.assetTypeText
                            });
                        }

                        //画现状饼图时，有金额现状比例，拼画图需要的legend和series数据
                        if (course.assetNowRatio != 0 && course.assetNowRatio != null) {
                            defaultData.assetNowObj.legendData.push(course.assetTypeText);

                            defaultData.assetNowObj.seriesData.push({
                                value: course.assetNowRatio,
                                name: course.assetTypeText
                            });
                        }

                        //柱状图数据
                        defaultData.barObj.xAxisData.push(course.assetTypeText);

                        //判断有没有现状数据
                        if (course.assetNow != 0 && course.assetNow != null) {
                            var an = $.util.toThousand(course.assetNow) + "";
                            //判断有没有小数点
                            // if( an.indexOf('.') != -1){
                            //  an = an.substring( 0, an.indexOf('.'));
                            // }
                            an = Math.round(an);
                            defaultData.barObj.data1.push(Number(an));
                        } else {
                            defaultData.barObj.data1.push(0);
                        }

                        //判断有没有推荐数据
                        if (course.assetRecommend != 0 && course.assetRecommend != null) {
                            var ar = $.util.toThousand(course.assetRecommend) + "";
                            //判断有没有小数点
                            // if( ar.indexOf('.') != -1){
                            //  ar = ar.substring( 0, ar.indexOf('.'));
                            // }
                            ar = Math.round(ar);
                            defaultData.barObj.data2.push(Number(ar));
                        } else {
                            defaultData.barObj.data2.push(0);
                        }
                    });
                    //画推荐饼图
                    if (defaultData.assetRecommendObj.seriesData.length != 0) {
                        //这时设置title
                        defaultData.assetRecommendObj.title = param.data.title;
                        drawPie(defaultData.assetRecommendObj);
                    } else {
                        $(".proposalPieContent").hide()
                    }
                    //画现状饼图
                    if (defaultData.assetNowObj.seriesData.length != 0) {
                        drawPie(defaultData.assetNowObj);
                    } else {
                        $(".analysis").hide()
                    }
                    var barNow = false;
                    defaultData.barObj.data1.forEach(function(m, n, p){
                        //0和null都不展示
                        if (m != null && m != 0) {
                            barNow = true;
                        }
                    });
                    //现状有数据的时候，才画图
                    if (barNow) {
                        drawBar(defaultData.barObj);
                        //添加之前清除data1 data2的数组数据
                        //this.defaultData.barObj.data1=[]
                        //this.defaultData.barObj.data2=[]
                    } else {
                        $(".adjust").hide()
                    }
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);

            //画饼图
            function drawPie(obj) {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(obj.el));
                var normal = {
                    borderColor: "#FFF",
                    borderWidth: 1
                };

                // 绘制图表
                if (obj.seriesData.length == 1) {
                    normal = {
                        borderColor: "",
                        borderWidth: 0
                    };
                }

                myChart.setOption({
                    color: obj.color,
                    backgroundColor: "#fff",
                    title: {
                        text: obj.titleText ? obj.titleText : param.data.title, //配置了就用配置的，否则用外部设置的title
                        x: "center",
                        textStyle: {
                            fontSize: 18,
                            color: "#e5e5e5",
                            fontWeight: "lighter"
                        }
                    },

                    legend: {
                        selectedMode: false,
                        orient: "horizontal",
                        bottom: "30",
                        data: obj.legendData,
                        padding: [5, 50],
                        itemWidth: 10,
                        itemHeight: 10
                    },

                    series: [{
                        type: "pie",
                        legendHoverLink: false,
                        hoverAnimation: false,
                        animation: false,
                        radius: "55%",
                        center: ["50%", "40%"],
                        label: {
                            normal: {
                                position: "outside",
                                formatter: "{d}%",
                                fontSize: 6,
                                color: "#999"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: obj.seriesData,
                        itemStyle: {
                            normal: normal
                        }
                    }]
                });
                return myChart.getDataURL();
            }
            //绘制柱状图
            function drawBar(obj) {
                var myChart = echarts.init(document.getElementById(obj.el));
                myChart.setOption({
                    backgroundColor: "",
                    color: obj.color,
                    title: {
                        text: obj.titleText
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["资产配置现状", "建议资产配置"],
                        bottom: "bottom",
                        itemWidth: 10,
                        itemHeight: 10
                    },
                    calculable: true,
                    grid: {
                        left: "10%",
                        bottom: "35%",
                        containLabel: true
                    },
                    xAxis: [{
                        type: "category",
                        data: obj.xAxisData,
                        axisLabel: {
                            interval: 0,
                            rotate: 30,
                            align: "right",
                            margin: 10,
                            fontSize: 8
                        }
                    }],
                    yAxis: [{
                        type: "value",
                        name: "(万元)"
                    }],
                    series: [{
                            name: "资产配置现状",
                            type: "bar",
                            data: obj.data1,
                            label: {
                                normal: {
                                    show: true,
                                    position: "top",
                                    textStyle: {
                                        color: "#999"
                                    }
                                }
                            }
                        },
                        {
                            name: "建议资产配置",
                            type: "bar",
                            data: obj.data2,
                            label: {
                                //offset: [20,50],
                                normal: {
                                    show: true,
                                    position: "top",
                                    textStyle: {
                                        color: "#999"
                                    }
                                }
                            }
                        }
                    ]
                });
            }
        }
    });
})(Zepto);