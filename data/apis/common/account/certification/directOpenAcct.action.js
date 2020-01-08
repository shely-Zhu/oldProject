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
        privateOfferStatus: "0",//私募实名认证是否成功 0成功 1失败
    		publicOfferStatus: "0",//公募开户是否成功 0成功 1失败
    		privateOfferMsg: '',//私募实名认证接口反馈信息
    		publicOfferMsg: '' ,//公募开户接口反馈信息
    }
  });
module.exports=mymessage;
