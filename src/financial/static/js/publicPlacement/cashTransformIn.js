/**  
* @Page:  现金管理 -- 转入
* @Author: yangjinlai
* @Date:   2019-11-25
* 
*/

require('@pathCommonBase/base.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
require('@pathCommonCom/elasticLayer/transOutRule/transOutRule.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

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
			bankAccountSecret:'',  // 银行账号
			bankNo: '',  //银行代码
			password: "",
			tradeAcco: '' , //交易账号
			tradeSource: '' , //交易账号
			singleNum:0,
			minValue:0,
			doubleClickStatus:false,
		},
		webinit: function () {
			var that = this;

			//
			that.events();
			that.getData();
			that.getAgreeUrl();
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
						var data = json.data;
						var tradeLimitList2 = [];

						$("#loading").hide();
						that.$el.fundName.html(data.fundName);
						that.$el.fundCode.html(data.fundCode);
						that.$el.startGainsDayStr.html(data.startGainsDayStr);
						that.$el.paymentGainsDayStr.html(data.paymentGainsDayStr);
						that.gV.fundName = data.fundName;
						that.gV.fundCode = data.fundCode;
						that.gV.minValue = data.purchaseAmount ? Number(data.purchaseAmount) : 0;						
						that.$el.transformInput.attr('placeholder',Number(data.payAgainAmount).toFixed(0)+"元起");
						// for (var index = 0; index < data.tradeLimitList.length; index++) {
						// 	if(that.gV.fundBusinCode ==  data.tradeLimitList[index].fundBusinCode){
						// 	   that.$el.transformInput.attr('placeholder',data.tradeLimitList[index].minValue)
						// 	   that.$el.transformInput.attr('min',Number(data.tradeLimitList[index].minValue).toFixed(2))
						// 	   that.$el.transformInput.attr('max',Number(data.tradeLimitList[index].maxValue).toFixed(2))
						// 	}
							
						// }
						
					}
                  
                }

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
						data.forEach(function(element) {
							element.after4Num = element.bankAccountMask.substr(element.bankAccountMask.length -4);
							element.singleNum_w = Number(element.singleNum)/10000 + '万';
							element.oneDayNum_w = Number(element.oneDayNum)/10000 + '万';
						});
						generateTemplate(data, that.$el.popupUl, that.$el.bankListTemplate,true);
						$("#loading").hide();
						$('.popup').css('display','block');
						that.gV.doubleClickStatus = true;
					}
                  
				},
				callbackNoData:function(json){
					generateTemplate("", that.$el.popupUl, that.$el.bankListTemplate,true);
						$("#loading").hide();
						$('.popup').css('display','block');
						that.gV.doubleClickStatus = true;

				}
            }];
            $.ajaxLoading(obj);
		},

		//获取告知书，招募书链接
		getAgreeUrl: function() {
            var that = this;

            var obj = [{ 
                url: site_url.fundMaterial_api,
                data: {
					fundCode:that.gV.fundCode,
					// fundCode:"003075",
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
					if(json.status == '0000'){
						// 将列表插入到页面上
						var data = [] ;
						data = json.data;
						data.forEach(function(element){
							if(element.materialType == '1'){
								that.$el.contract.attr('datalink',element.linkAddress);
								that.$el.contract.attr('type','1');
							}
							if(element.materialType == '2'){
								that.$el.recruiting.attr('datalink',element.linkAddress);
								that.$el.recruiting.attr('type','2');
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
						that.$el.confirmBtn.removeAttr("disabled");

					}else{
						tipAction(json.message);
					that.$el.confirmBtn.removeAttr("disabled");
					}
					
				},
				callbackNoData:function(json){
					tipAction(json.message);
					that.$el.confirmBtn.removeAttr("disabled");					
                },
                callbackFail:function(json){
					tipAction(json.message);
					that.$el.confirmBtn.removeAttr("disabled");
                }

			}];
			$.ajaxLoading(obj);
		},
		//校验密码
		checkPassword: function(val) {
			var that = regulatory;
			regulatory.gV.password = val;
			var obj = [{ 
				url: site_url.pofCashBuy_api,
				data: {
					fundCode:that.gV.fundCode,
					fundName:that.gV.fundName,
					balance:that.gV.balance,
					bankNo:that.gV.bankNo,
					bankAccount:that.gV.bankAccountSecret,
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
					console.log('data',data);
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
						 that.$el.elasticTxt.html(json.message);
					 }else if(json.status == 'POF0192' || json.status == 'POF1353'){
							 //密码锁定
						 $(".popup-password").show();
						 $(".elasticButtons.error2").show();
						 that.$el.elasticTxt.html(json.message);
					 }else if(json.status == 'POF1101' || json.status == 'POF1907' || json.status == 'POF1152' || json.status == 'POF3123'
					 || json.status == 'POF4609' || json.status == 'POF7453' || json.status == 'POF7457' || json.status == 'POF9020'
					 || json.status == 'POF9036'){
						 //余额不足
						 $(".popup-password").show();
						 $(".elasticButtons.error2").show();
						 that.$el.elasticTxt.html(json.message);
					 }else if(json.status == 'POF0103'){
						 //基金状态[停止交易],不能做[赎回]交易
						 $(".popup-password").show();
						 $(".elasticButtons.error2").show();
						 that.$el.elasticTxt.html(json.message);
					 }else if(json.status == 'POF1217'){
						 //是代表账号锁定 弹后台msg框
						 $(".popup-password").show();
						 $(".elasticButtons.error3").show();
						 that.$el.elasticTxt.html(json.message);
					 }else if(json.status == 'POF1857'){
						 //提示单日单账户限额
						 $(".popup-password").show();
						 $(".elasticButtons.error3").show();
						 that.$el.elasticTxt.html(json.message);
					 }else{
						 $(".popup-password").show();
						 $(".elasticButtons.error3").show();
						 that.$el.elasticTxt.html(json.message);
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
			mui("body").on('mdClick','.paymoney',function(){
				$(".imgc").hide();
				$(".iimg").show();
				that.gV.payType = $(this).attr('pay-type');
				var operationType = $(this).attr('pay-type');
				$("#loading").show();
				$(this).find(".imgc").show();
				$(this).find(".iimg").hide();
				that.getBankCard(operationType);
			}, {
				htmdEvt: 'cashTransformIn_01'
			}) 

			mui("body").on('mdClick','.popup-close',function(){
				$('.popup').css('display','none');
				$('.popup-password').css('display','none');
			}, {
				htmdEvt: 'cashTransformIn_02'
			}) 

			mui("body").on('mdClick','.popup-mask',function(){
				$('.popup').css('display','none');
				$('.popup-password').css('display','none');
			}, {
				htmdEvt: 'cashTransformIn_03'
			}) 

			//点击转出规则
			mui("body").on('mdClick','.goRule',function(){
				window.location.href = site_url.pofTransactionRules_url + '?fundCode=' + that.gV.fundCode;
			}, {
				htmdEvt: 'cashTransformIn_04'
			}) 
			
			$("#transformInput").on('input propertychange',function(){
				that.gV.balance = Number($(this).val()).toFixed(2);
				if($(this).val().includes(".") && $(this).val().split(".")[1].length >2){
					tipAction('只能输入两位小数');
					return
				}
				
			})
			//清除输入框数字
			mui("body").on('mdClick','.deleteNum',function(){
				$('.transformInput').val(null);
			}, {
				htmdEvt: 'cashTransformIn_05'
			}) ;

			//选中银行卡
			mui("body").on('mdClick','.bank-li',function(){
				$(".bank-li .true").hide();
				$(this).find(".true").show();
				that.gV.bankName = $(this).attr('bankName');
				that.gV.bankNo = $(this).attr('bankNo');
				that.gV.tradeAcco = $(this).attr('tradeAcco');
				that.gV.tradeSource = $(this).attr('tradeSource');
				that.gV.bankAccount = $(this).attr('bankAccount');
				that.gV.bankAccountSecret = $(this).attr('bankAccountSecret');
				that.gV.capitalMode = $(this).attr('capitalMode');
				that.gV.singleNum = $(this).attr('singleNum');
				var data = [];
				data.push({
					bankThumbnailUrl:$(this).attr('bankThumbnailUrl'),
					bankName:$(this).attr('bankName'),
					bankNo:$(this).attr('bankNo'),
					singleNum:$(this).attr('singleNum'),
					oneDayNum:$(this).attr('oneDayNum'),
					after4Num:$(this).attr('after4Num'),
					singleNum_w:Number($(this).attr('singleNum'))/10000 + '万',
					oneDayNum_w:Number($(this).attr('oneDayNum'))/10000 + '万',
				});
				generateTemplate(data, that.$el.onlinepay, that.$el.bankListCheckTemplate,true);
				setTimeout(function(){
					$('.popup').css('display','none');
				},500)
			}, {
				htmdEvt: 'cashTransformIn_06'
			}) 

			//点击同意协议
			mui("body").on("mdClick", ".item2 .iconfont", function (e) {
				$("#transformInput").blur();
				if ($(this).hasClass("check")) {
					$(this).removeClass("check").html('&#xe668;');
					that.$el.confirmBtn.attr('disabled',true);
                } else {
					$(this).addClass("check").html('&#xe669;');
					that.$el.confirmBtn.removeAttr("disabled");
                }
			},{
				htmdEvt: 'cashTransformIn_07'
            });
			
			//确定
			mui("body").on('mdClick','.btn_box .btn',function(){
				var val = $("#transformInput").val();
				if(val==""){
					tipAction("转入金额不能为空");
					return
				}
				if(!!that.gV.bankAccountSecret){
			//		if(Number(that.gV.singleNum)<Number(that.gV.minValue)){
			//			tipAction("银行卡限额"+that.gV.singleNum + '元')
			//			return
			//		}
					if(!!that.gV.minValue){
						if(Number(that.gV.balance) < Number(that.gV.minValue)){
							tipAction('单笔金额不能小于' + that.gV.minValue + '元');
							return
						}else{
							if(Number(that.gV.balance) > Number(that.gV.singleNum)){
								tipAction('单笔金额不能超过' + that.gV.singleNum + '元');
								return
							}
						}
					}
				//	if(Number(that.gV.balance) > Number(that.gV.singleNum)){
				//		tipAction('单笔金额不能超过' + that.gV.singleNum + '元')
				//		return
				//	}
 				    that.$el.confirmBtn.attr('disabled',true)
					that.checkPayType()
					// that.$el.confirmBtn.removeAttr("disabled");
				}else{
					//未选择银行卡提示信息
					tipAction("请选择银行卡！");
					return
				}
			}, {
				htmdEvt: 'cashTransformIn_08'
			}) ;
			
			//  ---《公募基金风险揭示及售前告知书》
			mui("body").on('mdClick','.setGoUrl',function(){
				window.location.href = site_url.superContent_url + '?id=47';
			}, {
				htmdEvt: 'cashTransformIn_09'
			}) ;
			
			//  ---忘记密码
			mui("body").on('mdClick','#passwordWrap .forgetP',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url;
			}, {
				htmdEvt: 'cashTransformIn_10'
			}) ;
			//密码校验不通过   ---取消
			mui("body").on('mdClick','.elasticCel',function(){
				$(".pwd-input").val('');
				$(".fake-box input").val('');
				$('#passwordWrap').css('display','none');
				$('.popup-password').css('display','none');
				
			}, {
				htmdEvt: 'cashTransformIn_11'
			}) ;
			//密码校验不通过   ---忘记密码
			mui("body").on('mdClick','.error1 .elasticCel',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url;
			}, {
				htmdEvt: 'cashTransformIn_12'
			}) ;
			//密码校验不通过   ---重新输入
			mui("body").on('mdClick','.error1 .elasticYes',function(){
				$(".pwd-input").val('');
				$(".fake-box input").val('');
				$('.popup-password').css('display','none');
			}, {
				htmdEvt: 'cashTransformIn_13'
			}) ;
			//密码校验不通过   ---找回密码
			mui("body").on('mdClick','.error2 .elasticYes',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url;
			}, {
				htmdEvt: 'cashTransformIn_14'
			}) ;
			//密码校验不通过   ---重新输入
			mui("body").on('mdClick','.error3 .elasticYes',function(){
				$(".pwd-input").val('');
				$(".fake-box input").val('');
				$('.popup-password').css('display','none');
			}, {
				htmdEvt: 'cashTransformIn_15'
			}) ;

			//添加银行卡 -- 跳往原生
			mui("body").on('mdClick','.popup-last',function(){
				//判断是否是在线支付
				var isonline = that.gV.payType==0?"?supportOnline=true":"";
				//跳往原生页面去修改密码
				if(that.gV.doubleClickStatus){
                    window.location.href = site_url.pofAddBankCard_url+isonline;
				}
				
			}, {
				htmdEvt: 'cashTransformIn_16'
			}) ;

			//  ---《基金合同》《招募说明书》
			mui("body").on('mdClick','.goPreview',function(){
				var link = $(this).attr('datalink');
				var links=link.split("?");
			    var fileNames=links[0].substring(links[0].lastIndexOf('.'));
				var typInfo = $(this).attr('type') == '1' ? '基金合同' : '招募说明书';
				window.location.href = link +'&fileName=' + new Base64().encode(typInfo+fileNames);
			}, {
				htmdEvt: 'cashTransformIn_17'
			}) ;
			//返回按钮
			mui("body").on('mdClick',"#goBack",function(){
				
			})
			//  ---
			mui("body").on('mdClick','.container',function(e){
				// debugger
				var o = e.target || e.srcElement;//当前点击对象
					if (o != document.getElementById("transformInput")) {
						//隐藏键盘操作
						$("#transformInput").blur();
					}else{
						$("#transformInput").focus();
					}
			}, {
				htmdEvt: 'cashTransformIn_18'
			}) ;
		
		}



	};
	//调用函数
	regulatory.webinit();

})
