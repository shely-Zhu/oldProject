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
		"times":"2",
		"startflag":"0", //0-活动中，1-活动未开始，2-活动已结束

		"period":"1", //活动期数 （新增字段 ）

		"startTime":"2018-01-31 16:50:30",//活动开始时间 （新增字段 ）

		"endTime":"2020-02-01 16:50:27", //活动结束时间 （新增字段 ）
	} 
});



module.exports = data;