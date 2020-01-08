/*
	合格投资者认证 接口模拟
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    "data":{
	    "auditResult|1": ["0","1","2","3","4","5"],//审核结果状态【参照备注】
		"auditResultDic": "",//审核结果状态字典值
		"retReason": "sjkldjlakjdldjld",//驳回原因
		"proveValidDate": "2016-11-07" //合格投资者认定有效期
	}    
  });
module.exports=mymessage;