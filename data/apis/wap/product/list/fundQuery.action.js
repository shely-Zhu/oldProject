/*
  私募产品列表接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data":{ 
		"pageItems": { 
			"totalCount": "100",//总记录数 
			"totalPages": "10"//总页数 
		}, 
		"pageList|2": [{ 
			"fundName": "恒天融泽恒信跨境双享三期私募投资基金",//产品名称
			"fundCode":"000103",//产品代码
			"projectCode": "",//项目代码 
			"projectName": "",//项目名称 
			"saleProjectName": "恒天融泽恒信跨境双享三期私募投资基金",//营销项目名称
			"saleProStatus": "", //营销项目状态【1.待发行；2.发行中；3.发行结束】
			"fundStatus": "", //产品最新状态【参照备注】
			"issueDate": "",//发行日期【yyyy-MM-dd】
			"issueEndDate": "",//发行结束日期【yyyy-MM-dd】
			"issueScale": "",//发行规模ss
			"managerName": "",//管理人名称
			"mandatorType": "",//产品供应商类型
			"personMinBalance": "100",//个人起投金额
			"deadlineMin": "12",//投资期限 最小值
			"riskLevel": "",//产品风险等级
			"riskLevelOri": "",//产品风险等级原值
			"investDirection": "" ,//产品投向
			"bonusType": "" ,//收益分配类型
			"bonusTypeOri": "3" ,//收益分配类型原值【1-实际收益 2-类固收 3-浮收】
			"expectedProfitMin": "7.2" ,//最低预期收益率【百分比】
			"expectedProfitMax": "7.8" ,//最高预期收益率【百分比】
			"netValue": "1.0001" ,//最新产品净值
			"netValueDate": "2016-01-12" ,//最新产品净值日期
			"prodTerm" : "8",
			"features":"这是产品特点标签"
			}] 
	} 
});
module.exports=data;
