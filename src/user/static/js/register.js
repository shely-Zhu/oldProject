/*
 * @page: 注册页面
 * @Author: 
 * @Date:   
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-10-16 10:42:07
 * @description: 1.点击注册，跳回登录，带回需跳转的页面路径
 * @description: 2.注册接口新增参数，sourceFrom，页面来源（默认金服，3财商教育），registArea,财商大区
 * @description: 3.新增理顾工号参数, brokerNo, trackModule跟踪模块,新增服务理财师模块展示
 */


require('../../../include/js/vendor/config.js');
//zepto模块--callback
require('../../../include/js/vendor/zepto/callback.js');
//zepto模块--deferred
require('../../../include/js/vendor/zepto/deferred.js');
//校验
require('../../../common/js/input.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
// 需重复使用，故没有直接执行
var splitUrl = require('../../../common/js/components/splitUrl.js');
require('../../../common/js/components/elasticLayer.js');
//刷新图文验证码
var getNewTwyzm = require('../../../common/js/components/getNewTwyzm.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
var manualTriggerLogin = require('../../../common/js/components/manualTriggerLogin.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {

    var register = {
        $e: {
            btn: $("#btn"), //注册按钮 
            errorTip: $(".againEnter"), //服务器返回错误校验的错误提示DOM
            inputDOM: $(".inputdom"), //表单区域的DOM元素
            iconCheck: $(".item2 .iconfont"), //同意协议选择框
            yyYzm: $('.noCode'), //发送语音验证码
            brokerContent: $('.brokerContent'), // 理财师区域
            brokerTemp: $('#broker-template'), // 理财师区域
        },
        isOauthFrom: splitUrl()['isOauthFrom'], // 注册来源是oauth,需返回oauth的登录页面
        brokerNo: splitUrl()['brokerNo'], // 理财师工号
        trackModule: splitUrl()['trackModule'], // 跟踪模块
        init: function() {
            var that = this;
            // 理财师逻辑处理
            that.dealBrokerNo();
            //绑定事件
            that.events();
        },
        dealBrokerNo: function() {
            var that = this,
                brokerNo = that.brokerNo && new Base64().decode(that.brokerNo);

            if (brokerNo) {
                var obj = [{
                    url: site_url.getBrokerInfo_api,
                    data: {
                        hmac: "", //预留的加密信息     
                        params: {
                            broker_account: brokerNo, //理顾编号
                        }
                    },
                    async: false, // 同步
                    callbackDone: function(json) {
                        var data = json.data,
                            broker = data.broker_account,
                            broker_account = (broker.slice(0,1).toLocaleUpperCase()=='H')?broker:('H'+broker), // 如果工号是H开头，直接展示，不是H开头，拼上H
                            broker_val = broker_account.slice(1); // 工号赋值去掉H

                        // 展示服务理财师区域
                        data.getImage = site_url.getImage_api;
                        generateTemplate(data, that.$e.brokerContent, that.$e.brokerTemp);
                        // 设置理财师工号并隐藏
                        $(".fina input").val(broker_val);
                        $(".fina").hide();
                    },
                    callbackNoData: function() { // 没查询到理顾什么都不做

                    },
                }];
                $.ajaxLoading(obj);
            }

        },
        events: function() {
            var that = this;
            //点击注册按钮
            that.$e.btn.on('click', function(e) {
                var $this = $(this),
                    phoneValue = '', //手机号
                    pwdValue = '',
                    dxValue = '',
                    redirectUrl = splitUrl()['redirectUrl'],
                    decodeUrl, // 解密redirectUrl
                    sourceFrom, // 页面来源
                    registArea, // 大区
                    finaValue = $(".fina input").val();

                if (redirectUrl) {
                    // 如果有redirectUrl,解码，从中取的sourceFrom和registArea
                    decodeUrl = new Base64().decode(redirectUrl);
                    sourceFrom = splitUrl(decodeUrl)['sourceFrom']; // 页面来源
                    registArea = splitUrl(decodeUrl)['registArea']; // 大区
                }


                //做校验
                var result = $.checkInput();
                console.log(result);

                if (!result) { //未通过校验   
                    console.log('未通过校验');
                    return false;
                }
                if (!that.$e.iconCheck.hasClass("check")) {
                    console.log('未通过校验');
                    $('.againEnter').show().find(".tipWrapper").html("请勾选协议和承诺");
                    setTimeout(function() {
                        $('.againEnter').hide();
                    }, 2000);
                    return false;
                }

                $this.attr("disabled", true).addClass('disable');

                //校验通过校验后请求服务器

                //获取表单value值 
                $.each(result, function(i, el) {
                    if (el.check == 'phone') {
                        phoneValue = el.result; //手机号
                    } else if (el.check == 'newLoginPassword') {
                        pwdValue = el.result; //密码
                    } else if (el.check == 'dxyzm') {
                        dxValue = el.result; //短信验证码
                    } else if (el.check == 'twyzm') {
                        txValue = el.result; //短信验证码
                    }
                });

                //发送ajax请求
                var obj = [{
                    url: site_url.reg_api,
                    data: {
                        hmac: "", //预留的加密信息     
                        params: {
                            mobile_tel: phoneValue, //账号
                            code: dxValue,
                            password: new Base64().encode(pwdValue), //密码
                            broker_account: finaValue,
                            imageCode: txValue, //图文验证码
                            // 老带新不用这个注册，
                            sourceFrom: sourceFrom || '0aced0ad61c7d48d129ded1a185ac170', // 渠道 金服:0aced0ad61c7d48d129ded1a185ac170 企金:qyjr 老带新:f14d5e47bc7a763a6fee461178d76d2b 财商教育:b09240a3ef461cefb7322dc43d916d4b
                            registArea: registArea || '', // 大区
                            trackModule:that.trackModule, // 跟踪模块 2-理顾名片
                        }
                    },
                    needDataEmpty: false, //不判断data是否为空
                    callbackDone: function(json) {
                        //跳转到登录页面携带来源url,不用再转义，已经转义过
                        // 18.9.0新增需求，需判断是跳转积分商城登录还是明泽登录
                        if (that.isOauthFrom) {
                            // 从oauth跳转注册页，返回oauth
                            window.location.href = site_url.oauth_url + window.location.search;
                        } else {
                            // 跳转到明泽股份各自域名下的登录
                            manualTriggerLogin.splitFunc();
                        }
                    },
                    callbackFail: function(json) {
                        that.$e.errorTip.show().find('.tipWrapper').html(json.message);
                        setTimeout(function() {
                            //黑色条隐藏
                            that.$e.errorTip.hide();
                            $this.removeAttr("disabled").removeClass('disable');
                        }, 2000)
                    }
                }]
                $.ajaxLoading(obj);
            });
            //点击同意协议
            that.$e.iconCheck.on('click', function() {
                if ($(this).hasClass("check")) {
                    $(this).removeClass("check").html('&#xe668;');
                } else {
                    $(this).addClass("check").html('&#xe669;');
                }
            });
            // 点击立即登录
            $('.goLogin .next').on('click', function() {
                if (that.isOauthFrom) {
                    // 来源是oauth，回到oauth登录页面
                    window.location.href = site_url.oauth_url + window.location.search;
                } else {
                    manualTriggerLogin.splitFunc();
                }
            })
        }
    }

    /*调用*/
    register.init();

})