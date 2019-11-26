/*
	立即咨询
 */


// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
	"hmac": "hmac",
	"status": "0000",
	"code": "CS0000",
	"msg": "处理成功",
	"data": '',
});


module.exports = data;