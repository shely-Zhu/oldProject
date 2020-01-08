/*
	内容管理
*/
/*
获取短信验证码

*/

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data": { 
		"id": 16,//主键ID

		"title": "内容title",//标题

		"introduction": "内容概要…",//简介

		"subject_tag":"阳光私募",//专题标签

		"clicksNum": "109",//阅读数

		"content": "啊放假啦大家分厘卡机flak都放假了咯加分的积分卡就放了多久啊理解大家发链接阿凡达卡里克奥帆基地立刻解放了<a>wwwwwwwwwwwwwwwwwwwwwwwwwwww</a>",//内容详情

		"releaseDate": "2016-07-28",//发表日期 

		"reportSource": "凤凰网",//来源 

	}
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;
