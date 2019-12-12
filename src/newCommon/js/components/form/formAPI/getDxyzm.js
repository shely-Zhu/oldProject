/*
 * @page: 注册页面，忘记登录密码页面，先验证手机验证码，再验证手机号是否注册
 * @Author: songxiaoyu
 * @Date:   2019-01-02 17:30:25
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2019-01-02 17:55:10
 * @description:
 */

//黑色提示条的显示和隐藏
var tipAction = require('../../tipAction.js');

//当前页面地址
var windowHref = window.location.href;


module.exports = function(phone) {
    var phone,
        phoneCode,
        params,
        dxyzmCheck = true; // 

    if (windowHref.indexOf('register.html') != -1 || windowHref.indexOf('phoneVerify.html') != -1) {
        // 注册页面和忘记密码页面
        phone = $('[check=phone]').val();
        phoneCode = $('[check=dxyzm]').val();
        params = {
            phone: phone, //手机号
            phoneCode: phoneCode, //手机验证码
        };

        if (windowHref.indexOf('register.html') != -1) {
            params["custType"] = '1'; // 注册默认添加用户类型，1---wap注册页面没有机构注册
            params["verifyType"] = '10';
        } else { // 忘记登录密码页面
            params["custType"] = $('body').find('.idType .selectCopy').attr('num') //客户类型1个人0机构 
            params["verifyType"] = '11';
        }
    } else { // 其他用到短信验证码的页面,短信验证码离焦不校验
        return dxyzmCheck;
    }


    //发送短信验证码
    var phoneCodeObj = [{
        url: site_url.phoneCodeCheckout_api,
        data: {
            hmac: "",
            params: params
        },
        needDataEmpty: false, //不需要判断data是否为空
        async: false, //同步
        needLogin: true, //判断登录状态
        callbackDone: function(json) {
            // 请求成功，说明验证码正确，手机号已注册

        },
        callbackFail: function(json) {
            tipAction(json.message);
            dxyzmCheck = false;
        }
    }];
    $.ajaxLoading(phoneCodeObj);
    return dxyzmCheck;
};