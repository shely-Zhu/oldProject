/*

  公私募账户合并
*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    "data":{
        "ticket": "", //私募跳转公募信息解密口令
		    "hsid": "" //公募客户编号
    }
  });
module.exports=mymessage;
