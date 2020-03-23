/*
 * @page: 短信验证
 * @Author: yanruiting
 * @Date:   2020-03-20
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var judgeRiskHint = require('@pathCommonCom/authenticationProcess/judgeRiskHint.js');

$(function() {

    var somePage = {
        gV: { // 全局变量
            phoneNum: '',
            projectId: splitUrl['projectId'], // 项目id
            accountType: splitUrl['accountType'], // 用户类型
            isPopup: splitUrl['isPopup'], // 是否弹出售前告知书
            isRiskPopup: splitUrl['isRiskPopup'], // 风险期限匹配
            accreditedInvestor: splitUrl['accreditedInvestor'], //合格投资者【空-未做过】【0-未通过】【1-已通过】【2-已过期】
            isSatisfied: splitUrl['isSatisfied'], // 合格投资者认证是否满足，需要给app携带
            isPubToPri: splitUrl['isPubToPri'], // 是否公转私
            projectName: '',
            timer: null,
            countDown: 60,
            voiceCodeFlag: true,
        },
        init: function() {
            var that = this;
            // 如果存在定时器，清空
            if(that.gV.timer) {
                clearInterval(that.gV.timer);
            }
            that.getProjectDetail(); // 获取项目详细信息
            that.getUserPhone(); // 获取用户手机号
            that.events();
        },
        getProjectDetail: function() {
            var that = this;
            var obj = [{
                url: site_url.queryFundDetailV2_api,
                data: {
                    projectId: that.gV.projectId,
                },
                contentTypeSearch: true,
                needLogin: true,
                callbackDone: function(json) {
                    var jsonData = json.data;
                    that.gV.projectName = jsonData.productName;
                    that.gV.isElecContract = jsonData.isElecContract;
                    that.gV.isAllowAppend = jsonData.isAllowAppend;
                    that.gV.reserveId = jsonData.reserveId;
                    that.gV.productName = jsonData.productName;
                }
            }]
            $.ajaxLoading(obj);
        },
        getUserPhone: function() {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.queryUserBaseInfo_api,
                data: {
                },
                callbackDone: function (json) {
                    var data = json.data;
                    that.gV.phoneNum = data.phone;
                    that.gV.phoneNumEncrypt = data.linkPhoneEncrypt;
                    $(".phoneNumCon").html(data.phone);
                }
            }]
            $.ajaxLoading(obj);
        },
        events: function() { //绑定事件
            var that = this;
            // 验证手机验证码是否正确
            mui("body").on('mdClick', '.affirmBtn', function(e) {
                var phoneCode = $(".phoneCodeNum").val();
                if(phoneCode.length < 6) {
                    tipAction("请输入正确的验证码");
                } else {
                    var obj = [{
                        url: site_url.phoneCodeCheckout_api,
                        data: {
                            phone: that.gV.phoneNumEncrypt,
                            code: phoneCode,
                            accountType: that.gV.accountType,
                            verifyType: '25',
                        },
                        callbackDone: function (json) {
                            // 验证码发送成功后进去售前告知书的判断
                            var obj = {
                                type: 1,
                                projectId: that.gV.projectId,
                                projectName: that.gV.projectName,
                                isPopup: that.gV.isPopup,
                                isRiskPopup: that.gV.isRiskPopup,
                                isElecContract: that.gV.isElecContract,
                                isAllowAppend: that.gV.isAllowAppend,
                                isSatisfied: that.gV.isSatisfied,
                                accreditedInvestor: that.gV.accreditedInvestor,
                                htmdEvt: "SMSVerification",
                                custType: that.gV.accountType,
                                phoneCode: phoneCode,
                                reserveId: that.gV.reserveId,
                                isPubToPri: that.gV.isPubToPri
                            }
                            judgeRiskHint(obj);
                        },
                        callbackNoData: function () {
                            tipAction('短信验证码不正确');
                        },
                        callbackFail: function () {
                            tipAction('短信验证码不正确');
                        }
                    }]
                    $.ajaxLoading(obj);
                }
            }, {
                'htmdEvt': 'SMSVerification_1'
            })
            // 获取短信验证码
            mui("body").on('mdClick', '.phoneCodeHint', function(e) {
                if(!that.gV.timer) {
                    var obj = [{
                        url: site_url.messageCertSend_api,
                        data: {
                            phone: that.gV.phoneNumEncrypt,
                            type: '25',
                            accountType: that.gV.accountType,
                            projectName: that.gV.projectName,
                        },
                        callbackDone: function (json) {
                            tipAction("短信验证码已发送，请查收")
                            that.gV.timer = setInterval(function() {
                                if (that.gV.countDown == 0) {
                                    $(".phoneCodeHint").html("获取验证码");
                                    that.gV.countDown = 60;//60秒过后button上的文字初始化,计时器初始化;
                                    clearInterval(that.gV.timer);
                                    that.gV.timer = null;
                                    return;
                                } else {
                                    that.gV.countDown--;
                                    $(".phoneCodeHint").html("重新获取(" + that.gV.countDown + '’)');
                                }
                            }, 1000)
                        },
                        callbackNoData: function() {
                            tipAction('发送手机验证码失败');
                        }
                    }]
                    $.ajaxLoading(obj);
                }
            }, {
                'htmdEvt': 'SMSVerification_2'
            })
            // 获取语音验证码
            mui("body").on('mdClick', '.voicePhoneCodeGet', function(e) {
                if(that.gV.voiceCodeFlag) {
                    that.gV.voiceCodeFlag = false;
                    var layer = {
                        title: '尊敬的客户',
                        id: 'sellPop',
                        p: '<p>是否通过手机号'+ that.gV.phoneNum +'接收语言验证码？</p>',
                        htmdEvtYes:'SMSVerification_4',  // 埋点确定按钮属性
                        htmdEvtCel:'SMSVerification_5',  // 埋点取消按钮属性
                        yesTxt: '确定',
                        zIndex: 1200,
                        callback: function(t) {
                            var obj = [{
                                url: site_url.voiceMsgVerify_api,
                                data: {
                                    phone: that.gV.phoneNumEncrypt,
                                    type: '25',
                                    accountType: that.gV.accountType,
                                    projectName: that.gV.projectName,
                                },
                                callbackDone: function (json) {
                                    that.gV.voiceCodeFlag = true;
                                    tipAction("语音验证码已获取，请注意来电接听！")
                                },
                                callbackNoData: function () {
                                    that.gV.voiceCodeFlag = true;
                                },
                                callbackNoData: function() {
                                    that.gV.voiceCodeFlag = true;
                                    tipAction('获取语音验证码失败')
                                }
                            }]
                            $.ajaxLoading(obj);
                        },
                        callbackCel: function() {
                            that.gV.voiceCodeFlag = true;
                        }
                    };
                    $.elasticLayer(layer);
                    
                }
            }, {
                'htmdEvt': 'SMSVerification_3'
            })
        },
    };
    somePage.init();
});