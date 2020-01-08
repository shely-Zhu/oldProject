// 使用 Mock
var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "success",
    "data": {
        "pageList":[ 
			{
				"msgId":"",//消息id
				"msgTitle":"预约活动",//消息主题 
				"msgContent":"消息内容消息内容消息内容",//消息内容 
				"msgDate":"",//消息时间【yyyy-MM-dd hh:mm:ss】
				"msgCode":"",//消息类型
			}, 

			], 
    }
});
module.exports = data;