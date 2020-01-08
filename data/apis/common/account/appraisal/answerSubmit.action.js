/*
	风险评测提交
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "查询问卷结果信息成功", 
	"data": { 
		"totalScore": "100", 
		"optionScore": "56", 
		"grade": "平衡型", 
		"allowProduct": "平衡级、稳健级、保守级" 
	} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;