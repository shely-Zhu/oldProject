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

module.exports = function(echartData,$e) {
    debugger;
    var ele = $e || $('.chartWrapper');
    var myChart = echarts.init($e[0]);

    var option = {
        title: {
            text: '雷达'
        },
         legend: {
            x: 'center',
            data:['雷达']
        },
        radar: [
            {
                indicator: [
                    { text: '稳定性' , max: 100},
                    { text: '收益表现' , max: 100},
                    { text: '择股择时能力', max: 100 },
                    { text: '基金公司实力', max: 100 },
                    { text: '抗风险性' , max: 100},
                ],
                center: ['50%', '50%'],
                radius: 90
            }
        ],
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                name: '雷达',
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: [
                    {
                        value: echartData[0],
                        name: '雷达'
                    },
                    {
                        value: echartData[1],
                        name: '雷达'
                    },
                    {
                        value: echartData[2],
                        name: '雷达'
                    }
                ]
            }
        ]
    };

    myChart.setOption(option);
}