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
       "mobile_no_internet": "18810462067",//注册手机号（登录账号） 
		"cust_type": "1",//客户类型1个人0机构 
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;