/*
	首页banner
*/


// 使用 Mock
var Mock = require('mockjs');

//轮播
var pOver = Mock.mock({ 
	"message": "处理成功！", 
	"data":{
		modelName:'我是名字',
		bannerList:[
			{ 
				"id": "1",//主键ID 
				title:'标题1',
				linkType:'类型',
				"imageUrlShowOnline":"https://s.chtwm.com//upload/htmall/images/banner/777deb8e-7429-4df2-b891-9357eed26bc5.jpg",//图片URL 
				"linkUrl": "www.baidu.com"//链接URL（跳转URL） 
			},
			{ 
				"id": "2",//主键ID 
				title:'标题2',
				linkType:'类型',
				"imageUrlShowOnline":"https://s.chtwm.com//upload/htmall/images/banner/777deb8e-7429-4df2-b891-9357eed26bc5.jpg",//图片URL 
				"linkUrl": "www.baidu.com"//链接URL（跳转URL） 
			}
		],
	},
	"status": "0000"
	// "data":null
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;
