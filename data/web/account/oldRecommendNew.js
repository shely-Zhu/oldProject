/*
	老带新  资格判定
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
	"msg": "1111111111",
	"data":{
     	recommendable:"0",//是否可以推荐新人 (可以 0 ; 不可 1)
		aesEncrypt:"adsf8091243jasdf",//加密串
    }
  });
module.exports=mymessage;