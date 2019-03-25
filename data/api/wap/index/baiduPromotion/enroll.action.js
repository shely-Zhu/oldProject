/*
百度推广页

*/

// 使用 Mock
var Mock = require('mockjs');

var pOver = Mock.mock({     
	"hmac":"", //预留字段     
	"msg": "success",
	"code":"",//错误码   
	"status": "0",   
	"data": {} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;