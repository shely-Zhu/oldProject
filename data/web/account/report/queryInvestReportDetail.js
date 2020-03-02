/*
	月度报告明细
 */


// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
	"hmac": "hmac",
	"status": "0000",
	"code": "CS0000",
	"msg": "处理成功",
	"data": {
		"content": '斯洛伐克里是否考试的',  //市场宏观分析（富文本）
		"month":'2019年5月',   //月份（格式：2019年5月）
		"reportName":'2019年4月份报告',   //报告名称
		// "reportTime":'2019-05-31 18:00',  // 报告日期（yyyy-MM-dd HH:mm）
		"reportTime":'2020年1月30日',  // 报告日期（yyyy-MM-dd HH:mm）
		"lifeTerm":'家庭成长期 ',  // 生命周期（单身期，家庭形成期，家庭成长期 家庭成熟期 老年期）
		"riskLevel": '保守型',  // 风险等级（保守型，稳健型，平衡型，成长型，进取型）
	}
});


module.exports = data;