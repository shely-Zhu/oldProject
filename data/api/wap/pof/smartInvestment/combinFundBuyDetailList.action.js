/*
	智能投顾-组合买入交易详情查询
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var account = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "success", 
	"data": {
		 "combinBuyDetailsList":[{
         "fundCode":"25488",//基金编号
         "fundName":"智能投顾1号",//基金名称
         "applySum":"1000",//申请金额
         "affirmDate":"2018-10-10",//确认日期
         "deductStatus":"5",//扣款状态
         "deductStatusMask":"扣款失败",//扣款状态说明
         "fareSx":"25",//手续费
         "tradeConfirmNetvalue":"1.24",//确认净值
         "tradeConfirmShare":"165"//确认份额
    }]
	}
});

//把生成的假数据当做模块输出
module.exports = data;
