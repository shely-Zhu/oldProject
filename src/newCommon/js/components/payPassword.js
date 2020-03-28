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

/*var timer = {
    id:null,
    run:function (callback,time) {
        this.id = window.setInterval(callback,time);
    },
    clean:function () {
        var that = this;
        this.id = window.clearInterval(that.id);
    }
};*/
//var keyboardHeight = 0,
//screenHeight = window.innerHeight;

var fixScroll = function(num,oHeight){//ios浏览器需要滚动
//	alert(keyboardHeight)
	var u = navigator.userAgent;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var str= navigator.userAgent.toLowerCase(); 
    var ver=str.match(/cpu iphone os (.*?) like mac os/);
	if (isiOS && num == 1) {
		window.scrollTo(0, 0);
	}else if(isiOS && num == 2){
//		document.querySelectorById('#passwordWrap').scrollTop = document.querySelectorById('#passwordWrap').scrollHeight;
//		document.body.scrollTop = document.body.scrollHeight;
		var IOSversion = navigator.userAgent.match(/os\s+(\d+)/i)[1] - 0;//获取iOS的系统版本号
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //iOS终端
		if (isIOS && IOSversion <= "11") {
//			document.querySelectorById('#passwordWrap').scroll(0,1000)//iphonex可以滚动到顶部，新版本ios11以上
			document.getElementById('passwordWrap').scroll(0,1000)//iphonex可以滚动到顶部，新版本ios11以上
		}else{
			window.scrollTo(0, 1000);//滚动到可是区域 普通iphone可以滚动到可是区域。老版本
		}
			


//		document.activeElement.scrollIntoViewIfNeeded();//将不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域。 如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动

	}

}

module.exports = function(callback,forgetCall,closeCallback){
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
			$(".fake-box input").each(function() {
				 var index = $(this).index();
				 if(index >= len) {
					 $(this).val("");
				 }
			 });
			 if(payPwd.length == 6){
				callback(inputVal);
				$(this).val($(this).val()+"1") 
				return false
			 }
		 })
	   
		$("#pwd-input").on("focus", function(e) {
			e.stopPropagation();
			setTimeout(function(){
//				if(!keyboardHeight){
//			        timer.run(function () {
//			            if (screenHeight !== window.innerHeight) {
//			                keyboardHeight = screenHeight-window.innerHeight;
//			                timer.clean()
//			            }
//			        }, 50)
//			    }
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
		$(".closeBtn").on('click',function(e){
			e.stopPropagation();
			//清空密码
			var inputList = $(".pwd-box .fake-box input");
			if(inputList.length>0){
				for(var i = 0;i<inputList.length;i++){
					inputList[i].value=""
				}
			}
			$("#passwordWrap").hide();
			$(".passwordTop").css("margin-bottom","0")
			closeCallback?closeCallback():''
			
		})
		mui("body").on('mdClick','.forgetP',function(){
			if(!!forgetCall){//如果参数不为空,走传进来的方法
				forgetCall()
			}else{
				//跳往原生页面去修改密码
				window.location.href = site_url.pofForgotPassword_url
			}
		}, {
			htmdEvt: 'cashTransformIn_12'
		}) ;


}
