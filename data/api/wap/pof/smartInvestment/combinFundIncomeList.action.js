/*
	智能投顾-收益明细查询
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"hmac":"hmac",
	"status":"0",
	"code":"CS0000",
	"msg":"处理成功！",
	"data":null,
	// "data": {
	// 	"total":"总记录数",
	// 	// "combinIncomeList|5": [
	// 	// 	{
	// 	// 		"incomeDate":"2018-10-11",//"收益产生日期",
	// 	// 		"todayIncome":"152.00"//"每日收益"
	// 	// 	},
	// 	// 	{
	// 	// 		"incomeDate":"2018-10-12",//"收益产生日期",
	// 	// 		"todayIncome":"12.00"//"每日收益"
	// 	// 	},
	// 	// 	{
	// 	// 		"incomeDate":"2018-10-13",//"收益产生日期",
	// 	// 		"todayIncome":"102.00"//"每日收益"
	// 	// 	},
	// 	// 	{
	// 	// 		"incomeDate":"2018-10-14",//"收益产生日期",
	// 	// 		"todayIncome":"52.00"//"每日收益"
	// 	// 	},
	// 	// 	{
	// 	// 		"incomeDate":"2018-10-15",//"收益产生日期",
	// 	// 		"todayIncome":"18.00"//"每日收益"
	// 	// 	},
	// 	// ],
	// 	// "combinIncomeList|5":null
	// }
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;