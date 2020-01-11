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
		"accountName|1": ["招商证券恒天财富银杏尊享私募投资基金募集专户", ""],//账户名称
		"account|1": ["3110310005174005501", ""],//账户
		"bankName|1": ["中信银行", ""],//银行名称
		"branchBankName|1": ["中信银行经济技术开发区支行", ""],//支行名称
		}
});

module.exports=data;
