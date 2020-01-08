/*
	风险评测结果
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data": { 
		totalScore:"100",//问卷总分数 
		optionScore:"80",//得分 
		grade:"进取型",//风险等级 
		allowProduct:"成长级、平衡级、稳健级、保守级",//可购买的产品等级 
		validDate:"2018.7.10",  //有效期(新增)
		description: "",//风险描述 
		isRiskExpired :"1", //风测是否过期 （0否 1 是）
	} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;