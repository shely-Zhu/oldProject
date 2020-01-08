/*

 全平台Banner查询

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………

var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data":[{ 
		"id": "1",//主键ID 
		"imgUrl":"https://s.chtfund.com//upload/htmall/images/banner/6e5162cb-4a45-483d-bb53-2bc17900a8e3.jpg",//图片URL 
		"activityName": "首页版头",//活动名称 
		"linkUrl": "http://www.baidu.com "//链接URL（跳转URL） 
		}, { 
		"id": "2",//主键ID 
		"imgUrl":"https://s.chtfund.com//upload/htmall/images/banner/fa6a150a-5f84-4a90-8969-4e7d4345cc97.jpg",//图片URL 
		"activityName": "首页版头",//活动名称 
		"linkUrl": "http://www.baidu.com "//链接URL（跳转URL） 
		}, { 
		"id": "3",//主键ID 
		"imgUrl":"https://s.chtfund.com//upload/htmall/images/banner/6e5162cb-4a45-483d-bb53-2bc17900a8e3.jpg",//图片URL 
		"activityName": "首页版头",//活动名称 
		"linkUrl": "http://www.baidu.com "//链接URL（跳转URL） 
		}, { 
		"id": "4",//主键ID 
		"imgUrl":"https://s.chtfund.com//upload/htmall/images/banner/fa6a150a-5f84-4a90-8969-4e7d4345cc97.jpg",//图片URL 
		"activityName": "首页版头",//活动名称 
		"linkUrl": "http://www.baidu.com "//链接URL（跳转URL） 
		}, 
		] 
});

module.exports=data;