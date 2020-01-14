/**
 * 定投结果 
 * @author wangjiajia 2019-11-23
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
// var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {
    var somePage = {
        $el: {
            succedText: $(".resultTopTwo  .succedText"), //在线支付标题  buy   redemption  
            //buy
            shareTimePBuy: $(".resultTopTwo .buy-result .shareTimeP"), //开始计算收益流程
            earningsTimePBuy: $(".resultTopTwo .buy-result .earningsTimeP"), //第一笔收益到账流程
            applyTimeBuy: $(".resultTopTwo .buy-result .applyTime .laber-right"), //申请时间
            shareTimeBuy: $(".resultTopTwo .buy-result .shareTime .laber-right"), //预计确认时间
            earningsTimeBuy: $(".resultTopTwo .buy-result .earningsTime .laber-right"), //预计查看收益时间
            fundNameBuy: $(".listWrap .buy-result .fundName"), //基金名称
            fundCodeBuy: $(".listWrap .buy-result .fundCode"), //基金代码
            amount2Buy: $(".listWrap .buy-result .amount"), //买入金额
            bankName2Buy: $(".listWrap .buy-result .bankName"), //银行名称
            bankNum2Buy: $(".listWrap .buy-result .bankNum"), //银行卡尾号
            banKImgbanKImgBuy: $(".listWrap .buy-result .banKImg"), //银行卡缩略图
            payTypeBuy: $(".listWrap .buy-result .payType"), //支付方式
            buyFundName: $(".buyFundName"), //在线支付 货币基金买入

            //redemption
            shareTimePRedemption: $(".resultTopTwo .redemption-result .shareTimeP"), //开始计算收益流程
            earningsTimePRedemption: $(".resultTopTwo .redemption-result .earningsTimeP"), //第一笔收益到账流程
            applyTimeRedemption: $(".resultTopTwo .redemption-result .applyTime .laber-right"), //申请时间
            shareTimeRedemption: $(".resultTopTwo .redemption-result .shareTime .laber-right"), //预计确认时间
            earningsTimeRedemption: $(".resultTopTwo .redemption-result .earningsTime .laber-right"), //预计查看收益时间
            fundNameRedemption: $(".listWrap .redemption-result .fundName"), //基金名称
            fundCodeRedemption: $(".listWrap .redemption-result .fundCode"), //基金代码
            amount2Redemption: $(".listWrap .redemption-result .amount"), //买入金额
            bankName2Redemption: $(".listWrap .redemption-result .bankName"), //银行名称
            bankNum2Redemption: $(".listWrap .redemption-result .bankNum"), //银行卡尾号
            banKImgRedemption: $(".listWrap .redemption-result .banKImg"), //银行卡缩略图
            payTypeRedemption: $(".listWrap .redemption-result .payType"), //支付方式

            amount1: $(".resultTop .amount"), //汇款支付金额
            buyStatusText: $(".resultTop .buyStatusText"), //汇款支付标题
            bankName: $(".resultTop .bankName"), //银行名称
            bankNum: $(".resultTop .bankNum"), //银行卡尾号

            accountName: $(".resultTop .accountName"), //户名
            bankAccount: $(".resultTop .bankAccount"), //账户
            bankNo: $(".resultTop .bankNo"), //行号
            bankAdress: $(".resultTop .bankAdress"), //开户行
        },
        gV: { // 全局变量
            flag: splitUrl['flag'] ? splitUrl['flag'] : 'buy', // 买入：buy,  赎回：redemption    
            payType: splitUrl['payType'] || '0', // 0  在线  1  汇款
            applyId: splitUrl['applyId'],
            fundCode: splitUrl['fundCode'],
            fundBusinCode: splitUrl['fundBusinCode'],
            // applyId:'20190827005586',
            // fundCode:'000847',
            // fundBusinCode:'090',
        },
        init: function() {
            var that = this;
            $("#goBack").hide();
            $('#loading').show();
            $('.proess-success').hide();
            $('.proess-ongoing').hide();
            $('.proess-error').hide();
            if (that.gV.flag == 'buy') { //基金买入
                $(".buy-result").show();
                $("#HeadBarpathName").html('买入结果');
                that.getData(); //查询结果可能要根据flag来
            }
            if (that.gV.flag == 'redemption') { //基金赎回
                $(".redemption-result").show();
                $("#HeadBarpathName").html('赎回结果');
                that.getData(); //查询结果可能要根据flag来
            }
            that.event();
        },
        //获取交易结果
        getData: function() {
            var that = this;
            var obj = [{
                url: site_url.pofTradeApplyInfo_api,
                data: {
                    applyId: that.gV.applyId,
                    fundCode: that.gV.fundCode,
                    fundBusinCode: that.gV.fundBusinCode,
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    if (json.status == '0000') {
                        if (that.gV.payType == '0') {
                            $('#loading').hide();
                            $(".resultTop").hide();
                            $(".resultTopTwo").show();
                            that.$el.succedText.html(json.data.tradeApplyDesc);
                            if (that.gV.flag == 'buy') {
                                if (json.data.debitStatus != '1' && json.data.tradeStatus == '5') {
                                    $(".buy-result").show();
                                    that.$el.shareTimePBuy.addClass('right-proess');
                                    that.$el.earningsTimePBuy.addClass('right-proess');
                                    $(".proess-success").show();
                                } else {
                                    if (json.data.tradeStatus == '0') { //申请失败
                                        $(".proess-error").show();
                                        $(".buy-result").hide();
                                    } else if (json.data.tradeStatus == '1') { //申请成功
                                        $(".proess-success").show();
                                        that.$el.shareTimePBuy.addClass('right-proess');
                                        that.$el.earningsTimePBuy.addClass('right-proess');
                                    } else {
                                        $(".proess-ongoing").show();
                                    }
                                }
                                that.$el.applyTimeBuy.html(json.data.originalDate);
                                that.$el.shareTimeBuy.html(json.data.estimateConfirmDate + "&nbsp; 24:00前");
                                that.$el.earningsTimeBuy.html(json.data.estimateArrivalDate + "&nbsp; 24:00前");
                                if (decodeURI(splitUrl['bugFundName']) != "false") {
                                    that.$el.buyFundName[0].textContent = decodeURI(splitUrl['bugFundName']);
                                }

                                that.$el.payTypeBuy.html('在线支付');
                            }
                            if (that.gV.flag == 'redemption') {
                                if (json.data.debitStatus != '1' && json.data.tradeStatus == '5') {
                                    $(".redemption-result").show();
                                    that.$el.shareTimePRedemption.addClass('right-proess');
                                    that.$el.earningsTimePRedemption.addClass('right-proess');
                                    $(".proess-success").show();
                                } else {
                                    if (json.data.tradeStatus == '0') { //申请失败
                                        $(".proess-error").show();
                                        $(".buy-result").hide();
                                    } else if (json.data.tradeStatus == '1') { //申请成功
                                        $(".proess-success").show();
                                        that.$el.shareTimePBuy.addClass('right-proess');
                                        that.$el.earningsTimePBuy.addClass('right-proess');
                                    } else {
                                        $(".proess-ongoing").show();
                                    }
                                }
                                that.$el.applyTimeRedemption.html(json.data.originalDate);
                                that.$el.shareTimeRedemption.html(json.data.estimateConfirmDate + ' 24:00前');
                                that.$el.earningsTimeRedemption.html(json.data.estimateArrivalDate + ' 24:00前');
                                // that.$el.payTypeRedemption.html('在线支付')
                            }
                            
                            if (json.data.secondFundName && json.data.secondFundCode){
                                //是货基购基
                                $('.normalBuyArea').hide();
                                $('.fundBuyArea').show();
                                $('.fundBuyName').html(json.data.secondFundName);
                            }
                        }
                        if (that.gV.payType == '1') { // 买入汇款支付
                            $(".resultTop").show();
                            $(".resultTopTwo").hide();
                            $(".listWrap .buy-result").show();
                            $(".changeNone").addClass("changeNone");
                            that.getBankInfo();
                            that.$el.amount1.html(json.data.tradeAmount);
                            // that.$el.buyStatusText.html(json.data.tradeApplyDesc)
                            that.$el.bankName.html(json.data.bankName);
                            that.$el.bankNum.html(json.data.bankAccountMask.substr(json.data.bankAccountMask.length - 4));
                            that.$el.payTypeBuy.html('汇款支付');
                        }
                        if (that.gV.flag == 'buy') {
                            that.$el.fundNameBuy.html(json.data.fundName);
                            that.$el.fundCodeBuy.html(json.data.fundCode);
                            that.$el.amount2Buy.html(json.data.tradeAmount);
                            if (decodeURI(splitUrl['bugFundName']) == "false") {
                                that.$el.banKImgbanKImgBuy.attr('src', json.data.bankThumbnailUrl);
                            }
                            that.$el.bankName2Buy.html(json.data.bankName);
                            that.$el.bankNum2Buy.html(json.data.bankAccountMask.substr(json.data.bankAccountMask.length - 4));
                        }
                        if (that.gV.flag == 'redemption') {
                            that.$el.fundNameRedemption.html(json.data.fundName);
                            that.$el.fundCodeRedemption.html(json.data.fundCode);
                            that.$el.amount2Redemption.html(json.data.tradeShares);
                            that.$el.banKImgRedemption.attr('src', json.data.bankThumbnailUrl);
                            that.$el.bankName2Redemption.html(json.data.bankName);
                            that.$el.bankNum2Redemption.html(json.data.bankAccountMask.substr(json.data.bankAccountMask.length - 4));
                        }
                    } else {
                        tipAction(json.message);
                    }

                },

            }];
            if (decodeURI(splitUrl['bugFundName']) != "false") {
               obj[0].data.isMoneyBuyPub = "1";
            }

            $.ajaxLoading(obj);
        },
        //获取本公司账户信息
        getBankInfo: function() {
            var that = this;
            var obj = [{
                url: site_url.findSuperviseBank_api,
                data: {

                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    if (json.status == '0000') {
                        $('#loading').hide();
                        that.$el.accountName.html(json.data.accountName);
                        that.$el.bankAccount.html(json.data.bankAccount);
                        that.$el.bankNo.html(json.data.bankNo);
                        that.$el.bankAdress.html(json.data.bankAccountName);

                    } else {
                        tipAction(json.message);
                    }

                },

            }];
            $.ajaxLoading(obj);
        },
        event: function() {
            var that = this;
            mui("body").on('mdClick', '.over', function() {
                //跳往持仓列表页
                window.location.href = site_url.publicAssets_url;
            }, {
                htmdEvt: 'surelyResultsDetail_01'
            })
        },
        objcallback: function(json) {
            console.log(json);
        }
    }
    somePage.init();
})