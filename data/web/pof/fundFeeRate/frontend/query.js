


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    message: "操作成功！",
    status: "0000",
    "data": [
        {
            discount: 1,
            maxBalance: 0,
            maxFare: 0,
            minBalance: 0,
            minFare: 0,
            ratio: 0.5,
        }
    ]
});

module.exports = data;
