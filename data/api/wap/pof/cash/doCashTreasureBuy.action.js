/*
	恒添宝确认转入接口
	*/

// 使用 Mock
var Mock = require('mockjs');

var doCashTreasureBuy = Mock.mock({
	"hmac":"hmac",//预留字段
	"status":"1",//"0"是查询成功;"1"是查询失败;
	"code":"HS347",//"CF0001" 操作失败;"CS0000" 操作成功;
	"msg":"success",//返回提示信息
	"data":{
		"applyDate":"2016-10-11",//申请日期
		"allotNo":"20161010000701",//申请编号
		"fundBusinCode":"022",//业务代码
		"successType":"21",//交易状态
		"taconfirmFlag":"1",//确认状态
		"fundCode": "003075",
		"fundName": "恒添宝",
		"ident":"1",//扣款状态
		"identDesc":"已发送扣款指令",//扣款状态 中文描述
		"statusMsg":"购买失败",
		"errorMsg":"heheh，我是新的失败状态"
	}
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = doCashTreasureBuy;