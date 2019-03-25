/**
 * 老带新 注册 js
 * @author yangjinlai 2017-06-21
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
var splitUrl = require('../../../common/js/components/splitUrl.js');
require('../../../common/js/components/elasticLayer.js');
//刷新图文验证码
var getNewTwyzm = require('../../../common/js/components/getNewTwyzm.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');

$(function() {

    var register = {

        //path: window.location.href,

        getElements: {
            btn: $("#btn"), //注册按钮 
            errorTip: $(".againEnter"), //服务器返回错误校验的错误提示DOM
            inputDOM: $(".inputdom"), //表单区域的DOM元素
            iconCheck: $(".item2 .iconfont"), //同意协议选择框
            yyYzm: $('.noCode'), //发送语音验证码
        },

        init: function() {
            var that = this;

            // 请求bannert图片
            that.getData();

            //绑定事件
            that.events();

        },
        getData: function() {
            var that = this;

            var obj = [{
                url: site_url.findBannerByPosition_api,
                data: {
                    hmac: "", //预留的加密信息    
                    params: { //请求的参数信息 
                        adPosition: "oldNewRegist", //类型（标志位）【请参照备注】 
                        limitCount: "1", //展示幅数    
                    }
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    var imgUrl = json.data[0].imgUrl;
                    $('.banner_wrap img').attr('src',imgUrl)
                },
                callbackFail: function(json) {

                },
            }]
            $.ajaxLoading(obj);
        },
        /*
            绑定事件
         */
        events: function() {
            var that = this;


            //点击提交按钮
            that.getElements.btn.on('click', function(e) {

                //做校验
                var result = $.checkInput();
                console.log(result);

                if (!result) { //未通过校验   
                    console.log('未通过校验');
                    return false;
                }
                if (!that.getElements.iconCheck.hasClass("check")) {
                    console.log('未通过校验');
                    $('.againEnter').show().find(".tipWrapper").html("请勾选协议和承诺");
                    setTimeout(function() {
                        $('.againEnter').hide();
                    }, 2000);
                    return false;
                }
                var $this = $(this);
                $this.attr("disabled", true).addClass('disable');

                //校验通过校验后请求服务器
                var phoneValue = '',
                    pwdValue = '',
                    dxValue = '';

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
                    url: site_url.oldAndNewRegist_api,
                    data: {
                        hmac: "", //预留的加密信息     
                        params: {
                            mobile_tel: phoneValue, //账号
                            code: dxValue,
                            password: new Base64().encode(pwdValue), //密码
                            aesEncrypt: splitUrl()['url'],
                            imageCode: txValue, //图文验证码
                        }
                    },
                    needDataEmpty: false, //不判断data是否为空
                    callbackDone: function(json) {

                        tipAction('恭喜您已注册成功', function() {
                            $this.removeAttr("disabled").removeClass('disable');

                            // 跳转结果页
                            window.location.href = site_url.congratulation_url+'?phone='+json.data.phone;
                        })

                    },
                    callbackFail: function(json) {
                        tipAction(json.msg);
                        $this.removeAttr("disabled").removeClass('disable');
                    }
                }]
                $.ajaxLoading(obj);

            });

            //点击同意协议
            that.getElements.iconCheck.on('click', function() {
                if ($(this).hasClass("check")) {
                    $(this).removeClass("check").html('&#xe668;');
                } else {
                    $(this).addClass("check").html('&#xe669;');
                }
            });

            $('.goLogin .next').on('click', function() {
                window.location.href = "/user/views/login.html";
            })

        }


    }

    /*调用*/
    register.init();

})