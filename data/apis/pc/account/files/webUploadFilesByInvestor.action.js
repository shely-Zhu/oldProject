/*
	合格投资者认证 接口模拟
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    "data":{
	    "hmac": "hmac",
	    "status": "0",
	    "code": "CS0000",
	    "msg": "处理成功！",
	    "data": []
		}

    
  });
module.exports=mymessage;