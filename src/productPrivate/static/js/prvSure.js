/**
 * 私募产品列表
 * @author  zhangweipeng 2017-03-08

 *修改：判断客户已有的私募理财师是否持证
 *@author zhangyanping 2018-05-25

 */
require('../../../include/js/vendor/config.js');
//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');

require('../../../common/js/components/utils.js');
var arg = require('../../../common/js/components/splitUrl.js')();
require('../../../common/js/ajaxLoading.js');
require('../../../common/js/components/elasticLayer.js');
//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');
// 银行卡渲染
var renderBankList = require('@pathCommonJsComBus/renderBankList.js');

var prvSure = {
    perStart: null,
    addCash: null,
    prdSize: null,
    getElements: {
        input: $('.cashInput input'), //input输入框
        errorTip: $(".againEnter"), //错误提示框
        appBtn: $(".mui-btn"), //确认预约按钮
    },
    gV: {
        custType: null, // 1自然人
    },
    init: function() {
        var that = this;

        that.getData();
        that.events();
    },
    getData: function() {
        var that = this;

        var obj = [{
            url: site_url.prvDetail_api, // 私募详情接口
            data: {
                hmac: "", //预留的加密信息
                params: { //请求的参数信息
                    productCode: arg["fundCode"] // 产品代码
                }
            },
            async: false,
            needLogin: true,
            callbackDone: function(data) {
                var json = data.data;

                $(".card-head.title").html(json.productName);
                //that.getElements.input.val("起投金额"+json.personMinBalance);
                that.getElements.input.attr("placeholder", "起投金额" + json.personMinBalance);
                $(".cashTip .cashStart").html(json.reserveBaseBalance);

                //此处需要去掉千分位
                that.prdSize = json.issueScale.replace(',', '').replace('，', '');

                that.addCash = json.reserveBaseBalance; // 递增金额
                that.perStart = json.personMinBalance;  // 起投金额
                that.custType = json.custType;

                if(json.custType == '1'){ // 自然人客户请求银行卡接口
                    that.getCardList();
                }
            }
             
        }, {
            url: site_url.custBro_api, // 理财师
            data: {
                hmac: "", //预留的加密信息    
                params: { //请求的参数信息 
                    broker_account: "", //工号    
                    type: "0",
                    isCertificate: "Y", //是否通过基金从业考试 Y：通过 N：未通过（新增）
                }
            },
            needLogin: true,
            //needEmptyData:true,
            callbackDone: function(data) {
                var json = data.data;

                if ($.util.objIsEmpty(json.advisor)) {
                    return false;
                } else if (json.existMain == "1") {
                    $.each(json.advisor, function(i, el) {
                        $(".prdInfo .head").html("专属理财师")
                        if (el.is_main == "1") {
                            el.check = true;
                            var arr = [];
                            arr.push(el);
                            var tplm = $("#finacialMore").html();
                            var template = Handlebars.compile(tplm);
                            $('.prdInfo .form-list').html(template(arr));
                            $(".prdPrvSure .prdInfo").show();
                        }
                    })
                } else if (json.existMain == "0") {
                    $(".prdInfo .head").html("服务理财师")
                    $.each(json.advisor, function(i, el) {
                        if (i == 0) {
                            el.check = true;
                        } else {
                            el.check = false;
                        }
                    });
                    var tplm = $("#finacialMore").html();
                    var template = Handlebars.compile(tplm);
                    $('.prdInfo .form-list').html(template(json.advisor));
                    $(".prdPrvSure .prdInfo").show();
                }
            },
             
        }];

        $.ajaxLoading(obj)
    },
    getCardList: function() { // 自然人客户获取银行卡接口
        var obj = [{ //获取银行卡列表
            url: site_url.changeDealBankList_api,
            data: {
                hmac: "", //预留的加密信息 非必填项
                params: {
                    fundType: '',
                    type: "0", // 0:全部 1:私募 2:公募
                    bankAccountSecret: "", //银行卡号base64加密字段，查询所有银行卡传递“”
                    pageNum: 1, // 当前页
                    pageSize: "", //每页条目数,""为空查询1000条
                } //请求的参数信息
            },
            needLogin: true,
            needDataEmpty: true,
            callbackDone: function(json) {
                var data = json.data,
                    accountName = !$.util.objIsEmpty(data.bankList) && data.bankList[0].accountName; // 客户名称

                // 受益账户显示
                $('.cardList').show();

                // 回显姓名
                $('.beneName .customerName').html(accountName);

                // 银行卡列表渲染
                renderBankList(data);

                // 删除限额
                $('.limitMoney').remove();
            }
        }];
        $.ajaxLoading(obj);
    },
    events: function() {
        var that = this;

        that.getElements.appBtn.on("tap", function() {
            var value = Number(that.getElements.input.val()),
                bank = $(".cardList input[type=radio]:checked"), // 选中银行卡
                bank_account = bank.attr('bankaccount'), // 银行账号
                bank_name = bank.attr('bankname'), // 开户银行
                name_inbank = bank.attr('accountName'), // 银行户名
                branch_bank_name = bank.attr('subBranch'); // 开户银行分行名称

            if(that.custType == '1' && $('.cardList input[type=radio]:checked').length != 1){ // 自然人必须选择银行卡
                tipAction("无受益账户信息，不可提交申请。");
            }else if (!value) {
                tipAction("请输入预约金额");
            } else if (value < that.perStart) {
                tipAction("最低预约金额为" + that.perStart + "万元");
            } else if (value > that.prdSize) {
                tipAction("预约金额不能超过产品规模", function() {
                    that.getElements.input.val(that.prdSize);
                });
            }else if (!that.addCash || that.addCash == "0") {
                if (value != that.perStart) {
                    tipAction("预约金额为" + that.perStart + "万元");
                } else {
                    var account = $(".mui-radio input[type=radio]:checked").parents(".mui-card").find(".account").html();
                    $.elasticLayer({
                        id: "app",
                        title: '提示', //如果不传默认为'尊敬的用户'
                        p: '<p>' + $(".card-head.title").html() + '</p><p>' + that.getElements.input.val() + '万元</p><p>您是否要确定预约</p>',
                        yesTxt: '确定',
                        celTxt: '取消',
                        //zIndex: 30, 
                        yesButtonPosition: 'right',
                        callbackCel: $.noop,
                        callback: function(t) {
                            t.$yes.attr("disabled", "disabled");
                            var obj = [{
                                url: site_url.prvReserve_api, // fundReserve.action
                                data: {
                                    hmac: "", //预留的加密信息
                                    params: { //请求的参数信息
                                        product_code: arg["fundCode"], // 产品代码
                                        appoint_money: that.getElements.input.val(), // 预约金额（万元）
                                        broker_account: account, // 理财师工号
                                        bank_account: bank_account, // 银行账号（加密）
                                        bank_name: bank_name, //开户银行（后拼","+银行编号）
                                        branch_bank_name: branch_bank_name, // 开户银行分行名称
                                        name_inbank: name_inbank //开户人姓名
                                    }
                                },
                                needLogin: true,
                                needDataEmpty: false,
                                callbackDone: function() {
                                    $.elasticLayer({
                                        id: "app",
                                        title: '提示', //如果不传默认为'尊敬的用户'
                                        p: '您已成功提交预约申请',
                                        yesTxt: '继续预约',
                                        celTxt: '查看申请',
                                        //zIndex: 30, 
                                        yesButtonPosition: 'right',
                                        callbackCel: function() {
                                            window.location.href = '/personal/views/orderDetail.html';
                                        },
                                        callback: function() {
                                            window.location.href = '/productPrivate/views/prdPrvLists.html';
                                        }
                                    })
                                },
                                callbackFail: function(data) {
                                    t.hide();
                                    tipAction(data.message, function() {
                                        t.$yes.removeAttr("disabled");
                                    });
                                }
                            }]
                            $.ajaxLoading(obj);
                        }
                    })
                }
            } else if (value % that.addCash != 0) {
                tipAction("预约金额为" + that.addCash + "万的整数倍");
            } else {
                var account = $(".mui-radio input[type=radio]:checked").parents(".mui-card").find(".account").html();
                $.elasticLayer({
                    id: "app",
                    title: '提示', //如果不传默认为'尊敬的用户'
                    p: '<p>' + $(".card-head.title").html() + '</p><p>' + that.getElements.input.val() + '万元</p><p>您是否要确定预约</p>',
                    yesTxt: '确定',
                    celTxt: '取消',
                    //zIndex: 30, 
                    yesButtonPosition: 'right',
                    callbackCel: $.noop,
                    callback: function(t) {
                        t.$yes.attr("disabled", "disabled");
                        var obj = [{
                            url: site_url.prvReserve_api, // fundReserve.action
                            data: {
                                hmac: "", //预留的加密信息
                                params: { //请求的参数信息
                                    product_code: arg["fundCode"], // 产品代码
                                    appoint_money: that.getElements.input.val(), // 预约金额（万元）
                                    broker_account: account, // 理财师工号
                                    bank_account: bank_account, // 银行账号（加密）
                                    bank_name: bank_name, //开户银行（后拼","+银行编号）
                                    branch_bank_name: branch_bank_name, // 开户银行分行名称
                                    name_inbank: name_inbank, // 银行户名
                                }
                            },
                            needLogin: true,
                            needDataEmpty: false,
                            callbackDone: function() {
                                $.elasticLayer({
                                    id: "app",
                                    title: '提示', //如果不传默认为'尊敬的用户'
                                    p: '您已成功提交预约申请',
                                    yesTxt: '继续预约',
                                    celTxt: '查看申请',
                                    //zIndex: 30, 
                                    yesButtonPosition: 'right',
                                    callbackCel: function() {
                                        window.location.href = '/personal/views/orderDetail.html';
                                    },
                                    callback: function() {
                                        window.location.href = '/productPrivate/views/prdPrvLists.html';
                                    }
                                })
                            },
                            callbackFail: function(data) {
                                t.hide();
                                tipAction(data.message, function() {
                                    t.$yes.removeAttr("disabled");
                                });
                            }
                        }]
                        $.ajaxLoading(obj);
                    }
                })
            }
        })
    }
}

prvSure.init();