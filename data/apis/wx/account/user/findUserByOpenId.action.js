/*
	判断此微信用户是否登陆过
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var readyPer = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "", 
	"msg": "处理成功", 
	"data":{
		"clientId": "200007263491"
	} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = readyPer;