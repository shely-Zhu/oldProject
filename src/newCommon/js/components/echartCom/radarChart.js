/*
 * @page: 雷达图
 * @Author: songxiaoyu
 * @Date:   2019-08-16 14:00:59
 * @Last Modified by:   songxiaoyu
 * @description: 页面使用元素默认使用chartWrapper
 */


//echarts图表

// var echarts = require('./echarts.js');
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
            top:'40%',
            left:'center',
            textStyle: {
                color: '#9D5709',//综合测评得颜色
                fontSize: 14,
                // textBorderColor: "#9D5709",
                textBorderWidth:3
            },
            subtext: echartData[echartData.length-1], // 最后一个值是总分
            subtextStyle:{
                color: '#9D5709',//数字得颜色
                fontSize: 25,
                // textBorderColor: "#9D5709",
                textBorderWidth:3
            }
        },
        legend: {
            
        },
        tooltip: {
            trigger: 'item',
            textStyle:{
                align:'left',
            },
            show:false
    
        },
        radar: [{
            indicator: [
                { text: '稳定性', max: 100},
                { text: '收益表现', max: 100},
                { text: '择股择时能力', max: 100},
                { text: '基金公司实力', max: 100},
                { text: '抗风险性', max: 100},
            ],
            triggerEvent: false,
            center: ['50%', '50%'],
            radius: 80
        }],
        series: [{
        	name:'',
            type: 'radar',
            areaStyle: {
                normal: {
                    color: "#DCA564",//背景色
                },
            },
            data: [{
                value: echartData,
                // name: '某软件'
            }]
        }]
    };

     
    myChart.setOption(option);

    var i = -1;
    var arr1 = echartData;
    myChart.setOption({
        radar: [
            {
                name: {
                    rich: {
                        a: {
                            color: '#9F733F',
                            lineHeight: 20,
                        },
                        b: {
                            color: '#9F733F',
                            align: 'center',
                            backgroundColor: '#fff',
                            padding: 2,
                            borderRadius: 4
                        }
                    },
                    formatter: (a,b)=>{
                        i++;
                        return `{a|${a}}\n{b|${arr1[i]}}`
                    }
                }
            }
        ]
    });

	myChart.on('click',function(params){//gulp打包禁止使用es6语法。否则打包不过去
//	    console.log(option.radar[0].indicator[params.event.topTarget.__dimIdx].name);
	    if(!!params.event.topTarget.__dimIdx){
	    		  //  option.series[0].data[0].value = echartData[params.event.topTarget.__dimIdx];
	    }
//	    option.series[0].data[0].value = echartData[echartData.length-1][params.event.topTarget.__dimIdx].name];
	});
}