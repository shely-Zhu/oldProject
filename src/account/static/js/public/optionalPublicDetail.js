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

require('@pathCommonJs/components/authenticationProcess.js');
//引入弹出层
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');

// require('@pathCommonJs/components/headBarConfig.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var getCookie = require('@pathNewCommonJsCom/getCookie.js');
var Base64 = require('@pathIncludJs/vendor/base64/base64.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var frozenAccount = require('@pathCommonJs/components/frozenAccount.js');
$(function() {

	var privateDetail = {

		data: {
			publicFundDetail:"",//从列表页带过来的数据
			projectType : "",//基金类型。货币10300、非货币除10300其他
			// fundCode: "",//货币代码
			fundCode:splitUrl["fundCode"],//货币代码
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
			tipsWrap:$("#tips-wrap"),
			realLi: $('#real-condition>li'), // 条件下的五条
			singleaAuthenPath : "", //一键认证跳转链接
			end:"",
			unit:"%",//折线图上是%还是不带%。
			symboltype : 'none',	//echarts 节点样式
			isWealthAccount: '' // 账户状态
		},
		gV:{
			singleaAuthenType:"",  //认证类型  买入into  定投 investement
			isHighAgeStatus:true,  //投资者年龄默认小于60的状态为true  大于就位false
			isWealthAccountStatus:"", //是否开通账户状态
			accountType:null,   //客户类型  0-机构 1-个人
			userStatus:"", // 为空则是新用户   为0普通投资者  为1专业投资者
			investorStatus: '' // 投资者状态
		},

		init: function(){
			var that = this;
			that.setDomDataOne(splitUrl["fundCode"])
			// that.getTypeOneData()
			that.getData()
			//that.getUserInfo();  //获取用户类型
			//that.getUserInfo_1(); //用户身份信息
			that.event()
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
			    	tradeAcco:splitUrl["tradeNo"], 
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
			       	switch(Number(num)) {
			       		case 0: that.data['qrnhWfsy'].oneMonth = newData;break;
			       		case 1: that.data['qrnhWfsy'].threeMonth = newData;break;
			       		case 2: that.data['qrnhWfsy'].sixMonth = newData;break;
			       		case 3: that.data['qrnhWfsy'].oneYear = newData;break;
			       		case 4: that.data['qrnhWfsy'].sinceNow = newData;break;
			       	}
			       	that.drawLine( type, newData);			       	
			    },
			    callbackNoData: function() {
			    	$("#qrnhLine").addClass("hide")
                    $("#wfsyLine").addClass("hide")
                    $(".noDataHintEcharts").removeClass("hide")
			    },
			    callbackFail: function() {
			    	$("#qrnhLine").addClass("hide")
                    $("#wfsyLine").addClass("hide")
                    $(".noDataHintEcharts").removeClass("hide")
			    }
			}];
			$.ajaxLoading(obj);
		},
		//画折线图
		//type必传
		drawLine: function ( type, data) {
			var that = this;
			//判断有多少数据 只有一个值时 symbol 为circle 多组值时 symbol为 none
			if(data.profitThoudDate.length == 1 ){
				that.data.symboltype = 'circle'
			}	
			if( type == 'qrnh'){
				$("#qrnhLine").removeClass("hide")
				$(".noDataHintEcharts").addClass("hide")
				var chartId = $('#qrnhLine')[0],
					xAxisData = data.profitThoudDate;
					if( that.data.projectType != "10300" ){ //非货币基金
//						单位净值
						var seriesData = data.unitNavValue;
					}else{//货币基金
						//画的是七日年化折线图
					    var seriesData = data.sevenIncomeRate;
					}
				var myChart = echarts.init( chartId,{},{width:$(".qrnhLine").width(),height:$(".qrnhLine").height()} );
			} else if( type == 'wfsy'){
				//画的是万份收益折线图
				$("#wfsyLine").removeClass("hide")
				$(".noDataHintEcharts").addClass("hide")
				var chartId = $('#wfsyLine')[0],
					xAxisData = data.profitThoudDate;
					if( that.data.projectType != "10300" ){ //非货币基金
						//累计收益
						var seriesData = data.unitYldValue;
					}else{//货币基金
						//画的是万份受益折线图
					    var seriesData = data.profitThoudValue;
					}
				var myChart = echarts.init( chartId,{},{width:$(".wfsyLine").width(),height:$(".wfsyLine").height()} );
			}
			
			// {width:$(".line_area").width(),height:$(".line_area").height()}
			// var myChart = echarts.init( chartId,{},{width:$(".lineDraw").width(),height:$(".lineDraw").height()} );
			
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
						normal: {
							color: "#061D6A",
						}
			    	},
			    	symbol: that.data.symboltype,
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
        setDomDataOne:function(fundCode){
			var that = this;
            //发送ajax请求
            var obj = [{
                url: site_url.pofAssessList_api,
                data: {
                    tradeAcc:splitUrl["tradeNo"],
                    fundCode: splitUrl["fundCode"]
                },
                callbackDone: function(json) { //成功后执行的函数
				//   console.log(json.data[0])
				   var jsonData = json.data[0]
				   that.data.projectType = jsonData.invTypCom;
				   that.data.isBuyFlag = jsonData.isBuyFlag;//是否可购买(0否1是) int类型
				   that.data.isRedemptionFlag = jsonData.isRedemptionFlag; //是否可赎回(0否1是) int 类型
				   that.data.supportFixedFlag = jsonData.isFixFlag;//是否可定投(0否1是) int 类型
				   // 判断是否可以定投和是否可售，不同展示，不可售的时候定投按钮不展示
				   if(that.data.supportFixedFlag == 1){//支持定投展示定投按钮,1支持定投
						if(!that.data.isBuyFlag){  //不可买入
							$('.footer').eq(0).show()
					   	 	$('.footer').eq(1).hide()
					   	 	$(".buyBtn").addClass("disable").html("暂不可售");
					   	 }else{
					   	 	$('.footer').eq(1).show()
					   	 }
					}else{
						$('.footer').eq(0).show()
						if(!that.data.isBuyFlag){  //不可买入
							$(".buyBtn").addClass("disable").html("暂不可售");
						}
					}


				   	if(!that.data.isRedemptionFlag){//不可赎回
				   		$(".redeemBtn").addClass("disable").html("暂停赎回")
				   }
				   // 以普通基金方式购买持仓后上架成超宝的持仓不可买入，定投以及查看详情
				   if(jsonData.isCash) {
				   	    $(".customerService").css("display", "none")
				   	    $(".buyBtn").addClass("disable")
				   	    $(".fiedBtn").addClass("disable")
				   }
					//项目名称
					$('#HeadBarpathName').html( jsonData.fundName );
					//基金代码
					$('#fundCodeWrap').html( jsonData.fundCode );
					//总金额
					$('.typeWrap .totalM').html( jsonData.totalMoneyMask );
					//待确认金额 接口无
					$('.typeWrap .toConfirm .confirmMoney').html( jsonData.onwayAssetTotalMask );
					//昨日收益
					if(Number(jsonData.income) > 0){
						$('.typeWrap .yesterdayShare').html('+' + jsonData.incomeMask);
					}else{
						$('.typeWrap .yesterdayShare').html(jsonData.incomeMask);
					}
					//持有收益
					if(Number(jsonData.holdIncome) > 0){
						$('.typeWrap .ownShare').html( '+' + jsonData.holdIncomeMask);
					}else{
						$('.typeWrap .ownShare').html(jsonData.holdIncomeMask);
					}
					//累计收益  接口无
					if(Number(jsonData.addupIncome) > 0){
						$('.typeWrap .accumulatedShare').html('+' + jsonData.addupIncomeMask);
					}else{
						$('.typeWrap .accumulatedShare').html( jsonData.addupIncomeMask);
					}
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
					$(".totalM").css({ "background": "linear-gradient(360deg, rgba(186,140,112,1) 0%, rgba(244,210,192,1) 100%)", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent" })
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
					that.getTypeOneData()
                },
                callbackNoData:function(json) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);
		},

		 // 客户预约产品所需条件
		 getConditionsOfOrder: function(type) {
            var that = this;
            var type = type;
            //发送ajax请求
            var obj = [{
                url: site_url.queryCustomerAuthInfo_api,
                data: {
                    fundCode: that.data.fundCode,
                },
                //contentTypeSearch: true,
                //needLogin: true, //需要判断是否登陆
                callbackDone: function(json) { //成功后执行的函数
                    that.data.canClick = true; //变为可点击
                    var jsonData = json.data,
                        notice = "",
                        noticeObj = "",
                        isPopup = "", //弹框售前告知书
                        isRiskPopup = "", //期限不符弹框
                        PopupElasticLayer = "",
                        objElasticLayer = "", // 产品风险等级与个人承受能力匹配弹框
                        isReal = "", //是否实名认证，因为如果机构切一键认证是实名，点击需要提示弹框。
                        singleaAuthenPath = "", //一键认证跳转链接
						singleaAuthen = false; //条件框是否展示
						that.gV.investorStatus = jsonData.investorStatus || ''
						that.data.isWealthAccount = jsonData.isWealthAccount
						if(jsonData.isWealthAccount == "0"&&jsonData.isRiskEndure == "1"&&jsonData.isPerfect == "1"&&jsonData.isInvestFavour=="1"){
							that.data.tipsWrap.hide()
							that.data.realLi.hide();
                            $(".isRiskMatch_mask").show();
							$(".isRiskMatchBox").show();
							if(jsonData.isHighAge=="1"&&that.gV.isHighAgeStatus){
								//年龄校验
								 //that.gV.isHighAgeStatus = false;
								 $(".isRiskMatchBox_match").hide()
								 $(".isRiskMatchBox_noMatch").show()
								 $(".isRiskMatchBox_header").html("您认/申购的基金产品风险等级为成长级/进取级，属中高/高风险产品，投资该产品可能产生较大损失。基于您的年龄情况，我司建议您综合考虑自身的身心承受能力、资金承受能力、风险承受能力及控制能力，审慎选择。")
								 $(".isRiskMatchResult").html("继续购买")
								 $(".isRiskMatchResult").attr("type","isHighAge")
								 return false;
							 }
							 if(jsonData.isZdTaLimit == "1"){
								 //中登校验
								 $(".isRiskMatchBox_match").hide()
								 $(".isRiskMatchBox_noMatch").show()
								 $(".isRiskMatchBox_header").html("检测到您的证件类型无法购买该基金，请选购其他基金")
								 $(".isRiskMatchResult").html("选购其他基金")
								 $(".isRiskMatchResult").attr("type","isZdTaLimit")
								 return false;
							 }
                            if(jsonData.isRiskMatch == "1"){
                                //风险等级匹配
                                $(".isRiskMatchBox_match").show()
								$(".isRiskMatchBox_noMatch").hide()
								// $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                                $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力相匹配")
                            }else if(jsonData.isRiskMatch == "0"){
                                $(".isRiskMatchBox_noMatch").show()
								$(".isRiskMatchBox_match").hide()
								// $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                                $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力不相匹配")
                                $(".isRiskMatchResult").html("查看评测结果")
                                $(".isRiskMatchResult").attr("type","noRisk")
                            }else if(jsonData.isRiskMatch == "2"){
                                $(".isRiskMatchBox_noMatch").show()
								$(".isRiskMatchBox_match").hide()
								// $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                                $(".isRiskMatchBox_header").html("您的风险测评已过期,请重新进行风险测评")
                                $(".isRiskMatchResult").html("重新风测")
                                $(".isRiskMatchResult").attr("type","repeatRisk")
                            }
 
							that.gV.singleaAuthenType = type
							
						}else{
							that.data.tipsWrap.show()
							that.data.realLi.show();
						}
						that.data.singleaAuthenPath = that.getSingleaAuthenPath(jsonData);
						if(jsonData.isWealthAccount=="0"){
							//是否开通财富账户   0开通  非0 没有开通  6
							that.gV.isWealthAccountStatus = true
							that.data.realLi.eq(0).hide()  
						}else{
							that.gV.isWealthAccountStatus = false
							/*if(jsonData.isWealthAccount == "6"){
                                //司法冻结
                                that.gV.tipsWrap.hide()
                                that.gV.realLi.hide(); 
                                $("#tips-wrap").hide()
                                $(".isRiskMatchBox").show();
                                $(".isRiskMatch_mask").show();
                                $(".isRiskMatchBox_match").show()
                                $(".isRiskMatchBox_noMatch").hide()
                                $(".isRiskMatchBox_header").html("因司法原因该账户被冻结，请联系客服咨询，客服电话：400-8980-618")
                            }*/

                            /*if(jsonData.isWealthAccount == "5"){
                                //身份过期
                                that.gV.tipsWrap.hide()
                                that.gV.realLi.hide(); 
                                $("#tips-wrap").hide()
                                $(".isRiskMatchBox").show();
                                $(".isRiskMatch_mask").show();
                                $(".isRiskMatchBox_match").hide()
                                $(".isRiskMatchBox_noMatch").show()
                                $(".isRiskMatchBox_cancel").html("取消")
                                $(".isRiskMatchResult").html("完善资料")
                                $(".isRiskMatchResult").attr("type","overdue")
                                $(".isRiskMatchBox_header").html("您的证件已过期，补充证件信息后才可以继续交易")
                            }*/
							that.data.realLi.eq(0).show()
                        }
						if(jsonData.isRiskEndure=="0"||jsonData.isRiskEndure == null){
							//是否风测
							that.data.realLi.eq(1).show()  
						}else{
							that.data.realLi.eq(1).hide()
						}
						if(jsonData.isPerfect=="0" ||jsonData.isPerfect== null){
							//是否完善资料  isWealthAccount 用户过期
							that.data.realLi.eq(2).show()  
						}else{
							that.data.realLi.eq(2).hide()
						}
						if(jsonData.isInvestFavour=="0" || jsonData.isInvestFavour == null){
							//先判断是否进行投资者分类，没有则显示未认证，如果是再判断投资者状态
							that.data.realLi.eq(3).show() 
							if(jsonData.investorStatus =="0"&&that.gV.userStatus=="") {
								that.data.realLi.eq(3).find(".bank-status").html("未审核")
							}
						}else{
							that.data.realLi.eq(3).hide()
                        }
						that.data.realLi.eq(4).hide() 
						/*if(jsonData.isInvestFavour=="0" || jsonData.isInvestFavour == null){
							//是否投资者分类
							that.data.realLi.eq(3).show()  
						}else{
							that.data.realLi.eq(3).hide()
                        }
						if(jsonData.isRiskMatch=="0" || jsonData.isRiskMatch == null){
							//是否风险等级
							that.data.realLi.eq(4).show()  
						}else{
							that.data.realLi.eq(4).hide()
						}
						if( that.gV.investorStatus=="0"&&that.gV.userStatus==""){
                            //直接申请为专业投资者
                            that.gV.tipsWrap.show()
                            that.gV.realLi.show();
                            that.gV.realLi.eq(3).show()
                        }
						that.data.realLi.eq(4).hide()*/ 

                },
                callbackFail: function(json) { //失败后执行的函数
                   tipAction(json.message);
					that.data.canClick = true; //变为可点击

                },
                callbackNoData:function(json) {
					tipAction(json.message);
					that.data.canClick = true; //变为可点击
                }
            }];
            $.ajaxLoading(obj);
		},
		getJumpUrl: function(v) { //获取跳转链接
            var jumpUrl = ""; //跳转链接
            if(v==0){
				//开通财富
				jumpUrl = site_url.realName_url
			}else if(v == 1){
				//风险评测
				jumpUrl = site_url.riskAppraisal_url + "?type=asset"
			}else if(v == 2){
				//完善基本信息
				jumpUrl = site_url.completeInformation_url
			}else if(v == 3){
				//投资者分类
				jumpUrl = site_url.investorClassification_url
			}else if(v == 4){
				//合格投资者认证
				jumpUrl = site_url.chooseQualifiedInvestor_url
			}
            return jumpUrl;
        },
		getData:function(){
			var that = this;
			var obj = [{
				url:site_url.newfundDetails_api,
				data:{
					fundCode:that.data.fundCode
				},
				callbackDone:function(json){
                    
				},
				callbackFail: function(json) { //失败后执行的函数
					tipAction(json.message);
					 that.data.canClick = true; //变为可点击
 
				 },
				 callbackNoData:function(json) {
					 tipAction(json.message);
					 that.data.canClick = true; //变为可点击
				 }

			}];
			$.ajaxLoading(obj);
		},
		getSingleaAuthenPath:function(data){
			var that = this;
			var singleaAuthenPath="";
			if(data.isWealthAccount != "0"){
			  return singleaAuthenPath = "isWealthAccount"
			}else if(data.isRiskEndure !="1"){
			 return singleaAuthenPath = "isRiskEndure"
			}else if(data.isPerfect != "1"){
			 return  singleaAuthenPath = "isPerfect"
			}else if(data.isInvestFavour != "1"){
			 return  singleaAuthenPath = 'isInvestFavour'
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
					that.drawLine( 'qrnh', that.data['qrnhWfsy'].oneMonth );	
				}
				else{
					that.data.unit = "";//万份受益没有百分号
					$('#wfsyLine').removeClass('hide');
					$('#qrnhLine').addClass('hide');
					that.drawLine( 'wfsy', that.data['qrnhWfsy'].oneMonth );	
				}
				$('.lineDraw .time').removeClass('active');
				$('.lineDraw .oneMonth').addClass('active');
				// that.drawLine( 'wfsy', that.data['qrnhWfsy'].oneMonth );			
			},{
                'htmdEvt': 'optionalPublicDetail_2'
            })
//			交易记录跳转
			mui("body").on('mdClick', '.jyjl', function() {
				window.location.href = site_url.transactionDetailPublic_url + "?fundCode=" + that.data.fundCode + "&tradeNo=" + splitUrl["tradeNo"];
			},{
                'htmdEvt': 'optionalPublicDetail_3'
            })
//			分红方式跳转
			mui("body").on('mdClick', '.dividend', function() {
				window.location.href = site_url.bonusMethod_url + "?tradeNo=" + splitUrl['tradeNo'] + '&fundCode=' + that.data.fundCode;
			},{
                'htmdEvt': 'optionalPublicDetail_4'
            })
//			历史明细跳转
			mui("body").on('mdClick', '.historyDetail', function() {
				if(that.data.projectType != "10300"){//非货币基金
					window.location.href = site_url.otherFundHistoryDetail_url + "?fundCode=" + that.data.fundCode+"&fundType=0";
					
				}else{//货币基金
					window.location.href = site_url.mineHistoryDetail_url + "?fundCode=" + that.data.fundCode+"&fundType=1";
					
				}
			},{
                'htmdEvt': 'optionalPublicDetail_5'
			})
			
               //风测等级匹配成功
			mui("body").on('mdClick',".isRiskMatchBox_match",function(){
				var type = that.gV.singleaAuthenType;
				$(".isRiskMatch_mask").hide();
				$(".isRiskMatchBox").hide();
				/*if(!that.gV.isWealthAccountStatus||that.gV.accountType == 0|| that.gV.accountType == 2){
					//未开通账户
					return false
				}*/
				// 机构可以买入，但不可定投
				if(type == "into"){
					//买入一键认证
					window.location.href = site_url.fundTransformIn_url+"?fundCode="+that.data.fundCode+"&noReload=1";
			   }else if(type == "investement"){
					//定投一键认证
					window.location.href = site_url.ordinarySetThrow_url+"?fundCode="+that.data.fundCode+'&type=add';
			   }
			},{
				'htmdEvt': 'optionalPublicDetail_11'
			})

			//风险等级匹配失败
			mui("body").on("mdClick",".isRiskMatchBox_cancel",function(){
				$(".isRiskMatch_mask").hide();
				$(".isRiskMatchBox").hide();
			  // that.gV.isRiskMatchBox.hide();
			},{
				'htmdEvt': 'optionalPublicDetail_12'
			})

			//风险等级匹配失败结果跳转
			mui("body").on("mdClick",".isRiskMatchResult",function(){
				$(".isRiskMatch_mask").hide();
				$(".isRiskMatchBox").hide();
				var type = $(this).attr("type");
                if(type == "noRisk"){
                    //未风测
                    window.location.href = site_url.riskAppraisal_url + "?type=private"
                }else if(type == "repeatRisk"){
                    //风测过期
                    window.location.href = site_url.riskAppraisal_url + "?type=private"
                }else if(type == "isHighAge"){
                    that.gV.isHighAgeStatus = false;
                    that.getConditionsOfOrder(that.gV.singleaAuthenType)
                }else if(type == "isZdTaLimit"){
                     //跳理财首页
                    window.location.href = site_url.wealthIndex_url
                }else if(type = "overdue"){
                    //身份证过期
                    window.location.href = site_url.completeInformation_url
                }
			},{
				'htmdEvt': 'optionalPublicDetail_13'
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
			   	if(!that.data.isRedemptionFlag){//不可赎回
			   		return false;
				}
			    var result = frozenAccount("saleFreeze", window.location.href, false,'optionalPublicDetail_16');
				if( !result ) {
					//that.getConditionsOfOrder("redemption");
					//that.gV.singleaAuthenType = "redemption"
					window.location.href = site_url.redemptionBuy_url + "?tradeNo=" + splitUrl['tradeNo'] + "&fundCode=" + that.data.fundCode				
				};
			},{
                'htmdEvt': 'optionalPublicDetail_8'
            })
			// //点击买入
			mui("body").on('mdClick', '.buyBtn', function(e) {
				/*that.getUserInfo_1();
				that.getUserInfo();*/
				if(!that.data.isBuyFlag){//不可买入
			   	 	return false;
			    }
				var result = frozenAccount("buyFreeze", window.location.href, false,'optionalPublicDetail_17');
				if(!result) {
					var obj = [{
		                url: site_url.queryUserAuthInfo_api,
		                data: {
		                },
		                callbackDone: function (json) {
		                    var data = json.data
		                    that.gV.accountType = data.accountType
		                    that.gV.userStatus = data.investFavour
		                    // 获取用户各审核情况，共5条
		        			that.getConditionsOfOrder("into");
							that.gV.singleaAuthenType = "into"
		                },
		                callbackNoData:function(json){
							tipAction(json.message);
						},
		            }]
		            $.ajaxLoading(obj);
				}
			//	window.location.href = site_url.fundTransformIn_url+"?fundCode="+that.data.fundCode;			
			},{
                'htmdEvt': 'optionalPublicDetail_9'
			})
			     //认证
			mui("body").on('mdClick', ".tips-li .tips-li-right", function (e) {
				var type = $(this).parent().index()
				switch (type) {
					case 0:   //开通账户
					if(that.gV.accountType == 0|| that.gV.accountType == 2){
						//机构
						$("#tips-wrap").hide()
						$(".isRiskMatchBox").show();
						$(".isRiskMatch_mask").show();
						$(".isRiskMatchBox_match").show()
						$(".isRiskMatchBox_noMatch").hide()
						$(".isRiskMatchBox_header").html("请联系您的理财师或者拨打客服电话 400-8980-618 进行线下开户")
					}else{
						// 个人 根据账户的不同状态跳转到相对应的页面 
						switch(String(that.data.isWealthAccount)) {
							// 身份证上传
							case '1': window.location.href = site_url.realName_url;break;
							// 人脸识别
							case '2': window.location.href = site_url.realFaceCheck_url;break;
							// 3a 进线下申请状态-视频双录
							case '3a': window.location.href = site_url.realVideoTranscribe_url + '?type=default';break;
							// 3b 进线下申请状态-影像采集
							case '3b': window.location.href = site_url.realOffline_url;break;
							// 4 视频双录
							case '4': window.location.href = site_url.realVideoTranscribe_url + '?type=default';break;
						}
					}
					break;

					case 1:   //私募风险评测  type=private type=asset 资管风测
						window.location.href = site_url.riskAppraisal_url + "?type=private"
						break;

					case 2:   //完善基本信息
					if(that.gV.accountType == 0|| that.gV.accountType == 2){
						//机构
						$("#tips-wrap").hide()
						$(".isRiskMatchBox").show();
						$(".isRiskMatch_mask").show();
						$(".isRiskMatchBox_match").show()
						$(".isRiskMatchBox_noMatch").hide()
						$(".isRiskMatchBox_header").html("机构客户如需调整基本信息请联系您的理财师")
					}else{
						//个人
						window.location.href = site_url.completeInformation_url

					}
					break;

					case 3:  //投资者分类
					if(that.gV.isWealthAccountStatus){
						//开通了账户
						if(that.gV.investorStatus =="0"&&that.gV.userStatus==""){
							//申请为投资者
							window.location.href = site_url.investorClassificationResult_url
						}else{
							window.location.href = site_url.investorClassification_url
						}
					}else{
						$("#tips-wrap").hide()
						$(".isRiskMatchBox").show();
						$(".isRiskMatch_mask").show();
						$(".isRiskMatchBox_match").show()
						$(".isRiskMatchBox_noMatch").hide()
						$(".isRiskMatchBox_header").html("您尚未进行身份认证,认证完成后才可进行投资者分类认证")
					}
					
					break;
					case 4:  //合格投资者认证
						window.location.href = site_url.chooseQualifiedInvestor_url
						break;

					default:
						break;
				}
			},{
				'htmdEvt': 'optionalPublicDetail_14'
			});
				//一键认证
			mui("body").on('mdClick', ".tips .tips-btn", function (e) {
				var key = that.data.singleaAuthenPath;
				switch (key) {
					case "isWealthAccount":   //开通账户
					if(that.gV.accountType == 0|| that.gV.accountType == 2){
                        //机构
                        $("#tips-wrap").hide()
                        $(".isRiskMatchBox").show();
                        $(".isRiskMatch_mask").show();
                        $(".isRiskMatchBox_match").show()
                        $(".isRiskMatchBox_noMatch").hide()
                        $(".isRiskMatchBox_header").html("请联系您的理财师或者拨打客服电话 400-8980-618 进行线下开户")
                    }else{
                        // 个人 根据账户的不同状态跳转到相对应的页面 
						switch(String(that.data.isWealthAccount)) {
							// 身份证上传
							case '1': window.location.href = site_url.realName_url;break;
							// 人脸识别
							case '2': window.location.href = site_url.realFaceCheck_url;break;
							// 3a 进线下申请状态-视频双录
							case '3a': window.location.href = site_url.realVideoTranscribe_url + '?type=default';break;
							// 3b 进线下申请状态-影像采集
							case '3b': window.location.href = site_url.realOffline_url;break;
							// 4 视频双录
							case '4': window.location.href = site_url.realVideoTranscribe_url + '?type=default';break;
						}
                    }
                    break;

					case "isRiskEndure":   //风险评测
						window.location.href = site_url.riskAppraisal_url + "?type=private"
						break;

					case "isPerfect":   //完善基本信息
					if(that.gV.accountType == 0|| that.gV.accountType == 2){
                        //机构
                        $("#tips-wrap").hide()
                        $(".isRiskMatchBox").show();
                        $(".isRiskMatch_mask").show();
                        $(".isRiskMatchBox_match").show()
                        $(".isRiskMatchBox_noMatch").hide()
                        $(".isRiskMatchBox_header").html("机构客户如需调整基本信息请联系您的理财师")
                    }else{
                        //个人
                        window.location.href = site_url.completeInformation_url

                    }
                    break;

					case "isInvestFavour":  //投资者分类
					if(that.gV.isWealthAccountStatus){
                        //开通了账户
                        if(that.gV.investorStatus =="0"&&that.gV.userStatus==""){
							//申请为投资者
							window.location.href = site_url.investorClassificationResult_url
						}else{
							window.location.href = site_url.investorClassification_url
						}
                    }else{
                        $("#tips-wrap").hide()
                        $(".isRiskMatchBox").show();
                        $(".isRiskMatch_mask").show();
                        $(".isRiskMatchBox_match").show();
                        $(".isRiskMatchBox_noMatch").hide();
                        $(".isRiskMatchBox_header").html("您尚未进行身份认证,认证完成后才可进行投资者分类认证");
                    }
                    
                    break;
					case "isRiskMatch":  //合格投资者认证
						window.location.href = site_url.chooseQualifiedInvestor_url
						break;

					default:
						break;
				}
			},{
				'htmdEvt': 'optionalPublicDetail_15'
			});
			//点击定投
			mui("body").on('mdClick', '.fiedBtn', function(e) {
				/*that.getUserInfo();
				that.getUserInfo_1();*/
				var result = frozenAccount("buyFreeze", window.location.href, false,'optionalPublicDetail_18');
				if(!result) {
					var obj = [{
		                url: site_url.queryUserAuthInfo_api,
		                data: {
		                },
		                callbackDone: function (json) {
		                    var data = json.data
		                    that.gV.accountType = data.accountType
		                    that.gV.userStatus = data.investFavour
		                    // 机构不可定投
		                    if(that.gV.accountType == 1) {
		                    	// 获取用户各审核情况，共5条
			        			that.getConditionsOfOrder("investement");
								that.gV.singleaAuthenType = "investement";
		                    } else {
		                    	$.elasticLayer({
						            id: "tip",
						            title: '提示',
						            p: '<p>暂不支持机构客户进行交易</p>',
						            zIndex: 100,
						            hideCelButton: true,
						            yesTxt: '明白了'
						        });
		                    }
		                },
		                callbackNoData:function(json){
							tipAction(json.message);
						},
		            }]
		            $.ajaxLoading(obj);
				}
				//window.location.href = site_url.ordinarySetThrow_url+"?fundCode="+that.data.fundCode;;			
			},{
                'htmdEvt': 'optionalPublicDetail_10'
            });
			
		}


	}

	privateDetail.init();
})