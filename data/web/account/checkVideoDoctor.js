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
		isConform: 1 // 1:满足，2：不满足，3：已过期
	}, 
});

module.exports=data;