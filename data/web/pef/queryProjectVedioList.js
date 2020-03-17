/*
  受益级别接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
	"hmac": "hmac", 
	"status": "0000", 
	"code": "CS0000", 
	"message": "处理成功！", 
	"data":[  
		{
		"videoName": "我1是基金名称国成资产的坤石5号私募投资基金...",//上限金额（单位：万）
		"videoCoverUrl": "/common/img/lazyImgList.png",//下限金额（单位：万）
		"videoSpeaker": "7.2",//收益率【百分比】
		"videoDuration": "A",//受益级别【类似A,B,C,D.】
		"videoId": "",//受益级别名称
		},
		{
		"videoName": "我2是基金名称国成资产的坤石5号私募投资基金+2",//上限金额（单位：万）
		"videoCoverUrl": "/common/img/lazyImgList.png",//下限金额（单位：万）
		"videoSpeaker": "7.2",//收益率【百分比】
		"videoDuration": "A",//受益级别【类似A,B,C,D.】
		"videoId": "",//受益级别名称
		},
		{
		"videoName": "我3是基金名称国成资产的坤石5号私募投资基金+3",//上限金额（单位：万）
		"videoCoverUrl": "/common/img/lazyImgList.png",//下限金额（单位：万）
		"videoSpeaker": "7.2",//收益率【百分比】
		"videoDuration": "A",//受益级别【类似A,B,C,D.】
		"videoId": "",//受益级别名称
		},
		{
		"videoName": "我是基金名称国成资产的坤石5号私募投资基金",//上限金额（单位：万）
		"videoCoverUrl": "/common/img/lazyImgList.png",//下限金额（单位：万）
		"videoSpeaker": "7.2",//收益率【百分比】
		"videoDuration": "A",//受益级别【类似A,B,C,D.】
		"videoId": "",//受益级别名称
		},
		
	]
});

module.exports=data;
