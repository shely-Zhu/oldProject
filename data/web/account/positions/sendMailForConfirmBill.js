


/*
	邮件发送电子确认单
	接口地址：http://192.168.6.105:8090/pages/viewpage.action?pageId=8715601#Web%E7%AB%AF%E6%8E%A5%E5%8F%A3-8%E3%80%81%E9%82%AE%E4%BB%B6%E5%8F%91%E9%80%81%E7%94%B5%E5%AD%90%E7%A1%AE%E8%AE%A4%E5%8D%95
	
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({ 
	"data":{
		
	},
    "message": "操作成功！",
    "status": "1", 
    "code": "CS0000", 
});

//把生成的假数据当做模块输出
module.exports = data;