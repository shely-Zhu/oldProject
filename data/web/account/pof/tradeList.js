/*
  交易列表接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
	"hmac":"hmac",//预留字段
	"status":"0000",//"0000"是查询成功;"1"是查询失败;
	"code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
	"msg":"success",//返回提示信息
	"data":{
		"pageList|10":[
			{
			"fundName":"新沃货币新沃货币新沃货币新沃货币新沃货币新沃货币新沃货币新沃货币新沃货币新沃货币",//基金名称
			"tradeApplyStatus":"0",//交易状态
			"tradeApplyDesc":"交易失败",//交易状态描述
			"fundCode":"001916",//基金代码
			"balance":"10000.00",//发生金额
			"balanceMask":"10.000.00",//发生金额千分位
			"shares":"100.00",//发生份额
			"applyDate":"2016-10-11",//申请日期
			"applyTime":"09:30:00",//申请时间
			"orderDate":"09:34:58",//下单时间（原申请日期+下单时间=购买时间）
			"originalDate":"2016-11-02",//下单日期（原申请日期+下单时间=购买时间）
			"fundBusinCode":"022",//业务代码
			"allotNo":"20161010000301",//申请编号
			"taconfirmFlag":"9",//确认表示
			"deductStatus":"1",//扣款状态
			"applyType":"0",//请求类型(0：购买  1：赎回  2：定投,3:分红)
			"fundType":"1030",//基金类型
			"fundCombination":"0"// 是否是基金组合交易 0–否 1--是
			}
		],
		"pageItems":{
			"slider":[1,2,3,4,5,6,7],
			"hasPrePage":false,
			"startRow":1,
			"offset":0,
			"lastPage":false,
			"prePage":1,
			"hasNextPage":true,
			"nextPage":2,
			"endRow":5,
			"totalCount":147,
			"firstPage":true,
			"totalPages":30,
			"limit":5,
			"page":1
		}
	}
});

module.exports=data;