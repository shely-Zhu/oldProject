/*
  产品详情接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({ 
	"hmac": "hmac",   
	"status": "0000", 
	"code": "CS0000",  
	"message": "处理成功！", 
	"data":{  
		"projectId": "4234",//产品代码
		"productName": "稳金1号",//产品名称
		"projectName": "稳金1号",//项目名称
		"issuanceSize": "1000",//产品发行规模（单位：万）
		"formatIssuanceSize": "1000",  //产品发行规模（千分位）（单位：万）
		"investStart": "100",//个人起投金额（单位：万）
		"investAdd":"100",  // 个人追加起投金额（单位：万）
		"projectTerm": "12",//产品期限（单位：个月）
		"projectTermUnit": "12",//产品期限单位：个月
		"projectUpTime": "2016/01/12",//募集开始日期【yyyy/MM/dd】
		"projectDownTime": "",//募集结束日期【yyyy/MM/dd】
		"productRiskLevelDesc": "成长级",//产品风险级别描述
		"productRiskLevel": "2",//产品风险级别【原值】
		"productStatus": "1",//产品状态【参照备注】
		"projectStatus": "1",  //营销项目状态
		"reserveAmount": "100",//预约金额（单位：万）
		"reserveId": "12232356576767",//预约编号
		"reserveStatus": "2",//预约状态
		"reserveTime": "2016-12-12",//预约日期
		"riskDisclosure": "12",//风险提示书id
		"projectIssuer": "北京中岩投资管理有限公司",//管理机构
		"incomeModeDesc": "类固收",//收益分配方式
		"taFundCode": "1",   // 电子合同代码
		"incomeMode": "1",//收益分配方式【原值 2.类固收 3.浮收】   收益分配方式 (0:代表原来的2 ;其它数字代表原来的3)
		"minBase": "10",//递增金额（单位：万）
		"userName": "张三",//用户姓名（未实名认证则返回手机号）
		"customerType": "0",//用户类型（1. 个人 0.机构）
		"businessCompareReferenceMin": "7.2",//最低预期收益率【百分比】
		"businessCompareReferenceMax": "7.8",//最高预期收益率【百分比】
		"isCertification": "2",//是否实名认证【1.否 2.是】   
		"isInvestClassifyRequired" : "2" , //是否需要判断投资者分类标签  【1.否 2.是】
		"unitNetValue" : "5435354" , //最新净值
		"netValueDate" : "2019-09-09" , //最新净值日期
		"accuNetValue" : "286786" , //累计净值
		"isNewcomer" : "0" , //是否是新手推荐产品【0.否 1.是】
        "orderConditionEnum" : "" , //(1:私募合格投资者，2:资管合格投资者) 空没有标签
        "isElecContract": "1",  // 是否是电子合同产品【0.否 1.是】
        "isAllowAppend": "1",  //是否可以进行追加操作【0.否 1.是】
        "totalShare": "",  //持仓总份额 千分位展示
        "isRisk": "0",  //当前登录用户是否符合该产品的风险等级 -1：未知错误；0：符合；1：不符合 2：恒天财富不能直接预约产品
        "publicConvertPrivate": "1",  //是否允许公转私（0-否 1-是）
        "buyRate": "3",   //认申购费率（1表示1%）
        "projectSalesType": "0",  //0：稳金，1：代销，2：直销
        "investDirect": "2",  //0 债权投资;1 证券投资（二级市场）;2 股权投资;3 海外投资;4 其他
        "productCustomerRiskType": "1",  //产品对应客户风险等级类型：1-私募风险等级 2-专项风险等级
        "productRiskLimit": "0",  //是否启用风测限制【0：否，1：是】（V3.13.0）
        "productLightspot": "",  //一句话介绍（产品亮点）
        "projectLable":"",  //产品特点标签(‘|’拼接)
        "managementFee":"",   //管理费
        "trusteeFee": "",  //托管费
        "isVideo": "",  //是否需要面签 0否 1是
        "customerRiskLevel": "",   // 客户风险等级 (支持多个 ‘,’隔开 1:保守型;2:稳健型;3:平衡型;4:成长型;5:进取型)
        "customerRiskLevelDesc": "" ,  //客户风险等级描述 (支持多个 ‘,’隔开 1:保守型;2:稳健型;3:平衡型;4:成长型;5:进取型)
        "redemptionOpenFrequency": "",  // 赎回开放频率
        "surplusLevel": "",  //剩余额度

	}	
});
module.exports=data;