/*
修改登录密码
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var resetpassword = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CF0002",
    "msg": "该密码错误",
    'data':null,
  });
module.exports=resetpassword;