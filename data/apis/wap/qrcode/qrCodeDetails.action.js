/*
  二维码计数
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
});
module.exports=data;
