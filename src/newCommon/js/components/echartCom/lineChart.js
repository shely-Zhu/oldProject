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
    // console.log(xArr.length)
    // 累计净值
    var first = lineChartData[num]["first"];
    var second = lineChartData[num]["second"];
    var third = lineChartData[num]["third"];
    var flag = false, axisLabelInt = 0;
    if (lineChartData[num]["position"]) {
        flag = lineChartData[num]["position"]
    }
    if (flag && xArr.length != 0) {
        if( xArr.length % 2 == 0 ){
            // 6:4 4:2 2:0
            if (xArr.length == 2) {
                axisLabelInt = 0 
            } else if (xArr.length == 4) {
                axisLabelInt = 2
            } else {
                axisLabelInt = 4
            }
          }else{
           //  7:2 5:1 3:0
           if (xArr.length == 3 || xArr.length == 1) {
            axisLabelInt = 0
           }  else if (xArr.length == 5) {
            axisLabelInt = 1
           } else {
            axisLabelInt = 2
           }
        }   
    } 
    var name = tip;

    var option = {

        tooltip: {
            trigger: 'axis',
            // formatter: "日期：{b} <br/>{a}: {c}%",
            formatter: function(params) {
                var data = params[0];
                if (flag){
                    return '<span style="color:#e8cf8c; font-size:.36rem">' +data["value"] + '% </span>' + '<br/> <span style="font-size:.24rem">' + data["name"] + '</span>'
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
            y: flag ? 25 : 30,
            // x2:30,
            // y2:30,
            x2: flag ? 0 : 30,
            y2: flag ? 15 : 30,
            borderWidth:0//此处去掉那个白色边框
        },
        xAxis: [{
            //position:'bottom',
            type: 'category',
            data: xArr,
            axisLabel: flag ? {
                //show: false,
                // interval:4,
                interval: axisLabelInt,
                margin: 14,
                textStyle: {
                    color: '#7d7c7d',
                    fontSize: 10 
                },
            } : {
                //show: false,
                //interval:Math.ceil(xArr.length / 3),
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
                    color: '#eee',
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#eee'
                    // type: flag ? 'dashed' : "solid"
                }
            },
            axisLabel: {
                textStyle: flag ? {
                    color: '#7d7c7d',
                    fontSize: 10
                } : {
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
            smooth: flag ? false : true,
            data: first,
            symbol: 'none',
            //clipOverflow: false,
            lineStyle: {
                normal: {
                    // color: '#fb685c'
                    color: flag ? '#e8cf8c' :'#fb685c'
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
            smooth: flag ? false : true,
            data: second,
            symbol: 'none',
            //clipOverflow: false,
            lineStyle: {
                normal: {
                    // color: '#60b0e0'
                    color: flag ? '#131364' : '#60b0e0'
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
            smooth: flag ? false : true,
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