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
				"imgUrl":"https://s.chtfund.com//upload/htmall/images/banner/11d8bb0b-d04c-44f3-a10d-269b178dc61f.png",//图片URL 
				"imageUrlShowOnline": "www.baidu.com"//链接URL（跳转URL） 
			},
			{ 
				"id": "2",//主键ID 
				title:'标题2',
				linkType:'类型',
				"imgUrl":"https://s.chtfund.com//upload/htmall/images/banner/11d8bb0b-d04c-44f3-a10d-269b178dc61f.png",//图片URL 
				"imageUrlShowOnline": "www.baidu.com"//链接URL（跳转URL） 
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
