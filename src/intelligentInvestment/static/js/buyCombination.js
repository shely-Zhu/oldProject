/*
 * @page: 恒小智购买页
 * @Author: songxiaoyu
 * @Date:   2018-10-12 16:42:39
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-20 10:18:43
 * @description:
 * 页面必需参数 groupCode combinationName 
 * 页面选填参数 supplementary--是否追加
 */

require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
// 展开收起
require('../../../common/js/components/openOrClose.js');
var tipAction = require('../../../common/js/components/tipAction.js');
var splitUrl = require('../../../common/js/components/splitUrl.js')();
// 设置标题
var setCombinationName = require('@pathCommonJsComBus/setCombinationName.js');
// 银行卡渲染
var renderBankList = require('@pathCommonJsComBus/renderBankList.js');
// 持仓表格
var holdingTable = require('@pathCommonJsComBus/holdingTable.js');
// 交易密码错误处理
var dealWrongPassword = require('@pathCommonJsComBus/dealWrongPassword.js');

require('../../../common/js/components/elasticLayer.js');
require('../../../common/js/components/elasticLayerTypeTwo.js');
// 账户冻结提示
var frozenAccount = require('../../../common/js/components/frozenAccount.js');

$(function() {

    var buyCombination = {
        getElements: {},
        gV: {
            groupCode: splitUrl['groupCode'], // 组合编码
            lowGroupBuyAmount: null, // 组合购买最小限额
            highGroupBuyAmount: null, // 组合购买最大限额
            tableTitle: ['基金名称', '配置比例(%)', '分配金额(元)'], // 持仓表格title
            supplementary: splitUrl['supplementary'], // 追加，再次购买
        },
        init: function() {
            var that = this;
            // 设置标题
            setCombinationName();
            that.getData();
            that.events();
        },
        /**
         * [smartCardList 银行卡接口请求,配置比列接口请求]
         * @author songxiaoyu 2019-01-11
         * @return {[type]} [description]
         */
        getData: function() {
            var that = this,
                additional = ''; // 追加请求银行卡使用

            if (that.gV.supplementary) { // 追加
                additional = '1';
            }

            var obj = [{ // 银行卡列表---默认返回公募开卡的银行卡
                url: site_url.smartList_api,
                data: {
                    "code": that.gV.groupCode, //组合代码
                    "additional": additional
                },
                //async: false,
                // needDataEmpty: false,
                callbackDone: function(json) {
                    var data = json.data;

                    that.gV.lowGroupBuyAmount = data.lowGroupBuyAmount; // 组合购买最小限额
                    // that.gV.lowGroupBuyAmount = 1000; // 组合购买最小限额
                    that.gV.lowGroupBuyAmountMask = data.lowGroupBuyAmountMask; // 组合购买最小限额
                    that.gV.highGroupBuyAmount = data.highGroupBuyAmount; // 组合购买最大限额  
                    // that.gV.highGroupBuyAmount = 100000; // 组合购买最大限额  
                    $('.inputTurnIn').attr('placeholder', that.gV.lowGroupBuyAmountMask + '起投');

                    // 银行卡列表渲染
                    renderBankList(data);

                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }, { // 持仓详情
                url: site_url.combinFundProportionList_api,
                data: {
                    "groupCode": that.gV.groupCode //组合代码
                },
                //async: false,
                // needDataEmpty: false,
                callbackDone: function(json) {
                    var data = {};

                    data.list = json.data.combinFundProportionList;
                    data.title = that.gV.tableTitle;
                    data['buyCombination'] = true; // 表格渲染的时候区分

                    // 表格渲染
                    holdingTable(data);
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;

            // 输入框操作
            $('.inputTurnIn').on('keyup', function() {
                // 给输入框绑定格式处理，只能输小数点和.
                $(this).val($.util.regList.onlyNumberDian($(this).val()));

                var value = this.value;

                $('.listDiv').each(function(i) {
                    var $this = $(this),
                        percent = $this.find('.percent').html() + '%',
                        distribution = $.util.multiplying(percent, value);

                    $this.find('.distribution').html(distribution);
                })
            });

            // 确定按钮
            mui("body").on('tap', '.bottom', function() {

                var obj = null, // ajax请求
                    agreement = $('.agreement input[type=checkbox]:checked')[0], // 协议
                    $bankCard = $('.cardList input[type=radio]:checked'), // 选中银行卡
                    can = ($bankCard.length == 1) ? true : (tipAction('请选择支付银行卡')),
                    singleNum = $.util.regList.removeComma($bankCard.attr('singleNum')), // 银行单笔限额
                    singleNum = Number(singleNum) ? Number(singleNum) : Infinity, //返回为空或者null都没有限额
                    value = (!$('.inputTurnIn').val()) ? 0 : Number($('.inputTurnIn').val()); // 输入数字


                // 输入框离焦
                $('.inputTurnIn').blur();

                // 小于起投金额
                if (value < Number(that.gV.lowGroupBuyAmount)) {
                    tipAction('买入金额低于起投金额，请重新输入');
                    return false;
                }

                // 组合最高金额
                if (value > Number(that.gV.highGroupBuyAmount)) {
                    tipAction('买入金额高于最高限额，请重新输入');
                    return false;
                }

                //银行单笔限额
                if (value > singleNum) {
                    tipAction('买入金额超出银行卡单笔限额，请重新输入');
                    return false;
                }

                // 是否勾选协议
                if (!agreement) {
                    tipAction('请阅读并勾选协议')
                    return false;
                }
                $('.payPassword').show();
                // 风险评测是否过期
               /* obj = [{
                    url: site_url.user_api,
                    data: {
                    },
                    needLogin: true,
                    async: false,
                    callbackDone: function(json) {

                        var jsonData = json.data;
                        // 冻结账户弹窗提示
                        var result = frozenAccount("buyFreeze", window.location.href, jsonData.accountType);
                        if( !!result ){
                            return false;
                        };
                        if (jsonData.pofExpired == 1) {
                            tipAction('风险测评已过期，请重新测评')
                        } else {
                            // 弹出交易密码
                            $('.payPassword').show();
                        }
                        
                    },
                    callbackFail: function(json) {
                        tipAction(json.msg);
                    }
                }];
                $.ajaxLoading(obj);*/
            })

            //点击密码弹出框的确定按钮
            mui("body").on('tap', '.payPassword .eventBtn', function() {

                var $this = $(this),
                    $bankCard = $('.cardList input[type=radio]:checked'), // 选中银行卡
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
                    url: site_url.combinFundBuy_api,
                    data: {
                        "buyBalance": Number($('.inputTurnIn').val()), //购买金额
                        "capitalMode": $bankCard.attr('capitalMode'), //资金方式
                        "combCode": that.gV.groupCode, //组合编号
                        "password": passwordVal, //密码
                        "tradeAcco": $bankCard.attr('tradeAcco') //普通交易账号
                    },
                    needLogin: true,
                    // needDataEmpty: false,
                    callbackDone: function(json) {
                        var data = json.data.combinBuyInfo,
                            allotNo = data.allotNo; //申请编号

                        window.location.href = site_url.transactionResult_url + '?allotNo=' + allotNo + '&tradeType=1'
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
    };
    buyCombination.init();
});