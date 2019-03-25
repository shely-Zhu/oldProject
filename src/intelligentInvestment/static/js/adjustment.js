/**
	* 一键调仓
	* author:ping
	* time：2019-01-07
 */

 require('@pathIncludJs/vendor/config.js');

 //zepto模块
 require('@pathIncludJs/vendor/zepto/callback.js'); 
 require('@pathIncludJs/vendor/zepto/deferred.js'); 

 require('@pathCommonJsCom/utils.js');
 require('@pathCommonJs/ajaxLoading.js');

 require('@pathCommonJsCom/tabScroll.js');
 //黑色提示条的显示和隐藏
 var tipAction = require('@pathCommonJsCom/tipAction.js');

 require('@pathCommonJsCom/goTopMui.js');
 var splitUrl = require('@pathCommonJsCom/splitUrl.js');

require('@pathCommonJsCom/elasticLayer.js');
require('@pathCommonJsCom/elasticLayerTypeTwo.js');

// 交易密码错误处理
var dealWrongPassword = require('@pathCommonJsComBus/dealWrongPassword.js');

var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){ 

	var adjustment = {
		combCode: splitUrl()['combCode'],
		tradeAcco: splitUrl()['tradeAcco'],
		comFundLevel: '',
		riskLevel:'',
		$e: {
            adjustmentRecord: $('.adjustmentList'), // 调仓距离
            adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
            noData: $('.noData'), //没有数据的结构
        },

		init: function(){
			var that = this;
			//页面初始化
			that.getData();

			that.events();

		},

		// 页面初始化，展示页面
		getData: function(){
			var that = this;

			var obj = [{
				url: site_url.holdChange_api,
				data:{
					hmac:"", //预留的加密信息
					params:{//请求的参数信息
						"combCode":that.combCode,
					}
				},
				needDataEmpty: true,
				callbackDone: function(json){
					
					var data = json.data;

					// 为了利用公共模板，这里进项了改版，
					// 利用调仓记录返回数据为的模板，对返回的数据进行处理
					if( !$.util.objIsEmpty(data) ){

						data = that.dealData(data);
                        // 判断调仓升降，添加颜色                  
						generateTemplate(data, that.$e.adjustmentRecord, that.$e.adjustmentTemp);

					}
				},
				callbackFail: function(json){
					tipAction(json.msg);
				},
			}]
			$.ajaxLoading(obj);
		},
		// 对返回的数据以调仓记录为模板，
		dealData: function(data) {
			var newData = [],
				fundList = [];

			$.each(data, function(i, j) {

                var m = Number(j.fundOriginalScale),
                    n = Number(j.fundNewScale);

                if (m > n) {
                    j['colorName'] = 'greenColor';
                } else if (m < n) {
                    j['colorName'] = 'redColor';
                }
            })

            $.each(data, function(a, b) {
            	fundList[a] = b;
            })
            newData.push({"fundList":fundList});
            return newData;
        },

		events: function(){
			var that = this;

			//点击密码弹出框的确定按钮
			mui("body").on('tap', '.bottom', function() {
				var $this = $(this);
				obj = [{
					url: site_url.user_api_two,
					data: {
						hmac: "", //预留的加密信息     
						params: { //请求的参数信息 
						}
					},
					needLogin: true,
					async: false, 
					callbackDone: function(json) {

						var jsonData = json.data;

						that.riskLevel = Number(jsonData.investFavour);
						if (jsonData.pofExpired == 1) {
							tipAction('风险测评已过期，请重新测评')
						} else {
							var obj = [{
								url: site_url.combinFundDetails_api,
								data:{
									hmac:"", //预留的加密信息
									params:{//请求的参数信息
										"groupCode":that.combCode,
									}
								},
								needLogin: true,
								async: false, 
								callbackDone: function(json){
									
									that.comFundLevel = json.data.combinFundDetails.comFundLevel;

									//判断购买的基金是否超出风测承受能力
									if (Number(that.comFundLevel) > Number(that.riskLevel) && that.riskLevel != 6) {
										//超出，显示弹层
										var fundObj = {
											title: '提醒',
											p: '<p class="elastic_p">由于您的风险等级发生变化，当前组合风险等级已经超出您最新测评结果，无法进行调仓，您可以重新测评或者赎回组合。</p>',
											yesTxt: '重新测评',
											celTxt: '赎回组合',
											yesButtonPosition: 'right',
											callback: function(t) {
												//进行风险测评
												
											   if( that.custType == 0 || that.custType == 2){
													//机构
													 window.location.href = site_url.questionnairePer_url + '&originUrl=' + new Base64().encode(window.location.href);
												}else{
													//个人
													 window.location.href = site_url.questionnaireOrg_url + '&originUrl=' + new Base64().encode(window.location.href);
												}
												t.hide();
											},
											callbackCel: function(t) {
												window.location.href = site_url.myCombination_url;
											}
										}
										$.elasticLayer(fundObj);
										$this.removeAttr('disabled').removeClass('disable');
										return false;
									}
									else{
										// 弹出交易密码
										$('.payPassword').show();
									}

									
								},
								callbackFail: function(json){
									tipAction(json.msg);
								},
							}]
							$.ajaxLoading(obj);

						}
					},
					callbackFail: function(json) {
						tipAction(json.msg);
					}
				}];
				$.ajaxLoading(obj);
			})

			//点击密码弹出框的确定按钮
			mui("body").on('tap', '.payPassword .eventBtn', function() {

				var $this = $(this),
					// $bankCard = $('.cardList input[type=radio]:checked'), // 选中银行卡
					passwordVal = $('.payPassword .passInput').val(), //密码
					ajaxObj = []; //接口

				if (!passwordVal) {
					//没有填写
					//隐藏网站交易密码弹框
					$('.payPassword').hide();
					//
					tipAction('请输入网站交易密码', function() {
						$('.payPassword').show();
					});
					return false;
				}

				$this.attr('disabled', 'disabled').addClass('disabled');

				ajaxObj = [{
					url: site_url.combinTransfer_api,
					data: {
						hmac: "", //预留的加密信息 非必填项
						params: { //请求的参数信息
							"combCode": that.combCode, //组合编号
							"password": passwordVal, //密码
							"tradeAcco": that.tradeAcco, //普通交易账号
						}
					},
					needLogin: true,
					// needDataEmpty: false,
					callbackDone: function(json) {
						var allotNo = json.data.allotNo; //申请编号

						window.location.href = site_url.transactionResult_url + '?allotNo='+allotNo+'&tradeType=3'
					},
					callbackFail: function(json) {
						// 密码错误逻辑
						dealWrongPassword(json); 
					}
				}];

				$.ajaxLoading(ajaxObj);
			})

			//关闭输入网站交易密码的弹层
			mui("body").on('tap', '.payPassword .close', function() {
				$('.payPassword').hide();
			})

		},

	}

	adjustment.init();

 })
