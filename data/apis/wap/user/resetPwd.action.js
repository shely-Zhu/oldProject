/*
	解除绑定
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
	"msg": "1111111111",
	"data":{
     	
    }
  });
module.exports=mymessage;