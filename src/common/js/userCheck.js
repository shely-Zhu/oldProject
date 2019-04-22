/**
 判断是否登录及风险测评

用法如下：
    $.userCheck(isRisk,callback);
    isRisk:布尔值  false--不用判断是否风险测评   true--必须判断风险测评
    window.currentIsApp:全局变量，用于判断此页面是否位于APP中，若是，则进行更改iframe页面链接，如否，进行WAP页面逻辑处理

使用sso接口，jsonp请求，所有页面逻辑放在callback里
 */


//黑色提示条的显示和隐藏
var tipAction = require("./components/tipAction.js");
var Base64 = require('../../include/js/vendor/base64/base64.js');
var manualTriggerLogin = require('./components/manualTriggerLogin.js');
require('./ajaxLoading.js');;
(function($) {

    $.extend($, {
        userCheck: function(isRisk, callbackFunc) {
            var obj = [{
                url: site_url.checkLogin_api,
                data: null,
                needLogin: true,
                //dataType: 'jsonp',
                //needCrossDomain: true,
                needDataEmpty: false,
                callbackDone: function(data) {
                    console.log(123);
                    // 登录状态
                    if (isRisk) { //根据参数判断需不需要风险测评
                        var userObj = [{
                            url: site_url.user_api,
                            data: {
                            },
                            async: false,
                            needDataEmpty: false,
                            appRisk: true,
                            callbackDone: function(data, fnc) {

                                if (data.data.endurePubIsold == "1") {   //是   0-否 1-是
                                    // 处理完之后再走页面逻辑
                                    (typeof(callbackFunc) == 'function') && callbackFunc();
                                } else{   //否
                                    // 没有做过风险评测
                                    if (window.currentIsApp) {
                                        fnc();
                                    } else {
                                        if (data.data.accountType == "0" || data.data.accountType == "2") { //机构
                                            window.location.href = site_url.questionnaireOrg_url + '&originUrl=' + new Base64().encode(window.location.href);
                                        } else if (data.data.accountType == "1") { //个人
                                            window.location.href = site_url.questionnairePer_url + '&originUrl=' + new Base64().encode(window.location.href);
                                        }
                                    }
                                }
                            }
                        }]
                        $.ajaxLoading(userObj);
                    } else {
                        (typeof(callbackFunc) == 'function') && callbackFunc();
                    }
                },
                callbackFail: function(data) {
                    tipAction(data.message);
                }
            }]
            $.ajaxLoading(obj);
        },
    })

})(Zepto);