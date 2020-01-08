/*
    基民教育专题
*/


// 使用 Mock
var Mock = require('mockjs');

//1. 基民教育记录
var fundEducationRecord = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "",
    "msg": "处理成功！",
    "data": {}
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = fundEducationRecord;