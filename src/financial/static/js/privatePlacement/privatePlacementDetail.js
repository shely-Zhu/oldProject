//  私募基金产品详情
//  @author zhangyanping 2019-11-25

require('@pathIncludJs/base.js');

// require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonJsCom/headBarConfig.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
// var tipAction = require('@pathCommonJs/components/tipAction.js');

$(function(){
	var  privatePlacementDetail = {
		//获取页面元素
		$e:{
			projectId:splitUrl['projectId'],
		},
		getElements : {
			accountName : $('#accountName'),  //公共账户名称
			name        : $('#name'),  //公募账户名
			number      : $('#number'),  //账号
			linenum     : $('#linenum'), //行号
			openingBank : $("#openingBank"),  //开户行
			topc      : $('#topc'),       //提示信息
		},
		data:{
			historicalPerformance: {
				oneMonth : {},
				threeMonth: {},
				halfYear:{},
				oneYear: {},
				sinceNow: {}
			},
		},
		//页面初始化函数
		init:function(){

			var that = this;

			that.getData();
			// 折线图
			that.getTypeOneData();
			// 募集账户信息
			that.collectAccount();
			that.events();
		},
		getData:function(){
			var that = this;
			// 获取私募产品基本信息
			var obj = [{
				url: site_url.queryFundDetailV2_api, 
				data: {
					projectId: that.$e.projectId,
				},
				contentTypeSearch: true,
				needLogin: true,
				callbackDone: function(json) {
					var jsonData = json.data;
					var projectLableHtml,projectLableHtmlList;
					// 私募产品 产品名称
					$('.productName').html(jsonData.productName);
					// 一句话产品详情
					$('.introduction').html(jsonData.productLightspot);
					// 单位净值
					$('.netValue').html(jsonData.unitNetValue);
					// 净值日期
					$('.netValueDate').html(jsonData.netValueDate)
					// 起投金额
					$('.investmentAmountNum').html(jsonData.investStart);
					// 产品期限
					$('.productDeadlineNum').html(jsonData.projectTerm + jsonData.projectTermUnit);
					// 预约资质
					$('.appointment span').html(jsonData.orderConditionEnum);
					// 产品特点标签
					var projectLable = jsonData.projectLable.split('|');
					for ( var i in projectLable ){
						projectLableHtml = '<span>'+ projectLable[i] +'</span>'
						$('.productLabel').append(projectLableHtml)
					}

					// 基本信息
					// 剩余额度
					$('.remaining').html();
					// 募集起截止日
					$('.deadline').html(jsonData.projectUpTime + '~' + jsonData.projectDownTime)
					// 管理人
					$('.custodian').html(jsonData.projectIssuer);
					// 风险等级
					$('.riskGrade').html(jsonData.productRiskLevel);
					// 发行规模
					$('.issuingScale').html(jsonData.formatIssuanceSize);
					// 投资方向
					$('.direction').html(jsonData.investDirect);
					// 投资领域
					$('.investmentArea').html();
					// 投资方式
					$('.investmentWay').html();
					// 收益分配方式
					$('.incomeType').html(jsonData.incomeModeDesc);


					// 交易须知  
					// 认购费率
					$('.productRateBuy span').html(jsonData.buyRate);
					// 管理费率
					$('.productRateManage span').html(jsonData.managementFee);
					// 托管费率
					$('.productRateTrust span').html(jsonData.trusteeFee);
					// 预约递增金额
					$('.advanceAmount').html(jsonData.minBase);
					// 预约有效天数
					$('.reservationDay').html(jsonData.reserveTime);
					// 打款截止日期
					$('.paymentDeadline').html();
					// 预计成立日期
					$('.establishment').html();
					// 是否需要面签
					$('.isVideo').html(jsonData.isVideo);
					// 允许购买客户类型
					$('.clientType').html();
					// 允许购买客户等级
					$('.clientLevel').html(jsonData.customerRiskLevelDesc);
					// 汇款备注
					$('.remittance').html();
					// 赎回开放频率
					$('.redemptionOpenFrequency').html(jsonData.redemptionOpenFrequency);

					// 立即预约上的认购申购费率
					$('.buyRate span').html(jsonData.buyRate)
				},
			}];
			$.ajaxLoading(obj);

		},
		//请求历史业绩走势
		getTypeOneData: function( num ){
			var that = this;
			num = num ? num : 0;
			var newData = {
				sevenIncomeRate: [], //存放折线图历史业绩净值
				profitThoudDate: [], //存放折线图净值日期
			}
			var days;
			if(num == 0){
				// 月
				days = 30;
			}
			else if(num == 1){
				// 季
				days = 90;
			}
			else if(num == 2){
				// 半年
				days = 180;
			}
			else if(num == 3){
				// 一年
				days = 365;
			}
			else if(num == 4){
				// 成立至今
				days = '';
			}
			
			//判断是否已经有数据了，有的话不再请求接口
			if( num == 0 && that.data['historicalPerformance'].oneMonth.profitThoudDate && that.data['historicalPerformance'].oneMonth.profitThoudDate.length){
				//请求的是近一个月的数据
				that.drawLine( that.data['historicalPerformance'].oneMonth );
				return false;
			}
			else if( num == 1 && that.data['historicalPerformance'].threeMonth.profitThoudDate && that.data['historicalPerformance'].threeMonth.profitThoudDate.length){
				//近三个月
				that.drawLine( that.data['historicalPerformance'].threeMonth );
				return false;
			}
			else if( num == 2 && that.data['historicalPerformance'].halfYear.profitThoudDate && that.data['historicalPerformance'].halfYear.profitThoudDate.length){
				// 半年
				that.drawLine( that.data['historicalPerformance'].halfYear );
				return false;
			}
			else if( num == 3 && that.data['historicalPerformance'].oneYear.profitThoudDate && that.data['historicalPerformance'].oneYear.profitThoudDate.length ){
				//近一年
				that.drawLine( that.data['historicalPerformance'].oneYear );
				return false;
			}
			else if( num == 4 && that.data['historicalPerformance'].sinceNow.profitThoudDate && that.data['historicalPerformance'].sinceNow.profitThoudDate.length){
				//成立至今
				that.drawLine( that.data['historicalPerformance'].sinceNow );
				return false;
			}
			//没有数据，请求接口
			var obj = [{
				url: site_url.prvHisValue_api, 
				data: {
					projectId: splitUrl['projectId'],
					days: days,
					pageNo:'',
					pageSize:'',
				},
				contentTypeSearch: true,
				needLogin: true,
				callbackDone: function(json) {
					var jsonData = json.data;
					$(".priceLimit span").html()

					//拼数据
					$.each( jsonData.pageList, function(i, el){
						newData.sevenIncomeRate.push( el.unitNetValue);
						newData.profitThoudDate.push( el.netValueDate);
					})
					if( num == 0){
						//请求的是近一个月的数据
						that.data['historicalPerformance'].oneMonth = newData ;
					}
					else if( num == 1){
						//近三个月
						that.data['historicalPerformance'].threeMonth = newData ;
					}
					else if( num == 2){
						//近半年
						that.data['historicalPerformance'].halfYear = newData ;
					}
					else if( num == 3){
						//近一年
						that.data['historicalPerformance'].oneYear = newData ;
					}
					else if( num == 4){
						//成立至今
						that.data['historicalPerformance'].sinceNow = newData ;
					}
					that.drawLine(newData);			       	
				},
			}];
			$.ajaxLoading(obj);
		},
		//画折线图
		//type必传
		drawLine: function ( data) {
			var that = this;
			console.log($('#qrnhLine')[0])

			$("#qrnhLine").removeClass("hide");
			$(".noDataHintEcharts").addClass("hide");
			var chartId = $('#qrnhLine')[0],
				xAxisData = data.profitThoudDate,
				seriesData = data.sevenIncomeRate;

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
		// 募集账户信息
		collectAccount:function(){
			var that = this;

			//发送ajax请求
	        var obj = [{
	            url: site_url.getRaiseInfo_api,
	            data: {},
	            contentTypeSearch: true,
	            needLogin:true,//需要判断是否登陆
	            callbackDone: function(json){  //成功后执行的函数
					
	                $('#name').html(json.data.accountName);
	                $('#number').html(json.data.account);
	                $('#linenum').html(json.data.bankName);
	                $('#openingBank').html(json.data.branchBankName);

					$('#topc').html(json.data.remarks);


	            },
	            callbackFail: function(json){  //失败后执行的函数
					tipAction(json.msg);

	            }
	        }];
	        $.ajaxLoading(obj);

		},
		events: function(){
			var that = this;
			//tab点击切换
			mui("body").on('tap', '.tabs>li' , function(){
				$(this).addClass('active').siblings().removeClass('active');
				$(".wrap>.panel").eq($(this).index()).addClass('active').siblings().removeClass('active');
			});
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
            // 募集账户的信息的拷贝
            mui("body").on('tap', '.copy_btn', function() {
				var $this = $(this);
				var copyText = $this.siblings('div').text()
			    //实例化clipboard
				var clipboard = new Clipboard('.copy_btn', {
					text: function () {
						return copyText;
					}
				});
				clipboard.on("success", function (e) {
					//text = '';
					tipAction("复制成功");
				});
				clipboard.on("error", function (e) {
					tipAction("请选择“拷贝”进行复制!");
				});

			});
		},
	};
	privatePlacementDetail.init();
});
