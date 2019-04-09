/*

客户抽奖次数查询

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………

var data = Mock.mock({
    "hmac": "hmac", 
	"status": "0", 
	"code": "", 
	"message": "success", 
	"data":{
	"token":"1231312312312"
	} 
  });

module.exports=data;