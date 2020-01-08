/*
	恒添宝现金管理资产列表
	*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var doCashTreasureToBuy = Mock.mock({
	"hmac":"hmac",//预留字段
	"status":"0",//"0"是查询成功;"1"是查询失败;
	"code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
	"msg":"success",//返回提示信息
	"data":[
		{
			"isOpened":true,// 现金宝是否开户 true是开户 false是未开户
			"totalMoney":"2059170.16",// 该支现金宝总资产
			"totalMoneyMask": "2,059,170.16", // 该支现金宝总资产千分位显示
			"income":"40.89",// 该支 现金宝昨日收益
			"incomeMask":"40.89", // 该支现金宝昨日收益千分位显示
			"annYldRat":"4.3270",// 该支7日年化收益率(%)
			"addupIncome":"133.30", // 该支 现金宝累计收益
			"addupIncomeMask":"133.30",// 该支现金宝累计受益千分位
			"fundCode": "162206",
			"fundName": "泰达宏利货币A"
		},
		{
			"isOpened":false,// 现金宝是否开户 true是开户 true是未开户
			"totalMoney":"1059170.16",// 该支现金宝总资产
			"totalMoneyMask": "1,059,170.16", // 该支现金宝总资产千分位显示
			"income":"30.89",// 该支 现金宝昨日收益
			"incomeMask":"30.89", // 该支现金宝昨日收益千分位显示
			"annYldRat":"3.3270",// 该支7日年化收益率(%)
			"addupIncome":"115.80", // 该支 现金宝累计收益
			"addupIncomeMask":"115.80",// 该支现金宝累计受益千分位
			"fundCode": "003075",
			"fundName": "中融货币E"
		},

	]
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = doCashTreasureToBuy;