/*
  公募赎回
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    hmac: "", //预留字段
    msg: "success",
    code: "", //错误码
    status: "0",
    data:{
        allotNo:"201703204001", // 申请编号
        applyDate: "20170320" // 申请日期
    }
});

module.exports = data;