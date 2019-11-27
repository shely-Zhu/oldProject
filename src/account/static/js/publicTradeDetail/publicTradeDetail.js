/*
 * @page: 公募交易详情查询
 * @Author: shiyunrui
 * @Date:   2019-11-25
 * @description:
 * 公募交易详情页面
 * 
 *  普通基金需要带入的参数 
 *  applyId	  申请编号
    fundCombination	  是否是基金组合交易
    fundCode	基金编号
    fundBusinCode	业务大类编号
    allotType	申请类型
    Fixbusinflag	业务辅助代码

    超宝现金宝需要带入的参数
    isCash 是否为现金宝的标识
    isBuy 是否为现金宝的买入页面
    applyId	  申请编号
 */
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');
var payPass = require('../public/payPassword.js');

$(function () {
    var obj = {
        getElements: {
            fundState: $('.header .trade_status'),//基金状态
        },
        gV: { // 全局变量
            data: '',//请求到的data
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
                window.location.href=site_url.productPublicDetail_url;
            })
            $('.cancel_order').on('click', function(){
                //去撤单 需要先输入交易密码 todo
                $("#passwordWrap").show();
                payPass(function (password){
                    //输入密码的回调
                    that.cancelOrder(password);
                });
            })
            $('').on('click', function(){
                //买入产品条目点击进入公募产品详情
                var fundCode = that.gV.data.fundCode;
                window.location.href=site_url.productPublicDetail_url;
            })
        },
        cancelOrder: function (password){
            //撤单的具体逻辑
            var that = this;
            var param = {
                password: password,
                applyId: that.gV.data.applyId,
                tradeNo: that.gV.data.tradeNo,
            }
            var obj = [{
	            url: site_url.findSuperviseBank_api,
	            data: param,
	            needLogin:true,//需要判断是否登陆
                callbackDone: function(json){  //成功后执行的函数
                    if (model.fundBusinCode.equals("020") || model.fundBusinCode.equals("022")) {
                        //认购、申购
                        tipAction("已撤单，申请金额将退还支付银行卡中");
                    } else {
                        tipAction("已撤单，您将继续持有该基金份额");
                    }
                    setTimeout(() => {
                        //2秒后刷新页面
                        window.location.reload()
                    }, 2000);
                    
	            },
	            callbackFail: function(json){  //失败后执行的函数
                    tipAction(json.msg);
	            }
	        }];
	        $.ajaxLoading(obj);
        },
        getData: function () {
            var that = this;
            if (splitUrl()['isCash']){
                //现金宝
                that.getCashTradeDetail();
            } else {
                //普通基金
                that.getFundTradeDetail();
            }
            
        },
        getFundTradeDetail: function () {
            //普通公募交易详情查询
            var that = this;
            var obj = [{
                url: site_url.pofTradeApplyInfo_api,
                data: {
                    applyId: splitUrl()['applyId'],
                    fundCombination: splitUrl()['fundCombination'],
                    fundCode: splitUrl()['fundCode'],
                    fundBusinCode: splitUrl()['fundBusinCode'],
                    allotType: splitUrl()['allotType'],
                    Fixbusinflag: splitUrl()['Fixbusinflag'],
                },
                needDataEmpty: true,
                callbackDone: function (json) {
                    that.gV.data = json.data;
                    that.events();
                    switch (that.gV.data.fundBusinCode) {
                        case "024":
                        case "098":
                            //赎回
                            that.showFundRedeemStatus(json.data)
                            break;

                        default:
                            //购买
                            that.showFundBuyStatus(json.data);
                            break;
                    }

                },
                callbackFail: function (data) {
                    console.log('加载失败');
                }
            }];
            $.ajaxLoading(obj);
        },
        showFundBuyStatus: function (isPurchease, model) {
            var that = this;
            //购买状态的处理
            //填充头部信息
            $('.header .amount').html(model.tradeAmount + "元");//交易申请金额 header中显示的后下面显示的金额都是这个 除了确认信息中的金额显示的是确认金额confirmAmount
            $('.header .trade_status').html(model.tradeApplyDesc);//交易状态 例如待扣款
            $('.header .trade_status_des').html(model.tradeApplyDescMessage);//交易状态描述信息 例如等待给银行汇款 

            //展示买入信息区域 并填充
            $('.buy_info').removeClass('hide');
            $('.buy_info .fund_name').html(model.fundName).on('click', function () { //买入产品
                //todo 公募产品页面 传参 model.fundCode
            });
            $('.buy_info .fund_amount').html(model.tradeAmount);//买入金额
            $('.buy_info .bank_icon').attr('url', model.bankLogoUrl);//支付方式的银行logo
            $('.buy_info .bank_name').html(model.bankName + model.bankAccount.substring(model.bankAccount.length - 4));//支付方式的银行名称
            $('.buy_info .pay_mode').html(model.payModeName);//支付方式
            $('.buy_info .fund_date').html(model.tradeDate);//买入时间

            switch (model.tradeStatus) {
                /**
                 * tradeStatus	 交易申请状态
                    0：确认失败，
                    1：确认成功，
                    2：部分确认，
                    3：实时确认成功，
                    4：撤单，
                    5：行为确认，
                    9：未确认
                 */
                case "0":
                case "9":
                    //未确认状态 展示汇款账户信息
                    $('.account_info').removeClass('hide');
                    that.getRemittanceAccount();
                    break;

                case "1":
                    //确认状态
                    if ("2" == model.debitStatus){
                        //扣款状态为已扣款 展示确认信息并填充
                        $('confirm_info').removeClass('hide');
                        $('confirm_info .confirm_amount').html(model.confirmAmount);//确认金额
                        $('confirm_info .confirm_share').html(model.confirmShares);//确认份额
                        $('confirm_info .confirm_value').html(model.confirmNav);//确认净值中的净值
                        $('confirm_info .confirm_charge').html(model.confirmRate);//手续费
                        $('confirm_info .confirm_date').html(model.confirmDate);//确认时间
                    }
                    break;
            
                default:
                    break;
            }
        },
        showFundRedeemStatus: function (){
            //赎回渲染
            $('.redeem_info').removeClass('hide');
            
            
        },
        getCashTradeDetail: function (){
            //获取现金宝交易详情
            var that = this;
            var obj = [{
                url: site_url.pofCashDetail_api,
                data: {
                    allotNo: splitUrl()['applyId'],
                },
                needDataEmpty: true,
                callbackDone: function (json) {
                    that.events();
                    if (splitUrl()['isBuy']){
                        that.showCashBuyStatus(json.data);
                    } else {
                        that.showCashRedeemStatus(json.data);
                    }
                },
                callbackFail: function (data) {
                    console.log('加载失败');
                }
            }];
            $.ajaxLoading(obj);
        },
        showCashBuyStatus: function (model) {
            //现金宝购买详情
            var that = this;
            if ("20" == model.tradeApplyStatus){
                //确认成功
                that.showTradeArea(true, model);
            } else {
                //确认失败
                that.showTradeArea(false, model);
            }

            //购买状态的处理
            //填充头部信息
            $('.header .amount').html(model.balanceMask + "元");//交易申请金额 header中显示的后下面显示的金额都是这个 除了确认信息中的金额显示的是确认金额confirmAmount
            $('.header .trade_status').html(model.identDesc);//交易状态 例如待扣款
            $('.header .trade_status_des').html(model.errorMsg);//交易状态描述信息 例如等待给银行汇款 

            //展示买入信息区域 并填充
            $('.cash_buy_info').removeClass('hide');
            $('.cash_buy_info .fund_name').html(model.fundName);//基金名称
            $('.cash_buy_info .fund_amount').html(model.balanceMask);//买入金额
            $('.cash_buy_info .bank_icon').css('url', model.bankThumbnailUrl);//todo 需要后台加接口 支付方式的银行logo
            $('.cash_buy_info .bank_name').html(model.bankName + model.bankAccount.substring(model.bankAccount.length - 4));//支付方式的银行名称
            $('.cash_buy_info .pay_mode').html(model.payModeName);//支付方式
            $('.cash_buy_info .fund_date').html(model.applyDateTime);//买入时间

        },
        showCashRedeemStatus: function (model) {
            //现金宝赎回详情
            var that = this;
        },
        getRemittanceAccount: function () { 
            //获取监管账户信息
            var that = this;
            var obj = [{
	            url: site_url.findSuperviseBank_api,
	            data: {},
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
        showTradeArea: function (isSuccess, model) {//isBuy:是否为买入状态   isSuccess:true 成功状态 全部点亮   false 没有成功 只点亮第一步
            //渲染上方交易进度条区域
            //展示交易状态 并填充
            $('.trade_status_area').removeClass('hide');//展示交易进度区域
            if (isSuccess){
                //默认全部点亮 所以不用处理
            } else {
                //其他情况 均把第一个点亮 其他的置灰
                $('.trade_status_area .trade_status_icon').eq(0).siblings().css('background', 'url(/account/static/img/publicTradeDetail/public_trade_detail_no_check.png)');
            }
            if (splitUrl()['isCash']){//现金宝
                if (splitUrl()['isBuy']){
                    $('.trade_status_area .trade_status_desc').eq(0).html("提交转入申请");
                    $('.trade_status_area .trade_status_desc').eq(1).html("开始计算收益");
                    $('.trade_status_area .trade_status_desc').eq(2).html("第一笔收益到账");

                    $('.trade_status_area .trade_status_date').eq(0).html(model.applyDateTime);//提交转入申请
                    $('.trade_status_area .trade_status_date').eq(1).html(model.startGainsDayStr);//开始计算收益
                    $('.trade_status_area .trade_status_date').eq(2).html(model.paymentGainsDayStr);//第一笔收益到账
                } else {
                    //赎回时把进度条最后一个隐藏掉
                    $('.trade_status_area .trade_status_item').eq(2).addClass('hide');
                    $('.trade_status_area .trade_status_desc').eq(0).html("提交转出申请");
                    $('.trade_status_area .trade_status_desc').eq(1).html("到账时间");

                    $('.trade_status_area .trade_status_date').eq(0).html(model.estimateDateStr);//提交转出申请
                    $('.trade_status_area .trade_status_date').eq(1).html(model.estimateTimeStr);//到账时间
                }
            } else {
                //普通基金赎回不展示进度条 所以不判断
                $('.trade_status_area .trade_status_date').eq(0).html(model.originalDate);//申请受理时间
                $('.trade_status_area .trade_status_date').eq(1).html(model.estimateConfirmDate);//预计份额确认时间
                $('.trade_status_area .trade_status_date').eq(2).html(model.estimateArrivalDate);//预计查看收益时间
            }
        }
    };
    obj.init();
});