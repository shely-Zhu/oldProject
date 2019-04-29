/*
    智能投顾-组合持仓列表
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "data": {
        "pageItems": { "totalCount": 1, "totalPages": 1 },
        "pageList": [{
            "assetRatio": "100",
            "availShare": "5050.00",
            "availShareMask": "5,050.00",
            "fundCode": "000846",
            "fundName": "中融货币C",
            "holdShare": "5050.00",
            "holdShareMask": "5,050.00",
            "minCost": "5000.00",
            "minCostMask": "5,000.00",
            "worth": "5050.00",
            "worthMask": "5,050.00",
            "yesUnitNav": "1.0000",
            "yesUnitNavMask": "1.00"
        }]
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = data;