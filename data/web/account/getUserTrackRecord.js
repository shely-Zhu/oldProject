/*
 * @page: 模拟登录日志查询
 * @Date:   2019-11-12
 * @Last Modified by: sunfuping
 * @Last Modified time: 2019-12-27 19:23:00
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({
	"data": {
		"endRow": 10,
		"firstPage": 0,
		"hasNextPage": true,
		"hasPreviousPage": false,
		"isFirstPage": true,
		"isLastPage": false,
		"lastPage": 0,
		"list": [
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:20:24", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:19:59", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:19:37", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:19:26", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:15:59", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:14:13", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:14:11", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:14:07", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:11:03", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:10:58", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-22 16:14:11", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-22 16:14:07", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-22 16:11:03", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-22 16:10:58", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:20:24", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:19:59", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:19:37", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:19:26", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:15:59", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:14:13", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:14:11", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:14:07", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:11:03", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-21 16:10:58", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-22 16:14:11", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-22 16:14:07", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-22 16:11:03", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" },
			{ "channel": 2, "channelDes": "ANDROID", "clientIp": "172.16.187.77", "createTime": "2019-11-22 16:10:58", "customerNo": 264801, "deviceId": "864684039820036", "ipArea": "局域网", "netType": "", "sysFrom": 1, "type": 1, "typeDes": "登录", "userAgent": "Android客户端" }
		],
		"navigateFirstPage": 0,
		"navigateLastPage": 0,
		"navigatePages": 8,
		"navigatepageNums": [1, 2, 3, 4, 5, 6, 7, 8],
		"nextPage": 2,
		"pageNum": 1,
		"pageSize": 10,
		"pages": 17,
		"prePage": 0,
		"size": 10,
		"startRow": 1,
		"total": 166
	},
	"message": "操作成功！",
	"status": "0000"
});

module.exports = data;