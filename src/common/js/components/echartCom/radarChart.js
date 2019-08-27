/*
 * @page: 雷达图
 * @Author: songxiaoyu
 * @Date:   2019-08-16 14:00:59
 * @Last Modified by:   songxiaoyu
 * @description: 页面使用元素默认使用chartWrapper
 */


//echarts图表

var echarts = require('./echarts.min.js');
//var echarts = require('echarts/lib/echarts');
//require('echarts/lib/chart/radar');
//require('echarts/lib/component/tooltip');
//require('echarts/lib/component/title');
//require('echarts/lib/component/legend');
//require('zrender/lib/vml/vml');

module.exports = function(echartData, $e) {
    var ele = $e || $('.chartWrapper');
    var myChart = echarts.init(ele[0]);

    var option = {
        title: {
            text: '综合评分', // 最后一个值是总分
            subtext: echartData[echartData.length-1], // 最后一个值是总分
            top:'40%',
            left:'center',
            textStyle: {
                color: '#fff',
                fontSize: 14,
            },
            subtextStyle:{
                color: '#fff',
                fontSize: 20,
            }
        },
        legend: {
        },
        tooltip: {
            trigger: 'item',
            textStyle:{
                align:'left',
            }
        },
        radar: [{
            indicator: [
                { name: '稳定性', max: 100 },
                { name: '收益表现', max: 100 },
                { name: '择股择时能力', max: 100 },
                { name: '基金公司实力', max: 100 },
                { name: '抗风险性', max: 100 },
            ],
            name:{
                formatter:function(v){
                    console.log(v);
                    return v;
                }
            },
            triggerEvent: true,
            center: ['50%', '50%'],
            radius: 90
        }],
        series: [{
        	name:'',
            type: 'radar',

            areaStyle: {
                normal: {
                    color: "red"
                }
            },
            data: [{
                value: echartData,
                // name: '某软件'
            }]
        }]
    };


    myChart.setOption(option);
	myChart.on('click',(params) => {
//	    console.log(option.radar[0].indicator[params.event.topTarget.__dimIdx].name);
	    if(!!params.event.topTarget.__dimIdx){
	    		    option.series[0].data[0].value = echartData[params.event.topTarget.__dimIdx];
	    }
//	    option.series[0].data[0].value = echartData[echartData.length-1][params.event.topTarget.__dimIdx].name];
	});
}