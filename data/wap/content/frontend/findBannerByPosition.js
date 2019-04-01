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
	"data": [{
		"id": "1",//主键ID
		"imgUrl":"/about/static/img/midAutumn/public_01.jpg",//图片URL
		"activityName": "首页版头",//活动名称
		"linkUrl": ""//链接URL（跳转URL）

		},{
		"id": "2",  //主键ID
		"imgUrl":"/about/static/img/midAutumn/public_02.jpg",//图片URL
		"activityName": "首页版头",//活动名称
		"linkUrl": ""//链接URL（跳转URL）
		},{
		"id": "3",//主键ID
		"imgUrl":"/about/static/img/midAutumn/public_03.jpg",//图片URL
		"activityName": "首页版头",//活动名称
		"linkUrl": ""//链接URL（跳转URL）
		},
		{
		"id": "4",//主键ID
		"imgUrl":"/about/static/img/midAutumn/public_04.jpg",//图片URL
		"activityName": "首页版头",//活动名称
		"linkUrl": "https://wap.chtwm.com/"//链接URL（跳转URL）
		},
		{
		"id": "5",//主键ID
		"imgUrl":"/about/static/img/midAutumn/private_05.jpg",//图片URL
		"activityName": "首页版头",//活动名称
		"linkUrl": ""//链接URL（跳转URL）
		},
		// {
		// "id": "6",//主键ID
		// "imgUrl":"/about/static/img/midAutumn/index_6.jpg",//图片URL
		// "activityName": "首页版头",//活动名称
		// },
		// {
		// "id": "7",//主键ID
		// "imgUrl":"/about/static/img/midAutumn/index_7.jpg",//图片URL
		// "activityName": "首页版头",//活动名称
		// },
		{
		"id": "8",//主键ID
		"imgUrl":"/about/static/img/startup/video_01.png",//图片URL
		"activityName": "首页版头",//活动名称
		"linkUrl": "http://vod.butel.com/734c64ef-b924-48f9-bfcd-2c79fb377263.m3u8"//链接URL（跳转URL）
		}
	]
	// "data":null
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;
