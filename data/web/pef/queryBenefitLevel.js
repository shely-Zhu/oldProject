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
	"data":[  
		{
		"benifitUpperLimit": "300",//上限金额（单位：万）
		"benifitLowerLimit": "100",//下限金额（单位：万）
		"benifitRate": "7.2",//收益率【百分比】
		"profitClass": "A",//受益级别【类似A,B,C,D.】
		"profitClassName": "",//受益级别名称
		"productName": "",//产品名称
		"projectName": "",//项目名称
		"incomeMode": ""//分红方式  收益分配类型(0:固定收益;1:浮动收益;2:固定+浮动收益)
		},
		{
		"benifitUpperLimit": "500",//上限金额（单位：万）
		"benifitLowerLimit": "300",//下限金额（单位：万）
		"benifitRate": "7.5",//收益率【百分比】
		"profitClass": "A",//受益级别【类似A,B,C,D.】
		"profitClassName": "",//受益级别名称
		"productName": "",//产品名称
		"projectName": "",//项目名称
		"incomeMode": ""//分红方式
		},
		{
		"benifitUpperLimit": "0",//上限金额（单位：万）
		"benifitLowerLimit": "500",//下限金额（单位：万）
		"benifitRate": "7.8",//收益率【百分比】
		"profitClass": "A",//受益级别【类似A,B,C,D.】
		"profitClassName": "",//受益级别名称
		"productName": "",//产品名称
		"projectName": "",//项目名称
		"incomeMode": ""//分红方式
		}
	]
});

module.exports=data;
