/**
 * 公募自选资产详情页
 *
 * @author 田俊国 20191120
 *
 * 需要从资产列表页带参数： projectType--项目类型  projectId--项目id haveSurely--是否有定投
 *
 * projectType: 
 * 0：货币（对应type_1)  1：非货币 
 */


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

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function() {

	var privateDetail = {

		data: {
			projectType : splitUrl['projectType'],
			projectId: splitUrl['projectId'],
			supportFixedFlag: splitUrl['supportFixedFlag'],//是否支持定投
			sevenIncomeRate: [], //存放折线图七日年化
			profitThoudDate: [], //存放折线图收益日期
			profitThoudValue: [], //存放折线图万份收益
		},

		init: function(){
			var that = this;

			if( that.data.projectType == 0 ){ 
				//货币基金
				$('.type_0').show();
				//折线图
				$('.lineWrap').show();
				//展示折线图的万份收益按钮
				$('.lineWrap .wfsy').removeClass('hidden');
			}
			else if ( that.data.projectType == 1 ){
				//非货币基金
				$('.type_1').show();
				//折线图
				$('.lineWrap').show();
			}
			
			if(!!eval(that.data.supportFixedFlag.toLowerCase())){//支持定投展示定投按钮,true字符串转化为bool值
				$('.footer').eq(1).show()
			}else{
				$('.footer').eq(0).show()
			}

			that.getData();

			that.event();
		},

		

		//获取初始数据
		getData: function(){

			var that = this;

			//产品详情接口
			var obj = [{
			    url: site_url.assetsDetail_api, 
			    data: {
			    	projectId: "url上取的projectId"
			    },
			    needLogin: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data;

			    	//设置数据到页面上
			    	that.setDomData( jsonData );

			    	
			    	if( (that.data.projectType == 0) || (that.data.projectType == 1) ){ 
			    		//稳金类项目，请求折线图
			    		that.getLineData();
			    		//请求快速赎回和普通赎回的文案
			    		that.getTxt();
			    		//人气产品
			    		that.getDurationPopProduct();
			    	}

			    },
			}];
			$.ajaxLoading(obj);

			
		},

		getDurationPopProduct: function(){
			var that = this;

			var obj = [{
			    url: site_url.assetsDetail_api, 
			    data: {
			    	projectId: "url上取的projectId"
			    },
			    needLogin: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data;

			    

			    },
			}];
			$.ajaxLoading(obj);

		},

		getLineData: function( ){
			var that = this;

			//七日年化
			var obj = [{
			    url: site_url.earningCurve_api, 
			    data: {
			    	projectId: '1312',
			    	profitRange: 0 //默认请求近一个月的数据
			    },
			    needLogin: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data;
			       	
			       	//拼数据
			       	$.each( jsonData, function(i, el){
			       		that.data.sevenIncomeRate.push( {
			       			value: el.sevenIncomeRate
			       		} );
			       		that.data.profitThoudDate.push( el.profitThoudDate);
			       		that.data.profitThoudValue.push( el.profitThoudValue);
			       	})

			       	//画折线图
			       	// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(document.getElementById('line'));

					myChart.setOption({
					    tooltip: {
					    	trigger: 'axis',
					    	formatter: '<p style="font-size:0.36rem;color: #DAB57C;">{c}%</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
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
				    				        offset: 0, color: '#fff' // 0% 处的颜色
				    				    }, {
				    				        offset: 0.5, color: '#F1CDA8' // 0% 处的颜色
				    				    },{
				    				        offset: 1, color: '#D2B280' // 0% 处的颜色
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
					    	type: 'category',
					        data: that.data.profitThoudDate,
					        axisLine: {
					        	lineStyle: {
					        		color: '#FADFBB'
					        	}
					        },
					        axisLabel: {
		                        show: true,
		                        textStyle: {
		                          color: 'red'   //这里用参数代替了
		                        },
		                        mrgin: 20
		                    },
					        axisTick: {
					        	show: false
					        }
					    },

					    yAxis: {
					  //   	max: function(value) {
							//     return value.max + 20;
							// },
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
					    		normal: {
					    			color:'#9B9B9B',
					    			fontSize: '0.24rem',
					    		},
					    		label: {
					    			color:  '#FADFBB'
					    		},
					    		color:  '#FADFBB',
					    		textStyle: {
					    			color:  '#FADFBB'
					    		},
					    		fontStyle: {
					    			color:  '#FADFBB'
					    		},
					    		formatter: '{value}%',
					    	},
					    },
					    series: [{
					    	type: 'line',
					    	lineStyle: {
					    		color: '#FADFBB'
					    	},
					    	itemStyle: {
					    		show: false
					    	},
					    	areaStyle: {
					    		normal: {
					    			color: {
					    			    type: 'linear',
					    			    x: 0,
					    			    y: 0,
					    			    x2: 0,
					    			    y2: 1,
					    			    colorStops: [{
					    			        offset: 0, color: '#F2E3CA' // 0% 处的颜色
					    			    }, {
					    			        offset: 1, color: '#fff' // 100% 处的颜色
					    			    }],
					    			    global: false // 缺省为 false
					    			}
					    		}
					    	},
					        data: that.data.sevenIncomeRate
					    }]
					});
			       	

			    },
			}];
			$.ajaxLoading(obj);
		},

		getTxt: function(){
			var that = this;

		},

		setDomData: function( jsonData){
			var that = this;

			//项目名称
    		$('#HeadBarpathName').html( jsonData.projectName );

	    	if( that.data.projectType == 0 ){ //货币基金
	    		
    			//当前市值
    			$('.typeWrap .totalM').html( jsonData.capitalisation );
    		   	//持有份额
    		   	$('.typeWrap .topContent .totalShare').html( jsonData.totalShare );
    		   	//七日年化
    		   	$('.typeWrap .sevenYearYield').html( jsonData.sevenYearYield);
    		   	//可赎回份额
    		   	$('.typeWrap .kshfe').html( jsonData.allowRedemptionShare);
    		   	//万份收益
    		   	$('.typeWrap .wfsy').html( jsonData.incomeUnit);
	    	}
	    	else if( that.data.projectType == 1){ //非货币基金	    		
	    		//当前市值
	    		$('.typeWrap .totalM').html( jsonData.capitalisation );
	    		//持有份额
	    		$('.typeWrap .topContent .totalShare').html( jsonData.totalShare );
	    		//七日年化
	    		$('.typeWrap .sevenYearYield').html( jsonData.sevenYearYield);
	    		//可赎回份额
    		   	$('.typeWrap .kshfe').html( jsonData.allowRedemptionShare);
    		   	//赎回开放日
    		   	$('.typeWrap .shkfr').html( jsonData.redemptionOpenDay);
    		   	//可提交赎回申请时间
    		   	$('.typeWrap .ketjsh').html( (jsonData.beginRedemptionTime ? jsonData.beginRedemptionTime : '') + '至' + ( jsonData.endRedemptionTime ? jsonData.endRedemptionTime : '') );
	    	}

		},

		//点击展开按钮
		event: function(){
			var that = this;
			//按钮点击展开收起
			mui("body").on('tap', '.openButton', function(e) {

				if( $('.topContent.open').length ){
					//收起
					$('.topContent').removeClass('open');

					$('.typeWrap openWrap').hide();
				}
				else{
					//展开
					$('.topContent').addClass('open');

					$('.typeWrap openWrap').show();
				}
            })

            //折线图点击请求数据
			mui("body").on('tap', '.lineDraw .time', function(e) {

				that.getLineData( $(this) );
            })
		},



	}

	privateDetail.init();
})