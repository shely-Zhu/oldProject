/*
 * @page: 折线图
 * @Author: songxiaoyu
 * @Date:   2019-08-16 14:00:59
 * @Last Modified by:   songxiaoyu
 * @description: 页面使用元素默认使用chartWrapper
 */


//echarts图表
// var echarts = require('./echarts.js');
//var echarts = require('echarts/lib/echarts');
//require('echarts/lib/chart/line');
/*require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('zrender/lib/vml/vml');*/

/**
 * [exports 折线图]
 * @author songxiaoyu 2019-08-19
 * @param  {[type]} lineChartData [折线图数据]
 * @param  {[type]} num           [时间段]
 * @param  {[type]} noData        [无数据集合]
 * @param  {[type]} tip           [划过tooltip提示]
 * @param  {[type]} $e            [折线图区域，默认chartWrapper]
 * @return {[type]}               [description]
 */
module.exports = function(lineChartData,num,noData,tip, $e) {
    var ele = $e || $('.chartWrapper');
    var myChart = echarts.init(ele[0]);

    var showData = true;

    var xArr = lineChartData[num].xArr;
    // 累计净值
    var first = lineChartData[num]["first"];
    var second = lineChartData[num]["second"];
    var third = lineChartData[num]["third"];
    var flag = lineChartData[num]["position"];
    var name = tip;

    var option = {

        tooltip: {
            trigger: 'axis',
            // formatter: "日期：{b} <br/>{a}: {c}%",
            formatter: function(params) {
                var data = params[0];
                if (flag){
                    return '<span style="color:#364D97; font-size:.36rem">' +data["value"] + '% </span>' + '<br/>' + data["name"]
                }
                return '日期：' + data["name"] + '<br/>' + data["seriesName"] + '：' + data["value"] + '%'
            },
            backgroundColor: 'rgba(229,229,229,0.6)',
            confine: true,
            padding: 8,
            textStyle: {
                color: '#7d7c7d'
            },
        },
        title: {
            show: false,
        },
        grid: {
            show: true,
            /*left: 0,
            right: "5px",*/
            containLabel: true,
            x:5,
            y:30,
            // x2:30,
            // y2:30,
            x2: flag ? 0 : 30,
            y2: flag ? 0 : 30,
            borderWidth:0//此处去掉那个白色边框
        },
        xAxis: [{
            //position:'bottom',
            type: 'category',
            data: xArr,
            axisLabel: {
                //show: false,
                //interval:Math.ceil(xArr.length / 3),
                interval: xArr.length - 2,
                margin: 14,
                textStyle: {
                    color: '#7d7c7d'
                },
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false,
                //interval: Math.ceil(xArr.length / 6)
            },
            axisLine: {
                lineStyle: {
                    color: '#eee'
                }
            },
        }],
        yAxis: {
            type: 'value',
            precision: 4,
            splitNumber: 3,
            axisTick: {
                show: false
            },
            min: "dataMin",
            axisLine: {
                lineStyle: {
                    color: '#eee'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#eee'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#7d7c7d'
                },
                formatter: function(value, index) {
                    /*if (value == 0) {
                        return value;
                    }else{
                        return value.toFixed(2) + '%';

                    }*/

                    return value.toFixed(2) + '%';
                }
            }
        },
        series: [{
            name: name,
            type: 'line',
            smooth: true,
            data: first,
            symbol: 'none',
            //clipOverflow: false,
            lineStyle: {
                normal: {
                    // color: '#fb685c'
                    color: flag ? 'red' : '#fb685c'
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#f4cf5c',
                },
            }
        },{
            name: name,
            type: 'line',
            smooth: true,
            data: second,
            symbol: 'none',
            //clipOverflow: false,
            lineStyle: {
                normal: {
                    // color: '#60b0e0'
                    color: flag ? 'grey' : '#60b0e0'
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#f4cf5c',
                },
            }
        },{
            name: name,
            type: 'line',
            smooth: true,
            data: third,
            symbol: 'none',
            //clipOverflow: false,
            lineStyle: {
                normal: {
                    color: '#ffc363'
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#f4cf5c',
                },
            }
        }]
    };

    myChart.setOption(option);
    // $e.listLoading.hide();
}