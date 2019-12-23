


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    message: "操作成功！",
    status: "0000",
    "data": {
        dayInMonth: 23,
        dayInWeek: 2,
        nextDeductingDay: "2019-12-23",
        nextDeductingDayFromate: "201912",
    }
});

module.exports = data;
