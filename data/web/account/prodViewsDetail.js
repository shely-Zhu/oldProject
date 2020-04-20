/*

  获取银行列表

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    "data":{
      "data": {
        "projectShortname": "勿动旭霞01(1)(2)(1)(1)(1)(1)",
        "productViewpoint": "卡卡西1"
    }     
	}
    
});
module.exports=mymessage;
