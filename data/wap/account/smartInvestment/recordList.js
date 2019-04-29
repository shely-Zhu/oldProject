/*
    智能投顾-组合交易记录
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "data": {
        "pageItems": { "totalCount": 1, "totalPages": 1 },
        "pageList": [{
            "applyDate": "2019-01-15",
            "applySum": "30000.00",
            "applySumMask": "30,000.00",
            "applyTime": "20:37:48",
            "batchRequestNo": "20190115001302",
            "businAssCode": "28",
            "clientId": "27168",
            "combCode": "0369",
            "combName": "智投组合4",
            "combRequestNo": "20190115001301",
            "combinRedemRatio": "0.00",
            "combinationStatus": "1",
            "combinationStatusMask": "已完成",
            "fundBusinCode": "022",
            "machineDatetime": "20190115203748",
            "tradeAcco": "ZHLC000000003993"
        }]
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = data;