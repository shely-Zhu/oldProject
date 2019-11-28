/*
  交易列表接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
	"status": "0000",
	"message": "操作成功",
	"data": {
	
	'list':[
	
	{
	
	"todayIncome":"30.89",//每日收益
	
	"todayIncomeMask":"0.00",//每日收益千分位显示
	
	"belongdate":"2017-02-19",//收益日期 
	
	},
	
	],
	
	"pageNum":1,
	
	"pageSize":10,
	
	'total':500,
}
});

module.exports=data;