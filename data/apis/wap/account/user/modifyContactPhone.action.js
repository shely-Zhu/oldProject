/*
	修改联系人手机号
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var readyPer = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "", 
	"msg": "处理成功", 
	"data": null
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = readyPer;