/*
	我的资产 饼图 接口模拟
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
		"msg": "处理成功！",
		"data":{
     	"allTotalAssets": "10234,000.556",//所有类型总和资产【单位：万元】
    }
  });
module.exports=mymessage;