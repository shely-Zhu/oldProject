/*

  获取银行列表

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
		"prodList": [{
			"hs300PerformancePercentLast": "-5.88",
			"pefConnectionList": [],
			"prodPerformanceList": [{
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "0",
				"profitLossDate": "01-17",
				"profitLossPercentage": "0.00"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "2.25",
				"profitLossDate": "02-14",
				"profitLossPercentage": "2.88"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "4.06",
				"profitLossDate": "02-21",
				"profitLossPercentage": "9.62"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.05",
				"profitLossDate": "02-28",
				"profitLossPercentage": "-5.44"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "5.04",
				"profitLossDate": "03-06",
				"profitLossPercentage": "7.21"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.88",
				"profitLossDate": "03-13",
				"profitLossPercentage": "-5.09"
			}],
			"productViewpoint": "在市场或本基金所投项目与本基金遇到巨额赎回等流动性不足的情况下，本基金管理人可能无法短期、低成本的变现，从而对基金收益造成不利影响。本基金存续期内，投资者可能面临资金不能退出等风险。根据实际投资运作情况，本基金有可能提前结束或延期结束，投资者可能因此面临委托资金不能按期退出等风险。",
			"profitLossPercentageLast": "-5.09",
			"projectCode": 24370,
			"projectName": "明汯价值成长1期7号"
		}, {
			"hs300PerformancePercentLast": "-5.05",
			"pefConnectionList": [{
                "videoCoverUrl": 'fff',
                "videoId": 'wwww'
            }],
			"prodPerformanceList": [{
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.05",
				"profitLossDate": "02-28",
				"profitLossPercentage": "0.00"
			}],
			"productViewpoint": "",
			"profitLossPercentageLast": "0.00",
			"projectCode": 24762,
			"projectName": "凯丰宏观策略16-16号"
		}, {
			"hs300PerformancePercentLast": "-5.88",
			"pefConnectionList": [],
			"prodPerformanceList": [{
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.05",
				"profitLossDate": "02-28",
				"profitLossPercentage": "0.00"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "5.04",
				"profitLossDate": "03-06",
				"profitLossPercentage": "0.00"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.88",
				"profitLossDate": "03-13",
				"profitLossPercentage": "0.00"
			}],
			"productViewpoint": "",
			"profitLossPercentageLast": "0.00",
			"projectCode": 24813,
			"projectName": "和聚宗享-恒天2号"
		}, {
			"hs300PerformancePercentLast": "-5.88",
			"pefConnectionList": [],
			"prodPerformanceList": [{
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.05",
				"profitLossDate": "02-28",
				"profitLossPercentage": "0.00"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "5.04",
				"profitLossDate": "03-06",
				"profitLossPercentage": "-0.01"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.88",
				"profitLossDate": "03-13",
				"profitLossPercentage": "-0.73"
			}],
			"productViewpoint": "",
			"profitLossPercentageLast": "-0.73",
			"projectCode": 24693,
			"projectName": "明汯价值成长1期恒享1号"
		}, {
			"hs300PerformancePercentLast": "-5.88",
			"pefConnectionList": [],
			"prodPerformanceList": [{
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "0",
				"profitLossDate": "01-17",
				"profitLossPercentage": "0.01"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "2.25",
				"profitLossDate": "02-14",
				"profitLossPercentage": "-0.02"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "4.06",
				"profitLossDate": "02-21",
				"profitLossPercentage": "0.82"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.05",
				"profitLossDate": "02-28",
				"profitLossPercentage": "-1.59"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "5.04",
				"profitLossDate": "03-06",
				"profitLossPercentage": "1.50"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.88",
				"profitLossDate": "03-13",
				"profitLossPercentage": "-6.34"
			}],
			"productViewpoint": "基金利益受多项因素影响，包括证券市场价格波动、投资操作水平、国家政策变化等，基金既有盈利的可能，亦存在亏损的可能。根据相关法律法规规定，管理人不对基金的投资者做出保证本金及其收益的承诺。",
			"profitLossPercentageLast": "-6.34",
			"projectCode": 24554,
			"projectName": "凯丰宏观策略16-7号"
		}, {
			"hs300PerformancePercentLast": "-5.88",
			"pefConnectionList": [{
                "videoCoverUrl":"videoCoverUrl",
                "videoId":"videoId"
            }],
			"prodPerformanceList": [{
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "0",
				"profitLossDate": "01-17",
				"profitLossPercentage": "-0.87"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "2.25",
				"profitLossDate": "02-14",
				"profitLossPercentage": "1.64"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "4.06",
				"profitLossDate": "02-21",
				"profitLossPercentage": "1.57"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.05",
				"profitLossDate": "02-28",
				"profitLossPercentage": "-6.00"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "5.04",
				"profitLossDate": "03-06",
				"profitLossPercentage": "2.58"
			}, {
				"hs300PerformanceDate": "",
				"hs300PerformancePercent": "-5.88",
				"profitLossDate": "03-13",
				"profitLossPercentage": "-6.31"
			}],
			"productViewpoint": "基金利益受多项因素影响，包括证券市场价格波动、投资操作水平、国家政策变化等，基金既有盈利的可能，亦存在亏损的可能。根据相关法律法规规定，管理人不对基金的投资者做出保证本金及其收益的承诺。",
			"profitLossPercentageLast": "+6.31",
			"projectCode": 24229,
			"projectName": "重阳金享6号"
		}]
	},
    
});
module.exports=mymessage;
