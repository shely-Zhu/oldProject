/*
   微信
*/

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "输入错误",
  "data": {
  signature: "fbf9a032473d2077681b9b3ca82fea0c748e220c",
  appid: "wx25b1ed4cd6ccc8bd",
  jsapi_ticket: "kgt8ON7yVITDhtdwci0qeayCncmz6f3uzIdmyEMlchNBZbr-4f1740QdskA6OoMTcQhWc52tx-Fq6oNf14wxQQ",
  url: "https://wap.htjf3.com",
  nonceStr: "1b96015d-f672-4200-805e-e9cd97d7919a",
  timestamp: "1498040627"}
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;