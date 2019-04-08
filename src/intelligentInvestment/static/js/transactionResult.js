/*
 ** 赎回结果页和买入结果页合并成一个页面
 ** ping 2018-10-19
*/
require('../../../include/js/vendor/config.js');

//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');

require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
require('../../../common/js/components/tabScroll.js');
var tipAction = require('../../../common/js/components/tipAction.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');
var getDate = require('../../../common/js/components/getDate.js');

$(function() {
	var redemptionResult = {
		inputVal: 10,
		shareArr: [],
		tradeAcco: '',
		combinationName:'',
		init: function () {
			var that = this;

			// 页面title  --- 买入结果  赎回结果
			if(splitUrl()['tradeType'] == 1){
				document.title = '买入结果'
			} else if(splitUrl()['tradeType'] == 2){
				document.title = '赎回结果'
			}else if(splitUrl()['tradeType'] == 3){
				document.title = '调仓结果'
			}
			
			that.getData();

			that.events();
		},
		getData: function () {
			var that = this;
            var obj = [{
                url: site_url.queryCombinFundTradeDetail_api,
                data: {
                    combRequestNo:splitUrl()['allotNo'],//组合申请编号
                },
                needLogin: true,
                needDataEmpty: false,
                async: false, //同步
                callbackDone: function(json) {
                	var jsonData = json.data;

                	var combinTradeInfo = jsonData.combinTradeInfo;
                	//组合名称
                	that.combinationName = combinTradeInfo.combName;
                	//银行卡后四位
                	combinTradeInfo.bankNo = combinTradeInfo.bankAccount.substring(combinTradeInfo.bankAccount.length - 4);
                	//赎回比例--从上页面带入
                	combinTradeInfo.inputVal = splitUrl()['inputVal'];
                	
                	//判断是买入结果还是赎回结果
                	combinTradeInfo.redemption = splitUrl()['tradeType'] == 2 ? 1 : 0;
					combinTradeInfo.buyCheckoutSuccess = splitUrl()['tradeType'] == 1 ? 1 : 0;
					combinTradeInfo.adjustment = splitUrl()['tradeType'] == 3 ? 1 : 0;

					// //判断支付方式
					// if(combinTradeInfo.payType == '1'){
					// 	combinTradeInfo.payTypeMask = '在线支付';
					// }


                	var source = $('#redemption-list-template').html(),
						template = Handlebars.compile(source),
						list_html = template(combinTradeInfo);
						$(".resultDetails").html(list_html);
					
                },
            }];

          	$.ajaxLoading(obj);
		},
		events: function() {
			var that = this;
			$(".sureBtn").on("tap",function() {
				window.location.href = site_url.myCombination_url + '?combinationName=' + that.combinationName;
			})
		}
		
	}
	redemptionResult.init();
});