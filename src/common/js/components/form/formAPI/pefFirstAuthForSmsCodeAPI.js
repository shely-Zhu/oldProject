/**
 * 实名认证页面，获取短信验证码的接口-----鉴权第一步

	**实名认证拆分 将原实名认证中实名信息与适当性信息进行剥离
	** @author zhangyanping 2018-07-06

	** 鉴权需要传的capitalMode对应的是银行列表里的bankChanel字段  
	** @author zhangyanping 2018-11-07

 */

//黑色提示条的显示和隐藏
var tipAction = require('../../tipAction.js');
//刷新图文验证码
var getTwyzm = require('../../getNewTwyzm.js');
//短信验证码倒计时
var timeCount = require('../timeCount.js');


module.exports = function(checkArr){

	var result={};
	// 将checkArr变为对象
   for(var i=0;i<checkArr.length;i++){
        result[checkArr[i].check] = checkArr[i].result;
   }

	//实名认证页面
	var realData = {    
		 hmac:"", //预留的加密信息    
		 params:{//请求的参数信息  
	 		custName: result.name, //持卡人姓名 
	 		custIdType: result.idTypeSelect, //证件类型【参照备注】 
			custIdNo: result.num_1, //证件号码
			bankCardNo: result.bankNum, //银行卡号
			bankIdNo: result.bankSelect, //发卡银行
			province: result.provinceCitySelect, //省份 
			branchNo: result.branchSelect, //支行代码
			mobileNo: result.bankPhone, //预留手机号码 
			imgCode: result.twyzm, //图文验证码
			city: $('.provinceCitySelect [check=provinceCitySelect]').html(), //市
			clientType: "wap", //客户端类型（微信）
			bankName: $('[check=bankSelect]').html() ,  //银行名称
			capitalMode: $('[check=bankSelect]').attr('sonDicNo'), //银行卡鉴权类型(根据银行列表取值)
    	}
	};
	            	
	var realObj = [{
		url: site_url.sms_two_api,
		data: realData,
		needLogin: true,
		needDataEmpty: true,
		callbackDone: function(json){

			//$('.dxyzmBtn').css({color:"#bbb"}).addClass('countDown');//点击按钮变色

	        $('body').attr('serialNo', json.data.serialNo); //设置body的属性

	        //$('.noCode').show(); //出现发送语音验证码按钮
	        
	        timeCount.timeCountDown(60);
		},
		callbackFail: function(json){

			timeCount.dxyzmReset();

			tipAction( json.msg )
			//重置图文验证码
            getTwyzm();
		},
		callbackNoData: function(json){
			//data没有数据
		}
	}]
	$.ajaxLoading(realObj);
}