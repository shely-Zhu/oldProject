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
            "videoCoverUrl": "http://livet.v114.com/data/attachment/20200217/1581922658250.jpg",
            "videoDuration": "",
            "videoId": "104244",
            "videoName": "测试111",
            "videoSpeaker": "郎咸平"
        },
        {
            "videoCoverUrl": "http://livet.v114.com/data/attachment/20200212/1581470246355.jpg",
            "videoDuration": "",
            "videoId": "104242",
            "videoName": "恒天千象一期私募证券投资基金2",
            "videoSpeaker": "黄达"
        },
        {
            "videoCoverUrl": "http://livet.v114.com/data/attachment/20200214/1581667652445.jpg",
            "videoDuration": "",
            "videoId": "2932",
            "videoName": "测试-丰年国防军工产业基金改改东西",
            "videoSpeaker": "潘耀荣"
        },
        {
            "videoCoverUrl": "http://livet.v114.com/data/attachment/20200214/1581667652445.jpg",
            "videoDuration": "",
            "videoId": "2932",
            "videoName": "测试-丰年国防军工产业基金改改东西",
            "videoSpeaker": "潘耀荣"
		}
		,
        {
            "videoCoverUrl": "http://livet.v114.com/data/attachment/20200214/1581667652445.jpg",
            "videoDuration": "",
            "videoId": "2932",
            "videoName": "测试-丰年国防军工产业基金改改东西",
            "videoSpeaker": "潘耀荣"
		}
		,
        {
            "videoCoverUrl": "http://livet.v114.com/data/attachment/20200214/1581667652445.jpg",
            "videoDuration": "",
            "videoId": "2932",
            "videoName": "测试-丰年国防军工产业基金改改东西",
            "videoSpeaker": "潘耀荣"
        }
		
	]
});

module.exports=data;
