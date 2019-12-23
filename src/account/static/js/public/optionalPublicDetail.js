/**
 * 公募自选资产详情页
 *
 * @author 田俊国 20191120
 * 页面进来数据是从session中拿，所以需要先到自选公募持仓详情页(account/views/publicAssets.html)点某条数据，将数据存到session中，再到这个页面才会有数据
 * projectType: 
 * 0：货币（对应type_1)  1：非货币 
 */


require('@pathCommonBase/base.js');

//ajax调用
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonJs/components/headBarConfig.js');


$(function() {

	var privateDetail = {

		data: {
			publicFundDetail:"",//从列表页带过来的数据
			projectType : "",//基金类型。货币10300、非货币除10300其他
			fundCode: "",//货币代码
			supportFixedFlag: "",//是否支持定投
			isBuyFlag:"",//是否可购买
			isRedemptionFlag:"",//是否可赎回
			qrnhWfsy: {
				oneMonth : {},
				threeMonth: {},
				sixMonth:{},
				oneYear: {},
				sinceNow: {}
			},
			end:"",
			unit:"%",//折线图上是%还是不带%。
		},

		init: function(){
			var that = this;
			that.data.publicFundDetail = JSON.parse(sessionStorage.getItem("publicFundDetail"));
			that.data.projectType = that.data.publicFundDetail.invTypCom;//基金类型。货币10300、非货币除10300其他
			that.data.fundCode = that.data.publicFundDetail.fundCode;
			that.data.isBuyFlag = that.data.publicFundDetail.isBuyFlag;//是否可购买(0否1是) int类型
			that.data.isRedemptionFlag = that.data.publicFundDetail.isRedemptionFlag; //是否可赎回(0否1是) int 类型
			that.data.supportFixedFlag = that.data.publicFundDetail.isFixFlag;//是否可定投(0否1是) int 类型
			//设置数据到页面上
			that.setDomData(that.data.publicFundDetail);
			if( that.data.projectType == "10300" ){//10300货币类型
				$(".dealReg").hide()
				//货币基金
				$('.type_0').show();
				//折线图
				$('.lineWrap').show();
				//展示折线图的万份收益按钮
				$('.lineWrap .wfsy').removeClass('hidden');
			}
			else{
				$(".dealReg").show()
				that.data.unit = "";//手指移动echars显示的数值带不带百分号。非货币基金都不带百分号
				//获取红利
				that.getDividend();
				//非货币基金
				$('.type_1').show();
				//折线图
				$('.lineWrap').show();
				//展示折线图的万份收益按钮
				$('.lineWrap .wfsy').removeClass('hidden');
			}
			
			if(that.data.supportFixedFlag == 1){//支持定投展示定投按钮,1支持定投
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
						

    		//稳金类项目，请求七日年化/万份收益折线图
    		that.getTypeOneData();
    		//请求快速赎回和普通赎回的文案
    		that.getTxt();


			
		},
		getDividend:function(){
			var that = this;
			var obj = [{
			    url: site_url.pofQueryDividendByCode_api, 
			    data: {
			    	tradeAcco: that.data.publicFundDetail.tradeNo, 
			    	fundCode: that.data.fundCode,
			    },
			    needLogin: true,
			    needLoading: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data;//防止数据为空下面循环出错
			    	if(!jsonData.length){
			    		return false;
			    	}
			    	$.each(jsonData, function(i,v) {
			    		if(v.checkFlag == 1){//如果被选中，拿选中这一条的数据
			    			$(".dividend").text(v.autoBuyDes)
			    			return false;
			    		}
			    	});
		       	
			    }
			}]
			$.ajaxLoading(obj);
			
		},
		//请求七日年化/万份收益数据
		getTypeOneData: function( num ){
			var that = this,
			dataRange = "";
			num = num ? num : 0;
			var newData = {
				sevenIncomeRate: [], //存放折线图七日年化
				profitThoudDate: [], //存放折线图收益日期
				profitThoudValue: [], //存放折线图万份收益
				unitNavValue: [], //单位净值
				unitYldValue: [] //累计净值
			}
			//判断当前画的是七日年化还是万份收益
			if( $('.lineWrap .titleWrap .active').hasClass('qrnh') ){
				//七日年化
				var type = 'qrnh';
			} else{
				var type = 'wfsy';
			}
			if(num == 0){
				dataRange = 1;
			}else if(num == 1){
				dataRange = 3;
			}else if(num == 2){
				dataRange = 6;
			}else if(num == 3){
				dataRange = 12;
			}else if(num == 4){
				dataRange = "";
				that.data.end = new Date().toLocaleString().split(" ")[0].replace(/\//g, '-');
			}
			if(num != 4){
				that.data.end = ""
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
	       	} else if( num == 2 && that.data['qrnhWfsy'].sixMonth.profitThoudDate && that.data['qrnhWfsy'].sixMonth.profitThoudDate.length){
	       		//近三个月
	       		that.drawLine( type, that.data['qrnhWfsy'].sixMonth );
	       		return false;
	       	}else if( num == 3 && that.data['qrnhWfsy'].oneYear.profitThoudDate && that.data['qrnhWfsy'].oneYear.profitThoudDate.length ){
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
			    url: site_url.prfFundNetWorthTrendChart_api, 
			    data: {
			    	fundCode: that.data.fundCode,
			    	dataRange: dataRange,
			    	end: that.data.end || ""
			    },
			    needLoading: true,
			    needLogin: true,
			    callbackDone: function(json) {
			    	var jsonData = json.data;

			    	//拼数据
			       	$.each( jsonData.pageList, function(i, el){
			       		newData.sevenIncomeRate.push( el.annYldRat);
			       		newData.profitThoudDate.push( el.trdDt);
			       		newData.profitThoudValue.push( el.unitYld);
			       		newData.unitNavValue.push( el.unitNav);//单位净值
			       		newData.unitYldValue.push( el.accuUnitNav);//累计净值
			       	})
			       	switch(num) {
			       		case 0: that.data['qrnhWfsy'].oneMonth = newData;break;
			       		case 1: that.data['qrnhWfsy'].threeMonth = newData;break;
			       		case 2: that.data['qrnhWfsy'].sixMonth = newData;break;
			       		case 3: that.data['qrnhWfsy'].oneYear = newData;break;
			       		case 4: that.data['qrnhWfsy'].sinceNow = newData;break;
			       	}
			       	that.drawLine( type, newData);			       	
			    }
			}];
			$.ajaxLoading(obj);
		},
		//画折线图
		//type必传
		drawLine: function ( type, data) {
			var that = this;
			if( type == 'qrnh'){
				var chartId = $('#qrnhLine')[0],
					xAxisData = data.profitThoudDate;
					if( that.data.projectType != "10300" ){ //非货币基金
//						单位净值
						var seriesData = data.unitNavValue;
					}else{//货币基金
						//画的是七日年化折线图
					    var seriesData = data.sevenIncomeRate;
					}
			} else if( type == 'wfsy'){
				//画的是万份收益折线图
				var chartId = $('#wfsyLine')[0],
					xAxisData = data.profitThoudDate;
					if( that.data.projectType != "10300" ){ //非货币基金
						//累计收益
						var seriesData = data.unitYldValue;
					}else{//货币基金
						//画的是万份受益折线图
					    var seriesData = data.profitThoudValue;
					}
			}
			var myChart = echarts.init( chartId );
			myChart.setOption({
			    tooltip: {
			    	trigger: 'axis',
			    	formatter: '<p style="font-size:0.36rem;color: #677EC4;">{c}'+that.data.unit+'</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
			    	backgroundColor: 'rgba(218,181,124, 0.1)',
			    	// renderMode : 'richText', 
			    	extraCssText: [7, 15, 15, 15],
			    	textStyle: {
			    		color:  '#677EC4'
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
		    				        offset: 0, color: '#677EC4' // 0% 处的颜色
		    				    }, {
		    				        offset: 0.5, color: '#677EC4' // 0% 处的颜色
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
			        data: xAxisData,
			        axisLine: {
			        	lineStyle: {
			        		color: '#677EC4'
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
//			    		formatter: '{value}%',
			    		formatter: function (value, index) {           
							return value.toFixed(4);      
						},
			    	},
//			    	type : 'value',
// 					axisLabel: {                   
//						formatter: function (value, index) {           
//							return value.toFixed(4);      
//						}                
//					}
			    },
			    series: [{
			    	type: 'line',
			    	lineStyle: {
			    		color: '#061D6A'
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
			        data: seriesData
			    }]
			});

		},

		getTxt: function(){
			var that = this;

		},
		//获取分红方式
		getDivideData: function(){
						//没有数据，请求接口
			var obj = [];
			$.ajaxLoading(obj);
		},

		setDomData: function( jsonData){
			var that = this;

			//项目名称
    		$('#HeadBarpathName').html( jsonData.fundName );
			//基金代码
    		$('#fundCodeWrap').html( jsonData.fundCode );
			//总金额
			$('.typeWrap .totalM').html( jsonData.totalMoneyMask );
		   	//待确认金额 接口无
		   	$('.typeWrap .toConfirm .confirmMoney').html( jsonData.onwayAssetTotalMask );
		   	//昨日收益
		   	$('.typeWrap .yesterdayShare').html( jsonData.incomeMask);
		   	//持有收益
		   	$('.typeWrap .ownShare').html( jsonData.holdIncomeMask);
		   	//累计收益  接口无
		   	$('.typeWrap .accumulatedShare').html( jsonData.addupIncomeMask);
			//持有份额
			$('.openWrap .cyfe').html( jsonData.currentShareMask);
			//可用份额
			$('.openWrap .kyfe').html( jsonData.enableSharesMask);

	    	if( that.data.projectType == "10300" ){ //货币基金
	    		
				//七日年化
				$('.openWrap .qrnh').html( jsonData.sevenDayYield + "%");
				//万份受益
				$('.openWrap .wfsy').html( jsonData.unitYld);
				

    		   	
	    	}
	    	else{ //非货币基金	    		
	    		//当前市值
	    		//日涨幅
				$('.openWrap .rzf').html( jsonData.dayChgRat + "%");
				//最新净值
				$('.openWrap .zxjz').html( jsonData.nav);
				$('.lineWrap .qrnh').text("单位净值");
				$('.lineWrap .wfsy').text("累计净值");
	    	}

		},

		//点击展开按钮
		event: function(){
			var that = this;
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
                'htmdEvt': 'optionalPublicDetail_0'
            })
            //折线图点击月份请求数据
            mui("body").on('mdClick', '.lineWrap .time', function() {
				$('.lineDraw .time').removeClass('active');
				$(this).addClass('active');
				that.getTypeOneData( $(this).attr('num') );		
			},{
                'htmdEvt': 'optionalPublicDetail_1'
            })
            //折线图点击七日年化/万份收益切换区域
            mui("body").on('mdClick', '.lineWrap .titleWrap .title', function() {
				$('.lineWrap .titleWrap .title').removeClass('active');
				$(this).addClass('active');
				//判断当前画的是七日年化还是万份收益
				if( $('.lineWrap .titleWrap .active').hasClass('qrnh') ){
					//七日年化
					if(that.data.projectType == "10300"){//如果是货币基金有七日年化和万份收益，万份收益不带百分号。七日年化带。
						that.data.unit = "%"
					}
					$('#qrnhLine').removeClass('hide');
					$('#wfsyLine').addClass('hide');
				}
				else{
					that.data.unit = "";//万份受益没有百分号
					$('#wfsyLine').removeClass('hide');
					$('#qrnhLine').addClass('hide');
				}
				$('.lineDraw .time').removeClass('active');
				$('.lineDraw .oneMonth').addClass('active');
				that.drawLine( 'wfsy', that.data['qrnhWfsy'].oneMonth );			
			},{
                'htmdEvt': 'optionalPublicDetail_2'
            })
//			交易记录跳转
			mui("body").on('mdClick', '.jyjl', function() {
				window.location.href = site_url.transactionDetailPublic_url + "?fundCode=" + that.data.fundCode + "&tradeNo=" + that.data.publicFundDetail.tradeNo;
			},{
                'htmdEvt': 'optionalPublicDetail_3'
            })
//			分红方式跳转
			mui("body").on('mdClick', '.dividend', function() {
				window.location.href = site_url.bonusMethod_url;
			},{
                'htmdEvt': 'optionalPublicDetail_4'
            })
//			历史明细跳转
			mui("body").on('mdClick', '.historyDetail', function() {
				if(that.data.projectType != "10300"){//非货币基金
					window.location.href = site_url.otherFundHistoryDetail_url + "?fundCode=" + that.data.fundCode;
					
				}else{//货币基金
					window.location.href = site_url.mineHistoryDetail_url + "?fundCode=" + that.data.fundCode;
					
				}
			},{
                'htmdEvt': 'optionalPublicDetail_5'
            })
//			收益明细跳转
			mui("body").on('mdClick', '.symx', function() {
				window.location.href = site_url.returnsDetail_url + "?fundCode=" + that.data.fundCode;
			},{
                'htmdEvt': 'optionalPublicDetail_6'
            })
//			头部详情跳转
			mui("body").on('mdClick', '#customerService', function() {
				window.location.href = site_url.pofPublicDetail_url + "?fundCode=" + that.data.fundCode + "&fundType=" + that.data.projectType;
			},{
                'htmdEvt': 'optionalPublicDetail_7'
            })
			//点击赎回
			mui("body").on('mdClick', '.redeemBtn', function(e) {
				window.location.href = site_url.redemptionBuy_url;			
			},{
                'htmdEvt': 'optionalPublicDetail_8'
            })
			// //点击买入
			mui("body").on('mdClick', '.buyBtn', function(e) {
				window.location.href = site_url.fundTransformIn_url+"?fundCode="+that.data.fundCode;			
			},{
                'htmdEvt': 'optionalPublicDetail_9'
            })
			//点击定投
			mui("body").on('mdClick', '.fiedBtn', function(e) {
				window.location.href = site_url.ordinarySetThrow_url+"?fundCode="+that.data.fundCode;;			
			},{
                'htmdEvt': 'optionalPublicDetail_10'
            })
			
		}


	}

	privateDetail.init();
})