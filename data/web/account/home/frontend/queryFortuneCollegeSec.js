/*
	首页banner
*/


// 使用 Mock
var Mock = require('mockjs');

//轮播
var data = Mock.mock({ 
	"message": "处理成功！", 
	"data":{
		ModelVO:{
			modelName:'模块名称',
			isUse:true,
			listJumpUrl:"www.baidu.com"
		},
		"listData": [
			{
			"sonModelName": "大类资产研究",
			"listFir": [{
				"applyType": 0,
				"articleBelong": "4",
				"articleTime": "2019-11-25T00:00:00.000+0000",
				"author": "H011973",
				"content": null,
				"createId": "H011973",
				"createName": "王林",
				"createTime": "2019-11-25T07:03:25.000+0000",
				"createTimeStr": "2019-11-25 15:03:25",
				"externalUrl": null,
				"h5Title": null,
				"h5Type": null,
				"id": 27,
				"imageAttachId": null,
				"imageAttachName": null,
				"intro": "投资理财01",
				"isDelete": 0,
				"isUse": 1,
				"memo": null,
				"modelId": 22,
				"needLogin": null,
				"needRisk": null,
				"pubId": null,
				"pubName": null,
				"pubTime": null,
				"pubTimeStr": null,
				"seqNo": null,
				"source": null,
				"title": "投资理财",
				"updateId": "H011973",
				"updateName": "王林",
				"updateTime": "2019-11-25T07:04:06.000+0000",
				"updateTimeStr": "2019-11-25 15:04:06",
				"videoAttachId": null,
				"videoAttachName": null,
				"voiceAttachId": null,
				"voiceAttachName": null
			}]
		},
		{
			"sonModelName": "宏观策略",
			"listFir": [{
				"applyType": 0,
				"articleBelong": "4",
				"articleTime": "2019-11-25T00:00:00.000+0000",
				"author": "H011973",
				"content": null,
				"createId": "H011973",
				"createName": "王林",
				"createTime": "2019-11-25T07:03:25.000+0000",
				"createTimeStr": "2019-11-25 15:03:25",
				"externalUrl": null,
				"h5Title": null,
				"h5Type": null,
				"id": 27,
				"imageAttachId": null,
				"imageAttachName": null,
				"intro": "投资理财01",
				"isDelete": 0,
				"isUse": 1,
				"memo": null,
				"modelId": 22,
				"needLogin": null,
				"needRisk": null,
				"pubId": null,
				"pubName": null,
				"pubTime": null,
				"pubTimeStr": null,
				"seqNo": null,
				"source": null,
				"title": "投资理财",
				"updateId": "H011973",
				"updateName": "王林",
				"updateTime": "2019-11-25T07:04:06.000+0000",
				"updateTimeStr": "2019-11-25 15:04:06",
				"videoAttachId": null,
				"videoAttachName": null,
				"voiceAttachId": null,
				"voiceAttachName": null
			}]
		},
		{
			"sonModelName": "宏观策略",
			"listFir": [{
				"applyType": 0,
				"articleBelong": "4",
				"articleTime": "2019-11-25T00:00:00.000+0000",
				"author": "H011973",
				"content": null,
				"createId": "H011973",
				"createName": "王林",
				"createTime": "2019-11-25T07:03:25.000+0000",
				"createTimeStr": "2019-11-25 15:03:25",
				"externalUrl": null,
				"h5Title": null,
				"h5Type": null,
				"id": 27,
				"imageAttachId": null,
				"imageAttachName": null,
				"intro": "投资理财01",
				"isDelete": 0,
				"isUse": 1,
				"memo": null,
				"modelId": 22,
				"needLogin": null,
				"needRisk": null,
				"pubId": null,
				"pubName": null,
				"pubTime": null,
				"pubTimeStr": null,
				"seqNo": null,
				"source": null,
				"title": "投资理财",
				"updateId": "H011973",
				"updateName": "王林",
				"updateTime": "2019-11-25T07:04:06.000+0000",
				"updateTimeStr": "2019-11-25 15:04:06",
				"videoAttachId": null,
				"videoAttachName": null,
				"voiceAttachId": null,
				"voiceAttachName": null
			}]
		},
		{
			"sonModelName": "公募研究",
			"listFir": [{
				"applyType": 0,
				"articleBelong": "4",
				"articleTime": "2019-11-25T00:00:00.000+0000",
				"author": "H011973",
				"content": null,
				"createId": "H011973",
				"createName": "王林",
				"createTime": "2019-11-25T07:03:25.000+0000",
				"createTimeStr": "2019-11-25 15:03:25",
				"externalUrl": null,
				"h5Title": null,
				"h5Type": null,
				"id": 27,
				"imageAttachId": null,
				"imageAttachName": null,
				"intro": "投资理财01",
				"isDelete": 0,
				"isUse": 1,
				"memo": null,
				"modelId": 22,
				"needLogin": null,
				"needRisk": null,
				"pubId": null,
				"pubName": null,
				"pubTime": null,
				"pubTimeStr": null,
				"seqNo": null,
				"source": null,
				"title": "投资理财",
				"updateId": "H011973",
				"updateName": "王林",
				"updateTime": "2019-11-25T07:04:06.000+0000",
				"updateTimeStr": "2019-11-25 15:04:06",
				"videoAttachId": null,
				"videoAttachName": null,
				"voiceAttachId": null,
				"voiceAttachName": null
			}]
		}
	]
	},
	"status": "0000"
	// "data":null
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = data;
