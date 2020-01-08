/*
荣耀月   接口模拟

*/

console.log(124);

// 使用 Mock
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
	"hmac": "hmac", 
	"status": "0", 
	"code": "", 
	"msg": "success", 
	"data":{
		"times":"3",
		"startflag":"0", //0-活动中，1-活动未开始，2-活动已结束
	} 
});



module.exports = data;