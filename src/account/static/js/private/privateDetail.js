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
 * isAllowRedemption    是否可以赎回【1.否 2.是】
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
			isAllowRedemption: splitUrl['isAllowRedemption'],
			ecFileName: '',
			ecFileUrl: '',
			qrnhWfsy: {
				oneMonth : {},
				threeMonth: {},
				oneYear: {},
				sinceNow: {}
			},
			dwjzljjz: {
				oneMonth : {},
				threeMonth: {},
				oneYear: {},
				sinceNow: {}
			},
			redeemRule: []	// 赎回规则  按照=====切割		
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
				// 获取交易规则内容
				that.getTradeRule()
			} else if ( that.data.projectType == 1 ){
				//稳裕
				$('.type_1').show();
				//折线图
				$('.lineWrap').removeClass('hide');
				$(".titleWrap .qrnh").addClass("noBorderBottm")
				//交易规则
				$('.dealMid').removeClass('hide');
				// 获取交易规则内容
				that.getTradeRule()
			} else if(that.data.projectType == 2){
				//债权类
				$('.type_2').show()
			} else if( that.data.projectType == 3 ){
				//股权
				$('.type_3').show()
			} else if( that.data.projectType == 4 ){
				//证券
				$('.type_4').show()
				//折线图
				$('.lineWrap').removeClass('hide');
				$(".lineWrap .typeNo5Wrap").css("display", "none!important")
				$(".lineWrap .type5Wrap").css("display", "block")
				$("#qrnhLine").addClass("hide")
				$("#dwjzLine").removeClass("hide")
				//交易规则
				$('.dealMid').removeClass('hide');
				// 获取交易规则内容
				that.getTradeRule()
			}
			// 是否显示可赎回按钮
			if(that.data.isAllowRedemption == 2) {
				$(".redeemBtn").css("display", "block")
			} else {
				$(".midContent").css("padding-bottom", "0")
				$(".footer").css("display", "none")
			}
			//获取页面初始数据
			that.getData();
			//事件绑定
			that.event();	
		},
		// 获取交易规则内容接口 t 1 稳金 2 稳裕 5 证券
		getTradeRule() {
			var that = this;
			var projectType = Number(that.data.projectType)
			switch(projectType) {
				case 0: var params = {category: 'rule_wenjin'};break;
				case 1: var params = {category: 'rule_wenyu'};break;
				case 4: var params = {category: 'rule_zhengquan'};break;
			}
			//产品详情接口
			var obj = [{
			    url: site_url.findLatestContentByCategory_api, 
			    data: params,
			    needLogin: true,
			    contentTypeSearch: true,
			    callbackDone: function(json) {
			    	that.data.redeemRule = json.data.introduction.replace(/\r\n/g,"").split("=====");
			    	// 判断是否有快速赎回规则
			    	console.log(that.data.redeemRule)
			    	if(that.data.redeemRule.indexOf("快赎规则") !== -1) {
			    		that.setRedeemRule(1)
			    	} else {  // 只有普通赎回规则
			    		that.setRedeemRule(2)
			    		$("#redeemNav .quick").css("display", "none").removeClass('active')
			    		$("#redeemNav .normal").addClass("active")
			    	}
			    },
			}];
			$.ajaxLoading(obj);	
		},
		// 赎回规则数据 1快速赎回 2普通赎回
		setRedeemRule(type) {
			var that = this;
			var redeemRule = that.data.redeemRule;
			if(type == 1) {
				if(redeemRule.indexOf("快赎规则") !== -1) {
		    		$("#tradeDatePre").html(redeemRule[redeemRule.indexOf("快赎规则") + 1].replace("快赎轴前文案", ""))
		    		$("#tradeDateNext").html(redeemRule[redeemRule.indexOf("快赎规则") + 2].replace("快赎轴后文案", ""))
		    		$("#tradeExplain").html(redeemRule[redeemRule.indexOf("快赎规则") + 3].replace("快赎交易说明", ""))
		    		if(redeemRule[redeemRule.indexOf("快赎规则") + 4].indexOf("快赎费率说明") != -1) {
		    			$("#tradeFee").css("display", "block")
		    			$("#tradeFee").html(redeemRule[redeemRule.indexOf("快赎规则") + 4].replace("快赎费率说明", ""))
		    		} else {
		    			$("#tradeFee").css("display", "none")
		    		}
		    	}
			} else if (type == 2) {
				if (redeemRule.indexOf("普赎规则") !== -1)  {
		    		$("#tradeDatePre").html(redeemRule[redeemRule.indexOf("普赎规则") + 1].replace("普赎轴前文案", ""))
		    		$("#tradeDateNext").html(redeemRule[redeemRule.indexOf("普赎规则") + 2].replace("普赎轴后文案", ""))
		    		$("#tradeExplain").html(redeemRule[redeemRule.indexOf("普赎规则") + 3].replace("普赎交易说明", ""))
		    		if(redeemRule[redeemRule.indexOf("普赎规则") + 4] && redeemRule[redeemRule.indexOf("普赎规则") + 4].indexOf("普赎费率说明") != -1) {
		    			$("#tradeFee").css("display", "block")
		    			$("#tradeFee").html(redeemRule[redeemRule.indexOf("普赎规则") + 4].replace("普赎费率说明", ""))
		    		} else {
		    			$("#tradeFee").css("display", "none")
		    		}
		    	}
			}
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
			    	that.data.ecFileName = jsonData.ecFileName;
			    	that.data.ecFileUrl = jsonData.ecFileUrl;
			    	//请求其他接口
			    	if( (that.data.projectType == 0) || (that.data.projectType == 1) ){ 
			    		//稳金类项目，请求七日年化/万份收益折线图
			    		that.getTypeOneData();
			    		//请求快速赎回和普通赎回的文案
			    		that.getTxt();
			    	} else if (that.data.projectType == 4) {
			    		// 证券类项目，请求单位净值/累计净值折线图
			    		that.getTypeTwoData();
			    	}
			    },
			}];
			$.ajaxLoading(obj);			
		},
		//请求七日年化/万份收益数据
		getTypeOneData: function( num ){
			var that = this;
			num = num ? num : 3;
			var newData = {
				sevenIncomeRate: [], //存放折线图七日年化
				profitThoudDate: [], //存放折线图收益日期
				profitThoudValue: [] //存放折线图万份收益
			}
			//判断当前画的是七日年化还是万份收益
			if( $('.lineWrap .titleWrap .active').hasClass('qrnh') ){
				//七日年化
				var type = 'qrnh';
			} else{
				var type = 'wfsy';
			}
			//判断是否已经有数据了，有的话不再请求接口
			if( num == 0 && that.data['qrnhWfsy'].oneMonth.profitThoudDate && that.data['qrnhWfsy'].oneMonth.profitThoudDate.length){
	       		//请求的是近一个月的数据
	       		that.drawLine( type, that.data['qrnhWfsy'].oneMonth );
	       		return false;
	       	} else if( num == 1 && that.data['qrnhWfsy'].threeMonth.profitThoudDate && that.data['qrnhWfsy'].threeMonth.profitThoudDate.length){
	       		//近三个月
	       		that.drawLine( type, that.data['qrnhWfsy'].threeMonth );
	       		return false;
	       	} else if( num == 3 && that.data['qrnhWfsy'].oneYear.profitThoudDate && that.data['qrnhWfsy'].oneYear.profitThoudDate.length ){
	       		//近一年
	       		that.drawLine( type, that.data['qrnhWfsy'].oneYear );
	       		return false;
	       	} else if( num == 4 && that.data['qrnhWfsy'].sinceNow.profitThoudDate && that.data['qrnhWfsy'].sinceNow.profitThoudDate.length){
	       		//成立至今
	       		that.drawLine( type, that.data['qrnhWfsy'].sinceNow );
	       		return false;
	       	}
			//没有数据，请求接口
			var obj = [{
			    url: site_url.earningCurve_api, 
			    data: {
			    	projectId: that.data.projectId,
			    	profitRange: num 
			    },
			    needLogin: true,
			    callbackDone: function(json) {
			    	console.log(json)
			    	var jsonData = json.data;
			    	//拼数据
			       	$.each( jsonData, function(i, el){
			       		newData.sevenIncomeRate.push( el.sevenYearYield);
			       		newData.profitThoudDate.push( el.curveDate);
			       		newData.profitThoudValue.push( el.incomeUnit);
			       	})
			       	switch(num) {
			       		case 0: that.data['qrnhWfsy'].oneMonth = newData;break;
			       		case 1: that.data['qrnhWfsy'].threeMonth = newData;break;
			       		case 3: that.data['qrnhWfsy'].oneYear = newData;break;
			       		case 4: that.data['qrnhWfsy'].sinceNow = newData;break;
			       	}
			       	that.drawLine( type, newData);			       	
			    },
			    callbackNoData: function(json) {
                    $("#qrnhLine").addClass("hide")
                    $("#wfsyLine").addClass("hide")
                    $(".noDataHintEcharts").removeClass("hide")
                },
			    callbackFail: function(json) {
                    $("#qrnhLine").addClass("hide")
                    $("#wfsyLine").addClass("hide")
                    $(".noDataHintEcharts").removeClass("hide")
                }
			}];
			$.ajaxLoading(obj);
		},
		//请求单位净值/累计净值数据
		getTypeTwoData: function( num ){
			var that = this;
			num = num ? num : 3;
			var newData = {
				unitAssets: [], //存放折线图单位净值
				assetsDate: [], //存放折线图净值日期
				accumulativeAssets: [], //存放折线图累计净值
			}
			//判断当前画的是单位净值还是累计净值
			if( $('.lineWrap .titleWrap .active').hasClass('dwjz') ){
				//单位净值
				var type = 'dwjz';
			} else{
				var type = 'ljjz';
			}
			//判断是否已经有数据了，有的话不再请求接口
			if( num == 0 && that.data['dwjzljjz'].oneMonth.profitThoudDate && that.data['dwjzljjz'].oneMonth.profitThoudDate.length){
	       		//请求的是近一个月的数据
	       		that.drawLine( type, that.data['dwjzljjz'].oneMonth );
	       		return false;
	       	} else if( num == 1 && that.data['dwjzljjz'].threeMonth.profitThoudDate && that.data['dwjzljjz'].threeMonth.profitThoudDate.length){
	       		//近三个月
	       		that.drawLine( type, that.data['dwjzljjz'].threeMonth );
	       		return false;
	       	} else if( num == 3 && that.data['dwjzljjz'].oneYear.profitThoudDate && that.data['dwjzljjz'].oneYear.profitThoudDate.length ){
	       		//近一年
	       		that.drawLine( type, that.data['dwjzljjz'].oneYear );
	       		return false;
	       	} else if( num == 4 && that.data['dwjzljjz'].sinceNow.profitThoudDate && that.data['dwjzljjz'].sinceNow.profitThoudDate.length){
	       		//成立至今
	       		that.drawLine( type, that.data['dwjzljjz'].sinceNow );
	       		return false;
	       	}
			//没有数据，请求接口
			var obj = [{
			    url: site_url.queryHistoryNetValue_api, 
			    data: {
			    	projectId: that.data.projectId,
			    	profitRange: num 
			    },
			    needLogin: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data.pageList;
			    	//拼数据
			       	$.each( jsonData, function(i, el){
			       		newData.unitAssets.push( el.unitNetValue);
			       		newData.assetsDate.push( el.netValueDate);
			       		newData.accumulativeAssets.push( el.accuNetValue);
			       	})
			       	switch(num) {
			       		case 0: that.data['dwjzljjz'].oneMonth = newData;break;
			       		case 1: that.data['dwjzljjz'].threeMonth = newData;break;
			       		case 3: that.data['dwjzljjz'].oneYear = newData;break;
			       		case 4: that.data['dwjzljjz'].sinceNow = newData;break;
			       	}
			       	that.drawLine( type, newData);			       	
			    },
			    callbackNoData: function(json) {
                    $("#dwjzLine").addClass("hide")
                    $("#ljjzLine").addClass("hide")
                    $(".noDataHintEcharts").removeClass("hide")
                },
			    callbackFail: function(json) {
                    $("#dwjzLine").addClass("hide")
                    $("#ljjzLine").addClass("hide")
                    $(".noDataHintEcharts").removeClass("hide")
                }
			}];
			$.ajaxLoading(obj);
		},
		//画折线图
		//type必传
		drawLine: function ( type, data) {
			var that = this;
			if( type == 'qrnh'){
				//画的是七日年化折线图
				$("#qrnhLine").removeClass("hide")
				$(".noDataHintEcharts").addClass("hide")
				var chartId = $('#qrnhLine')[0],
					xAxisData = data.profitThoudDate,
					seriesData = data.sevenIncomeRate;
			} else if( type == 'wfsy'){
				//画的是万份收益折线图
				$("#wfsyLine").removeClass("hide")
				$(".noDataHintEcharts").addClass("hide")
				var chartId = $('#wfsyLine')[0],
					xAxisData = data.profitThoudDate,
					seriesData = data.profitThoudValue;
			} else if( type == 'dwjz'){
				//画的是单位净值折线图
				$("#dwjzLine").removeClass("hide")
				$(".noDataHintEcharts").addClass("hide")
				var chartId = $('#dwjzLine')[0],
					xAxisData = data.assetsDate,
					seriesData = data.unitAssets;
			} else if( type == 'ljjz'){
				//画的是累计净值折线图
				$("#ljjzLine").removeClass("hide")
				$(".noDataHintEcharts").addClass("hide")
				var chartId = $('#ljjzLine')[0],
					xAxisData = data.assetsDate,
					seriesData = data.accumulativeAssets;
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
	    	if ( that.data.projectType == 0 ){ //稳金类项目
	    		console.log(jsonData.capitalisation)
    			//当前市值
    			$('#type0TotalM').html( jsonData.capitalisation );
    		   	//持有份额
    		   	$('.type_0 .totalShare').html( jsonData.totalShare );
    		   	//七日年化
    		   	$('.type_0 .sevenYearYield').html( jsonData.sevenYearYield);
    		   	// 七日年化日期
    		   	$('.type_0 .smallDate').html( " (" + jsonData.sevenYearYieldUpdateDate + ")");
    		   	//可赎回份额
    		   	$('.type_0 .kshfe').html( jsonData.allowRedemptionShare);
    		   	//万份收益
    		   	$('.type_0 .wfsy').html( jsonData.incomeUnit);
	    	} else if( that.data.projectType == 1){ //稳裕类	   		
	    		//当前市值
	    		$('#type1TotalM').html( jsonData.capitalisation );
	    		//持有份额
	    		$('.type_1 .totalShare').html( jsonData.totalShare );
	    		//七日年化
	    		$('.type_1 .sevenYearYield').html( jsonData.sevenYearYield);
	    		// 七日年化日期
    		   	$('.type_1 .smallDate').html( " (" + jsonData.sevenYearYieldUpdateDate + ")");
	    		//可赎回份额
    		   	$('.type_1 .kshfe').html( jsonData.allowRedemptionShare);
    		   	//赎回开放日
    		   	$('.type_1 .shkfr').html( jsonData.redemptionOpenDay);
    		   	//可提交赎回申请时间
    		   	$('.type_1 .ketjsh').html( (jsonData.beginRedemptionTime ? jsonData.beginRedemptionTime : '') + ' 至 ' + ( jsonData.endRedemptionTime ? jsonData.endRedemptionTime : '') );
	    	} else if( that.data.projectType == 2){ //债权类	  		
	    		//当前持仓
	    		$('#type2TotalM').html( jsonData.totalShare );
	    		//收益分配
	    		$('.type_2 .syfp').html( jsonData.incomeAssign );
	    		//持有天数
	    		$('.type_2 .cyts').html( jsonData.holdDays);
	    		//业绩比较基准
    		   	$('.type_2 .yjbjjz').html( jsonData.expectedProfit);
    		   	//成立日
    		   	$('.type_2 .clr').html( jsonData.setupDate);
    		   	//到期日
    		   	$('.type_2 .dqr').html( jsonData.endDate ? jsonData.endDate : '' );
	    	} else if( that.data.projectType == 3){ //股权类	    		
	    		//认购金额
	    		$('#type3TotalM').html( jsonData.buyAmount );
	    		//收益分配
	    		$('.type_3 .syfp').html( jsonData.incomeAssign );
	    		//成立日
	    		$('.type_3 .clr').html( jsonData.setupDate);
	    		//产品期限
    		   	$('.type_3 .cpqx').html( jsonData.prodTerm);
	    	} else if( that.data.projectType == 4){ //证券类   		
	    		//当前市值
	    		$('#type4TotalM').html( jsonData.capitalisation );
	    		// 单位净值
	    		$('.type_4 .dwjz').html( jsonData.navUnit );
	    		// 持有份额
	    		$('.type_4 .cyfe').html( jsonData.totalShare );
	    		// 累计净值
	    		$('.type_4 .ljjz').html( jsonData.totalNetValue );
	    		// 可赎回份额
	    		$('.type_4 .kshhf').html( jsonData.allowRedemptionShare );
	    		// 持有天数
	    		$('.type_4 .cyts').html( jsonData.holdDays );
	    		// 赎回开放日
	    		$('.type_4 .shkfr').html( jsonData.redemptionOpenDay );
	    		// 可提交赎回申请时间
	    		$('.type_4 .ktjshsqsj').html( (jsonData.beginRedemptionTime ? jsonData.beginRedemptionTime : '') + ' 至 ' + ( jsonData.endRedemptionTime ? jsonData.endRedemptionTime : '') );
	    	}
	    	$(".totalM").css({"background": "linear-gradient(360deg, rgba(186,140,112,1) 0%, rgba(244,210,192,1) 100%)", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent"})
	    	// 显示各明细分类
	    	var tradeRecordFlag = jsonData.tradeRecordFlag==1?true:false // 是否有交易明细(0否1是)
	    	var incomeAssignFlag = jsonData.incomeAssignFlag==1?true:false // 是否有收益分配明细(0否1是)
	    	var fundConfirmDealFalg = jsonData.fundConfirmDealFalg==1?true:false // 是否有基金确认书(0否1是)
	    	if((tradeRecordFlag && !incomeAssignFlag && !fundConfirmDealFalg) || (!tradeRecordFlag && incomeAssignFlag && !fundConfirmDealFalg) || (!tradeRecordFlag && !incomeAssignFlag && fundConfirmDealFalg)) {
	    		$(".midContent>.actionWrap>.single").css("display", "block")
	    		if(tradeRecordFlag) {
	    			$(".single .txt").html("交易明细")
	    			$(".single .img").attr("src", "/account/static/img/productDetail/type_1_left.png")
	    		} else if (incomeAssignFlag) {
	    			$(".single .txt").html("收益分配明细")
	    			$(".single .img").attr("src", "/account/static/img/productDetail/account_icon_jymx@2x.png")
	    		} else if (fundConfirmDealFalg) {
	    			$(".single .txt").html("基金确认书")
	    			$(".single .img").attr("src", "/account/static/img/productDetail/type_1_right.png")
	    		}
	    	} else if ((tradeRecordFlag && incomeAssignFlag && !fundConfirmDealFalg) || (tradeRecordFlag && !incomeAssignFlag && fundConfirmDealFalg) || (!tradeRecordFlag && incomeAssignFlag && fundConfirmDealFalg)) {
	    		$(".midContent>.actionWrap>.double").css("display", "block")
	    		if(!fundConfirmDealFalg) {
	    			$(".double").children().eq(0).find(".txt").html("交易明细")
	    			$(".double").children().eq(0).find(".img").attr("src", "/account/static/img/productDetail/type_1_left.png")
	    			$(".double").children().eq(1).find(".txt").html("收益分配明细")
	    			$(".double").children().eq(1).find(".img").attr("src", "/account/static/img/productDetail/account_icon_jymx@2x.png")
	    		} else if (!incomeAssignFlag) {
	    			$(".double").children().eq(0).find(".txt").html("交易明细")
	    			$(".double").children().eq(0).find(".img").attr("src", "/account/static/img/productDetail/type_1_left.png")
	    			$(".double").children().eq(1).find(".txt").html("基金确认书")
	    			$(".double").children().eq(1).find(".img").attr("src", "/account/static/img/productDetail/type_1_right.png")
	    		} else if (!tradeRecordFlag) {
	    			$(".double").children().eq(0).find(".txt").html("收益明细")
	    			$(".double").children().eq(0).find(".img").attr("src", "/account/static/img/productDetail/account_icon_jymx@2x.png")
	    			$(".double").children().eq(1).find(".txt").html("基金确认书")
	    			$(".double").children().eq(1).find(".img").attr("src", "/account/static/img/productDetail/type_1_right.png")
	    		}
	    	} else if (tradeRecordFlag && incomeAssignFlag && fundConfirmDealFalg) {
	    		$(".midContent>.actionWrap>.treble").css("display", "flex")
	    	} else {
	    		$(".actionWrap").css("display", "none")
	    	}
		},
		//点击展开按钮
		event: function(){
			var that = this;
			// 按钮点击展开收起
			mui("body").on('tap', '.openButton', function() {
                if( $('.topContent.open').length ){
					//收起
					$('.topContent').removeClass('open');
					$('.typeWrap openWrap').hide();
				} else{
					//展开
					$('.topContent').addClass('open');
					$('.typeWrap openWrap').show();
				}
            })
            // 交易明细，基金确认书，收益明细等点击跳转
            mui("body").on('tap', '.single', function() {
            	if($(this).find(".txt").html() == '交易明细') { // 私募交易明细页面
            		window.location.href = site_url.transactionDetail_url + '?projectId=' + that.data.projectId;
            	} else if ($(this).find(".txt").html() == '收益分配明细') { // 私募收益明细页面
            		window.location.href = site_url.incomeDistribution_url + '?projectId=' + that.data.projectId;
            	} else if ($(this).find(".txt").html() == '基金确认书') { // 基金确认书页面
            		window.location.href = site_url.privateFundPdf_url + '?projectId=' + that.data.projectId + '&ecFileName=' + that.data.ecFileName + '&ecFileUrl=' + that.data.ecFileUrl;
            	}
            })
            mui("body").on('tap', '.double>div', function() {
            	if($(this).find(".txt").html() == '交易明细') { // 私募交易明细页面
            		window.location.href = site_url.transactionDetail_url + '?projectId=' + that.data.projectId;
            	} else if ($(this).find(".txt").html() == '收益分配明细') { // 私募收益明细页面
            		window.location.href = site_url.incomeDistribution_url + '?projectId=' + that.data.projectId;
            	} else if ($(this).find(".txt").html() == '基金确认书') { // 基金确认书页面
            		window.location.href = site_url.privateFundPdf_url + '?projectId=' + that.data.projectId + '&ecFileName=' + that.data.ecFileName + '&ecFileUrl=' + that.data.ecFileUrl;
            	}
            })
            mui("body").on('tap', '.treble>.actionCon', function() {
            	if($(this).find(".txt").html() == '交易明细') { // 私募交易明细页面
            		window.location.href = site_url.transactionDetail_url + '?projectId=' + that.data.projectId;
            	} else if ($(this).find(".txt").html() == '收益分配明细') { // 私募收益明细页面
            		window.location.href = site_url.incomeDistribution_url + '?projectId=' + that.data.projectId;
            	} else if ($(this).find(".txt").html() == '基金确认书') { // 基金确认书页面
            		window.location.href = site_url.privateFundPdf_url + '?projectId=' + that.data.projectId + '&ecFileName=' + that.data.ecFileName + '&ecFileUrl=' + that.data.ecFileUrl;
            	}
            })
            // 历史明细点击跳转
            mui("body").on('tap', '#historyDetailBtn', function() {
            	window.location.href = site_url.historyDetail_url + '?projectId=' + that.data.projectId;
            })
            // 净值明细点击跳转
            mui("body").on('tap', '#netValueDetailBtn', function() {
            	window.location.href = site_url.priNetWorthDetails_url + '?projectId=' + that.data.projectId;
            })
            // 交易规则点击跳转
            mui("body").on('tap', '#transactionRuleBtn', function() {
            	window.location.href = site_url.transactionRules_url + '?projectId=' + that.data.projectId;
            })
            // 产品档案点击跳转
            mui("body").on('tap', '#productFilesBtn', function() {
            	window.location.href = site_url.productFiles_url + '?projectId=' + that.data.projectId;
            })
            // 信息披露点击跳转
            mui("body").on('tap', '#infoPublishBtn', function() {
            	window.location.href = site_url.informationDisclosure_url + '?projectId=' + that.data.projectId;
            })
            //折线图点击月份请求数据
            mui("body").on('tap', '.lineWrap .time', function() {
            	$('.lineDraw .time').removeClass('active');
				$(this).addClass('active');
				if(that.data.projectType == 4) {
					that.getTypeTwoData( $(this).attr('num') );
				} else {
					that.getTypeOneData( $(this).attr('num') );
				}
            })
            //赎回按钮点击切换
            mui("body").on('tap', '#redeemNav .navSpan', function() {
            	$(this).addClass("active").siblings().removeClass('active')
				that.setRedeemRule($(this).attr("type"))
            })
            //折线图点击七日年化/万份收益切换区域
            mui("body").on('tap', '.lineWrap .titleWrap .title', function() {
            	$('.lineWrap .titleWrap .title').removeClass('active');
				$(this).addClass('active');
				//判断当前画的是七日年化还是万份收益或单位净值或累计净值
				if( $('.lineWrap .titleWrap .active').hasClass('qrnh') ){
					//七日年化
					$('#qrnhLine').removeClass('hide');
					$('#wfsyLine').addClass('hide');
					$('#dwjzLine').addClass('hide');
					$('#ljjzLine').addClass('hide');
					that.getTypeOneData()
				} else if ( $('.lineWrap .titleWrap .active').hasClass('wfsy') ) {
					// 万份收益
					$('#wfsyLine').removeClass('hide');
					$('#qrnhLine').addClass('hide');
					$('#dwjzLine').addClass('hide');
					$('#ljjzLine').addClass('hide');
					that.getTypeOneData()
				} else if ( $('.lineWrap .titleWrap .active').hasClass('dwjz') ) {
					// 单位净值
					$('#dwjzLine').removeClass('hide');
					$('#qrnhLine').addClass('hide');
					$('#wfsyLine').addClass('hide');
					$('#ljjzLine').addClass('hide');
					that.getTypeTwoData()
				} else if ( $('.lineWrap .titleWrap .active').hasClass('ljjz') ) {
					// 累计净值
					$('#ljjzLine').removeClass('hide');
					$('#qrnhLine').addClass('hide');
					$('#wfsyLine').addClass('hide');
					$('#dwjzLine').addClass('hide');
					that.getTypeTwoData()
				}
				$('.lineDraw .time').removeClass('active');
				$('.lineDraw .oneMonth').addClass('active');
            })
		},
	}
	privateDetail.init();
})