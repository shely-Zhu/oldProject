/*
  取消产品预约接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "0000",
    "message": "取消成功！",
    "data": {

    }
});

module.exports = data;