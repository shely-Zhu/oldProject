/*
	产品推荐
*/

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data": { 
		list:[{ 
			groupType:"",//产品类别 
			recommend:"打新基金",//产品推荐文案 
			name:"恒天财富私募投资基金稳金5号",//产品名称
			code:"00001",//产品代码 
			imgUrl:"../static/img/light.png",//产品图片
			serialNumber:"",//排列序号
			pofType:"",//公募产品类型
			pofGains:"",//公募近一年收益（%）
			productFeature:"贝尔的几乎记得回家哈家伙点击和建华大街话等级环境的话等级的和丁俊晖记得接口的极度空间店健康的健康健康的健康的接口对接",//产品亮点标签（“两网合一”新增字段）
			pofType: null,//公募产品类型
			pofGains: -2.32,//公募近一年收益（%）
			pefType: "2",//私募收益类型
			pefTerm: "3",//私募投资期限（月）
			pefMinBalance: "100",//私募起投金额（万元）
			pefExpectedProfitMin: "6.02",//私募固收预期最低
			pefExpectedProfitMax: "6.50",//私募固收预期最高
			pefCloseDay: "3",//封闭期（月）
			pefNetValue: "1.4552",//私募浮收净值
			pefNetValueDate: "04-22"//私募浮收净值日期
		}], 
	} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;