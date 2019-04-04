/*
  私募产品详情列表接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({ 
	"hmac": "hmac",   
	"status": "0", 
	"code": "CS0000",  
	"message": "处理成功！", 
	"data":{  
		"projectId": "4234",//产品代码
		"productName": "稳金1号",//产品名称
		"projectName": "稳金1号",//项目名称
		"issuanceSize": "1000",//产品发行规模（单位：万）
		"investStart": "100",//个人起投金额（单位：万）
		"projectTerm": "12",//产品期限（单位：个月）
		"projectTermUnit": "12",//产品期限单位：个月
		"projectUpTime": "2016/01/12",//募集开始日期【yyyy/MM/dd】
		"projectDownTime": "2017/03/12",//募集结束日期【yyyy/MM/dd】
		"productRiskLevelDesc": "成长级",//产品风险级别描述
		"productRiskLevel": "2",//产品风险级别【原值】
		"productStatus": "1",//产品状态【参照备注】
		"reserveAmount": "100",//预约金额（单位：万）
		"reserveId": "12232356576767",//预约编号
		"reserveStatus": "2",//预约状态
		"reserveTime": "2016-12-12",//预约日期
		"riskDisclosure": "12",//风险提示书id
		"projectIssuer": "北京中岩投资管理有限公司",//管理机构
		"incomeModeDesc": "类固收",//收益分配方式
		"incomeMode": "3",//收益分配方式【原值 2.类固收 3.浮收】   收益分配方式 (0:代表原来的2 ;其它数字代表原来的3)
		"minBase": "10",//递增金额（单位：万）
		"userName": "张三",//用户姓名（未实名认证则返回手机号）
		"customerType": "0",//用户类型（1. 个人 0.机构）
		"businessCompareReferenceMin": "7.2",//最低预期收益率【百分比】
		"businessCompareReferenceMax": "7.8",//最高预期收益率【百分比】
		"isCertification": "2",//是否实名认证【1.否 2.是】   
		"isInvestClassifyRequired" : "2" , //是否需要判断投资者分类标签  【1.否 2.是】
		"unitNetValue" : "2211" , //最新净值
		"netValueDate" : "2019-09-09" , //最新净值日期
		"accuNetValue" : "286786" , //累计净值
		"isNewcomer" : "0" , //是否是新手推荐产品【0.否 1.是】
	}	
});
module.exports=data;