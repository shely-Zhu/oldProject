/*
  公募已处理的基金接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
	"hmac":"hmac",//预留字段
	"status":"0",//"0"是查询成功;"1"是查询失败;
	"code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
	"msg":"success",//返回提示信息
	"data":{
		"pageList":[{  
			"netValue":"1.0000",//净值
			"applyDate":"2016-10-11",//净值日期（申请日期）
			"estimateArrivalDate":"2016-10-14",// 预估到账日期
			"bankAccount":"6230229875489625",// 银行账户 
			"bankIdNo":"012",// 银行编号
			"bankLogoUrl":"",// 银行logoUrl
			"bankName":"华夏银行",// 银行名称
			"tradeConfirmType":"10.00",//交易确认份额
			"tradeConfirmBalance":"1,200",//交易确认金额
			"fundName":"博时天天增利货币A",//基金名称
			"fundCode":"000734",//基金代码
			"fundBusinCode":"124",//业务代码
			"allotNo":"20160620000361",//申请编号
			"redempFlag":"0",// 赎回标识
			"fundType":"1030"//基金类型
		},],
		"pageItems":{
			"slider":[1,2],
			"hasPrePage":false,
			"startRow":1,
			"offset":0,
			"lastPage":false,
			"prePage":1,
			"hasNextPage":true,
			"nextPage":2,
			"endRow":5,
			"totalCount":9,
			"firstPage":true,
			"totalPages":2,
			"limit":5,
			"page":1
		}
	}
});

module.exports=data;