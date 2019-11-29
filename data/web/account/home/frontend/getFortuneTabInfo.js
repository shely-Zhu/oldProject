/*
  财富研究
*/

// 使用 Mock
var Mock = require('mockjs');

var researchData = Mock.mock({
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

var classData = Mock.mock({
    code: "", //错误码     
    status: "0000",
    message: "success",
    data: [{
            sonModelType: 2,
            sonModelName: '大咖直播'
        },
        {
            sonModelType: 3,
            sonModelName: '知时讲堂'
        }
    ]
});

/*module.exports = data;*/

module.exports = [
    {
        params: {
            'type' : '28'   //要在左边的对比参数上加[]，不然比对不上 稳金
        },
        response: classData
    },
    {
        params: {
            'type' : '29'   //要在左边的对比参数上加[]，不然比对不上 稳金
        },
        response: researchData
    }
]