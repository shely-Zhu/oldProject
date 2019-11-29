/*
	财富翻译官
*/


// 使用 Mock
var Mock = require('mockjs');

//轮播
var data = Mock.mock({ 
	"message": "处理成功！", 
	"data":{
		modelVO:{
			modelName:'模块名称',
			isUse:true,
			listJumpUrl:"www.baidu.com"
		},
		list:[
			{ 
				"id": "1",//主键ID 
				"applyType":'0',
				"articleBelong":'文章归属',
				"title":'文章标题',
				"intro":'文章简介',
				"numPeriods":'488',
				"externalUrl":"https://s.chtfund.com//upload/htmall/images/banner/11d8bb0b-d04c-44f3-a10d-269b178dc61f.png",//图片URL 
				"voiceAttachName":'音频附件名称',
				"titleFir":'一级标题',
				"titleSec":'二级标题',
				"imageUrlShowOnline": "www.baidu.com"//链接URL（跳转URL） 
			},
			// { 
			// 	"id": "2",//主键ID 
			// 	"applyType":'1',
			// 	"articleBelong":'文章归属',
			// 	"title":'文章标题',
			// 	"intro":'文章简介',
			// 	"numPeriods":'488',
			// 	"externalUrl":"https://s.chtfund.com//upload/htmall/images/banner/11d8bb0b-d04c-44f3-a10d-269b178dc61f.png",//图片URL 
			// 	"voiceAttachName":'音频附件名称',
			// 	"titleFir":'一级标题',
			// 	"titleSec":'二级标题',
			// 	"imageUrlShowOnline": "www.baidu.com"//链接URL（跳转URL）
			// }
		],
	},
	"status": "0000"
	// "data":null
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = data;
