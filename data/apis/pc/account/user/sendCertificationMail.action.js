/*
修改手机号码
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var email = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "保存成功",
    'data':null,
  });
module.exports=email;