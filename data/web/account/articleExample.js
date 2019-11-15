//文章模板模拟数据
// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
	data: [{
		"id": null,
		"applyType": 0,
		"articleBelong": "1",
		"imageAttachId": "293",
		"title": "sdsdf",
		"intro": null,
		"author": "H016908",
		"source": null,
		"articleTime": null,
		"externalUrl": null,
		"videoAttachId": null,
		"voiceAttachId": null,
		"content": "<img src=\"../static/img/dachangtu.jpg\"/>",
		"seqNo": null
	},{
		"id": null,
		"applyType": 0,
		"articleBelong": "1",
		"imageAttachId": "293",
		"title": "sdsdf",
		"intro": null,
		"author": "H016908",
		"source": null,
		"articleTime": null,
		"externalUrl": null,
		"videoAttachId": null,
		"voiceAttachId": null,
		"content": "<p>< img src=\"/cms/attachment/download?id=292&show=1\"/></p >",
		"seqNo": null
	}],
	"message": "successful",
	"status": "0000"
});

module.exports = data;