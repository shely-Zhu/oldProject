// 发送语音验证码
var Mock = require('mockjs');

var data = Mock.mock({
    "status": "0000", 
    "message": "success", 
    "data": '' 
  });

module.exports=data;