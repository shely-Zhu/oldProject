/*
个人中心实名认证
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var realname = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理失败",
    'data':null,
  });
module.exports=realname;