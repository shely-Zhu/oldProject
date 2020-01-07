/*
	用户补全信息
*/

// 使用 Mock
var Mock = require('mockjs');

//补全信息
var fullMsg = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "", 
	"msg": "处理成功", 
	"data":{
		
	} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = fullMsg;