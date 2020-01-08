/*
注册页面   接口模拟

*/
// 使用 Mock
var Mock = require('mockjs');

//接口数据
var register = Mock.mock({
	"hmac": "hmac", 
	"status|1": ["0","1"], 
	"code|1": ["1","2","3","4","5"], 
	"msg": "注册失败", 
	"data":{

	}
});

module.exports = register;