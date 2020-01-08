/*
  私募产品详情列表接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({ 
	"hmac": "hmac",   
	"status": "0", 
	"code": "CS0000",  
	"msg": "处理成功！", 
	"data":{  
		"productName": "稳金1号",//产品名称
		"projectName": "稳金1号",//项目名称
		"issueScale": "1000",//产品发行规模（单位：万）
		"personMinBalance": "100",//个人起投金额（单位：万）
		"prodTerm": "12",//产品期限（单位：个月）
		"issueDate": "2016/01/12",//募集开始日期【yyyy/MM/dd】
		"issueEndDate": "2017/03/12",//募集结束日期【yyyy/MM/dd】
		"riskLevel": "成长级",//产品风险级别
		"riskLevelOri": "2",//产品风险级别【原值】
		"productStatus": "1",//产品状态【参照备注】
		"orderBalance": "100",//预约金额（单位：万）
		"orderNo": "12232356576767",//预约编号
		"orderStatus": "2",//预约状态
		"orderTime": "2016-12-12",//预约日期
		"riskDisclosure": "12",//风险提示书id
		"managerName": "北京中岩投资管理有限公司",//管理机构
		"bonusType": "类固收",//收益分配方式
		"bonusTypeOri": "3",//收益分配方式【原值 2.类固收 3.浮收】
		"reserveBaseBalance": "10",//递增金额（单位：万）
		"userName": "张三",//用户姓名（未实名认证则返回手机号）
		"custType": "1",//用户类型（1. 个人 0.机构）
		"expectedProfitMin": "7.2",//最低预期收益率【百分比】
		"expectedProfitMax": "7.8",//最高预期收益率【百分比】
		"isCertification": "2",//是否实名认证【1.否 2.是】
		"isInvestClassifyRequired" : "2" , //是否需要判断投资者分类标签
"forElecContract":0, //是否适用于电子合同【0.否 1.是】（新增字段）
        "netValue": "1", //产品净值（单位：元）
        "netValDate": "2016-12-12", //净值日期【yyyy-MM-dd】
	}	
});
module.exports=data;