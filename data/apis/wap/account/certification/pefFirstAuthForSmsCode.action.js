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
		'serialNo': "201612055656565665",//流水号【用于2.1.2 实名认证提交接口入参】
		//'protocolNo': "2365678878",//协议号
	} 
  });

module.exports=realname;