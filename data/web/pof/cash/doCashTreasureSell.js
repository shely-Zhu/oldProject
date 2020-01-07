

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock(	
    {
        "status": "0000",
        "message": "操作成功",
        "data": {   
            "successType":"12",// 交易状态
            "estimateDateStr":"2017-03-21",// 预计到账日期
            "estimateTimeStr":"18:43:56",// 预计到账时间
            "applyDateTime":"2017-03-21 16:43:56", // 申请日期时间
            "fundCode": "003075",
            "fundName": "恒添宝",
            "allotNo": "20161010000701", // 申请编号
            "fundBusinCode": "098" // 业务代码
        }
    });

module.exports = data;