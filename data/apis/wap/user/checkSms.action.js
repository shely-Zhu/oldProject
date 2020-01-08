/*
	校验验证码
*/

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({
  "hmac": "hmac",
  "status":0,
  "code": "CS0000",
  "msg": "保存成功",
  "data":{
        "rstPwdUuid": "134234234"//redis保存联系人手机号的key
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;