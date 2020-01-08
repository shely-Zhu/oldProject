/*
消息平台
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
	"hmac":"hmac",//预留字段
	"status":"0",
	"code":"",
	"msg":"success",//返回提示信息
	"data":{
		"url":" ",//入参url
		"jsapi_ticket":" ",//微信token 
		"nonceStr":" ",//随机数列
		"timestamp":" ",//时间戳
		"signature":" ",//签名
		"appid":" ",//类型【参照备注】
	}
});
module.exports=data;