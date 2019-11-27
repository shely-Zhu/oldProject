/*
  财富研究
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    code: "", //错误码     
    status: "0000",
    message: "success",
    data: [{
            tabType: 1,
            tabName: '大类资产研究1'
        },
        {
            tabType: 2,
            tabName: '宏观策略'
        },
        {
            tabType: 3,
            tabName: '宏观策略'
        },
        {
            tabType: 4,
            tabName: '公募研究'
        },
    ]


});

module.exports = data;