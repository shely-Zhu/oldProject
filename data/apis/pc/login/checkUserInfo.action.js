/*

登录接口模拟---判断登录状态

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 新首页banner
var data = Mock.mock(
	{
	  "hmac": "hmac",
	  "status": 0,
	  "code": "CS0000",
	  "msg": "处理成功！",
	  'data':{
			"isLogin": 2, //1是登录，2是未登录
			'maskName' : "陈卓陈卓"
		}
	}
);



//根据传参数的不同进行处理

module.exports = data;