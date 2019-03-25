/**
 * 注册、忘记登录密码，获取短信验证码接口
 * 
 */


//黑色提示条的显示和隐藏
var tipAction = require('../../tipAction.js');
//刷新图文验证码
var getTwyzm = require('../../getNewTwyzm.js');
//短信验证码倒计时
var timeCount = require('../timeCount.js');

//当前页面地址
var windowHref = window.location.href;

if (windowHref.indexOf('phoneVerify.html') != -1) {
    //忘记登录密码页面，获取联系人手机号
    var getUserPhone = require('./userPhoneAPI.js');
}


module.exports = function(phone) {

    //不同功能业务类型的值
    var typeArr = [10, 11, 1, 14, 15, 18, 19];

    if (windowHref.indexOf('register.html') != -1 || windowHref.indexOf('recommendRegister.html') != -1) {
        //注册页面
        type = typeArr[0];
    } else if (windowHref.indexOf('phoneVerify.html') != -1) {
        //找回密码页面
        type = typeArr[1];
    } else if (windowHref.indexOf('resetLinkPhone.html') != -1) {
        //修改手机号
        type = typeArr[2];
    } else if (windowHref.indexOf('prvPayRansomTwo.html') != -1) {
        //产品赎回
        type = typeArr[4];
    } else if (windowHref.indexOf('consult.html') != -1) {
        //百度推广
        type = typeArr[5];
    } else if (windowHref.indexOf('plannerSearch.html') != -1) {
        //更换理财师
        type = typeArr[6];
    }

    //忘记登录密码页面，需要先获取联系人手机号
    if (windowHref.indexOf('plannerSearch.html') != -1) {
        phone = $('.mobilePhone').html();
    }

    var params = {
        imgCode: $('input[check=twyzm]').val(), //图文验证码值
        phone: phone, //手机号码value值
        type: type, //修改手机号传值1.
    };

    if (windowHref.indexOf('register.html') != -1 || windowHref.indexOf('recommendRegister.html') != -1) {
        //2018-09-10  解决注册/老带新注册页面短信验证码编号为空，则必须输入手机号码并且选择客户类型的问题
        params["custType"] = '1'; // 注册默认添加用户类型，1---wap注册页面没有机构注册

    } else if (windowHref.indexOf('phoneVerify.html') != -1) {
        // 2019.1.11 --sxy--忘记密码页面传客户类型
        params["custType"] = $('body').find('.idType .selectCopy').attr('num') //客户类型1个人0机构 
    }

    //发送短信验证码
    var phoneCodeObj = [{
        url: site_url.sms_api,
        data: {
            hmac: "",
            params: params
        },
        needDataEmpty: false, //不需要判断data是否为空
        async: false, //同步
        needLogin: true, //判断登录状态
        callbackDone: function(json) {

            timeCount.timeCountDown(120, $('.dxyzmBtn'), 59);
        },
        callbackFail: function(json) {

            timeCount.dxyzmReset();
            tipAction(json.msg);

            getTwyzm();
        }
    }];
    $.ajaxLoading(phoneCodeObj);

    // 业务更改，这个接口需在messageCertSend接口后请求，要不会报错-王荣祥
    if (windowHref.indexOf('phoneVerify.html') != -1) {
        getUserPhone(phone);
    }
}