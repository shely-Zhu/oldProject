/*
 交易明细
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({    
	status:"0000",     
	message:"success", 
	data: {
		"generalModelInfoList": [//通用销售数据
			{
				"createTime": "20190619",//成立日期
				"fundCode": "100004",//产品编号
				"fundName": "普通货币型基金",//产品名称
				"totalAssets": 11.00//总资产
			}
		],
		"pefSaleInfoList": [//私募销售数据
			{
				"confirmDate": "2019-04-30",  //确认日期
				"confirmShare": "705.60", //确认份额
				"confirmValue": "705.60",  //确认金额
				"emp": "nullnull",  //理财师 姓名+工号
				"fundCode": "000847",   //产品编号
				"fundName": "中融货币A",   //产品名称
				"netValue": "1.00",  //成交净值
				"tradeType": "赎回"   //交易类型
			},{
				"confirmDate": "2019-04-30",  //确认日期
				"confirmShare": "705.60", //确认份额
				"confirmValue": "705.60",  //确认金额
				"emp": "nullnull",  //理财师 姓名+工号
				"fundCode": "000847",   //产品编号
				"fundName": "中融货币A",   //产品名称
				"netValue": "1.00",  //成交净值
				"tradeType": "赎回"   //交易类型
			},
			{
				"confirmDate": "2019-04-30",  //确认日期
				"confirmShare": "705.60", //确认份额
				"confirmValue": "705.60",  //确认金额
				"emp": "nullnull",  //理财师 姓名+工号
				"fundCode": "000847",   //产品编号
				"fundName": "中融货币A",   //产品名称
				"netValue": "1.00",  //成交净值
				"tradeType": "赎回"   //交易类型
			}

		],
		"pofInfoList":[{
				"confirmDate": "2019-04-30",  //确认日期
				"confirmShare": "705.60", //确认份额
				"confirmValue": "705.60",  //确认金额
				"emp": "nullnull",  //理财师 姓名+工号
				"fundCode": "000847",   //产品编号
				"fundName": "中融货币A",   //产品名称
				"netValue": "1.00",  //成交净值
				"tradeType": "赎回"   //交易类型
			},
			{
				"confirmDate": "2019-04-30",  //确认日期
				"confirmShare": "705.60", //确认份额
				"confirmValue": "705.60",  //确认金额
				"emp": "nullnull",  //理财师 姓名+工号
				"fundCode": "000847",   //产品编号
				"fundName": "中融货币A",   //产品名称
				"netValue": "1.00",  //成交净值
				"tradeType": "赎回"   //交易类型
			},
			{
				"confirmDate": "2019-04-30",  //确认日期
				"confirmShare": "705.60", //确认份额
				"confirmValue": "705.60",  //确认金额
				"emp": "nullnull",  //理财师 姓名+工号
				"fundCode": "000847",   //产品编号
				"fundName": "中融货币A",   //产品名称
				"netValue": "1.00",  //成交净值
				"tradeType": "赎回"   //交易类型
			},
		]

	}
});

module.exports=data;