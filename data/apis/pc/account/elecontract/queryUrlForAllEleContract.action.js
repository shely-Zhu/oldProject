/*
	电子合同查询   接口模拟
*/

// 使用 Mock
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({ 
   "hmac": "hmac",//预留的加密信息 
   "status": "0",// “0”是“查询成功”；“1”是“查询失败”； 
   "code": "CS0000",// "CF0001" 操作失败；"CS0000" 操作成功； 
   "msg": "处理成功",// "处理成功"；"操作失败" 
   "data":{
  	"transactionNo": "12345678",//交易流水号【预留字段】
  	"signUrl": "http://210.21.237.135:27020/TgfwzxdzhtController/fetchSignContractList",//电子合同查询页面URL
	  "signTip": "32545656",//登录标识
  }
});


module.exports = data;