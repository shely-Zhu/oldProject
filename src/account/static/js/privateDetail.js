
require('@pathCommonJsCom/utils.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js');
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js');
//路径配置文件
require('@pathIncludJs/vendor/config.js');

require('@pathCommonJs/components/headBarConfig.js');

// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

$(function() {

	var privateDetail = {

		data: {
			sevenIncomeRate: [], //存放折线图七日年化
			profitThoudDate: [], //存放折线图收益日期
			profitThoudValue: [], //存放折线图万份收益
		},

		init: function(){
			var that = this;

			that.getData()
				//
			$('.type_1').show();
		},


		//获取初始数据
		getData: function(){

			var that = this;

			//产品详情接口
			var obj = [{
			    url: site_url.assetsDetail_api, 
			    data: {},
			    needLogin: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data;
			       	//持有份额
			       	$('.topContent .totalShare').html( jsonData.totalShare )
			    },
			}];
			$.ajaxLoading(obj);

			//七日年化
			var obj = [{
			    url: site_url.earningCurve_api, 
			    data: {
			    	projectId: '1312',
			    	pageSize: 10,
			    	pageNo: 1
			    },
			    needLogin: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data;
			       	
			       	//拼数据
			       	$.each( jsonData, function(i, el){
			       		that.data.sevenIncomeRate.push( el.sevenIncomeRate );
			       		that.data.profitThoudDate.push( el.profitThoudDate);
			       		that.data.profitThoudValue.push( el.profitThoudValue);
			       	})

			       	//画折线图
			       	// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(document.getElementById('line'));

					myChart.setOption({
					    tooltip: {
					    	trigger: 'axis',
					    	formatter: '<p style="font-size:0.36rem;color:#BB8E5F;">{c}%</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
					    	backgroundColor: 'rgba(218,181,124, 0.1)',
					    	renderMode : 'richText', 
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
				    				        offset: 0, color: 'transparent' // 0% 处的颜色
				    				    }, {
				    				        offset: 0.5, color: '#D2B280' // 0% 处的颜色
				    				    },{
				    				        offset: 1, color: '#FADFBB' // 100% 处的颜色
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
					    color:  '#FADFBB',
					    xAxis: {
					        data: that.data.profitThoudDate,
					        axisLine: {
					        	lineStyle: {
					        		color: '#FADFBB'
					        	}
					        },
					        axisLabel:{
					        	show: true,
					        	color: '#FADFBB',
					        	fontSize: '0.24rem',
					        	margin: 20,
					        	align: 'left'
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
					    	splitLine:{
					    		lineStyle: {
					    			color: '#FADFBB'
					    		}
					    	},
					    	axisLabel:{
					    		show: true,
					    		formatter: '{value}%',
					    		fontSize: '0.24rem',
					    		color: '#9B9B9B',
					    	},
					    },
					    series: [{
					    	type: 'line',
					    	lineStyle: {
					    		color: '#FADFBB'
					    	},
					        data: that.data.sevenIncomeRate
					    }]
					});
			       	

			    },
			}];
			$.ajaxLoading(obj);
		}
	}

	privateDetail.init();
})