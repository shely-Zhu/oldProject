/**
* 月度报告详情页我
* @author zhangyanping 2019-11-19
*/
require('@pathCommonBase/base.js');

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonJsCom/tabScroll.js');
var splitUrl = require('@pathCommonJsCom/splitUrl.js')();
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');
var moment = require('moment');
//引入弹出层
require('@pathCommonJsCom/elasticLayerTypeFive.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var Base64 = require('@pathIncludJs/vendor/base64/base64.js');


var monthReportDetail = {
	getElements: {
		noData: $('.noData'), //没有数据的结构
		reportId:splitUrl['reportId'],   //活动的id
		adjustmentTemp: $('#second-template'), // 最新调仓模板
	},
	pieChartData:'', // 画图的title
	init: function(){  //初始化函数
		var that = this;
		that.getData();
		// 交易明细
		that.commonAjax();
		// 资产情况分析
		that.assetAnalysis();
		//事件监听
		that.events();
	},
	getData: function($id, t) {

		var that = this;

		var obj = [{    // 获取客户的姓名和编号
			url: site_url.user_api,
			data: {
				hmac:"", //预留的加密信息   非必填项
				params:{//请求的参数信息

				}
			},
			needLogin:true,//需要判断是否登陆
			needLoading:true,
			callbackDone:function(data){
				var json=data.data;
				// 客户名称
				$('.clientName').html(json.name);
				// 客户编号
				$('.monthReportNum').html(json.customerNo);
				// 客户登记
				$('.clientLevelDesc').html(json.tierDesc);
			},
			callbackNoData: function(json){ //没有数据的情况
				console.log(json.msg);
			}
		},{
			url: site_url.queryInvestReportDetail_api,   // 报告分析（报告明细）  获取报告的相关信息
			data: {
				reportId: that.getElements.reportId
			},
			needLogin: true,
			needDataEmpty: true,
			async: false,
			callbackDone: function(json) {
				var json=json.data;
				// 报告月份
				that.getElements.monthReportTime = json.month;
				$('.reportMonth').html(json.month);
				
				// 生命周期
				$('.lifeTerm').html(json.lifeTerm);
				// 风险等级
				$('.riskLevel').html(json.riskLevel);
				// 报告日期
				$('.reportTime').html(json.reportTime);

				// 报告名称
				$('#HeadBarpathName').html(json.reportName)
				that.getElements.reportTime = json.reportTime;

				var dateStr = json.reportTime;
					dateStr = dateStr.replace(/年/g,"-");
					dateStr = dateStr.replace(/月/g,"-");
					dateStr = dateStr.replace(/日/g,"");
				var now=moment(dateStr).format('YYYY-MM-DD');

				var year = now.substring(0,4);
				var month = now.substring(5,7);
				that.getElements.month = month;
				that.getMonthDateRange(year,month);

			},
			callbackFail: function(json) {
				//请求失败，
				//显示错误提示
				tipAction(json.message);
			},
			
		},{
			url: site_url.queryInvestProdHoldShareList_api,   // 持仓总览  报告的月末持仓总览
			data: {
				reportId: that.getElements.reportId
			},
			needLogin: true,
			needDataEmpty: true,
			async: false,
			callbackDone: function(json) {
				var jsonData = json.data;
				if($.util.objIsEmpty(jsonData.pefSaleList) && $.util.objIsEmpty(jsonData.generalModelList) && $.util.objIsEmpty(jsonData.pofList)){
					//没有数据
					$('.holdNodata').show();
					$('.holdNodata .text').html('截止'+that.getElements.reportTime+',您暂无持仓信息');
				}else{
					var pefSaleList = jsonData.pefSaleList;
					jsonData.holdPosition = true;

					if(!$.util.objIsEmpty(pefSaleList)){
						jsonData.flag1 = true;  // 展示月末持仓私募基金的标识
						jsonData.flag2 = false;  // 展示月末持仓公募基金的标识
						jsonData.flag3 = false;  // 展示月末持仓其他基金的标识

						// 私募数据展示的规则
						// 看业绩比较基准和净值哪个有值：
						// （1）若业绩比较基准有值，且没有净值，显示产品名称、持有资产、        业绩比较基准；
						// （2）若有净值，且业绩比较基准没值，  显示产品名称、持有资产、持有份额、            参考净值；
						// （3）若业绩比较基准和净值均没有，  则显示产品名称、持有资产、持有份额；
						// （4）若业绩比较基准和净值均有，    则显示产品名称、持有资产、持有份额、业绩比较基准、参考净值。

						$.each(pefSaleList, function(i,el){
							pefSaleList[i].pefSaleFlag1 = true;
							pefSaleList[i].pefSaleFlag2 = true;
							pefSaleList[i].pefSaleFlag3 = true;

							if(!!el.investPerformanceComparison){  // 业绩比较基准有值时
								if(!el.netValue){  // 净值没有数据时
									pefSaleList[i].pefSaleFlag1 = false;
									pefSaleList[i].pefSaleFlag3 = false;
								}

							}else{   // 业绩比较基准没有值时
								if(!el.netValue){  // 净值没有数据时
									pefSaleList[i].pefSaleFlag2 = false;
									pefSaleList[i].pefSaleFlag3 = false;
								}
								else{   // 净值有数据时
									pefSaleList[i].pefSaleFlag2 = false;
								}
							}

						})

						generateTemplate(jsonData,$(".holdPosition"), that.getElements.adjustmentTemp);

					}
					if(!$.util.objIsEmpty(jsonData.pofList)){
						jsonData.flag2 = true;
						jsonData.flag1 = false;
						jsonData.flag3 = false;
						generateTemplate(jsonData,$(".holdPosition"), that.getElements.adjustmentTemp);
					}
					if(!$.util.objIsEmpty(jsonData.generalModelList)){
						jsonData.flag3 = true;
						jsonData.flag1 = false;
						jsonData.flag2 = false;

						generateTemplate(jsonData,$(".holdPosition"), that.getElements.adjustmentTemp);
					}
					

				}

			},
			callbackFail: function(json) {
				//请求失败，
				//显示错误提示
				tipAction(json.message);
			},
			callbackNoData: function(json) {
				//没有数据
				$('.holdNodata').show();
				$('.holdNodata .text').html('截止'+that.getElements.reportTime+',您暂无持仓信息');

			}

		}]
		$.ajaxLoading(obj);
	},
	commonAjax: function(){  //交易明细
		var that = this;
		//获取产品列表
		var obj = [{
			url: site_url.queryInvestTradeDetail_api,
			data:{
				reportId: that.getElements.reportId
			} ,
			needLogin: true,
			needDataEmpty: true, 
			async: false, 
			callbackDone: function(json){
				var jsonData = json.data;
				if(jsonData.pefSaleInfoList.length == 0 && jsonData.pofInfoList.length == 0){
					//没有数据
					$('.tradeNoData').show();
					$('.tradeNoData .text').html('截止'+that.getElements.reportTime+',您暂无持仓信息');
				}
				else{
					jsonData.tradeDtail = true;

					if(!$.util.objIsEmpty(jsonData.pefSaleInfoList)){
						jsonData.flag1 = true;
						jsonData.flag2 = false;
						generateTemplate(jsonData,$(".tradeDtail"), that.getElements.adjustmentTemp);
						
					}
					if(!$.util.objIsEmpty(jsonData.pofInfoList)){
						jsonData.flag2 = true;
						jsonData.flag1 = false;
						generateTemplate(jsonData,$(".tradeDtail"), that.getElements.adjustmentTemp);
					}
					
				}

			},
			callbackFail: function(json){
				//请求失败，
				//显示错误提示
				tipAction( json.message );

			},
			callbackNoData: function(json){
				//没有数据
				$('.tradeNoData').show();
				$('.tradeNoData .text').html('您'+that.getElements.reportTime+'无交易明细');
			}

		}]
		$.ajaxLoading(obj);
	},

	assetAnalysis: function(){
		var that = this;

		//当前资产配置比数组
		that.monthHoldShareList = [];
		//建议资产配置比数组
		that.recommendList = [];
		that.pieChartData = [];
		that.pieChartDataDetail = [];
		
		//当前资产配置比列表
		var obj = [{
			url: site_url.queryInvestAssetAnalyse_api,
			data: {
				reportId: that.getElements.reportId, //报告id
			},
			needLogin:true, 
			needDataEmpty: false,
			async:false,//同步，newcomer字段在产品详情的结构会用于其他逻辑判断
			callbackDone: function(json){
				//判断是否已实名认证
				var data = json.data;
				// var assetPerHtml;

				var lastMonth = Number(that.getElements.month)-1;

				if ( data.monthHoldShareList.length) {
					//有数据
					that.monthHoldShareList = data.monthHoldShareList;

					$.each(data.monthHoldShareList,function(i,el){
						that.pieChartData[i] = el.assetTypeDesc;

						if(el.assetType == '203'){
							el.colorStart = '#182F7A';
							el.colorStop = '#7286C1';
						}
						else if(el.assetType == '205'){
							el.colorStart = '#FBE2BD';
							el.colorStop = '#D69549';
						}
						else if(el.assetType == '204'){
							el.colorStart = '#AA6545';
							el.colorStop = '#EDA377';
						}
						else if(el.assetType == '200'){
							el.colorStart = '#D8D8D8';
							el.colorStop = '#D8D8D8';
						}


						var dataDetail = {value:el.confirmValuePercent, name:el.assetTypeDesc,itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 1, 1,
									[
										{offset: 0, color: el.colorStart},
										{offset: 1, color: el.colorStop}
									]
								)
							}
						}}

						that.pieChartDataDetail.push(dataDetail) ;


					})

					//调用画图方法
					that.bingtu(0);
					that.typeCompare();

				}
				// 资产情况分析
				if(!$.util.objIsEmpty(data)){
					var result = data.monthHoldShareList;

					if(data.monthHoldShareList.length !=0){
						var assetPerHtmlArr = [];
						$.each(result,function(i,el){
							el.confirmValuePercentNum = $.util.multiplying(el.confirmValuePercent,100);
							var assetPerHtml = el.assetTypeDesc + '占比' + el.confirmValuePercentNum + '%'; 
							assetPerHtmlArr.push(assetPerHtml);
						})
						that.getElements.assetPerHtml = assetPerHtmlArr.join('，');
					}
					
					// 对null做转换,转为''
					if($.util.isNull(data.currentMonthTotalValue)){
						data.currentMonthTotalValue = '';
					}

					if($.util.isNull(data.lastMonthTotalHoldValue)){
						data.lastMonthTotalHoldValue = '';
					}

					if(data.currentMonthTotalValue != '' && data.lastMonthTotalHoldValue != ''){
						var diff,diffHtml;
						
						if(Number(data.currentMonthTotalValue) < Number(data.lastMonthTotalHoldValue)){
							diff = $.util.numberSub( Number(data.lastMonthTotalHoldValue), Number(data.currentMonthTotalValue));
							diffHtml = '减少' + diff;
						}else{
							diff = $.util.numberSub( Number(data.currentMonthTotalValue), Number(data.lastMonthTotalHoldValue));
							diffHtml = '增加' + diff;
						}

						var noPosition = '<p class="tipPosition">您在<span class="monthReportTime">'+ that.getElements.monthReportTime +'</span>，投资的 <span class="property">'+ that.getElements.assetPerHtml +'</span>。</p>'+
									'<p class="tipCompare">截止'+ that.getElements.reportTime +'，您的总持仓金额为<span class="monthTotal">'+ data.currentMonthTotalValue+'</span>元，同比'+lastMonth+'月份<span class="lastTotal">'+ diffHtml +'</span>元。</p>';

						$('.monthReportTipContent').html(noPosition);

					}

					
				}
				if(data.currentMonthTotalValue == '' && data.lastMonthTotalHoldValue != ''){
					var noPosition = '<p class="tipPosition">您在<span class="monthReportTime">'+ that.getElements.monthReportTime +'</span>，您暂无持仓。</p>'+
									'<p>同比'+ lastMonth +'月份减少'+ data.lastMonthTotalHoldValue +'。</p>';
					$('.monthReportTipContent').html(noPosition);
				}
				if(data.lastMonthTotalHoldValue == '' && data.currentMonthTotalValue != ''){
					var noPosition = '<p class="tipPosition">您在<span class="monthReportTime">'+ that.getElements.monthReportTime +'</span>，投资的 <span class="property">'+ that.getElements.assetPerHtml +'</span>。</p>'+
									'<p class="tipCompare">截止'+ that.getElements.reportTime +'，您的总持仓金额为<span class="monthTotal">'+ data.currentMonthTotalValue +'</span>元。</p>'
				}
				if(data.currentMonthTotalValue == '' && data.lastMonthTotalHoldValue == ''){
					var noPosition = '<p class="tipCompare">截止'+ that.getElements.reportTime +'，您暂无持仓。</p>'
				}
				
				$('.monthReportTipContent').html(noPosition);


			}
		},{
			url: site_url.queryInvestAssetConfigureAdvise_api,
			data: {
				reportId: that.getElements.reportId, //报告id
			},
			needLogin:true, 
			needDataEmpty: false,
			callbackDone: function(json){
				//判断是否已实名认证
				var data = json.data;
				// var flag;

				if ( data.length) {
					//有数据
					that.recommendList = data;

					$.each(that.recommendList,function(i,el){
						that.pieChartData[i] = el.assetTypeDesc;

						if(el.assetType == '203'){
							el.colorStart = '#182F7A';
							el.colorStop = '#7286C1';
						}
						else if(el.assetType == '205'){
							el.colorStart = '#FBE2BD';
							el.colorStop = '#D69549';
						}
						else if(el.assetType == '204'){
							el.colorStart = '#AA6545';
							el.colorStop = '#EDA377';
						}
						else if(el.assetType == '200'){
							el.colorStart = '#D8D8D8';
							el.colorStop = '#D8D8D8';
						}


						var dataDetail = {value:el.confirmValuePercent, name:el.assetTypeDesc,itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 1, 1,
									[
										{offset: 0, color: el.colorStart},
										{offset: 1, color: el.colorStop}
									]
								)
							}
						}}

						that.pieChartDataDetail.push(dataDetail) ;


					})

					//调用画图方法
					that.bingtu(1);
					that.typeCompare();
				}
				// 循环遍历数据
				for(var index in data){

					var result = data[index].productList;

					data[index].assetRatioDesc = $.util.multiplying(data[index].assetRatio,100);

					$.each(result,function(i,el){

						for(var m in result){
							if(result[m].productType == '173'){
								result[m].flag2 = true;
							}
							else if(result[m].productType == '177'){
								result[m].flag3 = true;
							}else{
								result[m].flag1 = true;
							}

							result[m].allocationRatiodesc = (Number(result[m].allocationRatio)*100).toFixed(2);
							result[m].allocationAmountdesc = parseFloat(result[m].allocationAmount) / 10000;

						}

					})
					
				}
				if(!$.util.objIsEmpty(data)){
					var template = Handlebars.compile($("#optimizationList").html());
					//匹配json内容
					var html = template(data);
					//输入模板
					$('.optimizationList').append(html);
				}
				
				
			}
		}]
		$.ajaxLoading(obj);


	},
	typeCompare:function(){
		var that = this;

		if( that.monthHoldShareList.length || that.recommendList.length ){

			var recommendData = [];

			$.each( that.recommendList, function(i, el){
				var remark = true;
				$.each( that.monthHoldShareList, function( x, y){

					if( el.assetType == y.assetType ){
						remark = false;
						if(el.assetRatio > y.confirmValuePercent ){
							recommendData.push(el.assetTypeDesc);
						}

					}

				})

				if(remark){
					recommendData.push(el.assetTypeDesc);
				}
				
			})


		}
		var addTypesHtml = recommendData.join('、');
		$('.addTypes').html(addTypesHtml)
	},
	getMonthDateRange: function(year, month) {
		// month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
		// array is 'year', 'month', 'day', etc
		var startDate = moment([year, month - 1]);

		// Clone the value before .endOf()
		var endDate = moment(startDate).endOf('month');

		// just for demonstration:
		console.log(startDate.toDate());
		console.log(endDate.toDate());
		// make sure to call toDate() for plain JavaScript date type


		$('.startDate').html(moment(startDate).format('YYYY-MM-DD'));

		$('.endDate').html(moment(endDate).format('YYYY-MM-DD'));

		return { start: startDate, end: endDate };

	},

	bingtu:function(i){
		var that = this;
		// app.title = '环形图';
		var pieChart = echarts.init($('.circle')[i]);
		
		// 指定图表的配置项和数据
		option = {
			legend: {
				orient: 'vertical',
				x: 'left',
				// data:['联盟广告','视频广告','搜索引擎'],
				data:that.pieChartData,
				icon: "roundRect",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none

				itemWidth: 10,  // 设置宽度

				itemHeight: 10, // 设置高度
				itemGap: 10 ,//设置间距
				x: '70%',
				y: '35%'

			},
			series: [
				{
					name:'您当前的资产配比',
					type:'pie',
					radius: ['49%', '70%'],
					center: ['35%', '47%'],
					// selectedMode: 'single',
					avoidLabelOverlap: false,
					hoverAnimation:false,
					label: {
						normal: {
							show:false, //去掉引导线
							formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
							backgroundColor: '#eee',
							borderColor: '#aaa',
							borderWidth: 1,
							borderRadius: 4,
							rich: {
								a: {
									color: '#999',
									lineHeight: 22,
									align: 'center'
								},
								hr: {
									borderColor: '#aaa',
									width: '100%',
									borderWidth: 0.5,
									height: 0
								},
								b: {
									fontSize: 16,
									lineHeight: 33
								},
								per: {
									color: '#eee',
									backgroundColor: '#334455',
									padding: [2, 4],
									borderRadius: 2
								}
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: that.pieChartDataDetail,
				},
				{
					name:'访问来源',
					type:'pie',
					hoverAnimation:false,
					radius: ['40%', '50%'],
					center: ['35%', '47%'],
					avoidLabelOverlap: false,
					
					label: {
						normal: {
							show:false,
							position: 'inner'
						}

					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: that.pieChartDataDetail,
				}
			]
		};
		// 绘制图表
		pieChart.setOption(option); 
	},
	events: function(){  //绑定事件
		var that = this;
		mui("body").on('tap', '.consult' , function(){

			that.getElements.productName = $(this).attr('productName');
			// 获取理财师
			var obj = [{
				url: site_url.queryMyFinancialerList_api,
				data: {
					
				},
				needLogin: true, //需要判断登录情况
				needDataEmpty: false,//不需要判断data是否为空
				callbackDone: function(json){
					var result = json.data;
					// 判断是否有专属理财师和服务理财师
					if(result.exclusiveFinancialerList.length != 0 || result.serviceFinancialerList != 0 ){

						if(result.exclusiveFinancialerList.length != 0){   //有专属理财师
							var exclusive = result.exclusiveFinancialerList[0];//专属理财师
							that.getElements.plannerName = exclusive.name; 	//理财师姓名
							that.getElements.plannerNum = exclusive.code; //理财师工号

						}else if(result.serviceFinancialerList.length != 0 ){
							var exclusive = result.serviceFinancialerList[0];//服务理财师
							that.getElements.plannerName = exclusive.name; 	//理财师姓名
							that.getElements.plannerNum = exclusive.code; //理财师工号
						}

					   $.elasticLayerTypeFive({
							id: "tip",
							title: '提示',
							titleSatus: false,
							p: '<p>非常感谢选择恒天财富！我们将尽快安排专业人员与您联系，请保持手机畅通</p>',
							buttonTxt: '明白了',
							zIndex: 100,
						});
						var contentObj = [{
							url: site_url.reportContactNow_api,
							data: {
								hmac:"",
								params:{
									empNo: that.getElements.plannerNum,  //理顾工号
									empName: that.getElements.plannerName,  // 理顾姓名
									productName: that.getElements.productName,  // 产品名称
								}
							},
							needLogin: true, //需要判断登录情况
							needDataEmpty: false,//不需要判断data是否为空
							callbackDone: function(json){
								$(".contactNow").hide();
								$(".mask").hide();
								$(".btns .error-tip").html('');
								$('.btns .save').removeClass("btn_grey").attr('disabled',false);
							
							},
							callbackFail: function(json){
								
							},
						}]
						$.ajaxLoading(contentObj);
					}else{
						var now = new Date();
						var hh = now.getHours();

						if(8 <= hh && hh <= 20){
							 //跳转客服页面
							var obj = [{
								url: site_url.getToken_api,
								data: {
								},
								needDataEmpty:false,
								callbackDone: function(json) {
									var token = json.data.token;
									// 跳转第三方客服地址
									window.location.href = site_url.onlineCustomer_url + '&token=' + token;
								},     
							}];
							$.ajaxLoading(obj);
						}else{
							window.location.href = site_url.consultProduct_url +'?empNo='+ that.getElements.plannerNum + '&empName=' + that.getElements.plannerName + '&productName=' + new Base64().encode(that.getElements.productName) + '&backUrl=' + new Base64().encode(window.location.href) ;
						}

					}
				},
				callbackFail: function(json){
					
				},
			}]
			$.ajaxLoading(obj);

		})
		// 公募的立即购买--跳转到公募详情页
		mui("body").on('tap', '.publicBuy' , function(){
			window.location.href = site_url.wealthIndex_url;
		});

		mui("body").on('tap', '.tabs>li' , function(){
			$(this).addClass('active').siblings().removeClass('active');
			$(".wrap>.panel").eq($(this).index()).addClass('active').siblings().removeClass('active');
		});

		mui("body").on('tap', '.investBth' , function(){
			window.location.href = site_url.wealthIndex_url;
		});


		
		

	},
}

monthReportDetail.init();



