

/**
* 输入密码
* @author tianjunguo 2019-11-25
*/
require('@pathIncludJs/vendor/config.js');
//require('@pathIncludJs/vendor/zepto/callback.js');
//require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
//require('@pathCommonJs/ajaxLoading.js');
//
//var tipAction = require('@pathCommonJs/components/tipAction.js');
//var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
//var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');



$(function() {

    var privateDetail = {
        data: {
			
        },
        $el:{
        	$input:$(".fake-box input"),
        },
        init:function(){
            var that = this;
            //事件绑定
            that.event();	
            // that.getData()
        },
	    fixScroll:function(num){//ios浏览器需要滚动
	        var u = navigator.userAgent;
	        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	        if (isiOS && num == 1) {
	            window.scrollTo(0, 0);
	        }else if(isiOS && num == 2){
	        	document.body.scrollTop = document.body.scrollHeight;
	        }
		},
        event:function(){
        	var that = this;
        	
//      	$(".passwordTop").show()
			
//      	document.body.scrollTop = document.body.scrollHeight;
            //将input输入内容依次加到密码输入框里
			$("#pwd-input").on("input", function() {
//				将input上的内容赋值到password框上
			 	var payPwd = $(this).val().trim().split('');
//			 	把input=tel的值赋值给password的input框
			 	for(var i = 0, len = payPwd.length; i < len; i++) {
			 		that.$el.$input.eq(i).val(payPwd[i]);
			 	}
			 	that.$el.$input.each(function() {
			 		var index = $(this).index();
			 		if(index >= len) {
			 			$(this).val("");
			 		}
			 	});
			 })
		   
			$("#pwd-input").on("focus", function() {
				setTimeout(function(){
					that.fixScroll(2);
				},300)
			})
			$(window).on("resize",function(){
//				alert(1)
			})
			$("#pwd-input").on("blur", function() {
				that.fixScroll(1)
			})
			$(".closeBtn").on('click',function(){
				$("#passwordWrap").hide();
			})
		}

    }
  
    privateDetail.init()
})