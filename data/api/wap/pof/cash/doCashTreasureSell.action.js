/*
	恒添宝确认转出接口
	*/

// 使用 Mock
var Mock = require('mockjs');

var doCashTreasureSell = Mock.mock({
	"hmac":"hmac",//预留字段
	"status":"0",//"0"是查询成功;"1"是查询失败;
	"code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
	"msg":"转出失败",//返回提示信息
	"data":{
		"successType":"10",// 交易状态
		"estimateDateStr":"2017-03-21",// 预计到账日期
		"estimateTimeStr":"18:43:56",// 预计到账时间
		"applyDateTime":"2017-03-21 16:43:56", // 申请日期时间
		"fundCode": "003075",
		"fundName": "恒添宝",
		"allotNo": "20161010000701", // 申请编号
		"fundBusinCode": "098" // 业务代码
	}
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = doCashTreasureSell;