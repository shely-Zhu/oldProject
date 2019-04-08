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
	var assetBuyAndRedemptionDetails = {
		tradeType: splitUrl()['tradeType'],
		init: function () {
			var that = this;
			that.getData();

		},
		getData: function () {
			var that = this;
            var obj1 = [{
                url: site_url.combinTradeDetailsList_api, // 组合资产交易详情(买入/赎回)
                data: {
                	combRequestNo: splitUrl()['combRequestNo'],//组合申请编号
                	// fundBusinCode: that.tradeType == 1 ? "01" : "02",//01申购，02赎回
                },
                needDataEmpty: false,
                async: false, //同步
                callbackDone: function(json) {
                    var combinTradeDetailsList = json.data.combinTradeDetailsList;

                    if(that.tradeType == 1) { // 买入

                    	var myTemplate = Handlebars.compile($("#redemptionDetails_buy_template").html());

                    } else{ // 赎回

                    	var myTemplate = Handlebars.compile($("#redemptionDetails_redemption_template").html());
                    };
                    // confirmFlag 0、4：确认失败；1、3确认成功；2，部分确认成功；5、9下单成功
                    Handlebars.registerHelper("compare",function(value,options){
						if(value == 1 || value == 2 || value == 3){ // 确认成功 部分确认成功
							//满足添加继续执行
							return options.fn(this);
						}else{  // 下单成功 确认失败       
							//不满足条件执行{{else}}部分
							return options.inverse(this);
						}
					});
					Handlebars.registerHelper("transformat",function(value,options){
						
						if(value == "0" || value == 4 ){ // 确认失败
							//满足添加继续执行
							return options.fn(this);
						}else{   // 下单成功        
							//不满足条件执行{{else}}部分
							return options.inverse(this);
						}
					});
                    $('#redemptionDetails').html(myTemplate(combinTradeDetailsList));
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            // 调仓
            var obj2 = [{
                url: site_url.combinTransferDetail_api, // 组合资产调仓详情
                data: {
                    combRequestNo: splitUrl()['combRequestNo'],//组合申请编号
                },
                needDataEmpty: false,
                async: false, //同步
                callbackDone: function(json) {
                    var data = json.data;

                    var myTemplate = Handlebars.compile($("#adjustmentDetails_redemption_template").html());
                    
					// confirmFlag 0、4：确认失败；1、3确认成功；2，部分确认成功；5、9下单成功
                    Handlebars.registerHelper("compare",function(value,options){
						if(value == 1 || value == 2 || value == 3 ){ // 确认成功 部分确认成功
							//满足添加继续执行
							return options.fn(this);
						}else{  // 下单成功 确认失败       
							//不满足条件执行{{else}}部分
							return options.inverse(this);
						}
					});
                    
                    $('#redemptionDetails').html(myTemplate(data)); 
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
          	
          	$.ajaxLoading(that.tradeType == 3 ?obj2 : obj1);
		},
		
	}
	assetBuyAndRedemptionDetails.init();
})