/*
	检查用户登录
*/

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({
  "hmac": "hmac",
  "status":'0000',
  "code": "CS0000",
  "msg": "保存成功",
  "data":{
        "uuid": "E02187CAF8E25822D5E52B761014369D" //
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;