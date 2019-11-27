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
            sonModelType: 1,
            sonModelName: '大类资产研究1'
        },
        {
            sonModelType: 2,
            sonModelName: '宏观策略'
        },
        {
            sonModelType: 3,
            sonModelName: '宏观策略'
        },
        {
            sonModelType: 4,
            sonModelName: '公募研究'
        },
    ]


});

module.exports = data;