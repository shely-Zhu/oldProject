/**  
* @Page:  现金管理 -- 转入
* @Author: yangjinlai
* @Date:   2019-11-25
* 
*/

require('@pathIncludJs/vendor/config.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathIncludJs/vendor/config.js');

require('@pathIncludJs/vendor/mui/mui.picker.min.js');

//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/headBarConfig.js');

require('@pathCommonCom/elasticLayer/transOutRule/transOutRule.js');
var popPicker = require('@pathCommonJsCom/popPicker.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');

var payPass = require('@pathCommonJsCom/payPassword.js');

$(function () {

	var regulatory = {
		$el: {
			fundName: $(".title .fundName"),  //基金名
			fundCode: $(".title .fundCode"),   //基金代码
			transformInput: $("#transformInput"),  //输入金额
			CostEstimateNum: $(".CostEstimate .num"),  //费用估算
			CostEstimateRate: $(".CostEstimate .rate"),  //费率
			popupUl: $('.popup-ul'), // 银行卡模板容器
			bankListTemplate: $('#bankList-template'), //银行卡模板
			onlinepay: $('.onlinepay .onright-left'), // 在线支付银行卡模板容器
			bankListCheckTemplate: $('#bankListCheck-template'), //选中银行卡模板
			iconCheck: $(".item2 .iconfont"), //同意协议选择框
			contract: $(".file .contract"), //同意协议
			recruiting: $(".file .recruiting"), //同意协议
			confirmBtn: $(".btn_box .btn"), //确定按钮
			elasticTxt:$(".popup-password .elasticTxt"),
			cycleDate:$(".time #cycle"),  // 定投周期
			nextDeductingDay:$(".p1 .next-cut-payment"),  // 下次扣款日期
		},
		gV: { // 全局变量
			//------add-----
			fundBusinCode:'039',
			custType:sessionStorage.getItem('custType') ? sessionStorage.getItem('custType') : '1',   // 交易来源
			scheduledProtocolId: splitUrl['scheduledProtocolId'] ? splitUrl['scheduledProtocolId'] : '201911270201',
			type: splitUrl['type'] ? splitUrl['type'] : 'edit', // add添加  edit 编辑
			fundName: splitUrl['fundName'] ? splitUrl['fundName'] : null,   //基金名称
			fundCode: splitUrl['fundCode'] ? splitUrl['fundCode'] : '000847',  //基金代码
			capitalMode: '', //资金方式
			payType: '',   //支付方式（0、在线支付 1、汇款支付）
			bankName: '',  // 银行名称
			
			password: "",
			
			
			nextDeductingDayFromate:'',  //定投协议签署入参（firstExchdate）专用
			dayInWeek:'',  //app定投协议签署页面展示用,如果是8,说明此参数无效
			dayInMonth:'',  //日期,定投协议签署,每日定投时候专用，如果为32,此参数无效
			protocolPeriodUnit:'',  //协议单元
			tradePeriod: '' ,  //交易周期

			//------edit-------
			fixedPeriodMask:'',  //定投周期  
			shares:'',   //申请份额
			expiryDate:'', //终止日期

			//公用
			balance:0,     //   申请金额
			tradeAcco: '' , //交易账号
			bankNo: '',  //银行编号
			bankAccount: '', // 银行账号
			bankAccountMask:'', //银行账号密文
			nextDeductingDay:'',  //扣款周期
		},
		webinit: function () {
			var that = this;
			that.$el.fundCode.html(that.gV.fundCode) ;
			that.$el.fundName.html(that.gV.fundName);
			that.events();
			if(that.gV.type == 'add'){
				that.getData();
			}
			if(that.gV.type == 'edit'){
				console.log('w222')
				that.getDetails();
			}
			
			that.getAgreeUrl();
		},
		getRate:function(){
			var that = this;
			var obj = [{
				url: site_url.prfFundQuery_api,
				data: {
					"operationType": '090',
					"fundCode":that.gV.fundCode
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function (json) {
					if (json.status == '0000') {
						//费用估算有待完善
						that.$el.CostEstimateRate.html(Number(json.data.ratio)*100 + '%')
						that.$el.CostEstimateRate.html(Number(json.data.ratio)*Number(json.data.discount)*that.gV.balance)
						
					}
                  
                },

            }];
            $.ajaxLoading(obj);
		},
		//获取基金数据 add
		getData: function (t) {
			var that = this;
			var obj = [{
				url: site_url.newfundDetails_api,
				data: {
					"fundCode": that.gV.fundCode
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function (json) {
					if (json.status == '0000' || json.status == '4000') {
						var data = json.data;
						$("#loading").hide()
						that.$el.fundName.html(data.chiName)
						that.$el.fundCode.html(data.trdCode)
						that.gV.fundName = data.chiName
						that.gV.fundCode = data.trdCode
						that.$el.transformInput.attr('placeholder',data.tradeLimitAmount)
						for (var index = 0; index < data.tradeLimitList.length; index++) {
							if(that.gV.fundBusinCode ==  data.tradeLimitList[index].fundBusinCode){
							   that.$el.transformInput.attr('placeholder',data.tradeLimitList[index].minValue)
							   that.$el.transformInput.attr('min',Number(data.tradeLimitList[index].minValue).toFixed(2))
							   that.$el.transformInput.attr('max',Number(data.tradeLimitList[index].maxValue).toFixed(2))
							}
							
						}
						
					}
                  
                },

            }];
            $.ajaxLoading(obj);
		},

		//修改进入获取详情
		getDetails:function(){
			var that = this;
			var obj = [{
				url: site_url.pofFixedDetail_api,
				data: {
					"scheduledProtocolId": that.gV.scheduledProtocolId
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function (json) {
					if (json.status == '0000' || json.status == '4000') {
						var data = json.data;
						$("#loading").hide()
						that.$el.fundName.html(data.fundName)
						that.$el.fundCode.html(data.fundCode)
						that.gV.fundName = data.fundName
						that.gV.fundCode = data.fundCode
						that.gV.balance = data.balance
						that.gV.tradeAcco = data.tradeAcco
						that.gV.bankNo = data.bankNo 
						that.gV.bankAccount = data.bankAccount
						that.gV.bankAccountMask = data.bankAccountMask
						that.gV.fixedPeriodMask = data.fixedPeriodMask
						that.gV.shares = data.shares
						that.gV.expiryDate = data.expiryDate
						that.$el.cycleDate.html(data.fixedPeriodMask)
						that.getNextCutPayment();
						that.getRate();
						
					}
                  
                },

            }];
            $.ajaxLoading(obj);
		},


		//获取银行列表
		getBankCard: function(useEnv) {
            var that = this;
            var obj = [{ 
                url: site_url.normalPofList_api,
                data: {
                    useEnv:useEnv
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
					if(json.status == '0000'){
						// 将列表插入到页面上
						var data = [] ;
						data = json.data.pageList;
						console.log('data',data)
						generateTemplate(data, that.$el.popupUl, that.$el.bankListTemplate,true);
						$("#loading").hide()
						$('.popup').css('display','block')
					}
                  
                },

            }];
            $.ajaxLoading(obj);
		},

		//获取告知书，招募书链接
		getAgreeUrl: function() {
            var that = this;

            var obj = [{ 
                url: site_url.fundMaterial_api,
                data: {
                    fundCode:that.gV.fundCode
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
					if(json.status == '0000'){
						// 将列表插入到页面上
						var data = [] ;
						data = json.data;
						data.forEach(element => {
							if(element.materialType == '1'){
								that.$el.contract.attr('href',element.linkAddress)
							}
							if(element.materialType == '2'){
								that.$el.recruiting.attr('href',element.linkAddress)
							}
						});
						
					}
                  
                },

            }];
            $.ajaxLoading(obj);
		},
		//校验支付方式 
		checkPayType:function(){
			var that = this;
			var obj = [{ 
				url: site_url.pofCheckPayType_api,
				data: {
					operationType:that.gV.payType,
					tradeAcco:that.gV.tradeAcco,
					capitalMode:that.gV.capitalMode,
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function(json) {
					if(json.status == '0000'){
						$("#passwordWrap").show();
					}else{
						tipAction(json.message);
					}
					
				},

			}];
			$.ajaxLoading(obj);
		},
		//校验密码   ---add
		checkPassword: function(val) {
			var that = regulatory;
			regulatory.gV.password = val
			var obj = [{ 
				url: site_url.pofFixedSign_api,
				data: {
					tradeAcco:that.gV.tradeAcco,
					capitalMode:that.gV.capitalMode,
					fundCode:that.gV.fundCode,
					balance:that.gV.balance,
					password:val,
					firstExchdate:that.gV.nextDeductingDayFromate,
					tradePeriod:that.gV.tradePeriod,
					protocolPeriodUnit:that.gV.protocolPeriodUnit,
					protocolFixDay:that.gV.dayInMonth,

					// bankNo:that.gV.bankNo,
					// bankAccount:that.gV.bankAccount,
					
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function(json) {
					$(".elasticButtons").hide();
					var data = [] ;
					data = json.data;
					console.log('data',data)
					if(json.status == '0000'){
					    window.location.href = site_url.pofSurelyResultsDetail_url + '?applyId=' + data.allotNo + '&fundBusinCode=' + 
					   data.fundBusinCode + "&fundCode=" + that.gV.fundCode + "&payType=" +that.gV.payType + '&flag=investmentPlan';
					}
				},
				callbackNoData:function(json){
					tipAction(data.message);
				},
				callbackFail:function(json){
					$(".elasticButtons").hide();
					var data = [] ;
					data = json.data;
					if(json.status == 'POF1186' || json.status == 'POF1186'){
						 //密码错误
						 $(".popup-password").show();
						 $(".elasticButtons.error1").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF0192' || json.status == 'POF1353'){
							 //密码锁定
						 $(".popup-password").show();
						 $(".elasticButtons.error2").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF1101' || json.status == 'POF1907' || json.status == 'POF1152' || json.status == 'POF3123'
					 || json.status == 'POF4609' || json.status == 'POF7453' || json.status == 'POF7457' || json.status == 'POF9020'
					 || json.status == 'POF9036'){
						 //余额不足
						 $(".popup-password").show();
						 $(".elasticButtons.error2").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF0103'){
						 //基金状态[停止交易],不能做[赎回]交易
						 $(".popup-password").show();
						 $(".elasticButtons.error2").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF1217'){
						 //是代表账号锁定 弹后台msg框
						 $(".popup-password").show();
						 $(".elasticButtons.error3").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF1857'){
						 //提示单日单账户限额
						 $(".popup-password").show();
						 $(".elasticButtons.error3").show();
						 that.$el.elasticTxt.html(json.message)
					 }else{
						 $(".popup-password").show();
						 $(".elasticButtons.error3").show();
						 that.$el.elasticTxt.html(json.message)
					 }
				}

			}];
			$.ajaxLoading(obj);
		},
		//校验密码   ---edit
		checkPassword_edit: function(val) {
			var that = regulatory;
			regulatory.gV.password = val
			var obj = [{ 
				url: site_url.pofFixedChange_api,
				data: {
					password:val,
					fundCode:that.gV.fundCode,
					tradeAcco:that.gV.tradeAcco,
					scheduledProtocolId:that.gV.scheduledProtocolId,
					fixState:'A',
					expiryDate:'',  //终止日期
					tradePeriod:that.gV.tradePeriod,
					shares:that.gV.shares,
					balance:that.gV.balance,
					capitalMode:that.gV.capitalMode,
					protocolFixDay:that.gV.dayInMonth,
					protocolPeriodUnit:that.gV.protocolPeriodUnit,
					nextFixrequestDate:that.gV.nextFixrequestDate,
					firstExchdate:that.gV.nextDeductingDayFromate,
					// bankNo:that.gV.bankNo,
					// bankAccount:that.gV.bankAccount,
					
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function(json) {
					$(".elasticButtons").hide();
					var data = [] ;
					data = json.data;
					console.log('data',data)
					if(json.status == '0000'){
					    window.location.href = site_url.pofSurelyResultsDetail_url + '?applyId=' + data.allotNo + '&fundBusinCode=' + 
					   data.fundBusinCode + "&fundCode=" + that.gV.fundCode + "&payType=" +that.gV.payType + '&flag=investmentPlan';
					}
				},
				callbackNoData:function(json){
					tipAction(data.message);
				},
				callbackFail:function(json){
					$(".elasticButtons").hide();
					var data = [] ;
					data = json.data;
					if(json.status == 'POF1186' || json.status == 'POF1186'){
						 //密码错误
						 $(".popup-password").show();
						 $(".elasticButtons.error1").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF0192' || json.status == 'POF1353'){
							 //密码锁定
						 $(".popup-password").show();
						 $(".elasticButtons.error2").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF1101' || json.status == 'POF1907' || json.status == 'POF1152' || json.status == 'POF3123'
					 || json.status == 'POF4609' || json.status == 'POF7453' || json.status == 'POF7457' || json.status == 'POF9020'
					 || json.status == 'POF9036'){
						 //余额不足
						 $(".popup-password").show();
						 $(".elasticButtons.error2").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF0103'){
						 //基金状态[停止交易],不能做[赎回]交易
						 $(".popup-password").show();
						 $(".elasticButtons.error2").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF1217'){
						 //是代表账号锁定 弹后台msg框
						 $(".popup-password").show();
						 $(".elasticButtons.error3").show();
						 that.$el.elasticTxt.html(json.message)
					 }else if(json.status == 'POF1857'){
						 //提示单日单账户限额
						 $(".popup-password").show();
						 $(".elasticButtons.error3").show();
						 that.$el.elasticTxt.html(json.message)
					 }else{
						 $(".popup-password").show();
						 $(".elasticButtons.error3").show();
						 that.$el.elasticTxt.html(json.message)
					 }
				}

			}];
			$.ajaxLoading(obj);
		},
		//查询下次扣款日期
		getNextCutPayment:function(){
			var that = regulatory;
			var deductingCycleDate = '';
			var deductingDayDate = ''
			var deductingCycle = null;
			var deductingDay = null
			deductingCycleDate = that.$el.cycleDate.html().split(" ")[0];
			deductingDayDate = that.$el.cycleDate.html().split(" ")[1];
			if(deductingCycleDate == '每周' || deductingCycleDate == '每两周'){
				if(deductingCycleDate == '每周'){
					deductingCycle = 'week'
					that.gV.protocolPeriodUnit = '1'
					that.gV.tradePeriod = '1'
				}else{
					deductingCycle = 'doubleWeek'
					that.gV.protocolPeriodUnit = '1'
					that.gV.tradePeriod = '2'
				}
				if(deductingDayDate.includes('一')){
					deductingDay = 1
				}
				if(deductingDayDate.includes('二')){
					deductingDay = 2
				}
				if(deductingDayDate.includes('三')){
					deductingDay = 3
				}
				if(deductingDayDate.includes('四')){
					deductingDay = 4
				}
				if(deductingDayDate.includes('五')){
					deductingDay = 5
				}
				if(deductingDayDate.includes('六')){
					deductingDay = 6
				}
				if(deductingDayDate.includes('日')){
					deductingDay = 0
				}
			};
			if(deductingCycleDate.includes('每月')){
				deductingCycle = 'month';
				that.gV.protocolPeriodUnit = '0'
				that.gV.tradePeriod = '1'
				deductingDay = Number(deductingDayDate.split('日')[0])
			}
			if(deductingCycleDate.includes('每日')){
				deductingCycle = 'day';
				that.gV.protocolPeriodUnit = '2'
				that.gV.tradePeriod = '1'
				deductingDay = 0
			}
			var obj = [{ 
				url: site_url.pofFixedDeductDay_api,
				data: {
					deductingCycle:deductingCycle,
					deductingDay:deductingDay,
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function(json) {
					if(json.status == '0000'){
						var data = json.data;
						$(".deductDay").show();
						that.$el.nextDeductingDay.html(data.nextDeductingDay)
						that.gV.nextDeductingDayFromate = data.nextDeductingDayFromate;
						that.gV.nextDeductingDay = data.nextDeductingDay;
						that.gV.dayInWeek = data.dayInWeek;
						that.gV.dayInMonth = data.dayInMonth;
					}else{
						tipAction(json.message);
					}
					
				},

			}];
			$.ajaxLoading(obj);
		},
		/*
				绑定事件
		 */
		events: function () {
			var that = this;

			//开始时间
			// document.getElementById('starttime').addEventListener('tap', function () {
			// 	option = { "type": "date", "beginYear": "1980", "endYear": "2030" };
			// 	var picker = new mui.DtPicker(option);
			// 	picker.show(function (rs) {
			// 		console.log(rs.text)
			// 		// document.getElementById('starttime').innerHTML = rs.text;
			// 	});
			// }, false);

			var list = [{
				value: '110000',
				text: '每周',
				children: [{
					value: "110101",
					text: "周一"
				}, {
					value: "110102",
					text: "周二"
				}, {
					value: "110103",
					text: "周三"
				}, {
					value: "110104",
					text: "周四"
				}, {
					value: "110105",
					text: "周五"
				}, {
					value: "110106",
					text: "周六"
				}, {
					value: "110107",
					text: "周日"
				}]
			}, {
				value: '120000',
				text: '每两周',
				children: [{
					value: "120101",
					text: "周一"
				}, {
					value: "120102",
					text: "周二"
				}, {
					value: "120103",
					text: "周三"
				}, {
					value: "120104",
					text: "周四"
				}, {
					value: "120105",
					text: "周五"
				}, {
					value: "120106",
					text: "周六"
				}, {
					value: "120107",
					text: "周日"
				}]
			}, {
				value: '130000',
				text: '每月',
				children: [{
					value: "130101",
					text: "1日"
				}, {
					value: "130102",
					text: "2日"
				}, {
					value: "130103",
					text: "3日"
				}, {
					value: "130104",
					text: "4日"
				}, {
					value: "130105",
					text: "5日"
				}, {
					value: "130106",
					text: "6日"
				}, {
					value: "130107",
					text: "7日"
				}, {
					value: "130108",
					text: "8日"
				}, {
					value: "130109",
					text: "9日"
				}, {
					value: "130110",
					text: "10日"
				}, {
					value: "130111",
					text: "11日"
				}, {
					value: "130112",
					text: "12日"
				}, {
					value: "130113",
					text: "13日"
				}, {
					value: "13014",
					text: "14日"
				}, {
					value: "130115",
					text: "15日"
				}, {
					value: "130116",
					text: "16日"
				}, {
					value: "130117",
					text: "17日"
				}, {
					value: "130118",
					text: "18日"
				}, {
					value: "130119",
					text: "19日"
				}, {
					value: "130120",
					text: "20日"
				}, {
					value: "130121",
					text: "21日"
				}, {
					value: "130122",
					text: "22日"
				}, {
					value: "130123",
					text: "23日"
				}, {
					value: "130124",
					text: "24日"
				}, {
					value: "130125",
					text: "25日"
				}, {
					value: "130126",
					text: "26日"
				}, {
					value: "130127",
					text: "27日"
				}, {
					value: "130128",
					text: "28日"
				}, {
					value: "130129",
					text: "29日"
				}, {
					value: "130130",
					text: "30日"
				}, {
					value: "130131",
					text: "31日"
				}]
			}, {
				value: '140000',
				text: '每日',
			}]
			// 周期选择
			$('body').on('tap', '#starttime', function () {
				popPicker(2, list, that.$el.cycleDate , that.getNextCutPayment);
			})
			/** 下面三个事件： 银行卡列表出现/隐藏 **/
			$('body').on('tap','.paymoney',function(){
				$(".imgc").hide()
				$(".iimg").show()
				that.gV.payType = $(this).attr('pay-type')
				var useEnv = $(this).attr('pay-type')
				$("#loading").show()
				$(this).find(".imgc").show();
				$(this).find(".iimg").hide();
				that.getBankCard(useEnv)
			}) 

			$('body').on('tap','.popup-close',function(){
				$('.popup').css('display','none')
				$('.popup-password').css('display','none')
			}) 

			$('body').on('tap','.popup-mask',function(){
				$('.popup').css('display','none')
				$('.popup-password').css('display','none')
			}) 

			//点击转出规则
			$('body').on('tap','.goRule',function(){
				window.location.href = site_url.transactionRules_url + '?fundCode=' + that.gV.fundCode;
			}) 
			
			$("#transformInput").on('input propertychange',function(){
				that.gV.balance = $(this).val();
				that.getRate();
			})
			//清除输入框数字
			$('body').on('tap','.deleteNum',function(){
				$('.transformInput').val(null)
			}) ;

			//选中银行卡
			$('body').on('tap','.bank-li',function(){
				$(".bank-li .true").hide();
				$(this).find(".true").show()
				that.gV.bankName = $(this).attr('bankName');
				that.gV.bankNo = $(this).attr('bankNo');
				that.gV.tradeAcco = $(this).attr('tradeAcco');
				that.gV.bankAccount = $(this).attr('bankAccount');
				that.gV.bankAccountMask = $(this).attr('bankAccountMask');
				that.gV.capitalMode = $(this).attr('capitalMode')
				var data = []
				data.push({
					bankThumbnailUrl:$(this).attr('bankThumbnailUrl'),
					bankName:$(this).attr('bankName'),
					bankNo:$(this).attr('bankNo'),
					singleNum:$(this).attr('singleNum'),
					oneDayNum:$(this).attr('oneDayNum')
				});
				generateTemplate(data, that.$el.onlinepay, that.$el.bankListCheckTemplate,true);
				setTimeout(function(){
					$('.popup').css('display','none')
				},500)
			}) 

			//点击同意协议
			that.$el.iconCheck.on('click', function() {
                if ($(this).hasClass("check")) {
					$(this).removeClass("check").html('&#xe668;');
					that.$el.confirmBtn.attr('disabled',true)
                } else {
					$(this).addClass("check").html('&#xe669;');
					that.$el.confirmBtn.removeAttr("disabled");
                }
			});
			
			//确定
			$('body').on('tap','.btn_box .btn',function(){
				if(!!that.gV.bankAccountMask){
					that.checkPayType()
					
				}else{
					//未选择银行卡提示信息
					tipAction("请选择银行卡！");
					return
				}
			}) ;
			// $("#pwd-input").on("input", function() {
			// 	var password = $('#pwd-input').val() //密码
			// 	if(password.length == 6){
			// 		that.gV.password = password;
			// 		// $(".popup-password").show()
			// 		that.checkPassword()

			// 	}
			// })
			if(that.gV.type == 'add'){
				payPass(that.checkPassword);
			}
			if(that.gV.type == 'edit'){
				payPass(that.checkPassword_edit);
			}
			

			//  ---忘记密码
			$('body').on('tap','#passwordWrap .forgetP',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url
			}) ;
			//密码校验不通过   ---取消
			$('body').on('tap','.elasticCel',function(){
				$('.popup').css('display','none')
				$('.popup-password').css('display','none')
			}) ;
			//密码校验不通过   ---忘记密码
			$('body').on('tap','.error1 .elasticCel',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url
			}) ;
			//密码校验不通过   ---重新输入
			$('body').on('tap','.error1 .elasticYes',function(){
				$('.popup-password').css('display','none')
				$(".pwd-input").val('')
				$(".fake-box input").val('');
			}) ;
			//密码校验不通过   ---找回密码
			$('body').on('tap','.error2 .elasticYes',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofRetrievePassword_url
			}) ;

			//添加银行卡 -- 跳往原生
			$('body').on('tap','.popup-last',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofAddBankCard_url
			}) ;

		},


	};
	//调用函数
	regulatory.webinit();

})
