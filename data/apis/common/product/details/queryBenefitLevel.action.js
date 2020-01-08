/*
  受益级别接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data":[  
		{
		"amountMax": "300",//上限金额（单位：万）
		"amountMin": "100",//下限金额（单位：万）
		"profit": "7.2",//收益率【百分比】
		"profitClass": "A",//受益级别【类似A,B,C,D.】
		"profitClassName": "",//受益级别名称
		"fundName": "",//产品名称
		 "projectName": "",//项目名称
		 "bonusType": ""//分红方式
		},
		{
		"amountMax": "500",//上限金额（单位：万）
		"amountMin": "300",//下限金额（单位：万）
		"profit": "7.5",//收益率【百分比】
		"profitClass": "A",//受益级别【类似A,B,C,D.】
		"profitClassName": "",//受益级别名称
		"fundName": "",//产品名称
		"projectName": "",//项目名称
		"bonusType": ""//分红方式
		},
		{
		"amountMax": "0",//上限金额（单位：万）
		"amountMin": "500",//下限金额（单位：万）
		"profit": "7.8",//收益率【百分比】
		"profitClass": "A",//受益级别【类似A,B,C,D.】
		"profitClassName": "",//受益级别名称
		"fundName": "",//产品名称
		"projectName": "",//项目名称
		"bonusType": ""//分红方式
		}
	]
});

module.exports=data;
