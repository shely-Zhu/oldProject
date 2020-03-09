/*
 * @page: 登录页面
 * @Author: purpleZhao
 * @Date:   2017-01-06 14:11:34
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-11-23 11:57:26
 * @description: 点击注册，跳转注册页面携带url，财商教育注册完，登录完需跳回财商教育页面
 */
require('../../../include/js/vendor/config.js');
require('../../../common/js/input.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/components/select.js');
require('../../../common/js/ajaxLoading.js');
//zepto模块--callback
require('../../../include/js/vendor/zepto/callback.js');
//zepto模块--deferred
require('../../../include/js/vendor/zepto/deferred.js');
var splitUrl = require('../../../common/js/components/splitUrl.js')();
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');

$(function() {
    var login = {
        getElements: {
            btn: $("#btn"), //登录按钮
            errorTip: $(".againEnter"), //服务器返回错误校验的错误提示DOM
            inputDOM: $(".inputdom"), //表单区域的DOM元素
            goReg: $(".ckReg"), //立即注册按钮
        },
        beforeSet: {
            openId: splitUrl['openId']
        },
        init: function() {
            var that = this;
            mui.init();
            //绑定事件
            that.events();
        },
        events: function() {
            var that = this;

            //点击提交按钮
            that.getElements.btn.on('click', function(e) {

                //做校验
                var result = $.checkInput();

                if (!result) { //未通过校验
                    console.log('未通过校验');
                    return false;
                }

                var $this = $(this);
                // $this.attr("disabled", true).addClass('disable');

                //校验通过校验后请求服务器
                var phoneValue = '',
                    pwdValue = '';

                //点击提交按钮变色
                //$(this).removeClass("save").addClass('saveSubmit').attr("disabled", true);

                //获取表单value值
                $.each(result, function(i, el) {
                    if (el.check == 'phone') {
                        phoneValue = el.result; //手机号
                    } else if (el.check == 'loginPassword') {
                        pwdValue = el.result; //密码
                    }
                });

                var nameValue = $('.idType .selectCopy').attr('num'); //证件类型


                /*******************以下区域改成sso需要的form表单提交********************/
                /*******************其他地方暂时不用动，在这个上面已经做了前端的表单校验*/
                /*入参值可以直接用以下结果值：
                *nameValue, //客户类型（0机构，1个人）
                *phoneValue, //账号
                *new Base64().encode(pwdValue), //密码
                */

                //发送ajax请求
                var obj = [{
                    url:"/web/account/frontend/loginCheck",
                    data: {
                            accountType: nameValue, //客户类型（0机构，1个人）
                            mobile: phoneValue, //账号
                            password: pwdValue, //密码
                            channelType:"2",
                            deviceId:"862169042707406",


                        //deviceId:"864684039820036",
                            //deviceId: "863471033880773"

                            //deviceId:"863471033880773",



                            // "registerId": "140fe1da9efb5800e07",

                            // "netType": 1,
                            // //openId: that.beforeSet.openId //'oe7KJxLcDy57TLNpYTzi2k44467o' 微信Id,打开登录页面链接带过来的参数openId
                            // "password": "123456",
						    // "deviceId": "864684039820036",
						    // "mobile": "13700051325",
						    // "accountType": "1",
						    // "netType": 1
                    },
                    needDataEmpty: false, //不判断data是否为空
                    callbackDone: function(json) {
                        if (splitUrl['redirectUrl']) {
                            //跳转到来之前的url
                            // window.location.href = splitUrl['redirectUrl'];
                            window.location.href = window.location.href.split("redirectUrl=")[1]
                        } else if (splitUrl['originUrl']) {
                            //跳转到来之前的url
                            window.location.href = splitUrl['originUrl'];
                        } else {
                            window.location.href = "/wealthResources/otherAssets/views/jjsAssets.html"
                        }
                    },
                    callbackFail: function(json) {
                        //借口失败执行一下逻辑
                        tipAction(json.message, function() {
                            $this.removeAttr("disabled").removeClass('disable');
                        });
                    }
                }]
                $.ajaxLoading(obj);

                /*******************以上区域改成sso需要的form表单提交********************/
            });

            //立即注册按钮,携带需跳回的页面路径
            that.getElements.goReg.on('click', function() {
                if( !!splitUrl['redirectUrl']){
                    window.location.href = site_url.registerUrl + '?redirectUrl=' + splitUrl['redirectUrl'];
                }else{
                    window.location.href = site_url.registerUrl;
                }

            });
        }
    };
    /*调用*/
    login.init();
})