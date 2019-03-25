/*
	忘记网站交易密码  第二步
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "请输入正确的密码", 
	"data": { 
		   "serialNo":"201611091536154385",   //流水号
            "protocolNo":"201610191012166658"  //协议号
	} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;