/*
	成长值
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
		"data": {
		"empName": "陈珂",
		"customerName": "陈珂",
		"sex": "女士",
		"telephone": "13295007447",
		"email": "chenke@chtwm.com",
		"reportDate": "2019年07月26日",
		"assetClass": "3900.00万元",
		"assetClassRange": "3000万-1亿元",
		"lifeCycle": "家庭成熟期",
		"lifeTermContent": "家庭成熟期：子女完成学业至夫妻退休的阶段，家庭的经济状况达到高峰，债务逐渐减轻；或无子女，但夫妻二人自身的工作能力、工作经验、经济状况都达到高峰状态，债务状况减轻。",
		"investmentType": "成长型",
		"riskTypeContent": "成长型：可以承担一定的风险，希望可以获得较高的投资收益，是风险偏好者；可以配置中等偏高风险及更低风险的产品。",
		"macroEconomyContent": "<p><!--[if gte mso 9]><xml>",
		"assetConfigReportProduct": {
		"titles": [
		"资产分类",
		"投资比例",
		"投资金额（万元）",
		"资产类别",
		"产品类型",
		"产品类别",
		// "产品名称",
		// "金额（万元）",
		"配置比例"
		],
		"hwTitles": [
		"资产分类",
		"投资比例",
		"投资金额（万元美元）",
		"资产类别",
		"产品类型",
		"产品类别",
		// "产品名称",
		// "金额（万美元）",
		"配置比例"
		],
		"products": [
		{
		"cplb": "海外移民",
		"cplx": "移民",
		"cpmc": "资产配置0001",
		"je": "200",
		"pzbl": "20.00%",
		"tzbl": "26.00%",
		"tzje": "260",
		"zcfl": "保障型资产",
		"zclb": "海外产品"
		},
		{
		"cplb": "货币基金",
		"cplx": "标类固收",
		"cpmc": "0430收尾项目",
		"je": "120",
		"pzbl": "12.00%",
		"tzbl": "12.00%",
		"tzje": "120",
		"zcfl": "消费型资产",
		"zclb": "货币类基金",
		},
		{
		"cplb": "可转债",
		"cplx": "标类固收",
		"cpmc": "债权投资3号测试产品20190322",
		"je": "73",
		"pzbl": "7.30%",
		"tzbl": "47.30%",
		"tzje": "473",
		"zcfl": "保值型资产",
		"zclb": "固收投资产品"
		},
		{
		"cplb": "固收/类固收代销",
		"cplx": "非标固收",
		"cpmc": "123",
		"je": "300",
		"pzbl": "30.00%",
		"tzbl": "47.30%",
		"tzje": "473",
		"zcfl": "保值型资产",
		"zclb": "固收投资产品"
		},
		{
		"cplb": "定融",
		"cplx": "非标固收",
		"cpmc": "jmeter寤洪」鐩?",
		"je": "100",
		"pzbl": "10.00%",
		"tzbl": "47.30%",
		"tzje": "473",
		"zcfl": "保值型资产",
		"zclb": "固收投资产品"
		},
		{
		"cplb": "多策略产品",
		"cplx": "证券投资",
		"cpmc": "jmeter建项目",
		"je": "3",
		"pzbl": "0.30%",
		"tzbl": "10.30%",
		"tzje": "103",
		"zcfl": "增值型资产",
		"zclb": "浮收投资产品"
		},
		{
		"cplb": "股权母基金",
		"cplx": "股权投资",
		"cpmc": "测试0328",
		"je": "100",
		"pzbl": "10.00%",
		"tzbl": "10.30%",
		"tzje": "103",
		"zcfl": "增值型资产",
		"zclb": "浮收投资产品"
		},
		
		],
		"hwProducts": []
		}
		},
		"message": "查询成功",
		"status": "0000"
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;