/*
个人中心实名认证
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var realname = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理失败",
    'data': {
    	"openAccount": "0", //是否进入公募开户0：进入，1：不进入如果公募已开户则需要判断：
		"privateOfferStatus":"0", //私募实名认证是否成功 0成功 1失败
		"privateOfferMsg": "接口反馈信息", //私募实名认证接口反馈信息
	}
  });

module.exports=realname;