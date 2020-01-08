/*
图文验证码   接口模拟
*/

// 使用 Mock
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
  "hmac": "hmac",
  "status": 	0,  //0成功,1失败
  "code": "1222",
  "msg": "验证码输入不正确，请重新输入",
  'data': null
});



//根据传参数的不同进行处理
// module.exports = [
//   {
//     params: {checkCode: 1234},  //成功
//     response: {
//       sta: 'error'
//     }
//   }
// ]

module.exports = data;