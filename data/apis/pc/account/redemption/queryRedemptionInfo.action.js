/*
	持仓明细 赎回区域  初始数据
 */


// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac", 
	"status": "0", 
	"code": "", 
	"msg": "处理成功！", 
	"data":{
		"managerName": "恒天瑞泽资产管理有限公司", //管理人名称
		 "productName": "恒天稳金26号投资基金（新认购）", //产品名称
		"totalShare": "100,000,000,000.0000", //可赎回份额
		 "custName": "张三", //客户名称
		 "maskCertNo": "123****567" ,//证件号码【已加*处理】
		 "linkPhone": '18919181924' //联系人手机号
	}
  });


module.exports=data;