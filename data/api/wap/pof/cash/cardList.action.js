/*
	恒添宝银行卡列表
	*/

// 使用 Mock
var Mock = require('mockjs');

var bankList = Mock.mock({
	"hmac":"hmac",//预留字段
	"status":"0",//"0"是查询成功;"1"是查询失败;
	"code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
	"msg":"success",//返回提示信息
	"data":[
		{
			"accountName":"汤俊民",//银行户名
			"bankNo":"005",//银行代码
			"bankAccount":"6217000010067046220",//银行账号
			"bankAccountMask":"**** **** **** 6220",//银行账号加星
			"bankName":"建设银行1",//所属银行名称
			"tradeAccountList":[
				{
					"tradeAcco":"00999000000006842",//交易账号
					"capitalMode":"M",//资金方式
					"transAcctStatus":"0",//交易账号状态
					"tradeSource":"000000150001"//交易来源，判断现金宝账号
				},
			],	
			"tradeAcco":"00999000000006842",//交易账号
			"capitalMode":"M",//资金方式
			"singleNum":"200000", //单笔限额数值
			"singleNumMask":"2,000000", //单笔限额数值
			"oneDayNum":"300000000",//单日限额数值
			"oneDayNumMask":"30,000",//单日限额数值
			"oneMonthNum":"5000000",//单月限额数值
			"tradeSource":"000000150001",//交易来源，判断现金宝账号
			"availableShare":"100000",//现金宝实际可赎回份额
			"availableShareMask":"100,000",//现金宝实际可赎回份额,千分位
			"idNoType":"0",//证件类型
			"idNo":"330302196308124863", //证件号
			"show":true//是否需要显示
		},
		// {
		// 	"accountName":"汤俊民",//银行户名
		// 	"bankNo":"005",//银行代码
		// 	"bankAccount":"6217000010067040000",//银行账号
		// 	"bankAccountMask":"**** **** **** 6220",//银行账号加星
		// 	"bankName":"建设银行2",//所属银行名称
		// 	"tradeAccountList":[
		// 		{
		// 			"tradeAcco":"00999000000006842",//交易账号
		// 			"capitalMode":"M",//资金方式
		// 			"transAcctStatus":"0",//交易账号状态
		// 			"tradeSource":"000000150001"//交易来源，判断现金宝账号
		// 		},
		// 	],	
		// 	"tradeAcco":"00999000000006842",//交易账号
		// 	"capitalMode":"3",//资金方式
		// 	"singleNum":"30000", //单笔限额数值
		// 	"singleNumMask":"30,000", //单笔限额数值
		// 	"oneDayNum":"20000",//单日限额数值
		// 	"oneDayNumMask":"30,000",//单日限额数值
		// 	"oneMonthNum":"5000000",//单月限额数值
		// 	"tradeSource":"000000150001",//交易来源，判断现金宝账号
		// 	"availableShare":"20000",//现金宝实际可赎回份额
		// 	"availableShareMask":"20,000",//现金宝实际可赎回份额,千分位
		// 	"idNoType":"0",//证件类型
		// 	"idNo":"330302196308124863", //证件号
		// 	"show":true//是否需要显示
		// },
		// {
		// 	"accountName":"汤俊民",//银行户名
		// 	"bankNo":"005",//银行代码
		// 	"bankAccount":"6217000010067040000",//银行账号
		// 	"bankAccountMask":"**** **** **** 6220",//银行账号加星
		// 	"bankName":"建设银行3",//所属银行名称
		// 	"tradeAccountList":[
		// 		{
		// 			"tradeAcco":"00999000000006842",//交易账号
		// 			"capitalMode":"M",//资金方式
		// 			"transAcctStatus":"0",//交易账号状态
		// 			"tradeSource":"000000150001"//交易来源，判断现金宝账号
		// 		},
		// 	],	
		// 	"tradeAcco":"00999000000006842",//交易账号
		// 	"capitalMode":"3",//资金方式
		// 	"singleNum":"100000", //单笔限额数值
		// 	"oneDayNum":"80000",//单日限额数值
		// 	"oneMonthNum":"5000000",//单月限额数值
		// 	"tradeSource":"000000150001",//交易来源，判断现金宝账号
		// 	"availableShare":"80000",//现金宝实际可赎回份额
		// 	"availableShareMask":"80,000",//现金宝实际可赎回份额
		// 	"idNoType":"0",//证件类型
		// 	"idNo":"330302196308124863", //证件号
		// 	"show":true//是否需要显示
		// },
		// {
		// 	"accountName":"汤俊民",//银行户名
		// 	"bankNo":"005",//银行代码
		// 	"bankAccount":"6217000010067040000",//银行账号
		// 	"bankAccountMask":"**** **** **** 6220",//银行账号加星
		// 	"bankName":"建设银行4",//所属银行名称
		// 	"tradeAccountList":[
		// 		{
		// 			"tradeAcco":"00999000000006842",//交易账号
		// 			"capitalMode":"M",//资金方式
		// 			"transAcctStatus":"0",//交易账号状态
		// 			"tradeSource":"000000150001"//交易来源，判断现金宝账号
		// 		},
		// 	],	
		// 	"tradeAcco":"00999000000006842",//交易账号
		// 	"capitalMode":"M",//资金方式
		// 	"singleNum":"9000", //单笔限额数值
		// 	"oneDayNum":"200990",//单日限额数值
		// 	"oneMonthNum":"5000000",//单月限额数值
		// 	"tradeSource":"000000150001",//交易来源，判断现金宝账号
		// 	"availableShare":"200990",//现金宝实际可赎回份额
		// 	"availableShareMask":"200,990",//现金宝实际可赎回份额
		// 	"idNoType":"0",//证件类型
		// 	"idNo":"330302196308124863", //证件号
		// 	"show":true//是否需要显示
		// },
		// {
		// 	"accountName":"汤俊民",//银行户名
		// 	"bankNo":"005",//银行代码
		// 	"bankAccount":"6217000010067040000",//银行账号
		// 	"bankAccountMask":"**** **** **** 6220",//银行账号加星
		// 	"bankName":"建设银行5",//所属银行名称
		// 	"tradeAccountList":[
		// 		{
		// 			"tradeAcco":"00999000000006842",//交易账号
		// 			"capitalMode":"M",//资金方式
		// 			"transAcctStatus":"0",//交易账号状态
		// 			"tradeSource":"000000150001"//交易来源，判断现金宝账号
		// 		},
		// 	],	
		// 	"tradeAcco":"00999000000006842",//交易账号
		// 	"capitalMode":"M",//资金方式
		// 	"singleNum":"500000", //单笔限额数值
		// 	"oneDayNum":"2000000",//单日限额数值
		// 	"oneMonthNum":"5000000",//单月限额数值
		// 	"tradeSource":"000000150001",//交易来源，判断现金宝账号
		// 	"availableShare":"9000000",//现金宝实际可赎回份额
		// 	"availableShareMask":"9,000,000",//现金宝实际可赎回份额
		// 	"idNoType":"0",//证件类型
		// 	"idNo":"330302196308124863", //证件号
		// 	"show":true//是否需要显示
		// },
		// {
		// 	"accountName":"汤俊民",//银行户名
		// 	"bankNo":"005",//银行代码
		// 	"bankAccount":"6217000010067040000",//银行账号
		// 	"bankAccountMask":"**** **** **** 6220",//银行账号加星
		// 	"bankName":"建设银行6",//所属银行名称
		// 	"tradeAccountList":[
		// 		{
		// 			"tradeAcco":"00999000000006842",//交易账号
		// 			"capitalMode":"M",//资金方式
		// 			"transAcctStatus":"0",//交易账号状态
		// 			"tradeSource":"000000150001"//交易来源，判断现金宝账号
		// 		},
		// 	],	
		// 	"tradeAcco":"00999000000006842",//交易账号
		// 	"capitalMode":"M",//资金方式
		// 	"singleNum":"500000", //单笔限额数值
		// 	"oneDayNum":"90000",//单日限额数值
		// 	"oneMonthNum":"5000000",//单月限额数值
		// 	"tradeSource":"000000150001",//交易来源，判断现金宝账号
		// 	"availableShare":"870000",//现金宝实际可赎回份额
		// 	"availableShareMask":"870,000",//现金宝实际可赎回份额
		// 	"idNoType":"0",//证件类型
		// 	"idNo":"330302196308124863", //证件号
		// 	"show":true//是否需要显示
		// },
	]
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = bankList;