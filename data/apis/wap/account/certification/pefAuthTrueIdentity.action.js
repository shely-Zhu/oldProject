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
         //"serialNo": "201702141725389518",//暂时不同
         //"protocolNo": null //用于恒生交易账户开户,暂时不同
         "openAccount": "0", //是否进入公募开户0：进入，1：不进入
         //如果公募已开户则需要判断：
         "privateOfferStatus": "0", //私募实名认证是否成功 0成功 1失败
         "privateOfferMsg": ''  //私募实名认证接口反馈信息
    }
  });
module.exports=mymessage;
