/*
	首页banner
*/


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data|4": [{ 
		"id": "1",//主键ID 
		// "imgUrl":"https://s.chtwm.com//upload/htmall/images/banner/777deb8e-7429-4df2-b891-9357eed26bc5.jpg",//图片URL 
		"imgUrl":"https://s.chtfund.com//upload/htmall/images/banner/11d8bb0b-d04c-44f3-a10d-269b178dc61f.png",//图片URL 
		"activityName": "首页版头",//活动名称 
		// "linkUrl": "http://vod.butel.com/734c64ef-b924-48f9-bfcd-2c79fb377263.m3u8"//链接URL（跳转URL） 
		// "linkUrl": "www.baidu.com"//链接URL（跳转URL） 
		}
	]
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;
