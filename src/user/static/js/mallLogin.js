 /*
 * 商城登录页面  js文件
 * @author  purpleZhao
 * @time 2017-1-6 
       
*/
//校验
require('../../../include/js/vendor/config.js');
//校验

require('../../../common/js/input.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/components/select.js');
require('../../../common/js/ajaxLoading.js');
//zepto模块--callback
require('../../../include/js/vendor/zepto/callback.js');
//zepto模块--deferred
require('../../../include/js/vendor/zepto/deferred.js');
var splitUrl = require('../../../common/js/components/splitUrl.js'); 
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
var Base64=require('../../../include/js/vendor/base64/base64.js');

$(function(){      

    var login = {     

        //path: window.location.href,

        getElements : {
            btn       : $("#btn"),//登录按钮 
            errorTip  : $(".againEnter"),//服务器返回错误校验的错误提示DOM
            inputDOM  : $(".inputdom"),//表单区域的DOM元素
        },

        beforeSet: {
            openId : splitUrl()['openId']
        },

        init : function(){            
            var that = this;

            mui.init();  

            //绑定事件
            that.events();
 
        },


        /*
            绑定事件
         */
        events: function(){
            var that = this;

            //点击提交按钮
            that.getElements.btn.on('click', function(e){

                //做校验
                var result = $.checkInput();

                if(!result){//未通过校验   
                    console.log('未通过校验');  
                    return false;
                }

                var $this = $(this);
                $this.attr("disabled", true).addClass('disable');

                //校验通过校验后请求服务器
                var phoneValue = '',
                    pwdValue = '';

                //点击提交按钮变色
                //$(this).removeClass("save").addClass('saveSubmit').attr("disabled", true);

                //获取表单value值 
                $.each(result,function(i,el){
                    if(el.check == 'phone'){
                      phoneValue = el.result; //手机号
                    }
                    else if(el.check == 'loginPassword'){
                      pwdValue = el.result; //密码
                    }
                });

                var nameValue = $('.idType .selectCopy').attr('num'); //证件类型

                //发送ajax请求
                var obj = [{
                    url: site_url.authorization_api,
                    data: {    
                        hmac:"", //预留的加密信息     
                        params:{   
                            clientId: splitUrl()['clientId'],
                            responseType: splitUrl()['responseType'],
                            redirectUrl : splitUrl()['redirectUrl'],
                            operatorFrom: 6, 
                            custType: nameValue,//客户类型（0机构，1个人）
                            username : phoneValue,//账号
                            password: new Base64().encode(pwdValue),//密码
                        }
                    }, 
                    needDataEmpty: false, //不判断data是否为空
                    callbackDone: function(json){
                        //跳转
                        window.location.href = json.data.redirectUrl;
                    },
                    callbackFail: function(json){
                        tipAction( json.msg, function(){
                            $this.removeAttr("disabled").removeClass('disable');
                        });
                    }
                }]
                $.ajaxLoading(obj);
                              
            });
        }


    }

    /*调用*/
    login.init(); 
 
})
