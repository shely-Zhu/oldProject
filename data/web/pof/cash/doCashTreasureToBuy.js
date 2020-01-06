

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock(	
    {
    "status": "0000",
    "message": "操作成功",
    "data": {   
        annYldRat: 2.193,
        annYldRatStr: "2.1930",
        fundCode: "003075",
        fundName: "中融货币E",
        payAgainAmount: "100.00",
        payAgainAmountMask: "100.00",
        paymentGainsDayStr: "12月23日",
        purchaseAmount: "10000.00",
        purchaseAmountMask: "60,000.00",
        startGainsDayStr: "12月22日",
        trdDt: "2019-12-06",
        unitYld: 0.5939,
        unitYldStr: "0.5939",
    }
    });

module.exports = data;