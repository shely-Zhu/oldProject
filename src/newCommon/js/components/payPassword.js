/*
 * @Author: your name
 * @Date: 2019-11-28 19:07:55
 * @LastEditTime: 2019-11-30 16:43:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\common\js\components\payPassword.js
 */


/**
* 输入密码
* @author tianjunguo 2019-11-25
*使用说明第一个参数：是输完6位密码之后的回调函数，第二个是忘记密码的回调函数
*/
require('@pathIncludJs/vendor/config.js');

require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');

var fixScroll = function(num,oHeight){//ios浏览器需要滚动
	var u = navigator.userAgent;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isiOS && num == 1) {
		window.scrollTo(0, 0);
	}else if(isiOS && num == 2){
		window.scrollTo(0, 1000);//滚动到可是区域
//		document.querySelectorById('#passwordWrap').scroll(0,1000)//iphonex可以滚动到顶部
//		if(!!window.scrollTo){
//			alert("123")
//		}else if(!!window.scrollTop){
			
//			window.scrollTop = 1000;//滚动到可是区域
//		}
//		document.body.scrollTop = document.body.scrollHeight;
	}
}

module.exports = function(callback,forgetCall){
		//屏幕当前的高度
    	var oHeight = $(window).height();
		$("#passwordWrap").show();
		//将input输入内容依次加到密码输入框里
		$("#pwd-input").on("input", function() {
//				将input上的内容赋值到password框上
			 var payPwd = $(this).val().trim().split(''),
			 inputVal = $(this).val();

			 if(payPwd.length > 6){
			 	return false;
			 }
//			把input=tel的值赋值给password的input框
			for(var i = 0, len = payPwd.length; i < len; i++) {
				$(".fake-box input").eq(i).val(payPwd[i]);
			}
			if(payPwd.length == 6){
				 callback(inputVal);
				return false;
			}
			 
			$(".fake-box input").each(function() {
				 var index = $(this).index();
				 if(index >= len) {
					 $(this).val("");
				 }
			 });
			 if(payPwd.length == 6){
			 	console.log(inputVal)
				 callback(inputVal);
			 }
		 })
	   
		$("#pwd-input").on("focus", function() {
			setTimeout(function(){
				fixScroll(2,oHeight);
			},300)
		})
//		$(window).resize(function(){
//			alert("1")
//	        if($(window).height() < oHeight){
//	            $("#passwordWrap").css("top","8.4rem");
//	        }else{
//	            $("#passwordWrap").css("top","");
//	        }
//	    });
		$("#pwd-input").on("blur", function() {
			    fixScroll(1)
		})
		$(".closeBtn").on('click',function(){
			$("#passwordWrap").hide();
			//清空密码
			var inputList = $(".pwd-box .fake-box input");
			if(inputList.length>0){
				for(var i = 0;i<inputList.length;i++){
					inputList[i].value=""
				}
			}
			
		})
		$(".forgetP").on('click',function(){
			if(!!forgetCall){//如果参数不为空,走传进来的方法

			}else{
				
			}
		})


}
