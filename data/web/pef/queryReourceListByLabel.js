/*
    根据标签号查询产品材料
*/

// 使用 Mock
var Mock = require('mockjs');

var queryReourceListByLabel = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
		"fxjss":[{
			"fileName" : "111",
			"fileUrl" : "hththhthspod",
			"groupName" : "group1",
			"fileDate" : "2018-11-22",
		}
		],

    	"cpxx":[{
     		"fileName" : "222",
			"fileUrl" : "......",
			"groupName" : "group2",
			"fileDate" : "2018-11-22",
			}
		]

     }
});

/*标签名称对应编号：
风险揭示书 0 
产品信息 1
管理报告 2 
资金分配 3  
重要公告及通知 4
恒天简报 5
*/

//根据传参数的不同进行处理

module.exports = queryReourceListByLabel;