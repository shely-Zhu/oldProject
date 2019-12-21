

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock(	
    {
    "status": "0000",
    "message": "操作成功",
    "data": {   
        pageList:[
            {
                addupIncome: "0.00",
                addupIncomeMask: "0.00",
                addupIncomeRat: "0.00",
                annYldRat: "2.193",
                fundCode: "003075",
                fundName: "中融货币E",
                fundState: "1",
                holdIncome: "",
                holdIncomeMask: "--",
                inTransitNum: "0",
                income: "0.00",
                incomeMask: "0.00",
                isBuyFlag: 1,
                isRedemptionFlag: 1,
                opened: true,
                totalMoney: "0.00",
                totalMoneyMask: "0.00",
                trDate: "",
           },{
                addupIncome: "0.00",
                addupIncomeMask: "0.00",
                addupIncomeRat: "0.00",
                annYldRat: "3.193",
                fundCode: "001894",
                fundName: "泰达宏利活期友A",
                fundState: "1",
                holdIncome: "",
                holdIncomeMask: "--",
                inTransitNum: "0",
                income: "0.00",
                incomeMask: "0.00",
                isBuyFlag: 1,
                isRedemptionFlag: 1,
                opened: true,
                totalMoney: "0.00",
                totalMoneyMask: "0.00",
                trDate: "",
           }
        ]
    }
    });

module.exports = data;