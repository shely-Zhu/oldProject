/*
	恒添宝进入转入页面接口
	*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var doCashTreasureToBuy = Mock.mock({
	"hmac":"hmac",//预留字段
	"status":"0",//"0"是查询成功;"1"是查询失败;
	"code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
	"msg":"success",//返回提示信息
	"data":{
		"startGainsDayStr":"03月23日",// 预计开始计算收益时间
		"paymentGainsDayStr":"03月24日",// 预计收益到账时间
		"purchaseAmount":"1000.00",// 起投金额
		"purchaseAmountMask":"1,000.00",// 起投金额
		"payAgainAmount":"1000.00",// 追加金额
		"fundCode": "003075",
		"fundName": "恒添宝", 
		"annYldRat": "3.84",// 七日年化收益率
		"unitYld": "0.9723"// 万分收益 
	}
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = doCashTreasureToBuy;