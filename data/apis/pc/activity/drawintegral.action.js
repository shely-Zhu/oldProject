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
	"msg": "success", 
	"data":{
	"award|1":["1","2","3","4","5"],//1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖
	 
	} 
  });

module.exports=data;