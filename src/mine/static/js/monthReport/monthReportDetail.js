/**
* 月度报告详情页我
* @author zhangyanping 2019-11-19
*/

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJsCom/headBarConfig.js');

require('@pathCommonJsCom/tabScroll.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');

var moment = require('moment');


var monthReportDetail = {
	getElements: {
		noData: $('.noData'), //没有数据的结构
		listLoading: $('.listLoading'),  //所有数据区域，第一次加载的loading结构
		reportId:splitUrl['reportId'],   //活动的id
	},
	setting: {  //一些设置
		navList: [  //导航
			{type: '月末持仓总览',num: '0'}, //
			{type: '本月交易明细',num: '1'},
		],
		current_index: 0,  //左右滑动区域的索引
		list_template: '',  //列表的模板，生成后存放在这里
	},
	html: '',  //存放生成的html
	pieChartData:'', // 画图的title
	init: function(){  //初始化函数
		var that = this;
		
		//拼模板，初始化左右滑动mui组件
		that.beforeFunc();

		//初始化第一屏区域的上拉加载
		that.getData($('#scroll1'));
		// 资产情况分析
		that.assetAnalysis();

		//事件监听
		that.events();
	},

	beforeFunc: function(){  //拼模板，初始化左右滑动mui组件
		var that = this,
			contentArr = [];  //传给tabScroll组件的contentList参数的数组

		// list内容模板
		var source = $('#second-template').html(),
			template = Handlebars.compile(source),
			list_html = template();

		//将生成的模板内容存到that.list_template上
		that.setting.list_template = template;

		// 外容器优先加载
		var wrap_source = $('#transaction-template').html(),
			wrap_template = Handlebars.compile(wrap_source),
			wrap_html = wrap_template({content: list_html});
			
		$.each( that.setting.navList, function(i, el){

			contentArr.push({
				id: i,
				content: wrap_html
			})
		})

		var obj = {
			wrapper: $('.reportContainer'), //存放整个组件的区域
			needNavAction: false,
			//needBlock: true,
			navList: that.setting.navList, //导航
			contentLength: that.setting.navList.length,  //左右滑动的区域个数，即导航数组长度
			contentList: contentArr, //此时只有框架，实际列表内容还未请求
			callback: function(t){  //t返回的是 id 为 scroll1 / scroll2 这样的切换后当前区域中的节点
					var w = $('#scroll1').attr('id'),
					s = '#'+w+' .contentWrapper';

				  //data-scroll属性即当前左右切换区域的索引
				var index = t.attr('data-scroll');

				//data-scroll属性即当前左右切换区域的索引
				that.setting.current_index = index;

				//判断当前区域是否已经初始化出来上拉加载
				if (t.hasClass('hasPullUp')) {
					//有这个class，表示已经初始化，不再执行下一步
					return false;
				}
				//没有初始化，请求第一次数据
				that.commonAjax(t);
			}
		}
		$.tabScroll(obj);
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

				$('.clientName').html(json.name);
				// 客户编号
				$('.monthReportNum').html(json.customerNo);
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
				// 报告名称
				$('.clientName').html(json.reportName)
				// 报告月份
				that.getElements.monthReportTime = json.month;
				$('.reportMonth').html(json.month);
				
				// 生命周期
				$('.lifeTerm').html(json.lifeTerm);
				// 风险等级
				$('.riskLevel').html(json.riskLevel);
				// 报告日期
				$('.reportTime').html(json.reportTime);
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
				if(!$.util.objIsEmpty(jsonData)){

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

						that.setting.html = that.setting.list_template(jsonData);

						$id.find('.contentWrapper .mui-table-view-cell').html(that.setting.html);
					}
					if(!$.util.objIsEmpty(jsonData.pofList)){
						jsonData.flag2 = true;
						jsonData.flag1 = false;
						jsonData.flag3 = false;
						that.setting.html = that.setting.list_template(jsonData);

						$id.find('.contentWrapper .mui-table-view-cell').append(that.setting.html);
					}
					if(!$.util.objIsEmpty(jsonData.generalModelList)){
						jsonData.flag3 = true;
						jsonData.flag1 = false;
						jsonData.flag2 = false;
						that.setting.html = that.setting.list_template(jsonData);

						$id.find('.contentWrapper .mui-table-view-cell').append(that.setting.html);
					}
				}else{
					//没有数据
					$id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
					$id.find('.noData').show();

					setTimeout(function() {
						that.getElements.listLoading.hide();
					}, 100);
				}
				that.getElements.listLoading.hide();
				$id.addClass('hasPullUp');

			},
			callbackFail: function(json) {
				//请求失败，
				//隐藏loading
				//that.getElements.listLoading.hide();
				//显示错误提示
				tipAction(json.message);

				//隐藏loading，调试接口时需要去掉
				setTimeout(function() {
					that.getElements.listLoading.hide();
				}, 100);
				//return false;
			},
			callbackNoData: function(json) {
				//没有数据
				$id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
				$id.find('.noData').show();

				setTimeout(function() {
					that.getElements.listLoading.hide();
				}, 100);
			}

		}]
		$.ajaxLoading(obj);
	},
	commonAjax: function( $id, t ){  // 获取产品数据的公用ajax方法;$id为各区域的 scroll+num id
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
				if(!$.util.objIsEmpty(jsonData)){
					jsonData.tradeDtail = true;

					if(!$.util.objIsEmpty(jsonData.pefSaleInfoList)){
						jsonData.flag1 = true;
						jsonData.flag2 = false;
						that.setting.html = that.setting.list_template(jsonData);

						$id.find('.contentWrapper .mui-table-view-cell').html(that.setting.html);
					}
					if(!$.util.objIsEmpty(jsonData.pofInfoList)){
						jsonData.flag2 = true;
						jsonData.flag1 = false;
						that.setting.html = that.setting.list_template(jsonData);

						$id.find('.contentWrapper .mui-table-view-cell').append(that.setting.html);
					}
				}
				else{
					//没有数据
					$id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
					$id.find('.noData').show();

					setTimeout(function() {
						that.getElements.listLoading.hide();
					}, 100);
				}

				that.getElements.listLoading.hide();
				$id.addClass('hasPullUp');

			},
			callbackFail: function(json){
				//请求失败，
				//隐藏loading
				//that.getElements.listLoading.hide();
				//显示错误提示
				tipAction( json.message );

				t.endPullupToRefresh(false);	
				$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');

				//隐藏loading，调试接口时需要去掉
				setTimeout(function(){
					that.getElements.listLoading.hide();
				}, 100);
				//return false;
			},
			callbackNoData: function(json){
 
				//没有数据
				$id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
				$id.find('.noData').show();

				setTimeout(function() {
					that.getElements.listLoading.hide();
				}, 100);
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
							el.colorStart = '#AA6545';
							el.colorStop = '#EDA377';
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

			// var obj = [{
			// 	url: site_url.search_planner_url,
			// 	data: {
			// 		hmac:"",
			// 		params:{
			// 		   broker_account:"",//理财师工号
			// 		   type:"0",//绑定类型    0：私募   1：公募
			// 		   isCertificate:"", // 显示持证理财师,Y通过，N未通过
			// 		}
			// 	},
			// 	needLogin: true, //需要判断登录情况
			// 	needDataEmpty: false,//不需要判断data是否为空
			// 	callbackDone: function(json){
			// 		var result = json.data.advisor;
			// 		if(result.length != 0 ){
			// 			if(json.data.existMain == 1){   //有专属理财师
			// 				var exclusive = result[0];//专属理财师
	  //                       that.getElements.plannerName = exclusive.broker_name; 	//理财师姓名
	  //                       that.getElements.plannerNum = exclusive.broker_account; //理财师工号

			// 			}else if(json.data.existMain == 0){
			// 				var exclusive = result[0];//服务理财师
	  //                       that.getElements.plannerName = exclusive.broker_name; 	//理财师姓名
	  //                       that.getElements.plannerNum = exclusive.broker_account; //理财师工号
			// 			}

			// 			var obj = {
			// 				title: '提示', //大标题
			// 				p: '<p class="elastic_p">非常感谢您选择恒天财富！我们将尽快安排专业人员与您联系，请保持手机畅通！</p>',
			// 				celTxt : false,
			// 				callback : function(){ //确定按钮的回调函数
			// 					$('.elasticLayer').hide();
			// 				},
			// 				zIndex: 100, //z-index
			// 			}

			// 			$.elasticLayer(obj);//弹出层初始化

			// 			var contentObj = [{
			// 				url: site_url.reportContactNow_api,
			// 				data: {
			// 					hmac:"",
			// 					params:{
			// 						empNo: that.getElements.plannerNum,  //理顾工号
			// 						empName: that.getElements.plannerName,  // 理顾姓名
			// 						productName: that.getElements.productName,  // 产品名称
			// 					}
			// 				},
			// 				needLogin: true, //需要判断登录情况
			// 				needDataEmpty: false,//不需要判断data是否为空
			// 				callbackDone: function(json){
			// 					$(".contactNow").hide();
			// 					$(".mask").hide();
			// 					$(".btns .error-tip").html('');
			// 					$('.btns .save').removeClass("btn_grey").attr('disabled',false);
							
			// 				},
			// 				callbackFail: function(json){
								
			// 				},
			// 			}]
			// 			$.ajaxLoading(contentObj);
			// 		}else{
			// 			var now = new Date();
			// 			var hh = now.getHours();
						
			// 			if(8 <= hh && hh <= 20){
			// 				window.open(site_url.customerService_url);
			// 			}else{
			// 				$('.contactNow').show();
			// 			}

			// 			//$('.contactNow').show();
			// 		}
			// 	},
			// 	callbackFail: function(json){
					
			// 	},
			// }]
			// $.ajaxLoading(obj);

		})
		

	},
}

monthReportDetail.init();



