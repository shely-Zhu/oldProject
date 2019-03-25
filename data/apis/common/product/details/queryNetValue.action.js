/*
  最新净值接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理失败11！", 
	"data":{  
		"netValue": "1.0025",//产品净值（单位：元）
		"netValDate": "2016-12-12",//净值日期【yyyy-MM-dd】
		"totalNetValue": "25",//总净值
	}	
});

module.exports=data;