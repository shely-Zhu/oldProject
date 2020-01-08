/*
	首页 内容管理
*/


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({
    "data":{
		"title":"组合投资",
		"accountName":"硕大的北京",
        "bankAccount":1321478797878979,
        "bankNo":1321345465,
        "bankAccountName":"北京支行",
		"remarks":"这是一个提示,这是一个提示,这是一个提示,这是一个提示,这是一个提示,这是一个提示,这是一个提示,这是一个提示,这是一个提示."
	},
	"message":"操作成功！",
	"status":"0000"
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;