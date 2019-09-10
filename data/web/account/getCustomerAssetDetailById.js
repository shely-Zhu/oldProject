/*

  获取总资产

*/

// 使用 Mock
var Mock = require("mockjs");

var mymessage = Mock.mock(
  { 
    "status": "0000", 
    "message": "接口请求成功",
    "data": {
      "id": 1,
      "customerNo":11,
      "customerName": "客户客户客户",
      "customerSource": "1",
      "riskType" : 1,
      "age": 18,
      "canConfigAssets": 300000,
      "lifeTerm": 1
    }
  }
);
module.exports = mymessage;
