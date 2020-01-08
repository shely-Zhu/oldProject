/*
	首页 内容管理
*/


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({
    "data":{
		"bannerName":"组合投资",
		"id":45,
		"main":"chtfund",
		"pictures":[
			"https://s.chtfundtest.com/upload/htmall/images/banner/4b4135bc-4bb2-4e6a-8799-fcfa9a3e020f.png"
		]
	},
	"message":"操作成功！",
	"status":"0000"
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;