/*
	左树--公私募账户合并
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
    	"maskName": "张三",//用户名，未认证则显示加*手机号 
		"id_kind_gb": "0",//证件类型
		"id_no": "23018******1480"//证件号
    }
  });

module.exports=realname;