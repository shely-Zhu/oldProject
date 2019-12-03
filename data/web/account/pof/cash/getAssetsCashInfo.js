/*
  交易列表接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
    "data": {
        "pageItems": {
        "totalCount": null,
        "totalPages": null
        },
        "addupIncome": "0.00",
        "addupIncomeMask": "0.00",
        "addupIncomeRat": "0.00",
        "annYldRat": "2.264",
        "fundCode": "003075",
        "fundName": "中融货币E",
        "fundState": "1",
        "inTransitNum": "0",
        "income": "0.00",
        "incomeMask": "0.00",
        "opened": false,
        "totalMoney": "0.00",
        "totalMoneyMask": "0.00",
        "trDate": ""
    },
        "message": "操作成功！",
        "status": "0000"
    });

module.exports=data;