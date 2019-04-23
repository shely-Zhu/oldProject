 /*
 * 重设密码  js文件
 * @author  yangjinlai
 * @time 2017-1-11
       
*/

//路径配置文件
require('../../../../include/js/vendor/config.js');
//校验
require('../../../../common/js/input.js');
require('../../../../common/js/components/utils.js');
require('../../../../common/js/ajaxLoading.js');
//zepto模块--callback
require('../../../../include/js/vendor/zepto/callback.js'); 
//zepto模块--deferred
require('../../../../include/js/vendor/zepto/deferred.js');
//var splitUrl = require('../../../common/js/components/splitUrl.js');
//黑色提示条
var tipAction = require('../../../../common/js/components/tipAction.js');
var Base64=require('../../../../include/js/vendor/base64/base64.js');

$(function(){

    var login = {

        //path: window.location.href,

        getElements : {
            btn       : $(".button"),//下一步按钮 
            //errorTip  : $(".againEnter"),//服务器返回错误校验的错误提示DOM
            //inputDOM  : $(".inputdom"),//表单区域的DOM元素
        },

        init : function(){            
            var that = this;

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

                //通过校验
                var $this = $(this);
                $this.attr("disabled", true).addClass('disable');

                //请求服务器
                var password = '';

                //获取表单value值 
                $.each(result,function(i,el){
                    if(el.check == 'newLoginPassword'){
                      password = el.result; //新密码
                    }
                });

                //发送ajax请求
                var obj = [{
                    url: site_url.resetPwd_api,
                    data: {    
                        hmac:"", //预留的加密信息     
                        params:{    
                            newPassword: new Base64().encode(password),//密码        
							//rstPwdUuid: splitUrl()['rstPwdUuid']//redis保存联系人手机号的key(1.5接口返回的信息)
                        }
                    },
                    needLogin: true,
                    needDataEmpty: false,
                    callbackDone: function(json){

                        tipAction( '密码重置成功', function(){
                            //跳转到登陆页
                            window.location.href = site_url.login_html_url;
                        })

                    	// that.getElements.errorTip.show().find('.tipWrapper').html('密码重置成功');
                    	// setTimeout(function(){
                    	// 	//黑色条隐藏
                    	// 	that.getElements.errorTip.hide();
                    	// 	//跳转登录
                    	// 	window.location.href = '/user/views/login.html';
                    	// }, 2000)
                    },
                    callbackFail: function(json){

                        tipAction( json.message, function(){
                            $this.removeAttr("disabled").removeClass('disable');
                        })

                     //    that.getElements.errorTip.show().find('.tipWrapper').html(json.message);
                     //    setTimeout(function(){
                    	// 	//黑色条隐藏
                    	// 	that.getElements.errorTip.hide();
                    	// 	$this.removeAttr("disabled").removeClass('disable');
                    	// }, 2000)
                        
                    }
                }]
                $.ajaxLoading(obj);
                              
            })

            
        }


    }

    /*调用*/
    login.init(); 
 
})