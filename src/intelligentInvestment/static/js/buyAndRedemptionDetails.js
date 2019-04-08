/*
 * @page: 恒小智购买赎回详情页
 * @Author: sunfuping
 * @Date:   2018-10-12 16:42:39
 *
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-20 10:18:44
 * @description: 进页面需添加参数，tradeType 1买入，2赎回，默认赎回
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
	var buyAndRedemptionDetails = {
        tradeType: splitUrl()['tradeType'],
		init: function () {
			var that = this;
            that.pageInit();
			that.getData();

		},
        pageInit: function() {
            var that = this;
            if(that.tradeType == 3) {
               $(".js_bankName").parent().hide();
               $(".js_businessMoneyTxt").parent().hide(); 

            }
        },
		getData: function () {
			var that = this;
            var obj = [{
                url: site_url.queryCombinFundTradeDetail_api, //组合交易详情(买入/赎回)
                data: {
                    combRequestNo:splitUrl()['combRequestNo'],//组合申请编号
                },
                needDataEmpty: false,
                async: false, //同步
                callbackDone: function(json) {
                    var combinTradeInfo = json.data.combinTradeInfo,
                        tradeStatus =  combinTradeInfo.tradeStatus,
                        $positionDetailsH4 = $(".positionDetails h4"),
                        $iconfont = $(".going .iconfont"),
                        $goingTxt = $(".going .goingTxt"),
                        $js_businessType = $(".js_businessType"),
                        $js_businessMoney = $(".js_businessMoney"),
                        $buySureH4 = $(".buySure h4"),
                        $buySure = $(".buySure"),
                        $js_sureBusiness = $(".js_sureBusiness"),
                        $js_sureBusinessNum = $(".js_sureBusinessNum"),
                        $js_businessMoneyTxt = $(".js_businessMoneyTxt"),
                        $js_serviceCharge = $(".js_serviceCharge"),
                        $js_sureDate = $(".js_sureDate"),
                        $js_details = $(".js_details"),
                        $assetPurchaseDetails = $(".assetPurchaseDetails");
                    $(".js_smartName").html(combinTradeInfo.combName);
                    var bankNo = combinTradeInfo.bankAccount.substring(combinTradeInfo.bankAccount.length - 4);
                    $(".js_time").html(combinTradeInfo.applyTime);
                    if(that.tradeType == 1) {//买入
                        $(".js_bankName").html(combinTradeInfo.payTypeMask +'-'+ combinTradeInfo.bankName + "(" + bankNo + ")");
                        $(".js_paystatus").html("支付方式");
                        if(tradeStatus == 1) { // 买入完成
                            $iconfont.html("&#xe6ea;")
                                    .css("color","#339900");
                            $positionDetailsH4.html("买入信息");
                            $buySure.show();
                            $buySureH4.html("买入确认信息");
                            $js_sureBusiness.html("买入确认金额 ");
                            $js_sureBusinessNum.html(combinTradeInfo.tradeConfirmBalanceMask + "元");
                            $js_serviceCharge.html(combinTradeInfo.fareSxMask + "元");
                            $js_sureDate.html(combinTradeInfo.affirmDate);
                        } else{ // 买入中
                            $iconfont.html("&#xe6e9;");
                            $positionDetailsH4.html("持仓详情");
                        };
                        $goingTxt.html(combinTradeInfo.tradeStatusMask);
                        $js_businessType.html("买入");
                        $js_businessMoney.html("买入金额");
                        $js_businessMoneyTxt.html(combinTradeInfo.applySumMask + "元");
                        $js_details.html("资产买入详情");
                        $assetPurchaseDetails.on("tap",function() {
                            window.location.href = site_url.assetBuyAndRedemptionDetails_url + "?tradeType=1&combRequestNo=" + splitUrl()['combRequestNo'];
                        });
                    } else if(that.tradeType == 2) { // 赎回
                        $(".js_bankName").html(combinTradeInfo.bankName + "(" + bankNo + ")");
                        $(".js_paystatus").html("赎回至");
                        if(tradeStatus == 1) { // 赎回完成
                            $iconfont.html("&#xe6ea;")
                                .css("color","#339900");
                            $positionDetailsH4.html("赎回信息");
                            $buySure.show();
                            $buySureH4.html("赎回确认信息");
                            $js_sureBusiness.html("赎回确认金额 ");
                            $js_sureBusinessNum.html(combinTradeInfo.tradeConfirmBalanceMask + "元");
                            $js_serviceCharge.html(combinTradeInfo.fareSxMask + "元");
                            $js_sureDate.html(combinTradeInfo.affirmDate);
                        } else{ // 赎回中
                            $iconfont.html("&#xe6e9;");
                            
                            $positionDetailsH4.html("持仓详情");
                        };
                        $goingTxt.html(combinTradeInfo.tradeStatusMask);
                        $js_businessType.html("赎回");
                        $js_businessMoney.html("赎回比例");
                        $js_businessMoneyTxt.html(splitUrl()['combinRedemRatio'] + "%");
                        $js_details.html("资产赎回详情");
                        $assetPurchaseDetails.on("tap",function() {
                            window.location.href = site_url.assetBuyAndRedemptionDetails_url + "?tradeType=2&combRequestNo=" + splitUrl()['combRequestNo'];
                        });
                    } else if(that.tradeType == 3) { // 调仓
                        
                        if(tradeStatus == 1) { // 调仓完成
                            $iconfont.html("&#xe6ea;")
                                .css("color","#339900");
                        } else{ // 调仓中
                            $iconfont.html("&#xe6e9;");
                        };
                        $positionDetailsH4.html("调仓信息");
                        $goingTxt.html(combinTradeInfo.tradeStatusMask);
                        $js_businessType.html("调仓");
                        $js_details.html("调仓详情");
                        $assetPurchaseDetails.on("tap",function() {
                            window.location.href = site_url.assetBuyAndRedemptionDetails_url + "?tradeType=3&combRequestNo=" + splitUrl()['combRequestNo'];
                        });
                    }
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];

          	$.ajaxLoading(obj);
		}
		
	}
	buyAndRedemptionDetails.init();
})