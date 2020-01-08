/*
	持仓明细 赎回区域  初始数据
 */


// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac", 
	"status": "0", 
	"code": "", 
	"msg": "处理成功！", 
	"data":{
		"tnDate": "2016-11-07" //T+N日【格式为 yyyy-MM-dd】
	}
  });


module.exports=data;