

/**
* 输入密码
* @author tianjunguo 2019-11-25
*使用说明第一个参数：是输完6位密码之后的回调函数，第二个是忘记密码的回调函数
*/
require('@pathIncludJs/vendor/config.js');

require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');

var fixScroll = function(num){//ios浏览器需要滚动
	var u = navigator.userAgent;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isiOS && num == 1) {
		window.scrollTo(0, 0);
	}else if(isiOS && num == 2){
		document.body.scrollTop = document.body.scrollHeight;
	}
}

module.exports = function(callback,forgetCall){


		//将input输入内容依次加到密码输入框里
		$("#pwd-input").on("input", function() {
//				将input上的内容赋值到password框上
			 var payPwd = $(this).val().trim().split(''),
			 inputVal = $(this).val();
			 if(payPwd.length == 6){
				 callback(inputVal);
				 return false;
			 }
			 

//			把input=tel的值赋值给password的input框
			for(var i = 0, len = payPwd.length; i < len; i++) {
				$(".fake-box input").eq(i).val(payPwd[i]);
			 }
			 $(".fake-box input").each(function() {
				 var index = $(this).index();
				 if(index >= len) {
					 $(this).val("");
				 }
			 });
		 })
	   
		$("#pwd-input").on("focus", function() {
			setTimeout(function(){
				fixScroll(2);
			},300)
		})
		$("#pwd-input").on("blur", function() {
			    fixScroll(1)
		})
		$(".closeBtn").on('click',function(){
			$("#passwordWrap").hide();
		})
		$(".forgetP").on('click',function(){
			if(!!forgetCall){//如果参数不为空,走传进来的方法

			}else{
				
			}
		})


}
