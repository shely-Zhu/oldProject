/*
    获取短信验证码接口
    之前是先验证手机号是否注册，未注册，再发送验证码
    现在注册页和忘记密码页面变成，先验证验证码，正确了再校验手机号是否注册，其他页面不变
*/

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "输入错误",
  "data": null
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;