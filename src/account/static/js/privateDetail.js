/**
 * 私募资产详情页
 *
 * @author yangjinlai 20191120
 *
 * 需要从资产列表页带参数： projectType--项目类型  projectId--项目id
 *
 * projectType: 
 * 0：稳金（对应type_1)  1：稳裕 2：债权 3：股权 4：证券
 * 海外类型  已经由后台处理好了  传的都是以上5种数据  前端不需要关心是否为海外类型
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

			qrnhWfsy: {
				oneMonth : {},
				threeMonth: {},
				oneYear: {},
				sinceNow: {}
			}
			
		},

		init: function(){
			var that = this;

			if( that.data.projectType == 0 ){ 
				//稳金类
				$('.type_0').show();
				//折线图
				$('.lineWrap').removeClass('hide');
				//展示折线图的万份收益按钮
				$('.lineWrap .wfsy').removeClass('hidden');
				//交易规则
				$('.dealMid').removeClass('hide');
			}
			else if ( that.data.projectType == 1 ){
				//稳裕
				$('.type_1').show();
				//折线图
				$('.lineWrap').removeClass('hide');
				//交易规则
				$('.dealMid').removeClass('hide');
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

			//获取页面初始数据
			that.getData();

			//事件绑定
			that.event();	
		},

		
		//获取初始数据
		getData: function(){

			var that = this;

			//产品详情接口
			var obj = [{
			    url: site_url.assetsDetail_api, 
			    data: {
			    	projectId: that.data.projectId
			    },
			    needLogin: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data;

			    	//设置数据到页面上
			    	that.setDomData( jsonData );

			    	//请求其他接口
			    	if( (that.data.projectType == 0) || (that.data.projectType == 1) ){ 
			    		//稳金类项目，请求七日年化/万份收益折线图
			    		that.getTypeOneData();
			    		//请求快速赎回和普通赎回的文案
			    		that.getTxt();
			    	}

			    },
			}];
			$.ajaxLoading(obj);

			
		},

		//请求七日年化/万份收益数据
		getTypeOneData: function( num ){
			var that = this;

			num = num ? num : 0;

			var newData = {
				sevenIncomeRate: [], //存放折线图七日年化
				profitThoudDate: [], //存放折线图收益日期
				profitThoudValue: [] //存放折线图万份收益
			}

			//判断当前画的是七日年化还是万份收益
			if( $('.lineWrap .titleWrap .active').hasClass('qrnh') ){
				//七日年化
				var type = 'qrnh';
			}
			else{
				var type = 'wfsy';
			}

			//判断是否已经有数据了，有的话不再请求接口
			if( num == 0 && that.data['qrnhWfsy'].oneMonth.profitThoudDate && that.data['qrnhWfsy'].oneMonth.profitThoudDate.length){
	       		//请求的是近一个月的数据
	       		that.drawLine( type, that.data['qrnhWfsy'].oneMonth );
	       		return false;
	       	}
	       	else if( num == 1 && that.data['qrnhWfsy'].threeMonth.profitThoudDate && that.data['qrnhWfsy'].threeMonth.profitThoudDate.length){
	       		//近三个月
	       		that.drawLine( type, that.data['qrnhWfsy'].threeMonth );
	       		return false;
	       	}
	       	else if( num == 3 && that.data['qrnhWfsy'].oneYear.profitThoudDate && that.data['qrnhWfsy'].oneYear.profitThoudDate.length ){
	       		//近一年
	       		that.drawLine( type, that.data['qrnhWfsy'].oneYear );
	       		return false;
	       	}
	       	else if( num == 4 && that.data['qrnhWfsy'].sinceNow.profitThoudDate && that.data['qrnhWfsy'].sinceNow.profitThoudDate.length){
	       		//成立至今
	       		that.drawLine( type, that.data['qrnhWfsy'].sinceNow );
	       		return false;
	       	}
			

			//没有数据，请求接口
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
			       		newData.sevenIncomeRate.push( el.sevenIncomeRate);
			       		newData.profitThoudDate.push( el.profitThoudDate);
			       		newData.profitThoudValue.push( el.profitThoudValue);
			       	})

			       	if( num == 0){
			       		//请求的是近一个月的数据
			       		that.data['qrnhWfsy'].oneMonth = newData ;
			       	}
			       	else if( num == 1){
			       		//近三个月
			       		that.data['qrnhWfsy'].threeMonth = newData ;
			       	}
			       	else if( num == 3){
			       		//近一年
			       		that.data['qrnhWfsy'].oneYear = newData ;
			       	}
			       	else if( num == 4){
			       		//成立至今
			       		that.data['qrnhWfsy'].sinceNow = newData ;
			       	}

			       	that.drawLine( type, newData);
			       	
			    },
			}];
			$.ajaxLoading(obj);
		},

		//画折线图
		//type必传
		drawLine: function ( type, data) {
			var that = this;

			if( type == 'qrnh'){
				//画的是七日年化折线图
				var chartId = $('#qrnhLine')[0],
					xAxisData = data.profitThoudDate,
					seriesData = data.sevenIncomeRate;
			}
			else if( type == 'wfsy'){
				//画的是万份收益折线图
				var chartId = $('#wfsyLine')[0],
					xAxisData = data.profitThoudDate,
					seriesData = data.profitThoudValue;
			}

			var myChart = echarts.init( chartId );

			myChart.setOption({
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
			    xAxis: {
			    	type: 'category',
			        data: xAxisData,
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
			    		color:  '#9B9B9B',
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
			    			        offset: 0, color: '#F2E3CA' // 0% 处的颜色
			    			    }, {
			    			        offset: 1, color: '#fff' // 100% 处的颜色
			    			    }],
			    			    global: false // 缺省为 false
			    			}
			    		}
			    	},
			        data: seriesData
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
    		   	$('.typeWrap .totalShare').html( jsonData.totalShare );
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
	    		$('.typeWrap .totalShare').html( jsonData.totalShare );
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
	    	else if( that.data.projectType == 4){ //证券类    		

	    	}

		},

		//点击展开按钮
		event: function(){
			var that = this;

			//按钮点击展开收起
			$(document).on('click', '.openButton', function(e) {

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

            //折线图点击月份请求数据
			$(document).on('click', '.lineWrap .time', function(e) {

				$('.lineDraw .time').removeClass('active');
				$(this).addClass('active');

				that.getTypeOneData( $(this).attr('num') );
            })

            //折线图点击七日年化/万份收益切换区域
			$(document).on('click', '.lineWrap .titleWrap .title', function(e) {

				$('.lineWrap .titleWrap .title').removeClass('active');
				$(this).addClass('active');

				//判断当前画的是七日年化还是万份收益
				if( $('.lineWrap .titleWrap .active').hasClass('qrnh') ){
					//七日年化
					$('#qrnhLine').removeClass('hide');
					$('#wfsyLine').addClass('hide');
				}
				else{
					$('#wfsyLine').removeClass('hide');
					$('#qrnhLine').addClass('hide');
				}

				$('.lineDraw .time').removeClass('active');
				$('.lineDraw .oneMonth').addClass('active');

				that.drawLine( 'wfsy', that.data['qrnhWfsy'].oneMonth );
            })
		},



	}

	privateDetail.init();
})