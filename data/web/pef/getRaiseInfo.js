/*
  受益级别接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
	"hmac": "hmac", 
	"status": "0000", 
	"code": "CS0000", 
	"message": "处理成功！", 
	"data":{
		"accountName": "按实际法令阿雷规划局",//账户名称
		"account": "3456895670954",//账户
		"bankName": "阿双方各很快就额可怜人",//银行名称
		"branchBankName": "阿然后搞卡尔太模糊了",//支行名称
		}
});

module.exports=data;
