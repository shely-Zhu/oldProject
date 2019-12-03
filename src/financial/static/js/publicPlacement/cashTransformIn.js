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
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
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
			startGainsDayStr: $(".startGainsDayStr"),  //开始收益，
			paymentGainsDayStr: $(".paymentGainsDayStr"),  //收益到账
			popupUl: $('.popup-ul'), // 银行卡模板容器
			bankListTemplate: $('#bankList-template'), //银行卡模板
			onlinepay: $('.onlinepay .onright-left'), // 在线支付银行卡模板容器
			bankListCheckTemplate: $('#bankListCheck-template'), //选中银行卡模板
			iconCheck: $(".item2 .iconfont"), //同意协议选择框
			contract: $(".file .contract"), //同意协议选择框
			recruiting: $(".file .recruiting"), //同意协议选择框
			confirmBtn: $(".btn_box .btn"), //确定按钮
			elasticTxt:$(".popup-password .elasticTxt")
		},
		gV: { // 全局变量
			fundBusinCode: '022',
			fundName: splitUrl['fundName'] ? splitUrl['fundName'] : null,   //基金名称
			fundCode: splitUrl['fundCode'] ? splitUrl['fundCode'] : null,  //基金代码
			capitalMode: '', //资金方式
			payType: '',   //支付方式（0、在线支付 1、汇款支付）
			bankName: '',  // 银行名称
			bankAccount: '', // 银行账号
			bankNo: '',  //银行代码
			password: "",
			tradeAcco: '' , //交易账号
			tradeSource: ''  //交易账号
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
				url: site_url.pofCashToBuy_api,
				data: {
					"fundCode": that.gV.fundCode,
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function (json) {
					if (json.status == '0000' || json.status == '4000') {
						// var data = json.data;
						var data={
							"startGainsDayStr":"03月23日",// 预计开始计算收益时间
							"paymentGainsDayStr":"03月24日",// 预计收益到账时间
							"purchaseAmount":"10000.00",// 起投金额
							"purchaseAmountMask":"10,000.00",//起投金额千分位显示
							"payAgainAmount":"1000.00",// 追加金额
							"payAgainAmountMask":"1,000.00",//追加金额千分位
							"fundCode": "003075",
							"fundName": "恒添宝",  
							"annYldRat": "3.84",// 七日年化收益率
							 "unitYld": "0.9723",// 万分收益
							"trdDt": "2017-04-07" // 万分 年化 发布日期
						   }
					
						$("#loading").hide()
						that.$el.fundName.html(data.fundName)
						that.$el.fundCode.html(data.fundCode)
						that.$el.startGainsDayStr.html(data.startGainsDayStr)
						that.$el.paymentGainsDayStr.html(data.paymentGainsDayStr)
						that.gV.fundName = data.fundName
						that.gV.fundCode = data.fundCode
						that.$el.transformInput.attr('placeholder',data.purchaseAmountMask)
						// for (var index = 0; index < data.tradeLimitList.length; index++) {
						// 	if(that.gV.fundBusinCode ==  data.tradeLimitList[index].fundBusinCode){
						// 	   that.$el.transformInput.attr('placeholder',data.tradeLimitList[index].minValue)
						// 	   that.$el.transformInput.attr('min',Number(data.tradeLimitList[index].minValue).toFixed(2))
						// 	   that.$el.transformInput.attr('max',Number(data.tradeLimitList[index].maxValue).toFixed(2))
						// 	}
							
						// }
						
					}
                  
                },

            }];
            $.ajaxLoading(obj);
		},

		//获取银行列表
		getBankCard: function(operationType) {
            var that = this;
            var obj = [{ 
                url: site_url.cashList_api,
                data: {
					operationType:operationType,
					code:that.gV.fundCode,
					
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
						payPass(that.checkPassword);
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
				url: site_url.pofCashBuy_api + '/mock',
				data: {
					fundCode:that.gV.fundCode,
					fundName:that.gV.fundName,
					balance:that.gV.balance,
					bankNo:that.gV.bankNo,
					bankAccount:that.gV.bankAccount,
					tradeAcco:that.gV.tradeAcco,
					capitalMode:that.gV.capitalMode,
					password:val,
					tradeSource:that.gV.tradeSource,
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function(json) {
					$(".elasticButtons").hide();
					// 将列表插入到页面上
					var data = [] ;
					data = json.data;
					console.log('data',data)
					if(json.status == '0000'){
					   window.location.href = site_url.pofSurelyResults_url + '?allotNo=' + data.allotNo + '&flag=into';
					}
				},
				callbackNoData:function(json){
					tipAction(json.message);
				},
				callbackFail:function(json){
					$(".elasticButtons").hide();
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
				var operationType = $(this).attr('pay-type')
				$("#loading").show()
				$(this).find(".imgc").show();
				$(this).find(".iimg").hide();
				that.getBankCard(operationType)
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
				that.gV.tradeSource = $(this).attr('tradeSource');
				that.gV.bankAccount = $(this).attr('bankAccount');
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
				if(!!that.gV.bankAccount){
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
			

			//  ---忘记密码
			$('body').on('tap','#passwordWrap .forgetP',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url
			}) ;
			//密码校验不通过   ---取消
			$('body').on('tap','.elasticCel',function(){
				$('#passwordWrap').css('display','none')
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
			//密码校验不通过   ---重新输入
			$('body').on('tap','.error3 .elasticYes',function(){
				$('.popup-password').css('display','none')
				$(".pwd-input").val('')
				$(".fake-box input").val('');
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
