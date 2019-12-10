/**
 * 私募资产详情页
 *
 * @author yangjinlai 20191120
 *
 * 需要从资产列表页带参数： projectType--项目类型  projectId--项目id
 *
 * projectType: 
 * 0：稳金（对应type_1)  1：稳裕 2：债权 3：股权 4：证券
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
// var echarts = require('echarts/lib/echarts');
// // 引入柱状图
// require('echarts/lib/chart/line');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function() {

	var privateDetail = {

		data: {
			projectType : splitUrl['projectType'],
			projectId: splitUrl['projectId'],

			sevenIncomeRate: [], //存放折线图七日年化
			profitThoudDate: [], //存放折线图收益日期
			profitThoudValue: [], //存放折线图万份收益
		},

		init: function(){
			var that = this;

			if( that.data.projectType == 0 ){ 
				//稳金类
				$('.type_0').show();
				//折线图
				$('.lineWrap').show();
				//展示折线图的万份收益按钮
				$('.lineWrap .wfsy').removeClass('hidden');
			}
			else if ( that.data.projectType == 1 ){
				//稳裕
				$('.type_1').show();
				//折线图
				$('.lineWrap').show();
			}
			else if(that.data.projectType == 2){
				//债权类
				$('.type_2').show()
			}
			else if( that.data.projectType == 3 ){
				//股权
				$('.type_3').show()
			}
			else if( that.data.projectType == 4 ){
				//证券
				$('.type_4').show()
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
			    		//稳金类项目，请求七日年化/万份收益折线图
			    		that.getTypeOneData(0);
			    		//请求快速赎回和普通赎回的文案
			    		that.getTxt();
			    		//人气产品
			    		that.getDurationPopProduct();
			    	}

			    }
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

			    

			    }
			}];
			$.ajaxLoading(obj);

		},

		//请求七日年化/万份收益数据
		getTypeOneData: function( num ){
			var that = this;

			//七日年化
			var obj = [{
			    url: site_url.earningCurve_api, 
			    data: {
			    	projectId: '1312',
			    	profitRange: num 
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

			       	that.drawLine();
			       	
			    }
			}];
			$.ajaxLoading(obj);
		},

		drawLine: function () {
			var that = this;

	       	//画折线图
	       	// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('line'));

			myChart.setOption({
			    tooltip: {
			    	trigger: 'axis',
			    	formatter: '<p style="font-size:0.36rem;color: #364D97;">{c}%</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
			    	backgroundColor: 'rgba(31,55,129,0.1)',
			    	// renderMode : 'richText', 
			    	extraCssText: [7, 15, 15, 15],
			    	textStyle: {
			    		color:  '#364D97'
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
		    				        offset: 0, color: '#647BC2' // 0% 处的颜色
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
			        data: that.data.profitThoudDate,
			        axisLine: {
			        	lineStyle: {
			        		color: '#FADFBB'
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
			    			color: '#9B9B9B'
			    		}
			    	},
			    	axisLabel:{
			    		show: true,
			    		color:  '#9B9B9B',
			    		formatter: '{value}%',
			    	},
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
			    			        offset: 1, color: '#fff' // 0% 处的颜色
			    			    }, {
			    			        offset: 0, color: '#677EC4' // 100% 处的颜色
			    			    }],
			    			    global: false // 缺省为 false
			    			}
			    		}
			    	},
			        data: that.data.sevenIncomeRate
			    }]
			});

		},

		getTxt: function(){
			var that = this;

		},

		setDomData: function( jsonData){
			var that = this;

			//项目名称
    		$('#HeadBarpathName').html( jsonData.projectName );

	    	if( that.data.projectType == 0 ){ //稳金类项目
	    		
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
	    	else if( that.data.projectType == 1){ //稳裕类	    		
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
	    	else if( that.data.projectType == 2){ //债权类	    		
	    		//当前持仓
	    		$('.typeWrap .totalM').html( jsonData.totalShare );
	    		//收益分配
	    		$('.typeWrap .syfp').html( jsonData.incomeAssign );
	    		//持有天数
	    		$('.typeWrap .cyts').html( jsonData.holdDays);
	    		//业绩比较基准
    		   	$('.typeWrap .yjbjjz').html( jsonData.expectedProfit);
    		   	//成立日
    		   	$('.typeWrap .clr').html( jsonData.setupDate);
    		   	//到期日
    		   	$('.typeWrap .dqr').html( jsonData.endDate ? jsonData.endDate : '' );
	    	}
	    	else if( that.data.projectType == 3){ //股权类	    		
	    		//认购金额
	    		$('.typeWrap .totalM').html( jsonData.buyAmount );
	    		//收益分配
	    		$('.typeWrap .syfp').html( jsonData.incomeAssign );
	    		//成立日
	    		$('.typeWrap .clr').html( jsonData.setupDate);
	    		//产品期限
    		   	$('.typeWrap .cpqx').html( jsonData.prodTerm);
	    	}

		},

		//点击展开按钮
		event: function(){
			
			//按钮点击展开收起
			mui("body").on('mdClick', '.openButton', function(e) {

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
            },{
                'htmdEvt': 'cashTreasure_0'
            })

            //折线图点击月份请求数据
			mui("body").on('mdClick', '.lineDraw .time', function(e) {

				that.getTypeOneData( $(this).attr('num') );
            },{
                'htmdEvt': 'cashTreasure_1'
            })

            //折线图点击七日年化/万份收益切换区域
			mui("body").on('mdClick', '.lineDraw .time', function(e) {

				
            },{
                'htmdEvt': 'cashTreasure_2'
            })
		}



	}

	privateDetail.init();
})