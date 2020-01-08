/*
风险测评提交   接口模拟

*/

// 使用 Mock
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  'data':{
	 	"totalScore": "100",//问卷总分数
		"optionScore": "80",//得分
		"grade": "进取型",//风险等级
		"allowProduct": "成长级、平衡级、稳健级、保守级"//可购买的产品等级
	}
});



//根据传参数的不同进行处理

module.exports = data;