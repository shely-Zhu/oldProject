/*
  视频医生
*/

// 使用 Mock
var Mock = require('mockjs');

/*var data=Mock.mock({ 
	hmac:"", 
	code:"",//错误码     
	status:"0000",     
	msg:"success", 
	data: { 
		customerNo: 123,
		isConform: 2, // 1:开通，2：未开通，3：已过期
		failureMsg: "很抱歉，本服务为钻石级（含）以上会员专享\n您可升级或登录恒乐汇商城购买此服务"
	}, 
});*/

/*var data=Mock.mock({ 
	hmac:"", 
	code:"",//错误码     
	status:"0000",     
	msg:"success", 
	data: { 
		customerNo: 123,
		isConform: 3, // 1:开通，2：未开通，3：已过期
		failureMsg: "很抱歉，您的视频医生服务已过期\n可联系您的理财师咨询继续服务方式"
	}, 
});*/

var data=Mock.mock({ 
	hmac:"", 
	code:"",//错误码     
	status:"0000",     
	msg:"success", 
	data: { 
		customerNo: 123,
		isConform: 1, // 1:开通，2：未开通，3：已过期
		failureMsg: ""
	}, 
});

module.exports=data;