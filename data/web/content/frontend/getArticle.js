//文章模板模拟数据
// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
	"data": {
		"data": {
			"applyType": 0,
			"isUse": 1,
			"externalUrl": "视频加i外部",
			"voiceAttachId": -1,
			"modelId": 22,
			"author": "视频加i外部",
			"isDelete": 0,
			"updateTime": 1573187965000,
			"source": "视频加i外部",
			"title": "视频加i外部",
			"videoAttachId": 213,
			"updateId": "H023512",
			"createTime": 1573087263000,
			"createId": "H023512",
			"intro": "视频加i外部",
			"articleBelong": "1",
			"id": 9,
			"h5Title":"模板qwe",//h5模板标题
			"h5Type":"1",//h5模板类型 1图片 2其他
			"videoAttachUrl": "http://172.16.163.99:85/group2/M00/02/8A/rBCjQ13DgFCAERifAAKKTERYCgk339.mp4",
			"createTimeStr": "2019-11-07 08:41:03",
			"updateTimeStr": "2019-11-08 12:39:25",
			"content|1":['<div class="itemCon"><div class="noticeTitle">活动通知</div><div class="noticeContent">“锦绣好礼，恒天赠送”，尊敬的客户：为了回888888888888888</div></div>'
			,'<img class="itemBadge" src="../../../about/static/img/appIndex/managementTeam.jpg" alt="">']
		},
		"message": "成功",
		"status": "0000",
		"total": null,
		"totalPage": null
	},
	"message": "操作成功！",
	"status": "0000"
});

module.exports = data;