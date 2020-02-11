/*
  视频医生
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	hmac:"", 
	code:"",//错误码     
	status:"0000",     
	msg:"success", 
	data: { 
		customerNo: 123,
		isConform: 1 // 1:开通，2：未开通，3：已过期
	}, 
});

module.exports=data;