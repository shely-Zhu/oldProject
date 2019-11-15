/*
 * @page: 模拟登录日志查询
 * @Date:   2019-11-12
 * @Last Modified by:   Caiwenqi
 * @Last Modified time: 2018-09-25 15:27:45
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({
	"data": {
		"pages": 10,
		"total": 100,
		"dataList": [{
			"data": "2019-11-11",
			"list": [{
				"type": 1,
				"channel": 0,
				"userAgent": "MI note1",
				"clientIp": "182.50.117.176",
				"createTime": "16:22:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "北京市"
			}, {
				"type": 1,
				"channel": 1,
				"userAgent": "MI note2",
				"clientIp": "182.50.117.176",
				"createTime": "16:22:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "北京市"
			}, {
				"type": 1,
				"channel": 1,
				"userAgent": "MI note3",
				"clientIp": "182.50.117.176",
				"createTime": "16:22:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "北京市"
			}]
		},{
			"data": "2019-12-13",
			"list": [{
				"type": 1,
				"channel": 0,
				"userAgent": "MI note1",
				"clientIp": "182.50.117.176",
				"createTime": "16:22:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "上海"
			}, {
				"type": 1,
				"channel": 1,
				"userAgent": "oppo",
				"clientIp": "182.50.117.176",
				"createTime": "16:33:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "南京"
			}, {
				"type": 1,
				"channel": 1,
				"userAgent": "MI note3",
				"clientIp": "182.50.117.176",
				"createTime": "16:22:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "北京市"
			}]
		},{
			"data": "2019-12-13",
			"list": [{
				"type": 1,
				"channel": 0,
				"userAgent": "MI note1",
				"clientIp": "182.50.117.176",
				"createTime": "16:22:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "上海"
			}, {
				"type": 1,
				"channel": 1,
				"userAgent": "oppo",
				"clientIp": "182.50.117.176",
				"createTime": "16:33:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "南京"
			}, {
				"type": 1,
				"channel": 1,
				"userAgent": "MI note3",
				"clientIp": "182.50.117.176",
				"createTime": "16:22:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "北京市"
			}]
		},{
			"data": "2019-12-13",
			"list": [{
				"type": 1,
				"channel": 0,
				"userAgent": "MI note1",
				"clientIp": "182.50.117.176",
				"createTime": "16:22:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "上海"
			}, {
				"type": 1,
				"channel": 1,
				"userAgent": "oppo",
				"clientIp": "182.50.117.176",
				"createTime": "16:33:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "南京"
			}, {
				"type": 1,
				"channel": 1,
				"userAgent": "MI note3",
				"clientIp": "182.50.117.176",
				"createTime": "16:22:46",
				"typeDes": 1,
				"channelDes": 0,
				"ipArea": "北京市"
			}]
		}
		]
	},
	"message": "successful",
	"status": "0000"
});

module.exports = data;