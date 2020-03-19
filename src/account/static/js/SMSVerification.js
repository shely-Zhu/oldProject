/*
 * @page: 公募自选总资产
 * @Author: shiyunrui
 * @Date:   2019-11-19
 * @description:
 * 公募持仓页面
 * update:chentiancheng 2020-01-08
 * @description:
 * 新增事件clickEvent方法
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

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
        judgeRisk: function(phoneCode) {
            var that = this;
            var isPopup = that.gV.isPopup; //弹框售前告知书 
            var isRiskPopup = that.gV.isRiskPopup; //产品期限不符弹框
            if (!!isPopup) { //如果弹出售前告知书或期限不符弹框
                //发送ajax请求
                var ReourceListobj = [{
                    url: site_url.queryReourceListNew_api,
                    data: {
                        projectId: that.gV.projectId,
                        fileType: isPopup
                    },
                    contentTypeSearch: false,
                    needLoading: true,
                    needLogin: true, //需要判断是否登陆
                    callbackDone: function(json) { //成功后执行的函数
                        var data = json.data[0],
                            noticeObj = data;
                        if(!!isRiskPopup && !!isPopup){ // 产品期限风险弹框与售前告知书都展示
                            var objElasticLayer = {
                                title: '尊敬的客户',
                                id: 'sellPop',
                                p: '<p class="" style="font-weight:bold;text-align:center">您风险测评中所选计划投资期限少于产品期限存在匹配风险，请确认是否继续购买</p>',
                                yesTxt: '继续',
                                celTxt: '放弃',
                                htmdEvtYes:'SMSVerification_0',  // 埋点确定按钮属性
                                htmdEvtCel:'SMSVerification_1',  // 埋点取消按钮属性
                                zIndex: 1200,
                                callback: function(t) {
                                    var obj = {
                                        title: '尊敬的客户',
                                        id: 'sellPop',
                                        p: '<p class="" style="font-weight:bold;text-align:center">你选择的产品与您现在的风险承受能力相匹配</p>' +
                                                '<p class="">请您认真阅读' + noticeObj.fileName + that.gV.productName + '并确认后继续购买该产品</p>',
                                        yesTxt: '去阅读',
                                        celTxt: '取消',
                                        htmdEvtYes:'SMSVerification_2',  // 埋点确定按钮属性
                                        htmdEvtCel:'SMSVerification_3',  // 埋点取消按钮属性
                                        zIndex: 1200,
                                        callback: function(t) {
                                            if(that.gV.isElecContract == 1) { // 电子
                                                var businessType = 'confirmation';
                                            } else {
                                                var businessType = 'confirmationNoele';
                                            }
                                            window.location.href = site_url.downloadNew_api + "?filePath=" + noticeObj.fileUrl + "&fileName=" + new Base64().encode(noticeObj.fileName) + "&groupName=" +
                                            noticeObj.groupName + "&show=1&readComplete=true&showDownload=false&fundCode=" + that.gV.projectId + "&isAllowAppend=" +
                                            that.gV.isAllowAppend + '&accreditedInvestor=' + that.gV.accreditedInvestor + '&businessType='+ businessType +'&phoneCode=' + phoneCode + '&projectName=' + that.gV.projectName;
                                        },
                                        callbackCel: function() {
                                            location.href = "javascript:history.go(-1)";
                                        }
                                    };
                                    $.elasticLayer(obj)
                                },
                                callbackCel: function() { // 放弃返回到上一页
                                    location.href = "javascript:history.go(-1)";
                                }
                            };
                        }else if(!!isRiskPopup && !isPopup){ // 展示产品期限弹框，继续购买后直接进入预约确认页面
                            var objElasticLayer = {
                                title: '尊敬的客户',
                                id: 'sellPop',
                                p: '<p class="" style="font-weight:bold;text-align:center">您风险测评中所选计划投资期限少于产品期限存在匹配风险，请确认是否继续购买</p>',
                                yesTxt: '继续',
                                celTxt: '放弃',
                                htmdEvtYes:'SMSVerification_0',  // 埋点确定按钮属性
                                htmdEvtCel:'SMSVerification_1',  // 埋点取消按钮属性
                                zIndex: 1200,
                                callback: function(t) {
                                    // 根据电子非电子订单跳转不同页面
                                    if(that.gV.isElecContract == 1) { // 电子
                                        window.location.href = site_url.confirmationEle_url + '?projectId=' + that.gV.projectId + '&projectName=' + that.gV.projectName + '&reserveId=' + that.gV.reserveId + '&isAllowAppend=' + that.gV.isAllowAppend + '&isPubToPri=' + that.gV.isPubToPri + '&isSatisfied=' + that.gV.isSatisfied + '&phoneCode=' + phoneCode; 
                                    } else { // 非电子
                                        window.location.href = site_url.confirmation_url + '?projectId=' + that.gV.projectId + '&projectName=' + that.gV.projectName + '&reserveId=' + that.gV.reserveId + '&phoneCode=' + phoneCode;
                                    }
                                },
                                callbackCel: function() { // 放弃返回到上一页
                                    location.href = "javascript:history.go(-1)";
                                }
                           };
                        }else if(!isRiskPopup && !!isPopup){
                            var objElasticLayer = {
                                title: '尊敬的客户',
                                id: 'sellPop',
                                p: '<p class="" style="font-weight:bold;text-align:center">你选择的产品与您现在的风险承受能力相匹配</p>' +
                                        '<p class="">请您认真阅读' + noticeObj.fileName + that.gV.productName + '并确认后继续购买该产品</p>',
                                yesTxt: '去阅读',
                                celTxt: '取消',
                                htmdEvtYes:'SMSVerification_4',  // 埋点确定按钮属性
                                htmdEvtCel:'SMSVerification_5',  // 埋点取消按钮属性
                                zIndex: 1200,
                                callback: function(t) {
                                    if(that.gV.isElecContract == 1) { // 电子
                                        var businessType = 'confirmation';
                                    } else {
                                        var businessType = 'confirmationNoele';
                                    }
                                    window.location.href = site_url.downloadNew_api + "?filePath=" + noticeObj.fileUrl + "&fileName=" + new Base64().encode(noticeObj.fileName) + "&groupName=" +
                                    noticeObj.groupName + "&show=1&readComplete=true&showDownload=false&fundCode=" + that.gV.projectId + "&isAllowAppend=" +
                                    that.gV.isAllowAppend + '&accreditedInvestor=' + that.gV.accreditedInvestor + '&businessType='+ businessType +'&phoneCode=' + phoneCode + '&projectName=' + that.gV.projectName;
                                },
                                callbackCel: function() { // 放弃返回到上一页
                                    location.href = "javascript:history.go(-1)";
                                }
                            };
                        }
                        $.elasticLayer(objElasticLayer);
                    },
                    callbackNoData: function() {
                        $(".netLoading").hide();
                        var layer = {
                            title: '尊敬的客户',
                            id: 'sellPop',
                            p: '<p>售前风险告知书内容未显示，请联系您的理财师或拨打客服热线：400-8980-618进行咨询！</p>',
                            yesTxt: '确定',
                            htmdEvtYes:'SMSVerification_6',  // 埋点确定按钮属性
                            hideCelButton: true,
                            zIndex: 1200,
                            callback: function(t) {
                                location.href = "javascript:history.go(-1)";
                            },
                        };
                        $.elasticLayer(layer);
                    },
                    callbackFail: function(json) { //失败后执行的函数
                        tipAction(json.message);
                        $(".netLoading").hide();
                    }
                }];
                $.ajaxLoading(ReourceListobj);
            } else { 
                // 客户为专业投资者，短信验证通过且投资期限与产品期限匹配后，不弹出阅读售前告知书弹框
                // 客户为资管专业投资者，短信验证通过且投资期限与产品期限匹配后，不弹出阅读售前告知书弹框
                // 根据电子非电子直接跳转客户确认页面
                if(that.gV.isElecContract == 1) { // 电子
                    window.location.href = site_url.confirmationEle_url + '?projectId=' + that.gV.projectId + '&projectName=' + that.gV.projectName + '&reserveId=' + that.gV.reserveId + '&isAllowAppend=' + that.gV.isAllowAppend + '&isPubToPri=' + that.gV.isPubToPri + '&isSatisfied=' + that.gV.isSatisfied + '&phoneCode=' + phoneCode;
                } else { // 非电子
                    window.location.href = site_url.confirmation_url + '?projectId=' + that.gV.projectId + '&projectName=' + that.gV.projectName + '&reserveId=' + that.gV.reserveId + '&phoneCode=' + phoneCode;
                }
            }
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
                            verifyType: '17',
                        },
                        callbackDone: function (json) {
                            // 验证码发送成功后进去售前告知书的判断
                            that.judgeRisk(phoneCode)
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
                'htmdEvt': 'SMSVerification_7'
            })
            // 获取短信验证码
            mui("body").on('mdClick', '.phoneCodeHint', function(e) {
                if(!that.gV.timer) {
                    var obj = [{
                        url: site_url.messageCertSend_api,
                        data: {
                            phone: that.gV.phoneNumEncrypt,
                            type: '17',
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
                'htmdEvt': 'SMSVerification_8'
            })
            // 获取语音验证码
            mui("body").on('mdClick', '.voicePhoneCodeGet', function(e) {
                if(that.gV.voiceCodeFlag) {
                    that.gV.voiceCodeFlag = false;
                    var layer = {
                        title: '尊敬的客户',
                        id: 'sellPop',
                        p: '<p>是否通过手机号'+ that.gV.phoneNum +'接收语言验证码？</p>',
                        htmdEvtYes:'SMSVerification_10',  // 埋点确定按钮属性
                        htmdEvtCel:'SMSVerification_11',  // 埋点取消按钮属性
                        yesTxt: '确定',
                        zIndex: 1200,
                        callback: function(t) {
                            var obj = [{
                                url: site_url.voiceMsgVerify_api,
                                data: {
                                    phone: that.gV.phoneNumEncrypt,
                                    type: '17',
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
                'htmdEvt': 'SMSVerification_9'
            })
        },
    };
    somePage.init();
});