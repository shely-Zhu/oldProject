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

require('@pathCommonJs/components/headBarConfig.js');

require('@pathCommonCom/elasticLayer/transOutRule/transOutRule.js');
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
			CostEstimate: $(".CostEstimate .num"), // 费用估算
			payConfirmDate: $(".payConfirm .date"),  //购买确认日
			brforre15Date: $(".brforre15 .date"),  // 15点之后交易日
			popupUl: $('.popup-ul'), // 银行卡模板容器
			bankListTemplate: $('#bankList-template'), //银行卡模板
			onlinepay: $('.onlinepay .onright-left'), // 在线支付银行卡模板容器
			remittance: $('.remittance .onright-left'), // 汇款支付银行卡模板容器
			bankListCheckTemplate: $('#bankListCheck-template'), //选中银行卡模板
			iconCheck: $(".item2 .iconfont"), //同意协议选择框
			contract: $(".file .contract"), //同意协议选择框
			recruiting: $(".file .recruiting"), //同意协议选择框
			confirmBtn: $(".btn_box .btn"), //确定按钮
			elasticTxt:$(".popup-password .elasticTxt")
		},
		gV: { // 全局变量
			fundBusinCode: '022',
			fundStatus: '', //基金状态
			balance: 0, //发生金额
			purchaseRate: 0,  // 购买费率 
			discount: '',  //折扣率
			feeCalcMed: '',  //费率类型
			feeRateList: [], //费率
			fundName: splitUrl['fundName'] ? splitUrl['fundName'] : null,   //基金名称
			fundCode: splitUrl['fundCode'] ? splitUrl['fundCode'] : '000847',  //基金代码
			tradeSource: splitUrl['tradeSource'] ? splitUrl['tradeSource'] : null, //交易来源
			capitalMode: '', //资金方式
			payType: '',   //支付方式（0、在线支付 1、汇款支付）
			bankName: '',  // 银行名称
			bankAccountSecret: '', // 银行账号
			bankNo: '',  //银行代码
			password: "",
			tradeAcco: ''  //交易账号
		},
		webinit: function () {
			var that = this;

			//
			that.events();
			that.getData();
			that.getAgreeUrl()
		},

		//获取基金数据
		getData: function (t) {
			var that = this;

			var obj = [{
				url: site_url.newfundDetails_api,
				data: {
					"fundCode": that.gV.fundCode,
					"tradeSource": that.gV.tradeSource,
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function (json) {
					if (json.status == '0000') {
						var data = json.data;
						$("#loading").hide()
						that.$el.fundName.html(data.chiName)
						that.$el.fundCode.html(data.trdCode)
						that.$el.payConfirmDate.html(data.fundConfirmDate)
						that.$el.brforre15Date.html(data.after15tradeDate)
						that.gV.fundName = data.chiName
						that.gV.fundCode = data.trdCode
						that.gV.discount = Number(data.discount);
						that.gV.feeRateList = data.fundPurchaseFeeRate.detailList;
						that.gV.fundStatus = data.fundStatus
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
		//校验密码
		checkPassword: function(val) {
			var that = regulatory;
			regulatory.gV.password = val
			var obj = [{ 
				url: site_url.pofPayment_api,
				data: {
					operationType:that.gV.payType,
					fundStatus:that.gV.fundStatus,
					fundCode:that.gV.fundCode,
					fundName:that.gV.fundName,
					balance:that.gV.balance,
					bankNo:that.gV.bankNo,
					bankAccount:that.gV.bankAccountSecret,
					tradeAcco:that.gV.tradeAcco,
					capitalMode:that.gV.capitalMode,
					password:val,
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function(json) {
					$(".elasticButtons").hide();
					// 将列表插入到页面上
					var data = [] ;
					data = json.data;
					if(json.status == '0000'){
					   window.location.href = site_url.pofSurelyResultsDetail_url + '?applyId=' + data.allotNo + '&fundBusinCode=' + 
					   data.fundBusinCode + "&fundCode=" + that.gV.fundCode + "&payType=" +that.gV.payType;
					}else if(json.status == 'POF1186' || json.status == 'POF1186'){
						//密码错误
						$(".elasticButtons.error1").show();
						that.$el.elasticTxt.html(json.message)
					}else if(json.status == 'POF0192' || json.status == 'POF1353'){
							//密码锁定
						$(".elasticButtons.error2").show();
						that.$el.elasticTxt.html(json.message)
					}else if(json.status == 'POF1101' || json.status == 'POF1907' || json.status == 'POF1152' || json.status == 'POF3123'
					|| json.status == 'POF4609' || json.status == 'POF7453' || json.status == 'POF7457' || json.status == 'POF9020'
					|| json.status == 'POF9036'){
						//余额不足
						$(".elasticButtons.error2").show();
						that.$el.elasticTxt.html(json.message)
					}else if(json.status == 'POF0103'){
						//基金状态[停止交易],不能做[赎回]交易
						$(".elasticButtons.error2").show();
						that.$el.elasticTxt.html(json.message)
					}else if(json.status == 'POF1217'){
						//是代表账号锁定 弹后台msg框
						$(".elasticButtons.error3").show();
						that.$el.elasticTxt.html(json.message)
					}else if(json.status == 'POF1857'){
						//提示单日单账户限额
						$(".elasticButtons.error3").show();
						that.$el.elasticTxt.html(json.message)
				    }else{
						$(".elasticButtons.error3").show();
						that.$el.elasticTxt.html(json.message)
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
				console.log('this.val',$(this).val())
				that.gV.balance = $(this).val();
				for (var i = 0; i < that.gV.feeRateList.length; i++) {
					//先判断 计算方式
					if (that.gV.feeRateList[i].feeCalcMed == '1') {//固定费用 (最多有一条此数据)
						if (Number($(this).val()) >= Number(that.gV.feeRateList[i].minValue).toFixed * 10000) {//当前输入Money 小于等于 此区间最小值
							that.gV.purchaseRate= Number(that.gV.feeRateList[i].maxRate).toFixed;//将此区间费用赋值给rate
							that.gV.feeCalcMed = "1";
						}
					} else if (that.gV.feeRateList[i].feeCalcMed == '2') {//固定费率
						if (Number($(this).val()) < Number(that.gV.feeRateList[i].maxValue).toFixed * 10000 && Number($(this).val()) >= Number(that.gV.feeRateList[i].minValue).toFixed * 10000) {//当前输入Money 属于此区间
							that.gV.purchaseRate = Number(that.gV.feeRateList[i].maxRate).toFixed / 100;//将此区间费率赋值给rate   需要除以100是 其值
							that.gV.feeCalcMed = "2";
						}
					}
				}
				var value = 0;
				if(that.gV.feeCalcMed == "1"){
					value = Number($(this).val())
				}
				if(that.gV.feeCalcMed == "2"){
				   var rate = that.gV.purchaseRate/100 * that.gV.discount/100
				   value = Number($(this).val())*(1-1/(1 + rate))
				}
				
				that.$el.CostEstimate.html(value)
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
				that.gV.bankAccountSecret = $(this).attr('bankAccountSecret');
				that.gV.capitalMode = $(this).attr('capitalMode')
				var data = []
				data.push({
					bankThumbnailUrl:$(this).attr('bankThumbnailUrl'),
					bankName:$(this).attr('bankName'),
					bankNo:$(this).attr('bankNo'),
					singleNum:$(this).attr('singleNum'),
					oneDayNum:$(this).attr('oneDayNum')
				})

				if(that.gV.payType == '0'){
					generateTemplate(data, that.$el.onlinepay, that.$el.bankListCheckTemplate,true);
					debugger
					that.$el.remittance.html('')
				}
				if(that.gV.payType == '1'){
					generateTemplate(data, that.$el.remittance, that.$el.bankListCheckTemplate,true);
					that.$el.onlinepay.html('')
				}
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
				if(!!that.gV.bankAccountSecret){
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
			payPass(that.checkPassword);

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

		},



	};
	//调用函数
	regulatory.webinit();

})
