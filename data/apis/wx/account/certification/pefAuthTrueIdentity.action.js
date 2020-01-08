/*

  实名认证下一步页面提交
*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    "data":{
         "serialNo": "201702141725389518",//暂时不同
         "protocolNo": null //用于恒生交易账户开户,暂时不同
    }
  });
module.exports=mymessage;
