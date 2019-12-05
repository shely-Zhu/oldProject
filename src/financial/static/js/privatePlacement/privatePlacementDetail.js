//  私募基金产品详情
//  @author zhangyanping 2019-11-25 tian

require('@pathCommonBase/base.js');

// require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonJsCom/headBarConfig.js');

require('@pathCommonJs/components/authenticationProcess.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
//引入弹出层
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');

$(function(){
	var  privatePlacementDetail = {
		//获取页面元素
		$e:{
			projectId:splitUrl['projectId'],
			adjustmentTemp: $('#wrap-template'), // 最新调仓模板
			conditionTemplate: $('#condition-template'), // 最新调仓模板
			realLi: $('#real-condition>li'), // 条件下的五条
			lineType:'',
		},
		getElements : {
			name        : $('#name'),  //公募账户名
			number      : $('#number'),  //账号
			linenum     : $('#linenum'), //行号
			openingBank : $("#openingBank"),  //开户行
			topc      : $('#topc'),       //提示信息
		},
		data:{
			custType:"",//客户类型
			fundDetailObj:"",//详情接口拿到的对象
			buyFreeze:"",//是否买入冻结
			qrnhWfsy: {
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
			// 募集账户信息
			that.collectAccount();
			// 获取标签
			that.queryReourceListByLabel();
			// 查询产品亮点
			that.queryProductImage();
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
					that.data.fundDetailObj = jsonData;
					var projectLableHtml,projectLableHtmlList;
					// 根据收益分配方式区分 0固收 1浮收普通 2浮收稳裕 
					if(jsonData.incomeModeJF == '0'){
						$('.fixedIncome').removeClass('hide');
						$('.floatProfit').addClass('hide');

						// 基本信息的展示
						$('.performanceComparison').removeClass('hide');
						$('.lineWrap').addClass('hide');
					}
					else if(jsonData.incomeModeJF == '1'){  //1浮收普通   展示历史业绩走势
						that.$e.lineType = 'wfsy';
						$('.lineWrap .wfsy').removeClass('hide');
						$('.lineWrap .qrnh').addClass('hide');

						$("#qrnhLine").addClass("hide");
						$("#wfsyLine").removeClass("hide");
						// 折线图
						that.getTypeOneData(that.$e.lineType );
						
					}
					else if(jsonData.incomeModeJF == '2'){  //2浮收稳裕   展示七日年化
						that.$e.lineType = 'qrnh';
						// $('.lineWrap .wfsy').addClass('hide');
						// $('.lineWrap .qrnh').removeClass('hide');
						
						$("#qrnhLine").addClass("hide");
						$("#wfsyLine").removeClass("hide");
						// 折线图
						that.getTypeOneData(that.$e.lineType );
					}

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
					$('.investmentArea').html(jsonData.investArea);
					// 投资方式
					$('.investmentWay').html(jsonData.investWay);
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
					$('.paymentDeadline').html(jsonData.projectDownTime);
					// 预计成立日期
					$('.establishment').html(jsonData.setupDate);
					// 是否需要面签
					$('.isVideo').html(jsonData.isVideo);
					// 允许购买客户类型
					$('.clientType').html(jsonData.customerType);
					// 允许购买客户等级
					$('.clientLevel').html(jsonData.customerRiskLevelDesc);
					// 汇款备注
					$('.remittance').html('【xxx（姓名）认购（产品）】');
					// 赎回开放频率
					$('.redemptionOpenFrequency').html(jsonData.redemptionOpenFrequency);

					// 立即预约上的认购申购费率
					$('.buyRate span').html(jsonData.buyRate);
				},
			},{
                    url: site_url.queryUserAuthInfo_api,
                    data: {
                        hmac: "", //预留的加密信息     
                        params: {
                            //uuid: sessionStorage.getItem('uuid') //'EE7CA9386715CBF3BAB30CD479697D72' //sessionStorage.getItem('uuid') //客户Id,打开登录页面链接带过来的参数uuid
                        }
                    },
                    needLogin: true,
                    // async: false, //同步
                    needDataEmpty: false, //需要判断data是否为空
                    callbackDone: function(json) {
                        var jsonData = json.data;
                        that.data.custType = jsonData.accountType; // 客户类型【0.机构 1.个人】 
                        that.data.buyFreeze = jsonData.buyFreeze; // 是否冻结买入：0-否；1-是；
                        

                    },
                }];
			$.ajaxLoading(obj);

		},
		//请求历史业绩走势
		getTypeOneData: function( type,num ){
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
			else if( num == 2 && that.data['qrnhWfsy'].halfYear.profitThoudDate && that.data['qrnhWfsy'].halfYear.profitThoudDate.length){
				// 半年
				that.drawLine(type, that.data['qrnhWfsy'].halfYear );
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
				url: site_url.prvHisValue_api, 
				data: {
					projectId: splitUrl['projectId'],
					days: '',
					pageNo:'',
					pageSize:'',
				},
				contentTypeSearch: true,
				needLogin: true,
				callbackDone: function(json) {
					var jsonData = json.data;
					$(".priceLimit span").html(jsonData.pageList[0].unitNetChangePercent);

					//拼数据
					$.each( jsonData.pageList, function(i, el){
						newData.sevenIncomeRate.push( el.unitNetValue);
						newData.profitThoudDate.push( el.netValueDate);
					})

					switch(num) {
						case 0: that.data['qrnhWfsy'].oneMonth = newData;break;
						case 1: that.data['qrnhWfsy'].threeMonth = newData;break;
						case 2: that.data['qrnhWfsy'].halfYear = newData;break;
						case 3: that.data['qrnhWfsy'].oneYear = newData;break;
						case 4: that.data['qrnhWfsy'].sinceNow = newData;break;
					}
					that.drawLine( type, newData);
				},
			}];
			$.ajaxLoading(obj);
		},
		//画折线图
		//type必传
		drawLine: function ( type,data) {
			var that = this;
			console.log($('#qrnhLine')[0])

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
					seriesData = data.sevenIncomeRate;
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
		// 查询产品亮点
		queryProductImage:function(){
			var that = this;
			//发送ajax请求
			var obj = [{
				url: site_url.queryProductImage_api,
				data: {
					projectId: that.$e.projectId,
					limitNum:'',
					productModule:'',
				},
				needLogin:true,//需要判断是否登陆
				callbackDone: function(json){  //成功后执行的函数
					
					var json = json.data[0];

					if (!json.imgPath) {
						if (json.features) {
							$(".lightPoint").html(json.features);
						} else {
							return false;
						}
					} else {
						$(".lightPoint img").attr("src", json.imgPath);
					}


				},
				callbackFail: function(json){  //失败后执行的函数
					tipAction(json.msg);

				}
			}];
			$.ajaxLoading(obj);
		},

		// 募集账户信息
		collectAccount:function(){
			var that = this;

			//发送ajax请求
			var obj = [{
				url: site_url.getRaiseInfo_api,
				data: {
					projectId: that.$e.projectId,
				},
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
		getJumpUrl:function(v){//获取跳转链接
			var jumpUrl = "";//跳转链接
			if(v.conditionJump == 1){//跳转到认证中心页面
				jumpUrl = site_url.realName_url
			}else if(v.conditionJump == 2){//跳转到完善信息页面
				jumpUrl = site_url.completeInformation_url
			}else if(v.conditionJump == 3){//跳转到专项风测页面
				jumpUrl = site_url.riskAppraisal_url+"?type=asset"
			}else if(v.conditionJump == 4){//跳转到投资者分类申请页面
				jumpUrl = site_url.investorClassification_url
			}else if(v.conditionJump == 5){//跳转到投资者分类结果页页面
				jumpUrl = site_url.investorClassificationResult_url
			}else if(v.conditionJump == 6){//跳转到合格投资者申请 页面
				jumpUrl = site_url.qualifiedInvestor_url
			}else if(v.conditionJump == 7){//跳转到合格投资者结果页面
				jumpUrl = site_url.qualifiedInvestorResult_url
			}
			return jumpUrl;
		},
		// 客户预约产品所需条件
		getConditionsOfOrder:function(){
			var that = this;

			//发送ajax请求
			var obj = [{
				url: site_url.conditionsOfOrder_api,
				data: {
					projectId: that.$e.projectId,
				},
				contentTypeSearch:true,
				needLogin:true,//需要判断是否登陆
				callbackDone: function(json){  //成功后执行的函数
					$("#tips-wrap").show();//显示预约条件
//					generateTemplate(json.data,$("#real-condition"), that.$e.conditionTemplate);
					var jsonData = json.data,
					isPopup = "",//弹框售前告知书
					isReal = "",//是否实名认证，因为如果机构切一键认证是实名，点击需要提示弹框。
					singleaAuthenPath = "",//一键认证跳转链接
					singleaAuthen = false;//条件框是否展示
					that.$e.realLi.hide();
					$.each(jsonData, function(e,v) {
						var jumpUrl = "";
						if(v.show == "1"){//如果显示。show=1
							singleaAuthen = true;
							if(!singleaAuthenPath){//获取一键认证的链接。有值的第一个
								singleaAuthenPath = that.getJumpUrl(v)
								if(v.conditionType == 1){//下面一键认证如果是实名认证且机构需要点击需要弹框提示，这里记录。且不能覆盖
									isReal = true;//判断
								}
							}
							if(v.conditionType == 3 && v.isPopup == "1"){//是否弹出售前告知书。售前告知书与风险等级匹配一起提示
								isPopup = true;
							}
							that.$e.realLi.eq(e*1).show();
							that.$e.realLi.eq(e*1).find(".bank-status").html(v.statusDesc);
							jumpUrl = that.getJumpUrl(v);//获取跳转Url。
						}
//						对应的条件认证到哪里
						that.$e.realLi.eq(e*1).find(".tips-li-right").on('tap',function(){
							if(v.conditionType == "1" && that.data.custType != "1"){//如果是实名认证跳转，机构不支持线上开户，弹框提示
								$("#tips-wrap").hide();
				                var obj = {
				                	title: '',
				                	id: 'realOrg',
				                	p: '机构客户需联系您的理财师，进行线下开户',
				                	yesTxt: '确认',
				                	celTxt: "取消",
				                	zIndex: 100,
				                	callback: function(t) {
				                	},
				                };
				                $.elasticLayer(obj)
							}else{
								window.location.href = jumpUrl;
							}
						})
						//一键认证调往哪里
						mui("body").on('tap', '.tips-btn', function() {
							if(isReal && that.data.custType != "1"){//如果是实名认证跳转，机构不支持线上开户，弹框提示,一键认证正好也是链接也是实名认证也弹框
								$("#tips-wrap").hide();
				                var obj = {
				                	title: '',
				                	id: 'realOrg1',
				                	p: '机构客户需联系您的理财师，进行线下开户',
				                	yesTxt: '确认',
				                	celTxt: "取消",
				                	zIndex: 100,
				                	callback: function(t) {
				                	},
				                };
				                $.elasticLayer(obj)
							}else{
								window.location.href = singleaAuthenPath;
							}
						})
						
					});
								//发送ajax请求
					var ReourceListobj = [{
						url: site_url.getRaiseInfo_api,
						data: {
							projectId: that.$e.projectId,
							fileType:"19"
						},
						contentTypeSearch: true,
						needLogin:true,//需要判断是否登陆
						callbackDone: function(json){  //成功后执行的函数
									
						},
						callbackFail: function(json){  //失败后执行的函数
							tipAction(json.msg);
		
						}
					}];
					$.ajaxLoading(ReourceListobj);
					if(!singleaAuthen){//如果v.show都是0，则不展示预约框,跳转到相应链接
						$("#tips-wrap").hide();
						if(!!isPopup){//如果弹售前告知书
			                var obj = {
			                	title: '',
			                	id: 'sellPop',
			                	p: '<p class="">你选择的产品与您现在的风险承受能力相匹配</p>' +
			                		'<p class="">请您认真阅读' + that.email + '并确认后继续购买该产品</p>',
			                	yesTxt: '去阅读',
			                	celTxt: '取消',
			                	zIndex: 1200,
			                	callback: function(t) {
									
			                	},
			                };
			                $.elasticLayer(obj)
						}
						that.nextStep();
						
					}


				},
				callbackFail: function(json){  //失败后执行的函数
					tipAction(json.message);

				}
			}];
			$.ajaxLoading(obj);

		},
		queryReourceListByLabel:function(){   //根据标签号查询产品材料
			var that = this;
			var labels = '0,1,2,3,4,5'

			var	obj = [{ //根据标签号查询产品材料
				url: site_url.queryReourceListByLabel_api, //根据标签号查询产品材料   queryReourceListByLabel.action
				data: {
					projectId: that.$e.projectId, // 产品代码
					labels: labels,
				},
				needLogin: true,
				needDataEmpty: true,
				contentTypeSearch: true,
				async: false,
				callbackDone: function(json) {
					var jsonData = json.data;

					// 风险揭示书
					if(jsonData.fxjss){
						jsonData.title = '风险揭示书';
						that.processData(jsonData.fxjss);
						jsonData.displayGrounp = jsonData.fxjss;
						generateTemplate(jsonData,$(".panel3"), that.$e.adjustmentTemp);
					} 
					// 产品信息
					if(jsonData.cpxx){
						jsonData.title = '产品信息';
						that.processData(jsonData.cpxx);
						jsonData.displayGrounp = jsonData.cpxx;
						generateTemplate(jsonData,$(".panel3"), that.$e.adjustmentTemp);
					}
					// 管理报告
					if(jsonData.glbg){
						jsonData.title = '管理报告';
						that.processData(jsonData.glbg);
						jsonData.displayGrounp = jsonData.glbg;
						generateTemplate(jsonData,$(".panel3"), that.$e.adjustmentTemp);
					}
					// 资金分配
					if(jsonData.zjfp){
						jsonData.title = '资金分配';
						that.processData(jsonData.zjfp);
						jsonData.displayGrounp = jsonData.zjfp;
						generateTemplate(jsonData,$(".panel3"), that.$e.adjustmentTemp);
					}
					// 重要公告及通知
					if(jsonData.zyggjtz){
						jsonData.title = '重要公告及通知';
						that.processData(jsonData.zyggjtz);
						jsonData.displayGrounp = jsonData.zyggjtz;
						generateTemplate(jsonData,$(".panel3"), that.$e.adjustmentTemp);
					}
					// 恒天简报
					if(jsonData.htjb){
						jsonData.title = '恒天简报';
						that.processData(jsonData.htjb);
						jsonData.displayGrounp = jsonData.htjb;
						generateTemplate(jsonData,$(".panel3"), that.$e.adjustmentTemp);
					}

				},
				callbackFail: function(json) {
					//请求失败，
					//隐藏loading
					//that.getElements.listLoading.hide();
					//显示错误提示
					tipAction(json.message);

					//隐藏loading，调试接口时需要去掉
					setTimeout(function() {
						// that.getElements.listLoading.hide();
					}, 100);
					//return false;
				},
				callbackNoData: function(json) {
					//没有数据
					// $id.find('.noData').show();

					setTimeout(function() {
						// that.getElements.listLoading.hide();
					}, 100);
				}

			}]
			$.ajaxLoading(obj);

		},
		// 处理数据
		processData:function(data){
			var that = this;

			$.each(data, function(i, el) {
				if (el.fileName.indexOf(".pdf") != -1) {
					el.line = true; //线上可预览
					el.href = site_url.downloadNew_api + "?filePath=" + el.fileUrl + "&fileName=" + new Base64().encode(el.fileName) + "&groupName=" + el.groupName + "&show=1";
				} else {
					el.line = false; //需下载
					el.href = site_url.downloadNew_api + "?filePath=" + el.fileUrl + "&fileName=" + new Base64().encode(el.fileName) + "&groupName=" + el.groupName;
				}
			})
			return data;
		},
		//满足条件的后续判断
		nextStep:function(){
			var that = this;
			if(that.data.fundDetailObj.isElecContract == "1") { //电子合同逻辑
				if(that.data.fundDetailObj.isAllowAppend == "1") { //追加商品参数fundCode,
					//跳转到追加商品链接
					if(that.data.custType == "1") { //客户类型【0.机构 1.个人】 
						//跳转到电子合同追加页面
						window.location.href = site_url.orderLimit_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
							that.data.fundDetailObj.isAllowAppend;
					} else {
						//跳转到普通预约
						window.location.href = site_url.registration_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
							that.data.fundDetailObj.isAllowAppend;
					}
				} else { //预约
					//跳转到预约产品链接
					if(that.data.custType == "1") { //客户类型【0.机构 1.个人】 
						//跳转到电子合同预约页面
						window.location.href = site_url.orderLimit_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
							that.data.fundDetailObj.isAllowAppend;
					} else {
						//跳转到普通预约
						window.location.href = site_url.registration_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
							that.data.fundDetailObj.isAllowAppend;

					}
				}
			} else { //非电子合同

				window.location.href = site_url.registration_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
					that.data.fundDetailObj.isAllowAppend;

			}
		},

		events: function(){
			var that = this;
			//tab点击切换
			mui("body").on('mdClick', '.tabs>li' , function(){
				$(this).addClass('active').siblings().removeClass('active');
				$(".wrap>.panel").eq($(this).index()).addClass('active').siblings().removeClass('active');
			}, {
				htmdEvt: 'privatePlacementDetail_01'
			});
			//点击一键预约逻辑
			mui("body").on('tap', '.tips-btn' , function(){
				
			});
			//折线图点击月份请求数据
			mui("body").on('mdClick', '.lineWrap .time', function() {
				$('.lineDraw .time').removeClass('active');
				$(this).addClass('active');
				
				that.getTypeOneData(that.$e.lineType ,$(this).attr('num') );
			}, {
				htmdEvt: 'privatePlacementDetail_02'
			})
			// 募集账户的信息的拷贝
			mui("body").on('mdClick', '.copy_btn', function(event) {
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
				clipboard.onClick(event);

			}, {
				htmdEvt: 'privatePlacementDetail_03'
			});

			// 立即预约
			mui("body").on('mdClick', '.buyButton' , function(){
				if(that.data.buyFreeze == "1"){//如果账户冻结，首先提示
	                var obj = {
	                	title: '',
	                	id: 'buyFreeze',
	                	p: '您的账户已冻结，禁止买入，可联系您的理财师进行咨询',
	                	yesTxt: '确认',
	                	celTxt: "取消",
	                	zIndex: 100,
	                	callback: function(t) {

	                	},
	                };
	                $.elasticLayer(obj)
				}else{
					that.getConditionsOfOrder();//获取预约条件
					
				}
			}, {
				htmdEvt: 'privatePlacementDetail_04'
			});
		},
	};
	privatePlacementDetail.init();
});
