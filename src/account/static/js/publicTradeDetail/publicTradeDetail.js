/*
 * @page: 公募交易详情查询
 * @Author: shiyunrui
 * @Date:   2019-11-25
 * @description:
 * 公募交易详情页面
 * 
 * 
 *  普通基金需要带入的参数 
 *  applyId	  申请编号
    fundCombination	  是否是基金组合交易
    fundCode	基金编号
    fundBusinCode	业务大类编号
    allotType	交易类别 0：购买 1：赎回 2：定投, 3：分红
    fixbusinflag	业务辅助代码
    scheduledProtocolId   定投编号

    超宝现金宝需要带入的参数
    isCash 是否为现金宝的标识
    isBuy 是否为现金宝的买入页面
    applyId	  申请编号

    分红需要带入的参数
    allotType	交易类别 0：购买 1：赎回 2：定投, 3：分红
    shares  发生份额
    fundName  分红产品
    applyDate  分红时间
    autoBuyDesc  分红方式说明
    
 */


 /**
  * 永丽定的规则
  * 1 新发基金进度条显示和别的不一样 中间那个要改成 等待基金成立确认认购份额
  * 2 除了交易状态为成功 或者扣款状态为成功 其他的状态值都显示为红色 永丽定的规则
  * 3 怎么区分是否买入成功？确认状态为已确认 扣款状态为已成功   怎么确认是否赎回成功？确认状态为已确认 没有到账状态
  */

require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');
var payPass = require('@pathCommonJs/components/payPassword.js');

$(function () {
    var obj = {
        getElements: {
            fundState: $('.header .trade_status'),//基金状态
        },
        gV: { // 全局变量
            allotType: splitUrl()['allotType'],//交易类别 0：购买 1：赎回 2：定投, 3：分红
            isBuy: splitUrl()['isBuy'] == 'true',//是否为现金宝购买
            isCash: splitUrl()['isCash'],//是否为现金宝
            fundModel: {},//普通基金详情model
        },
        init: function () {
            var that = this;
            that.getData();
        },
        events: function (){
            var that = this;
            mui("body").on('mdClick', 'footer', function (e) {
                //再买一笔 跳转到产品详情页
                if (that.gV.fundModel && that.gV.fundModel.isNewFund==1){
                    //去新发基金
                    window.location.href = site_url.newFundDetail_url + '?fundCode=' + splitUrl()["fundCode"]+'&productStatus=0';
                } else if (splitUrl()['isCash']){
                    //去现金宝详情页
                    window.location.href = site_url.superStreasureDetail_url + '?fundCode=' + splitUrl()["fundCode"];
                } else {
                    //去普通基金详情页
                    window.location.href = site_url.pofPublicDetail_url + '?fundCode=' + splitUrl()["fundCode"]+'&fundType='+splitUrl()["fundType"];
                }
            },{
                'htmdEvt': 'publicTradeDetail_0'
            })

            mui("body").on('mdClick', '.cancel_order', function (e) {
                //去撤单 需要先输入交易密码
                payPass(function (password){
                    //输入密码的回调
                    that.cancelOrder(password);
                });
            },{
                'htmdEvt': 'publicTradeDetail_1'
            })
            mui("body").on('mdClick', '.buy_info .fund_item', function (e) {
                //买入产品条目点击进入公募产品详情
                if (that.gV.fundModel && that.gV.fundModel.isNewFund == 1){
                    //去新发基金
                    window.location.href = site_url.newFundDetail_url + '?fundCode=' + splitUrl()["fundCode"]+'&productStatus=0';
                } else if (splitUrl()['isCash']){
                    //去现金宝详情页
                    window.location.href = site_url.superStreasureDetail_url + '?fundCode=' + splitUrl()["fundCode"];
                } else {
                    //去普通基金详情页
                    window.location.href = site_url.pofPublicDetail_url + '?fundCode=' + splitUrl()["fundCode"]+'&fundType='+splitUrl()["fundType"];
                }
                // window.location.href = site_url.productPublicDetail_url + '?fundCode=' + splitUrl()["fundCode"];
                //window.location.href = site_url.pofPublicDetail_url + '?fundCode=' + splitUrl()["fundCode"]+'&fundType='+splitUrl()["fundType"];

            },{
                'htmdEvt': 'publicTradeDetail_2'
            })
            mui("body").on('mdClick', '.plan', function (e) {
                //定投计划跳转到定投详情
                window.location.href = site_url.pofCastSurelyDetails_url + '?scheduledProtocolId=' + splitUrl()["scheduledProtocolId"];
            },{
                'htmdEvt': 'publicTradeDetail_3'
            })
        },
        getData: function () {
            var that = this;
            if ('3' == that.gV.allotType){
                //分红
                that.showBounsStatus();
            } else if (that.gV.isCash){
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
            //普通产品展示再买一笔
            $('footer').removeClass('hide');
            $(".tradeCon").css("padding-bottom", ".98rem")
            var obj = [{
                url: site_url.pofTradeApplyInfo_api,
                data: {
                    applyId: splitUrl()['applyId'],
                    fundCombination: splitUrl()['fundCombination'],
                    fundCode: splitUrl()['fundCode'],
                    fundBusinCode: splitUrl()['fundBusinCode'],
                    allotType: that.gV.allotType,
                    fixbusinflag: splitUrl()['fixbusinflag'],
                },
                callbackDone: function (json) {
                    that.events();
                    if ('1' == json.data.cancelable){
                        //根据撤单标记来展示撤单按钮
                        $(".cancel_order").removeClass('hide');
                    }
                    that.gV.fundModel = json.data;
                    switch (that.gV.allotType) {
                        case "0":
                            //购买
                            that.showFundStatus(true, json.data);
                            break
                        case "1":
                            //赎回
                            that.showFundStatus(false, json.data);
                            $(".trade_status_area>.trade_status_item").eq(2).find(".trade_status_desc").html("预计到账时间")
                            break;

                        case "2":
                            //定投 定投没有赎回
                            that.showFundStatus(true, json.data);
                            if (splitUrl()["scheduledProtocolId"]){
                                //定投id不为空时展示定投计划
                                $('.plan').removeClass('hide');
                            }
                            break
                    }

                }
            }];
            $.ajaxLoading(obj);
        },
        showFundStatus: function (isBuy, model) {
            var that = this;
            //购买状态的处理
            //填充头部信息
            if (isBuy){
                $('.header .amount').html(model.tradeAmount);//交易申请金额 header中显示的后下面显示的金额都是这个 除了确认信息中的金额显示的是确认金额confirmAmount
            } else {
                $('.header .amount').html(model.tradeShares);//交易申请份额
                $('.header .yuan').html("份");//更换单位
            }
            $('.header .trade_status').html(model.tradeApplyDesc);//交易状态 例如待扣款
            $('.header .trade_status_des').html(model.tradeApplyDescMessage);//交易状态描述信息 例如等待给银行汇款 

            if (isBuy){
                //展示买入信息区域 并填充
                $('.buy_info').removeClass('hide');
                $('.buy_info .fund_name').html(model.fundName);//买入产品
                $('.buy_info .fund_amount').html(model.tradeAmount + '元');//买入金额
                $('.buy_info .bank_icon').attr('src', model.bankThumbnailUrl);//支付方式的银行logo
                $('.buy_info .bank_name').html(that.getPayInfo(model.bankName, model.bankAccountMask,model));//支付方式的银行名称
                $('.buy_info .pay_mode').html(model.payModeName);//支付方式
                $('.buy_info .fund_date').html(model.tradeDate);//买入时间
            } else {
                //展示赎回信息区域
                $('.redeem_info').removeClass('hide');
                $('.redeem_info .item_1').html(model.fundName);//赎回产品
                $('.redeem_info .item_2').html(model.tradeShares + ' 份');//赎回份额
                $('.redeem_info .bank_icon').attr('src', model.bankThumbnailUrl);//到账银行卡icon
                $('.redeem_info .item_3').html(that.getPayInfo(model.bankName, model.bankAccountMask,model));//到账银行卡描述
//              $('.redeemOut').hide();//隐藏转出银行卡
                //$('.redeem_bank').hide();//隐藏转出银行卡
                $('.redeem_info .item_4').html(model.tradeDate);//赎回时间
                if(model.secondFundCode!=''){//货币基金赎回到货币基金时隐藏
                    $(".isShowConfirm_date").hide()
                }
            }
            
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
            if ("1" == model.tradeStatus){
                //确认状态
                if (isBuy){
                    if ("2" == model.debitStatus){
                        //扣款状态为已扣款 展示确认信息并填充
                        $('.buy_confirm_info').removeClass('hide');
                        $(newFunction()).html(model.confirmAmount);//确认金额
                        $('.buy_confirm_info .confirm_share').html(model.confirmShares + " 份");//确认份额
                        $('.buy_confirm_info .confirm_value').html(model.confirmNav);//确认净值中的净值
                        $('.buy_confirm_info .confirm_charge').html(model.confirmRate);//手续费
                        $('.buy_confirm_info .confirm_date').html(model.confirmDate);//确认时间
                    }
                } else {
                    //赎回为确认状态 展示赎回确认信息
                    $('.redeem_confirm_info').removeClass('hide');
                    $('.redeem_confirm_info .confirm_share').html(model.tradeShares + " 份");//确认份额
                    if(model.confirmDate && model.confirmDate != '') {
                        $('.redeem_confirm_info .confirm_value').html(model.confirmNav + '(<span class="colorGray">'+ model.confirmDate +'</span>)');//确认净值
                    } else {
                        $('.redeem_confirm_info .confirm_value').html(model.confirmNav);//确认净值
                    }
                    $('.redeem_confirm_info .confirm_charge').html(model.confirmRate + " 元");//手续费
                    $('.redeem_confirm_info .confirm_amount').html(model.accountAmount + " 元");//到账金额
                    $('.redeem_confirm_info .bank_icon').attr('src', model.bankThumbnailUrl);//银行logo
                    $('.redeem_confirm_info .bank_name').html(that.getPayInfo(model.bankName, model.bankAccountMask,model));//银行名称
                    // 赎回成功页,因到账时间取不到时分秒,已与产品确认不展示该字段
                    $(".hoursItem").hide();
                    /*if(!!model.estimateArrivalDate){//到账时间
                    	$('.redeem_confirm_info .hours_account').html(model.estimateArrivalDate);//到账时间
                    }else{
                    	$(".hoursItem").hide();//到账时间有就显示
                    }*/
                }
                //确定状态显示全部确认的信息
                that.showTradeArea(true, model);
            } else {
                //其余状态状态展示部分确认的信息
                that.showTradeArea(false, model);
                if ("9" == model.tradeStatus){
                    if (isBuy && '2' != that.gV.allotType && '1' == model.payType){
                        //只有在普通基金+购买+未确认状态+非定投+汇款支付 才展示汇款账户信息
                        $('.account_info').removeClass('hide');
                        that.getRemittanceAccount();
                    }
                } else if ("0" == model.tradeStatus || "4" == model.tradeStatus){
                    //买入失败和撤单状态需要单独处理一下
                    //如果是失败状态 将状态文案变为红色
                    $('.header .trade_status').css('color', '#F52323');
                    if (isBuy){
                        //买入状态下显示资金状态将退回原银行卡
                        $('.buy_info .fund_type').removeClass('hide');
                    }
                    if ("4" == model.tradeStatus){
                        //撤单状态下隐藏掉银行卡信息
                        $('.redeem_info .redeem_bank').addClass('hide');
                    }
                }
            }
        },
        getCashTradeDetail: function (){
            //获取现金宝交易详情
            var that = this;
            var obj = [{
                url: site_url.pofCashDetail_api,
                data: {
                    allotNo: splitUrl()['applyId'],
                },
                callbackDone: function (json) {
                    that.events();
                    that.showCashStatus(json.data)
                }
            }];
            $.ajaxLoading(obj);
        },
        showCashStatus: function (model) {
            //现金宝详情
            var that = this;
            // 转出隐藏在线支付
            if(model.tradeApplyStatus == '23' || model.tradeApplyStatus == '24' || model.tradeApplyStatus == '25') {
                $(".pay_mode").hide();
            };
            //转入失败与转出成功展示资金状态
            if ("20" == model.tradeApplyStatus || "23" == model.tradeApplyStatus){
                //确认成功 包括转入成功与转出成功
                that.showTradeArea(true, model);
                if ("2" == model.ident && !that.gV.isBuy){
                    //扣款成功 转出 展示资金状况
                    $('.cash_buy_info .fund_type').removeClass('hide');
                }
            } else {
                //确认失败
                that.showTradeArea(false, model);
                if ("1" == model.ident){
                    //扣款状态为失败 将头部文案置为红色
                    $('.header .trade_status').css('color', '#F52323');
                    if (that.gV.isBuy){
                        //转入 且扣款状态为失败 展示资金状态
                        $('.cash_buy_info .fund_type').removeClass('hide');
                    }
                }
            }

            //填充头部信息
            //$('.header .amount').html((that.gV.isBuy? "+": "-") + model.balanceMask);//交易申请金额 header中显示的后下面显示的金额都是这个 除了确认信息中的金额显示的是确认金额confirmAmount
            $(".header .amount").html(that.gV.isBuy?'+'+ model.balanceMask:'-'+model.sharesMask)
            $('.header .trade_status').html(model.tradeApplyDesc);//交易状态 例如待扣款
            if ('21' == model.tradeApplyStatus){
                //转入失败 展示描述信息 并且把状态值变为红色
                $('.header .trade_status').addClass('text_red');
                $('.header .trade_status_des').html('扣款失败，资金将退回原银行卡');//交易状态描述信息 例如等待给银行汇款 
            }

            if (that.gV.isBuy){
                //展示买入信息区域 并填充
                $('.cash_buy_info').removeClass('hide');
                $('.cash_buy_info .fund_name').html(model.fundName);//基金名称
                $('.cash_buy_info .fund_amount').html(model.balanceMask + '元');//买入金额
                $('.cash_buy_info .bank_icon').attr('src', model.bankThumbnailUrl);//需要后台加接口 支付方式的银行logo
                $('.cash_buy_info .bank_name').html(that.getPayInfo(model.bankName, model.bankAccountMask,model));//支付方式的银行名称
                $('.cash_buy_info .pay_mode').html('1' == model.payType? '汇款支付': '在线支付');//支付方式
                $('.cash_buy_info .fund_date').html(model.applyDateTime);//买入时间
            } else {
                //展示现金宝赎回信息
                $('.cash_redeem_info').removeClass('hide');
                $('.cash_redeem_info .item_1').html(model.fundName);//转出产品
                //$('.cash_redeem_info .item_2').html(model.balanceMask + '元');//转出金额
                $('.cash_redeem_info .item_2').html(that.gV.isBuy?model.balanceMask+'元':model.sharesMask+'元');//转出金额
                $('.cash_redeem_info .bank_icon').attr('src', model.bankThumbnailUrl);//转出至银行卡logo
                $('.cash_redeem_info .item_3').html(that.getPayInfo(model.bankName, model.bankAccountMask,model));//转出至银行卡描述
                $('.cash_redeem_info .pay_mode').html('1' == model.payType? '汇款支付': '在线支付');//支付方式
                $('.cash_redeem_info .item_4').html(model.applyDateTime);//转出时间
            }
        },
        showBounsStatus: function (){
            //分红没有进度条 隐藏之
            $('.header .amount').html(splitUrl()['shares']);//交易申请份额
            //判断是否是货币基金
            $('.header .yuan').html("份");//更换单位
            $('.header .trade_status').html('分红成功');//分红的交易状态为分红成功

            $('.trade_status_area').addClass('hide'); 
            $('.bonus_info').removeClass('hide');
            $('.bonus_info .fund_name').html(new Base64().decode(splitUrl()['fundName']));//分红产品
            $('.bonus_info .fund_share').html(splitUrl()['shares']);//分红份额
            $('.bonus_info .bonus_mode').html(new Base64().decode(splitUrl()['autoBuyDesc']));//分红方式
            $('.bonus_info .fund_date').html(splitUrl()['applyDate']);//分红时间
            $(".listLoading").hide();//隐藏loading
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

	            }
	        }];
	        $.ajaxLoading(obj);
        },
        showTradeArea: function (isSuccess, model) {//isBuy:是否为买入状态   isSuccess:true 成功状态 全部点亮   false 没有成功 只点亮第一步
            var that = this;
            //渲染上方交易进度条区域
            //展示交易状态 并填充
            if (isSuccess){
                //默认全部点亮 所以不用处理
            } else {
                //其他情况 均把第一个点亮 其他的置灰
                $('.trade_status_area .trade_status_icon_1').css('background', 'url(/common/img/public_trade_detail_no_check.png)').css('background-size', '100%');
            }
            if (that.gV.isCash){//现金宝
                if (that.gV.isBuy){
                    $('.trade_status_area .trade_status_desc').eq(0).html("提交转入申请");
                    $('.trade_status_area .trade_status_desc').eq(1).html("开始计算收益");
                    $('.trade_status_area .trade_status_desc').eq(2).html("第一笔收益到账");

                    $('.trade_status_area .trade_status_date').eq(0).html(model.applyDateTime);//提交转入申请
                    $('.trade_status_area .trade_status_date').eq(1).html('预计' + model.startGainsDayStr);//开始计算收益
                    $('.trade_status_area .trade_status_date').eq(2).html('预计' + model.paymentGainsDayStr);//第一笔收益到账
                } else {
                    //赎回时把进度条最后一个隐藏掉 并且设置对应的样式
                    $('.trade_status_area .trade_status_item').eq(2).addClass('hide');
                    $('.trade_status_area .guild_line_2').addClass('hide');
                    $('.trade_status_area').css('height', '1.7rem');
                    

                    $('.trade_status_area .trade_status_desc').eq(0).html("提交转出申请");
                    $('.trade_status_area .trade_status_desc').eq(1).html("到账时间");

                    $('.trade_status_area .trade_status_date').eq(0).html(model.applyDateTime);//提交转出申请
                    $('.trade_status_area .trade_status_date').eq(1).html('预计' + model.estimateDateStr + ' ' + model.estimateTimeStr);//到账时间
                }
            } else {
                //普通基金赎回不展示进度条 所以不判断
                $('.trade_status_area .trade_status_date').eq(0).html(model.originalDate);//申请受理时间
                if ("020" == model.fundBusinCode){
                    //新发基金
                    //认购状态
                    $('.trade_status_area .trade_status_desc').eq(1).html("等待基金成立确认认购份额");//第二步左边名称
                    $('.trade_status_area .trade_status_desc').eq(2).html("预计查看确认");//第三步左边名称
                    $('.trade_status_area .trade_status_date').eq(1).html("以基金公司公告为准");//第二步右边描述
                    $('.trade_status_area .trade_status_date').eq(2).html("基金成立次日");//第三步右边描述
                } else {
                    $('.trade_status_area .trade_status_date').eq(1).html(model.estimateConfirmDate + ' 24:00前');//预计份额确认时间
                    $('.trade_status_area .trade_status_date').eq(2).html(model.estimateArrivalDate + ' 24:00前');//预计查看收益时间
                }
            }
        },
        cancelOrder: function (password){
            //撤单的具体逻辑
            var that = this;
            var param = {
                password: password,
                applyId: splitUrl()['applyId'],
                tradeNo: that.gV.fundModel.tradeNo,
                fundCombinationFlag: splitUrl()['fundCombination'],
            }
            var obj = [{
	            url: site_url.pofUndoTradeApply_api,
	            data: param,
	            needLogin:true,//需要判断是否登陆
                callbackDone: function(json){  //成功后执行的函数
                    if ("020" == that.gV.fundModel.fundBusinCode || "022" == that.gV.fundModel.fundBusinCode) {
                        //认购、申购
                        tipAction("已撤单，申请金额将退还支付银行卡中");
                    } else {
                        tipAction("已撤单，您将继续持有该基金份额");
                    }
                    setTimeout(function() {
                        //2秒后刷新页面
                        window.location.reload()
                    }, 2000);
	            }
	        }];
	        $.ajaxLoading(obj);
        },
        getPayInfo: function (bankName, bankAccountMask,model) {
            var payModeText = bankAccountMask? bankAccountMask.substring(bankAccountMask.length - 4): '';
            if(!!model.secondFundName){
            	$(".bank_icon").hide();
            	$(".pay_mode").hide();
            	return model.secondFundName + "(" + payModeText + ")"
            }else{
            	return bankName + payModeText;
            }
        }
    };
    obj.init();
});

function newFunction() {
    return '.buy_confirm_info .confirm_amount';
}
