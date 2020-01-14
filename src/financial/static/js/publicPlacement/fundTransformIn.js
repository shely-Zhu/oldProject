/**
* @Page:  现金管理 -- 转入
* @Author: yangjinlai
* @Date:   2019-11-25
*
@Author: caoqihai
* @Date:   2020-1-11  修改输入密码后收起软键盘
*/

require('@pathCommonBase/base.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonCom/elasticLayer/transOutRule/transOutRule.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
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
			popupUl2: $('.popup-ul2'), // 基金模板容器
			bankListTemplate: $('#bankList-template'), //银行卡模板
			bankListTemplate2: $('#bankList-template2'), //银行卡模板
			onlinepay: $('.onlinepay .onright-left'), // 在线支付银行卡模板容器
			remittance: $('.remittance .onright-left'), // 汇款支付银行卡模板容器
			bankListCheckTemplate: $('#bankListCheck-template'), //选中银行卡模板
			fundListCheckTemplate: $('#fundListCheck-template'), //选中基金支付模板
			iconCheck: $(".item2 .iconfont"), //同意协议选择框
			contract: $(".file .contract"), //同意协议选择框
			recruiting: $(".file .recruiting"), //同意协议选择框
			confirmBtn: $(".btn_box .btn"), //确定按钮
			elasticTxt:$(".popup-password .elasticTxt"),
			popupTitle:$(".popup .bank-title"),  //银行卡弹窗标题
		},
		gV: { // 全局变量
			fundBusinCode: '022',
			fundStatus: '', //基金状态
			balance: 0, //发生金额
			purchaseRate: 0,  // 购买费率
			minValue:0,    // 起投金额
			maxValue:0,    // 最大金额
			discount: '',  //折扣率
			feeCalcMed: '',  //费率类型
			feeRateList: [], //费率
			fundName: splitUrl['fundName'] ? splitUrl['fundName'] : null,   //基金名称
			fundCode: splitUrl['fundCode'] ? splitUrl['fundCode'] : null,  //基金代码
			capitalMode: '', //资金方式
			payType: '',   //支付方式（0、在线支付 1、汇款支付）
			bankName: '',  // 银行名称
			bankAccountSecret: '', // 银行账号
			bankNo: '',  //银行代码
			password: "",
			tradeAcco: ''  ,//交易账号
			singleNum:0,   //单日限额
			fundOrBank:'',  // 在线支付中  银行卡支付 1   基金支付  2
			bugFundName:"", //在线支付为 基金支付时 的基金名称
			enableAmount:0,  //选择基金支付 可用余额
			accountType:null,   //客户类型  0-机构 1-个人
			doubleClickStatus:false,
			buyFundCode:"",  // 在线支付选货币基金的基金代码
		},
		webinit: function () {
			var that = this;

			//
			that.events();
			that.getData();
			that.getAgreeUrl();
			that.getUserInfo();
			that.getUserInfo_1();
		},
		// 获取客户类型
        getUserInfo: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.queryUserBaseInfo_api,
                data: {
                },
                callbackDone: function (json) {
                    var data = json.data;
                    that.gV.accountType = data.accountType;
                }
            }]
            $.ajaxLoading(obj);
		},
		//获取用户信息
		getUserInfo_1:function(){
			var that = this;
			var obj = [{
				url:site_url.user_api,
				data:{

				},
				callbackDone:function(json){
					var data = json.data;
					if(data.investFavour=="0"){
						//普通投资
						$(".setGoUrl").show();
						$(".raskBook").hide();
					}else{
						$(".setGoUrl").hide();
						$(".raskBook").show();
					}
				}
			}];
			$.ajaxLoading(obj);
		},
		//获取基金数据
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
					if (json.status == '0000') {
						var data = json.data;
						$(".listLoading").hide();
						that.$el.fundName.html(data.secuSht);
						that.$el.fundCode.html(data.trdCode);
						that.$el.payConfirmDate.html(data.fundConfirmDate);
						that.$el.brforre15Date.html(data.g2gafter15tradeDate);
						that.gV.fundName = data.secuSht;
						that.gV.fundCode = data.trdCode;
						if(!!data.discount){
							//有费率
							that.gV.discount = Number(data.discount);
						}else{
							that.gV.discount = "";
						}

						that.gV.feeRateList = data.fundPurchaseFeeRate.detailList;
						that.gV.fundStatus = data.fundStatus;
						if(data.invTypCom == 10800){
							$(".warnInfo").show();
						}
						var tradeLimitList2 = []
						for (var index = 0; index < data.tradeLimitList.length; index++) {
							if(that.gV.fundBusinCode ==  data.tradeLimitList[index].fundBusinCode){
								tradeLimitList2.push(data.tradeLimitList[index]);
							}
						}
						for (var i = 0; i < tradeLimitList2.length; i++) {
							if(i + 1 == tradeLimitList2.length){
								that.$el.transformInput.attr('placeholder',Number(tradeLimitList2[i].minValue).toFixed(0) + '元起');
								that.$el.transformInput.attr('min',Number(tradeLimitList2[i].minValue).toFixed(0));
								that.$el.transformInput.attr('max',Number(tradeLimitList2[i].maxValue).toFixed(0));
								that.gV.minValue =   Number(tradeLimitList2[i].minValue).toFixed(0);  // 起投金额
								that.gV.maxValue = Number(tradeLimitList2[i].maxValue).toFixed(0);  // 最大金额
							}

						}
						that.getCostEstimate(that.gV.minValue);

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
                async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
					if(json.status == '0000'){
						// 将列表插入到页面上
						$(".listLoading").hide();
						$('.popup').css('display','block');
						that.gV.doubleClickStatus = true;
						if(useEnv == '0'){
							that.$el.popupTitle.html('选择在线支付银行卡');
						}else{
							that.$el.popupUl2.html('');
							that.$el.popupTitle.html('选择汇款支付银行卡');
						}
						var data = [] ;
						data = json.data.pageList;
						data.forEach(function(element){
							element.after4Num = element.bankAccountMask.substr(element.bankAccountMask.length -4);
							element.singleNum_w = Number(element.singleNum)/10000 + '万';
							element.oneDayNum_w = Number(element.oneDayNum)/10000 + '万';
						});
						generateTemplate(data, that.$el.popupUl, that.$el.bankListTemplate,true);
						if(that.gV.payType == '0'){
							$(".bank-pay").show();
							$(".onright-left-two").show();
							$(".onright-left").removeClass("onright-left-one-one");
						} else if(that.gV.payType == '1') {
							$(".bank-pay").hide();
							$(".onright-left-two").hide();
							$(".onright-left").addClass("onright-left-one-one");
						}
						if(useEnv == '1'){//转账汇款隐藏限额。
							that.$el.bankListTemplate.find(".bank-pay").hide();
						}else{
							that.$el.bankListTemplate.find(".bank-pay").show();
						}

					}

				},
				callbackNoData:function(json){
						$('.popup').css('display','block');
						that.gV.doubleClickStatus = true;
						if(useEnv == '0'){
							that.$el.popupTitle.html('选择在线支付银行卡');
						}else{
							that.$el.popupUl2.html('');
							that.$el.popupTitle.html('选择汇款支付银行卡');
						}
						generateTemplate("", that.$el.popupUl, that.$el.bankListTemplate,true);
						if(useEnv == '1'){//转账汇款隐藏限额。
							that.$el.bankListTemplate.find(".bank-pay").hide();
						}else{
							that.$el.bankListTemplate.find(".bank-pay").show();
						}
					tipAction(json.message);
				}

            }];
            $.ajaxLoading(obj);
		},
		//获取可转换基金列表
		getTransferFunds: function() {
			var that = this;
			var obj = [{
				url: site_url.queryFundTransferAssetsDetail_api,
				data: {
					type:2
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function(json) {
					if(json.status == '0000'){
						// 将列表插入到页面上
						var data = [];
						data = json.data;
						console.log('data',data);
						data.forEach(function(element){
							element.after4Num = element.bankAccout.substr(element.bankAccout.length -4);
						});
						generateTemplate(data, that.$el.popupUl2, that.$el.bankListTemplate2,true);

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
						var data = [];
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
					}else{
						tipAction(json.message);
					}

				},

			}];
			$.ajaxLoading(obj);
		},
		//校验密码
		checkPassword: function(val) {
			$('input').blur();
			var that = regulatory;
			regulatory.gV.password = val;
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
				// async: true,
				needDataEmpty: true,
				callbackDone: function(json) {
					// 将列表插入到页面上

					var data = [] ;
					data = json.data;

					if(json.status == '0000'){
						if(!!that.gV.bugFundName){
							window.location.href = site_url.pofSurelyResultsDetail_url + '?applyId=' + data.allotNo + '&fundBusinCode=' +
							data.fundBusinCode + "&fundCode=" + that.gV.fundCode + "&payType=" +that.gV.payType + '&flag=buy'+'&bugFundName='+encodeURI(that.gV.bugFundName);
						}else{
							window.location.href = site_url.pofSurelyResultsDetail_url + '?applyId=' + data.allotNo + '&fundBusinCode=' +
							data.fundBusinCode + "&fundCode=" + that.gV.fundCode + "&payType=" +that.gV.payType + '&flag=buy'+'&bugFundName=false';
						}

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
			if(that.gV.fundOrBank == '2'){
  					obj[0].data.sourcefundcode = that.gV.buyFundCode;
  				}
			$.ajaxLoading(obj);
		},
		//费用计算
		getCostEstimate:function(val){
			var that = this;
			var value = 0;  //估算费用
			// that.gV.purchaseRate = ''  // 折扣前的费率
			var value2 = 0;
			var discountMount = 0;

			var str = '';   //估算费用描述
			for (var i = 0; i < that.gV.feeRateList.length; i++) {
				if(that.gV.feeRateList.length==1&& Number(that.gV.feeRateList[0].maxRate) == 0){
					var str = "0.00元(0.00%)";
					that.$el.CostEstimate.html(str);
					return
				}else{
					//先判断 计算方式
					if (that.gV.feeRateList[i].feeCalcMed == '1') {//固定费用 (最多有一条此数据)
						if (Number(val) >= Number(that.gV.feeRateList[i].minValue) * 10000) {//当前输入Money 小于等于 此区间最小值
							that.gV.purchaseRate= Number(that.gV.feeRateList[i].maxRate);//将此区间费用赋值给rate
							that.gV.feeCalcMed = "1";
						}
					} else if (that.gV.feeRateList[i].feeCalcMed == '2') {//固定费率
						if (Number(val) < Number(that.gV.feeRateList[i].maxValue) * 10000 && Number(val) >= Number(that.gV.feeRateList[i].minValue) * 10000) {//当前输入Money 属于此区间
							that.gV.purchaseRate = Number(that.gV.feeRateList[i].maxRate) / 100;//将此区间费率赋值给rate   需要除以100是 其值
							that.gV.feeCalcMed = "2";
						}
					}

				}

			}

			if(that.gV.feeCalcMed == "1"){
				value = Number(val);
				str = that.gV.purchaseRate + '元';
			}else{
				if(!!that.gV.discount){
					//有费率
					if(Number(that.gV.discount)/100 == 1){
						str = value + '元' +'(' + (that.gV.purchaseRate).toFixed(2) + '%)';
					}else{
						var rate = that.gV.purchaseRate * that.gV.discount/100;
						value = (Number(val)*(1-1/(1 + Number(rate)))).toFixed(2);
						value2 = (Number(val)*(1-1/(1 + that.gV.purchaseRate))).toFixed(2);
						discountMount = (Number(value2) - Number(value)).toFixed(2);
						str = value + '元&nbsp;' + '(<span class="line-rate">' + that.gV.purchaseRate*100 + '%</span>&nbsp;&nbsp;' + (rate*100).toFixed(2) + '%)省<span class="discount">' + discountMount + '</span>元';
					}
				}else{
					 //无费率
					 str = Number(val)*that.gV.purchaseRate+"元&nbsp;"+'(<span>' + that.gV.purchaseRate*100 + '%</span>)';
				}



			}

			// str = '100' + '元&nbsp;' + '(<span class="line-rate">' + '1.5' + '%</span>&nbsp;' + '1.8' + '%)省<span class="discount">' + '2' + '</span>元'
			that.$el.CostEstimate.html(str);
		},
		/*
				绑定事件
		 */
		events: function () {
			var that = this;
			/** 下面三个事件： 银行卡列表出现/隐藏 **/
			mui("body").on('mdClick','.paymoney',function(){
				that.gV.payType = $(this).attr('pay-type');
				if(that.gV.payType == '0'){
					$(".bank-pay").show();
					$(".onright-left-two").show();
					$(".onright-left").removeClass("onright-left-one-one");
					if(that.gV.accountType === 0 || that.gV.accountType === 2){
						tipAction('机构客户暂不支持在线支付');
						return
					}
				}else  if(that.gV.payType == '1') {
					$(".bank-pay").hide();
					$(".onright-left-two").hide();
					$(".onright-left").addClass("onright-left-one-one");
				}
				var useEnv = $(this).attr('pay-type');
				$(".listLoading").show();
				that.getBankCard(useEnv);
				if(useEnv == '0'){
					that.getTransferFunds();
				}
			}, {
				htmdEvt: 'fundTransformIn_01'
			})

			mui("body").on('mdClick','.popup-close',function(){
				$('.popup').css('display','none');
				$('.popup-password').css('display','none');
			}, {
				htmdEvt: 'fundTransformIn_02'
			})

			mui("body").on('mdClick','.popup-mask',function(){
				$('.popup').css('display','none');
				$('.popup-password').css('display','none');
			}, {
				htmdEvt: 'fundTransformIn_03'
			})

			//点击转出规则
			mui("body").on('mdClick','.goRule',function(){
				window.location.href = site_url.pofTransactionRules_url + '?fundCode=' + that.gV.fundCode;
			}, {
				htmdEvt: 'fundTransformIn_04'
			})

			$("#transformInput").on('input propertychange',function(){
				that.gV.balance = Number($(this).val()).toFixed(2);
				if($(this).val().includes(".") && $(this).val().split(".")[1].length >2){
					tipAction('只能输入两位小数');
					return
				}
				that.getCostEstimate($(this).val());

			})
			//清除输入框数字
			mui("body").on("mdClick", ".deleteNum", function() {
				$('.transformInput').val(null);
			}, {
				htmdEvt: 'fundTransformIn_05'
			})
			//选中银行卡
			mui("body").on('mdClick','.bank-li',function(){
				$(".bank-li .true").hide();
				$(this).find(".true").show();
				that.gV.fundOrBank = $(this).attr('fundOrBank');
				that.gV.bankName = $(this).attr('bankName');
				that.gV.bankNo = $(this).attr('bankNo');
				that.gV.tradeAcco = $(this).attr('tradeAcco');
				that.gV.capitalMode = $(this).attr('capitalMode');
				var after4Num =  $(this).attr('after4Num');
				var data = [];
				if(that.gV.fundOrBank == '1'){
					that.gV.bankAccountSecret = $(this).attr('bankAccountSecret');
					that.gV.singleNum = $(this).attr('singleNum');
					data.push({
						bankThumbnailUrl:$(this).attr('bankThumbnailUrl'),
						bankName:$(this).attr('bankName'),
						bankNo:$(this).attr('bankNo'),
						singleNum:$(this).attr('singleNum'),
						oneDayNum:$(this).attr('oneDayNum'),
						after4Num:after4Num,
						singleNum_w:Number($(this).attr('singleNum'))/10000 + '万',
						oneDayNum_w:Number($(this).attr('oneDayNum'))/10000 + '万',
					})
				}else{
					that.gV.bankAccountSecret = $(this).attr('bankAccoutEncrypt');
					that.gV.enableAmount = $(this).attr('enableAmount');
					that.gV.bugFundName = $(this).attr('fundName');
					that.gV.buyFundCode = $(this).attr('fundCode');
					data.push({
						// bankThumbnailUrl:$(this).attr('bankThumbnailUrl'),
						fundName:$(this).attr('fundName'),
						bankName:$(this).attr('bankName'),
						bankNo:$(this).attr('bankNo'),
						enableAmount:$(this).attr('enableAmount'),
						after4Num:after4Num
					})
				}


				if(that.gV.payType == '0'){
					if(that.gV.fundOrBank == '1'){
						generateTemplate(data, that.$el.onlinepay, that.$el.bankListCheckTemplate,true);

					}else{
						generateTemplate(data, that.$el.onlinepay, that.$el.fundListCheckTemplate,true);
					}
					that.$el.onlinepay.parent().find(".imgc").show();
					that.$el.onlinepay.parent().find(".iimg").hide();
					that.$el.remittance.html('');
					that.$el.remittance.parent().find(".imgc").hide();
					that.$el.remittance.parent().find(".iimg").show();
					$(".bank-pay").show();
					$(".onright-left-two").show();
					$(".onright-left").removeClass("onright-left-one-one");
				}
				if(that.gV.payType == '1'){
					generateTemplate(data, that.$el.remittance, that.$el.bankListCheckTemplate,true);
					that.$el.remittance.parent().find(".imgc").show();
					that.$el.remittance.parent().find(".iimg").hide();
					that.$el.onlinepay.html('');
					that.$el.onlinepay.parent().find(".imgc").hide();
					that.$el.onlinepay.parent().find(".iimg").show();
					$(".bank-pay").hide();
					$(".onright-left-two").hide();
					$(".onright-left").addClass("onright-left-one-one");
				}
				setTimeout(function(){
					$('.popup').css('display','none');
				},500)
			}, {
				htmdEvt: 'fundTransformIn_06'
			})

			//点击同意协议
			mui("body").on("mdClick", ".item2 .iconfont", function (e) {
				if ($(this).hasClass("check")) {
					$(this).removeClass("check").html('&#xe668;');
					that.$el.confirmBtn.attr('disabled',true);
                } else {
					$(this).addClass("check").html('&#xe669;');
					that.$el.confirmBtn.removeAttr("disabled");
                }
			}, {
				htmdEvt: 'fundTransformIn_07'
			});

			//确定
			mui("body").on('mdClick','.btn_box .btn',function(){
				if($("#transformInput").val().includes(".") && $("#transformInput").val().split(".")[1].length >2){
					tipAction('只能输入两位小数');
					return
				}

				if(!!that.gV.minValue){
					if(Number(that.gV.balance) < Number(that.gV.minValue)){
						tipAction('最小买入金额不能低于' + that.gV.minValue + '元');
						return
					}
				}
				if(!!that.gV.maxValue){//最大买入都校验
					if(Number(that.gV.balance) > Number(that.gV.maxValue)){
						tipAction('最大买入金额不能超过' + that.gV.maxValue + '元');
						return
					}
				}
				if(!!that.gV.bankAccountSecret){
					if(that.gV.payType == "0"){//在线支付校验单笔金额。转账汇款不校验
						if(that.gV.fundOrBank == '2'){
							if(Number(that.gV.balance) > Number(that.gV.enableAmount)){
								tipAction('单笔金额不能超过' + that.gV.enableAmount + '元');
								return
							}
						}else{
							if(Number(that.gV.balance) > Number(that.gV.singleNum)){
								tipAction('单笔金额不能超过' + that.gV.singleNum + '元');
								return
							}
						}
					}
					that.checkPayType();
				}else{
					//未选择银行卡提示信息
					tipAction("请选择银行卡！");
					return
				}
			}, {
				htmdEvt: 'fundTransformIn_08'
			}) ;
			//  ---《公募基金风险揭示及售前告知书》
			mui("body").on('mdClick','.setGoUrl',function(){
				window.location.href = site_url.superContent_url + '?id=47';
			}, {
				htmdEvt: 'fundTransformIn_09'
			}) ;

			//  ---忘记密码
			mui("body").on('mdClick','#passwordWrap .forgetP',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url;
			}, {
				htmdEvt: 'fundTransformIn_10'
			}) ;
			//密码校验不通过   ---取消
			mui("body").on('mdClick','.elasticCel',function(){
				$(".pwd-input").val('');
				$(".fake-box input").val('');
				$('#passwordWrap').css('display','none');
				$('.popup-password').css('display','none');
			}, {
				htmdEvt: 'fundTransformIn_11'
			}) ;
			//密码校验不通过   ---忘记密码
			mui("body").on('mdClick','.error1 .elasticCel',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url;
			}, {
				htmdEvt: 'fundTransformIn_12'
			}) ;
			//密码校验不通过   ---重新输入
			mui("body").on('mdClick','.error1 .elasticYes',function(){
				$(".pwd-input").val('');
				$(".fake-box input").val('');
				$('.popup-password').css('display','none');
			}, {
				htmdEvt: 'fundTransformIn_13'
			}) ;
			//密码校验不通过   ---找回密码
			mui("body").on('mdClick','.error2 .elasticYes',function(){
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url;
			}, {
				htmdEvt: 'fundTransformIn_14'
			}) ;
			//密码校验不通过   ---重新输入
			mui("body").on('mdClick','.error3 .elasticYes',function(){
				$(".pwd-input").val('');
				$(".fake-box input").val('');
				$('.popup-password').css('display','none');

			}, {
				htmdEvt: 'fundTransformIn_15'
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
				htmdEvt: 'fundTransformIn_16'
			}) ;
			//  ---《基金合同》《招募说明书》
			mui("body").on('mdClick','.goPreview',function(){
				var link = $(this).attr('datalink');
				var links=link.split("?");
			    var fileNames=links[0].substring(links[0].lastIndexOf('.'));
				var typInfo = $(this).attr('type') == '1' ? '基金合同' : '招募说明书';
				window.location.href = link +'&fileName=' + new Base64().encode(typInfo+fileNames);
			}, {
				htmdEvt: 'fundTransformIn_17'
			}) ;
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
				htmdEvt: 'fundTransformIn_18'
			});
			//返回按钮
			mui("mui").on("mdClick","#goBack",function(){
				history.go(-1);
			},{
				htmdEvt: 'fundTransformIn_21'
			})

			//风险揭示函
			mui("body").on("mdClick",'.raskBook',function(){
				//风险揭示函
				window.location.href = site_url.superContent_url + '?id=93';
			},{
				htmdEvt: 'fundTransformIn_20'
			})


		}



	};
	//调用函数
	regulatory.webinit();

})
