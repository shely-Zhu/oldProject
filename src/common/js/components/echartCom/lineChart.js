/*
 * @page: 折线图
 * @Author: songxiaoyu
 * @Date:   2019-08-16 14:00:59
 * @Last Modified by:   songxiaoyu
 * @description: 页面使用元素默认使用chartWrapper
 */


//echarts图表
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
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

   /* $.each(that.noData, function(i, el) {
        if (el.num == num && el.hasData == false) {
            //无数据，显示暂无数据
            $('.lineWrapper').html(that.$e.noData.clone(false)).find('.noData').show();
            showData = false;
        }
    })*/

    /*if (!showData) {
        //不画图
        that.$e.listLoading.hide();
        return false;
    }
*/
    // $('.lineWrapper').html(that.$e.noData.clone(false)).find('.noData').show();

    var xArr = lineChartData[num].xArr;
    // 累计净值
    var first = lineChartData[num]["first"];
    var second = lineChartData[num]["second"];
    var third = lineChartData[num]["third"];
    var name = tip;

    var option = {

        tooltip: {
            trigger: 'axis',
            // formatter: "日期：{b} <br/>{a}: {c}%",
            formatter: function(params) {
                var data = params[0];
                if (type == 'navArr') { // 净值
                    return '日期：' + data["name"] + '<br/>' + data["seriesName"] + '：' + data["value"]
                } else {
                    return '日期：' + data["name"] + '<br/>' + data["seriesName"] + '：' + data["value"] + '%'
                }
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
            left: 0,
            right: "12%",
            containLabel: true,
        },
        xAxis: [{
            //position:'bottom',
            type: 'category',
            data: xArr,
            axisLabel: {
                //show: false,
                interval: xArr.length - 2,
                margin: 14,
                textStyle: {
                    color: '#7d7c7d'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                interval: Math.ceil(xArr.length / 6)
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
        }],
        yAxis: {
            type: 'value',
            precision: 4,
            axisTick: {
                show: false
            },
            min: "dataMin",
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#7d7c7d'
                },
                formatter: function(value, index) {
                    if (value == 0) {
                        return value;
                    }else{
                        return value.toFixed(2) + '%';

                    }
                }
            }
        },
        series: [{
            name: name,
            type: 'line',
            smooth: true,
            data: first,
            //clipOverflow: false,
            lineStyle: {
                normal: {
                    color: '#fb685c'
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
        },{
            name: name,
            type: 'line',
            smooth: true,
            data: third,
            //clipOverflow: false,
            lineStyle: {
                normal: {
                    color: '#60b0e0'
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