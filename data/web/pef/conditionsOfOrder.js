


/*
  查询客户预约所需条件接口
*/

// 使用 Mock
var Mock = require('mockjs');
//  ========== 
//  conditionType 条件码(1 实名认证，2 完善基本信息，3 投资者分类认证，4 合格投资者认证，5 风险测评) 
//相关跳转1 认证中心2 信息补全3 专项风测4 投资者分类申请5 投资者分类结果页6 合格投资者申请7 合格投资者结果页 
//  ========== 
var data=Mock.mock({
	"hmac": "hmac", 
	"status": "0000", 
	"code": "CS0000", 
	"message": "处理成功！", 
	"data":[  
		{
		"conditionType": "1",//条件码（单位：万）
		"show": "0",//下限金额0否1是
		"statusDesc": "未实名",//状态描述
		"isSatisfied": "1",//是否满足
		"conditionJump": "1",//相关跳转
		"isPopup": "0",//是否弹框（普通投资者买私募产品售前告知书）
		},{
		"conditionType": "2",//条件码（单位：万）
		"show": "0",//下限金额0否1是
		"statusDesc": "风测已过期",//状态描述
		"isSatisfied": "1",//是否满足
		"conditionJump": "2",//相关跳转
		"isPopup": "0",//是否弹框（普通投资者买私募产品售前告知书）
		},{
		"conditionType": "3",//条件码（单位：万）
		"show": "0",//下限金额0否1是
		"statusDesc": "信息未完善",//状态描述
		"isSatisfied": "1",//是否满足
		"conditionJump": "3",//相关跳转
		"isPopup": "19",//是否弹框（普通投资者买私募产品售前告知书）
		},{
		"conditionType": "4",//条件码（单位：万）
		"show": "0",//下限金额0否1是
		"statusDesc": "未实名",//状态描述
		"isSatisfied": "1",//是否满足
		"conditionJump": "4",//相关跳转
		"isPopup": "0",//是否弹框（普通投资者买私募产品售前告知书）
		},{
		"conditionType": "5",//条件码（单位：万）
		"show": "0",//下限金额0否1是
		"statusDesc": "未实名",//状态描述
		"isSatisfied": "1",//是否满足
		"conditionJump": "5",//相关跳转
		"isPopup": "0",//是否弹框（普通投资者买私募产品售前告知书）
		}
	]
});

module.exports=data;
