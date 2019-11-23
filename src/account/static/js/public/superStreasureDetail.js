/**
* 自选公募-超宝详情
* @author wangjiajia 2019-11-20
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

//引入 ECharts 主模块
//var echarts = require('echarts/lib/echarts');

$(function() {

    var privateDetail = {
        data: {
			
        },
        init:function(){
            var that = this;
            //事件绑定
            that.event();	
            // that.getData()
            that.drawLine()
        },
        drawLine:function(){
            var that = this;
            // 基于准备好的dom，初始化echarts实例
            console.log($('#qrnhLine'))
            var myChart = echarts.init($("#qrnhLine")[0]);
            // 指定图表的配置项和数据
            var option = {
                title: {
                    // text: 'ECharts 入门示例'
                },
                tooltip: {
			    	trigger: 'axis',
			    	formatter: '<p style="font-size:0.36rem;color: #DAB57C;">{c}%</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
			    	backgroundColor: 'rgba(218,181,124, 0.1)',
			    	// renderMode : 'richText', 
			    	extraCssText: [7, 15, 15, 15],
			    	textStyle: {
			    		color:  '#FADFBB'
			    	},
			    	confine: true,
			    	axisPointer: {
			    		type: 'line',
			    		lineStyle: {
			    			color: {
			    				type: 'linear',
		    				    x: 0,
		    				    y: 0,
		    				    x2: 0,
		    				    y2: 1,
		    				    colorStops: [{
		    				        offset: 0, color: '#fff' // 0% 处的颜色
		    				    }, {
		    				        offset: 0.5, color: '#081F6B' // 0% 处的颜色
		    				    },{
		    				        offset: 1, color: '#677EC4' // 0% 处的颜色
		    				    }],
		    				    global: false // 缺省为 false
			    			}
			    		}
			    	}
			    },
                grid:{
			    	top: '10%',
			    	left: '5%',
			    	right: '5%',
			    	bottom: '10%',
			    	containLabel: true
                },
                xAxis: {
			    	type: 'category',
			        data: [1,2,3,4],
			        axisLine: {
			        	lineStyle: {
			        		color: '#9B9B9B'
			        	}
			        },
			        axisLabel: {
                        show: true,
                        color: '#9B9B9B',   //这里用参数代替了
                        margin: 20
                    },
			        axisTick: {
			        	show: false
			        }
			    },
			    yAxis: {
			    	axisTick:{
			    		show: false
			    	},
			    	axisLine: {
			    		show: false
			    	},
			    	// splitLine:{
			    	// 	lineStyle: {
			    	// 		color: '#FADFBB'
			    	// 	}
			    	// },
			    	// axisLabel:{
			    	// 	show: true,
			    	// 	color:  '#9B9B9B',
			    	// 	formatter: '{value}%',
			    	// },
			    },
                series: [{
			    	type: 'line',
			    	lineStyle: {
			    		color: '#677EC4'
			    	},
			    	itemStyle: {
			    		show: false
			    	},
			    	symbol: 'none',
			    	areaStyle: {
			    		normal: {
			    			color: {
			    			    type: 'linear',
			    			    x: 0,
			    			    y: 0,
			    			    x2: 0,
			    			    y2: 1,
			    			    colorStops: [{
			    			        offset: 0, color: '#677EC4' // 0% 处的颜色
			    			    }, {
			    			        offset: 1, color: '#fff' // 100% 处的颜色
			    			    }],
			    			    global: false // 缺省为 false
			    			}
			    		}
			    	},
			        data: [1,3,2,1]
			    }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
       

        // //获取初始数据
		// getData: function(){
		// 	var that = this;
		// 	//产品详情接口
		// 	var obj = [{
		// 	    url: site_url.assetsDetail_api, 
		// 	    data: {
		// 	    	projectId: that.data.projectId
		// 	    },
		// 	    needLogin: true,
		// 	    callbackDone: function(json) {
        //             var jsonData = json.data;
        //             console.log(jsonData)
		// 	    	//设置数据到页面上
		// 	    	// that.setDomData( jsonData );
		// 	    },
		// 	}];
		// 	$.ajaxLoading(obj);			
        // },
        event:function(){
            //选项卡切换
            $(document).on('click', '.lineDraw .time', function(e) {
                $('.lineDraw .time').removeClass('active');
                $(this).addClass('active');
            })
        }

    }
  
    privateDetail.init()
})