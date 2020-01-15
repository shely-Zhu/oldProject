/**
 * 定投结果 
 * @author wangjiajia 2019-11-23
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function() {
    var somePage = {
        $e: {
            succedText: $(".resultTop .succedText"), //标题
            errorText: $(".resultTopTwo .succedText"), //失败标题
            //转入
            shareTimePInto: $(".cashInto .shareTimeP"), //开始计算收益流程
            earningsTimePInto: $(".cashInto .earningsTimeP"), //第一笔收益到账流程
            applyTimeInto: $(".cashInto .applyTime .laber-right"), //申请时间
            shareTimeInto: $(".cashInto .shareTime .laber-right"), //开始计算收益
            earningsTimeInto: $(".cashInto .earningsTime .laber-right"), //第一笔收益到账
            fundNameInto: $(".cashInto .fundName"), //基金名
            fundCodeInto: $(".cashInto .fundCode"), //基金代码
            amountInto: $(".cashInto .amount"), //金额
            banKImgInto: $(".cashInto .banKImg"), //银行图
            bankNameInto: $(".cashInto .bankName"), //银行名
            bankNumInto: $(".cashInto .bankNum"), //银行卡尾号后四位
            payTypeInto: $(".cashInto .payType"), //支付方式

            //转出
            toTimeP: $(".cashOut .toTimeP"), //到账时间流程
            applyTimeOut: $(".cashOut .applyTime .laber-right"), //申请时间
            toTimeOut: $(".cashOut .toTime .laber-right"), //到账时间
            fundNameOut: $(".cashOut .fundName"), //基金名
            fundCodeOut: $(".cashOut .fundCode"), //基金代码
            amountOut: $(".cashOut .amount"), //金额
            banKImgOut: $(".cashOut .banKImg"), //银行图
            bankNameOut: $(".cashOut .bankName"), //银行名
            bankNumOut: $(".cashOut .bankNum"), //银行卡尾号后四位
            payTypeOut: $(".cashOut .payType") //支付方式
        },
        gV: { // 全局变量
            allotNo: splitUrl['allotNo'] || '20190827034658',
            flag: splitUrl['flag'], // 转出  out     转入  into     注意转出分普通和快速，，目前默认取得都是普通
            outType: splitUrl['outType'] || 'common', //转出类型   普通和快速  common   fast
        },
        init: function() {
            var that = this;

            that.event();
            that.getData();
        },
        getData: function() {
            var that = this;

            //请求页面数据
            var obj = [{
                url: site_url.pofCashDetail_api,
                data: {
                    allotNo: that.gV.allotNo
                },
                callbackDone: function(json) {
                    console.log(json);
                    //  isStartGainsDay 是否开始计算收益
                    //  isPaymentGainsDay 是否收益到账
                    //  isEstimateDay   是否到账（转出-普通）
                    //  isEstimateTime   是否赎回到账（转出-快赎）
                    var data = json.data;
                    $("#loading").hide();
                    if (json.status == '0000') {
                        if (data.tradeApplyStatus == '20' || data.tradeApplyStatus == '22' || data.tradeApplyStatus == '23' || data.tradeApplyStatus == '25') { //转入中  || 转出中   || 成功
                            $(".resultTop").show();
                            //状态为转入中和转入成功全部统一为转入中
                            if (that.gV.flag == "out") {
                                that.$e.succedText.html("转出中");
                            } else if (that.gV.flag == "into") {
                                that.$e.succedText.html("转入中");
                            }

                            $(".resultTopTwo").hide();
                            if (that.gV.flag == 'into') { // 转入
                                $("#HeadBarpathName").html('转入结果');
                                $(".cashInto").show();
                                $(".cashOut").hide();
                                if (data.tradeApplyStatus == '20') {
                                    if (data.isStartGainsDay) {
                                        that.$e.shareTimePInto.addClass('right-proess');
                                    }
                                    if (data.isPaymentGainsDay) {
                                        that.$e.earningsTimePInto.addClass('right-proess');
                                    }
                                }
                                that.$e.applyTimeInto.html(data.applyDateTime);
                                that.$e.shareTimeInto.html(data.startGainsDayStr + '&nbsp;24:00 前');
                                that.$e.earningsTimeInto.html(data.paymentGainsDayStr + '&nbsp;24:00 前');
                                that.$e.fundNameInto.html(data.fundName);
                                //that.$e.fundCodeInto.html(data.fundCode)
                                that.$e.amountInto.html(data.balanceMask);
                                that.$e.banKImgInto.attr('src', data.bankThumbnailUrl);
                                that.$e.bankNameInto.html(data.bankName);
                                that.$e.bankNumInto.html(data.bankAccountMask.substr(data.bankAccountMask.length - 4));
                                that.$e.payTypeInto.html('在线支付');
                            }
                            if (that.gV.flag == 'out') { // 转出
                                $("#HeadBarpathName").html('转出结果');
                                $(".cashInto").hide();
                                $(".cashOut").show();
                                if (data.tradeApplyStatus == '23') {
                                    that.$e.toTimeP.addClass('right-proess');
                                } else {
                                    if (data.isEstimateDay) {
                                        that.$e.toTimeP.addClass('right-proess');
                                    }
                                }
                                that.$e.applyTimeOut.html(data.applyDateTime);

                                if (that.gV.outType == 'common') {
                                    that.$e.toTimeOut.html(data.estimateDateStr + '&nbsp;24:00 前'); //普通转出
                                } else {
                                    that.$e.toTimeOut.html(data.estimateTimeStr + '&nbsp;24:00 前'); //快速转出
                                }

                                that.$e.fundNameOut.html(data.paymentGainsDayStr);
                                that.$e.fundCodeOut.html(data.fundName);
                                that.$e.amountOut.html(data.sharesMask);
                                that.$e.banKImgOut.attr('src', data.bankThumbnailUrl);
                                that.$e.bankNameOut.html(data.bankName);
                                that.$e.bankNumOut.html(data.bankAccountMask.substr(data.bankAccountMask.length - 4));
                                that.$e.payTypeOut.html('在线支付');
                                $(".cashOut .listContentUl .textcolor.payType").html('到账方式'); //转出的时候支付方式叫到账方式
                            }
                        }
                        if (data.tradeApplyStatus == '21' || data.tradeApplyStatus == '24') { //转出失败   || 转入失败 
                            $(".resultTop").hide();
                            $(".resultTopTwo").show();
                            that.$e.errorText.html(data.tradeApplyDesc);
                            if (that.gV.flag == 'into') { // 转入
                                $("#HeadBarpathName").html('转入结果');
                                $(".cashInto").show();
                                $(".cashOut").hide();
                                that.$e.fundNameInto.html(data.fundName);
                                that.$e.fundCodeInto.html(data.fundCode);
                                that.$e.amountInto.html(data.balanceMask);
                                that.$e.banKImgInto.attr('src', data.bankThumbnailUrl);
                                that.$e.bankNameInto.html(data.bankName);
                                that.$e.bankNumInto.html(data.bankAccountMask.substr(data.bankAccountMask.length - 4));
                                that.$e.payTypeInto.html('在线支付');
                            }
                            if (that.gV.flag == 'out') { // 转出
                                $("#HeadBarpathName").html('转出结果');
                                $(".cashInto").hide();
                                $(".cashOut").show();
                                that.$e.fundCodeOut.html(data.fundName);
                                that.$e.amountOut.html(data.sharesMask);
                                that.$e.banKImgOut.attr('src', data.bankThumbnailUrl);
                                that.$e.bankNameOut.html(data.bankName);
                                that.$e.bankNumOut.html(data.bankAccountMask.substr(data.bankAccountMask.length - 4));
                                // that.$e.payTypeOut.hide()
                                $(".cashOut .listContentUl .onlinePay").hide();
                                $(".cashOut .listContentUl .textcolor.payType").html('到账方式');
                            }
                        }
                    } else {
                        tipAction(json.message);
                    }
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                },
                callbackNoData: function(json) {
                    tipAction(json.message);
                },
            }]
            $.ajaxLoading(obj);

        },
        event: function() {
            var that = this;
            mui("body").on('mdClick', '.over', function() {
                //跳往现金宝管理页面
                window.location.href = site_url.cashManagement_url;
            }, {
                htmdEvt: 'surelyResults_01'
            })
        }
    }
    somePage.init();
})