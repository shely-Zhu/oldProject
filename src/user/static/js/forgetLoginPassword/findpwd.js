 /*
 * 找回密码  js文件
 * @author  yangjinlai
 * @time 2017-1-11
       
*/
 require('../../../../include/js/vendor/config.js');
 //校验
 require('../../../../common/js/input.js');
 require('../../../../common/js/components/utils.js');
 require('../../../../common/js/components/select.js');
 require('../../../../common/js/ajaxLoading.js');
 //zepto模块--callback
 require('../../../../include/js/vendor/zepto/callback.js');
 //zepto模块--deferred
 require('../../../../include/js/vendor/zepto/deferred.js');
 require('../../../../common/js/components/elasticLayer.js');
 //刷新图文验证码
 var getNewTwyzm = require('../../../../common/js/components/getNewTwyzm.js');
 //黑色提示条
 var tipAction = require('../../../../common/js/components/tipAction.js');
 var Base64 = require('../../../../include/js/vendor/base64/base64.js');

 $(function() {

     var login = {

         //path: window.location.href,

         getElements: {
             btn: $(".nextBtn"), //下一步按钮 
             //errorTip  : $(".againEnter"),//服务器返回错误校验的错误提示DOM
             //inputDOM  : $(".inputdom"),//表单区域的DOM元素
             //yyYzm: $('.noCode'), //发送语音验证码
         },

         init: function() {
             var that = this;

             //绑定事件
             that.events();
         },
         events: function() {
             var that = this;

             //点击提交按钮
             mui("body").on('tap', '.nextBtn', function(e) {
                 //做校验
                 var result = $.checkInput();

                 if (!result) { //未通过校验   
                     console.log('未通过校验');
                     return false;
                 }

                 var $this = $(this);
                 $this.attr("disabled", true).addClass('disable');

                 //校验通过校验后请求服务器
                 var userType = '',
                     phoneValue = '',
                     twyzmValue = '',
                     dxYzmValue = '';

                 //获取表单value值 
                 $.each(result, function(i, el) {
                     if (el.check == 'userTypeSelect') {
                         userType = el.result; //客户类型
                     } else if (el.check == 'phone') {
                         phoneValue = el.result; //手机号
                     } else if (el.check == 'twyzm') {
                         twyzmValue = el.result; //图文验证码
                     } else if (el.check == 'dxyzm') {
                         dxYzmValue = el.result; //验证码 
                     }
                 });

                 var nameValue = $('.idType .selectCopy').html(); //证件类型

                 //发送ajax请求
                 var obj = [{
                     url: site_url.phoneCodeCheckout_api,
                     data: {
                         hmac: "", //预留的加密信息     
                         params: {
                             phone: phoneValue, //手机号 
                             phoneCode: dxYzmValue, //手机验证码
                             verifyType: "11", //校验类型(看备注)
                             custType: userType, //客户类型 0机构1个人2产品
                         }
                     },
                     needLogin: true,
                     needDataEmpty: false,
                     callbackDone: function(json) {
                         var jsonData = json.data;

                         $this.removeAttr("disabled").removeClass('disable');

                         window.location.href = window.location.origin + '/user/views/forgetLoginPassword/resetPassword.html';

                     },
                     callbackFail: function(json) {

                         //显示错误提示
                         tipAction(json.msg, function() {
                             $this.removeAttr("disabled").removeClass('disable');
                         })

                         //刷新图文验证码
                         getNewTwyzm();

                     }
                 }]
                 $.ajaxLoading(obj);
             })
         }
     };

     /*调用*/
     login.init();

 })