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
// 交易密码错误处理
var dealWrongPassword = require('@pathCommonJsComBus/dealWrongPassword.js');
require('../../../common/js/components/elasticLayer.js');
require('../../../common/js/components/elasticLayerTypeTwo.js');
// 账户冻结提示
var frozenAccount = require('../../../common/js/components/frozenAccount.js');

$(function() {
    var redemption = {
        inputVal: 10,
        shareArr: [],
        tradeAcco: '',
        combCode: '',
        combName: '',
        init: function() {
            var that = this;
            that.getData();
            that.events();
        },
        getData: function() {
            var that = this;
            var obj = [{
                url: site_url.combinAccList_api, // 交易账号查询
                data: {
                    hmac: "", //预留的加密信息
                    params: {}
                },
                needDataEmpty: false,
                async: false, //同步
                callbackDone: function(json) {
                    var jsonData = json.data;
                    var bankAccount = jsonData.combinAccList[0].bankAccount;
                    var bankNo = bankAccount.substring(bankAccount.length - 4);
                    var text = jsonData.combinAccList[0].bankName + "（" + bankNo + "）";
                    $(".bank_txt").html(text);
                    that.tradeAcco = jsonData.combinAccList[0].tradeAcco;
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            obj.push({
                url: site_url.shareList_api, // 组合持仓列表
                data: {
                    hmac: "", //预留的加密信息
                    params: { //请求的参数信息

                    }
                },
                callbackDone: function(json) {
                    var jsonData = json.data.comShareList;
                    var myTemplate = Handlebars.compile($("#fund_list_template").html());
                    $('#fund_list').html(myTemplate(jsonData));
                    $.each(jsonData, function(i, el) {
                        that.shareArr.push(el.availShare);
                    });
                    // 赎回份额
                    that.changeVal();
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            });
            obj.push({
                url: site_url.combinFundTotalAsset_api, // 组合资产
                data: {
                    hmac: "", //预留的加密信息
                    params: { //请求的参数信息
                        pageNum: "", //当前页
                        pagesize: "" //每页显示条数
                    }
                },
                callbackDone: function(json) {
                    // totalAmountMask总资产即当前资产市值
                    var combinTotalAsset = json.data.combinTotalAsset;

                    $(".js_marketNum").html(combinTotalAsset.totalAmountMask);
                    // 组合编号
                    that.combCode = combinTotalAsset.combCode;
                    // 组合名称
                    $(".tit .title").html(combinTotalAsset.combName);
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            });
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;
            //默认点击赎回比例 目的页面初始化显示上方提示
            $(".mui-input-range input[type='range']").trigger('tap');
            // 监听range数值变化
            $("#block-range").on(" input propertychange", function() {
                that.inputVal = $(this).val();
                that.changeVal();
            });

            // 确定按钮点击事件
            var $redemptionBtn = $(".redemptionBtn");
            $redemptionBtn.on("click", function() {
                // 冻结账户弹窗提示
                var result = frozenAccount("saleFreeze", window.location.href, false);
                if( !!result ) {
                    return false;
                };
                //出现支付密码的弹框
                $('.payPassword').show();
            });

            //关闭输入网站交易密码的弹层
            mui("body").on('tap', '.payPassword .close', function() {
                $('.payPassword').hide();
            });
            //点击密码弹出框的确定按钮
            mui("body").on('tap', '.payPassword .eventBtn', function() {

                var val = $('.payPassword .passInput').val();

                if (!val) {
                    //没有填写
                    //隐藏网站交易密码弹框
                    $('.payPassword').hide();
                    //
                    tipAction('请输入网站交易密码', function() {
                        $('.payPassword').show();
                    });
                    return false;
                }

                var $this = $(this);
                $this.attr('disabled', 'disabled').addClass('disabled');

                //有输入,请求ajax
                var obj = [{
                    url: site_url.combinFundRedempInfo_api, // 赎回
                    data: {
                        hmac: "", //预留的加密信息 非必填项
                        params: {
                            combCode: that.combCode, //组合编号
                            tradeAcco: that.tradeAcco, //交易账号
                            password: $('.payPassword .passInput').val(), //客户支付密码 必填项
                            combinRedemRatio: that.inputVal, //赎回比例
                        }, //请求的参数信息
                    },
                    needLogin: true,
                    needDataEmpty: false,
                    callbackDone: function(json) {
                        var allotNo = json.data.combinRedempInfo.allotNo;
                        window.location.href = site_url.transactionResult_url + "?tradeType=2&allotNo=" + allotNo + "&inputVal=" + that.inputVal;
                    },
                    callbackFail: function(json) {

                        dealWrongPassword(json);
                    }

                }];
                $.ajaxLoading(obj);

            });


        },
        // 封装动态变化赎回份额
        changeVal: function() {
            var that = this;
            var $fund_share = $(".fund_box .fund_share");
            $.each($fund_share, function(i, el) {
                var txt = $.util.multiplying(that.shareArr[i], that.inputVal, true);
                var txt1 = $.util.multiplying(txt, 0.01, true);
                $fund_share.eq(i).html(txt1);
            });
        }
    }
    redemption.init();
})