/*
 * @page: 公募交易详情查询
 * @Author: shiyunrui
 * @Date:   2019-11-25
 * @description:
 * 公募持仓页面
 * 需要带入的参数 
 *  applyId	  申请编号
    fundCombination	  是否是基金组合交易
    fundCode	基金编号
    fundBusinCode	业务大类编号
    allotType	申请类型
    Fixbusinflag	业务辅助代码
 */
require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');

$(function () {
    var obj = {
        getElements: {
            fundState: $('.header .trade_status'),//基金状态
        },
        gV: { // 全局变量
            showBankList: false,
            //请求到的总资产data
            data: '',
        },
        init: function () {
            var that = this;
            that.getData();
        },
        events: function (){
            var that = this;
            $('footer').on('click', function (param) {
                //再买一笔 跳转到产品详情页
                var fundCode = that.gV.data.fundCode;
            })
            $('.cancel_order').on('click', function(){
                //去撤单
                
            })
        },
        getData: function () {
            var that = this;
            var obj = [{ // 公募交易详情查询
                url: site_url.pofTradeApplyInfo_api,
                data: {
                    applyId: "",
                    fundCombination: "",
                    fundCode: "",
                    fundBusinCode: "",
                    allotType: "",
                    Fixbusinflag: "",
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function (json) {
                    that.gV.data = json.data;
                    that.events();
                    switch (that.gV.data.fundBusinCode) {
                        case "020":
                            //认购
                            that.showBuyStatus(false, json.data);
                            break;

                        case "024":
                            //赎回

                            break;
                        case "098":
                            //快速赎回

                            break;

                        default:
                            //申购
                            that.showBuyStatus(true, json.data);
                            break;
                    }

                },
                callbackFail: function (data) {
                    console.log('加载失败');
                }
            }];
            $.ajaxLoading(obj);
        },
        showBuyStatus: function (isPurchease, model) {
            var that = this;
            //购买状态的处理 isPurchease是否为申购  true为申购 false为认购
            $('.header .amount').html(model.tradeAmount);//交易申请金额 header中显示的后下面显示的金额都是这个 除了确认信息中的金额显示的是确认金额confirmAmount

            $('.buy_info').removeClass('hide');//展示买入信息区域
            //买入产品
            $('.buy_info .fund_name').html(model.fundName).on('click', function () { 
                //todo 公募产品页面 传参 model.fundCode
             });
            //买入金额
            $('.buy_info .fund_amount').html(model.tradeAmount);
            //支付方式
            $('.buy_info .bank_icon').url(model.bankThumbnailUrl);//银行logo
            $('.buy_info .bank_name').html(model.bankName);//银行名称
            $('.buy_info .pay_mode').html(model.payModeName);//支付方式
            //买入时间
            $('.buy_info .fund_date').html(model.payModeName);//买入时间

            if (true){
                //todo 增加判断
                //等待汇款 展示汇款账号信息 隐藏掉状态区域
                $('.account_info').removeClass('hide');
                that.getRemittanceAccount();
            } else {
                //其他情况 展示交易状态
                $('.trade_status_area').removeClass('hide');
            }
            
            
            




            if ('1' == model.debitStatus) {
                //扣款无效
                that.getElements.fundState.html.html('交易失败');//交易状态
            } else {
                //扣款成功
                switch (model.tradeStatus) {
                    //交易状态
                    case "5":
                        //交易成功
                        that.getElements.fundState.html("待基金成立");
                        break;
                    case "1":
                    case "2":
                    case "3":
                        //交易成功
                        that.getElements.fundState.html("交易成功");

                        break
                }
            }







        },
        getRemittanceAccount: function () { 
            //获取监管账户信息
            var obj = [{
	            url: site_url.findSuperviseBank_api,
	            data: param,
	            needLogin:true,//需要判断是否登陆
	            //needDataEmpty: false,//不需要判断data是否为空
	            callbackDone: function(json){  //成功后执行的函数
					
	                $('.accountName').html(json.data.accountName);
	                $('.bankAccount').html(json.data.bankAccount);
	                $('.bankNo').html(json.data.bankNo);
	                $('.bankAccountName').html(json.data.bankAccountName);

	            },
	            callbackFail: function(json){  //失败后执行的函数
						tipAction(json.msg);
	            }
	        }];
	        $.ajaxLoading(obj);
        },
    };
    obj.init();
});