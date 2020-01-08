/*
	公募--基金列表
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "接口请求失败", 
	"data": { 

		"pageList|10":[
		{
			"secuSht":"汇添富收益快线货币A发的实得分实得分阿萨德飞 ",//基金名称
			"trdCode":"519888",//基金代码
			"unitNav":"0.010",//最新净值(元)
			"trdDt":"2016-11-04",//最新净值的更新时间
			"oneMonthGains":"0.21",//近一个月涨幅
			"threeMonthGains":"0.54",//近三个月涨幅
			"sixMonthGains":"1.06",//近六个月涨幅
			"oneYearGains":"2.16",//近一年涨幅
			"sinceThisYearGains":"1.81",//今年以来涨幅
			"sevenDayYield":"2.1420",//七日年化收益率
			"tenThousandEarnings":"0.5587",//万分收益(元)
			"invTypCom":"10300",//基金类型
			"fmcComId":"161518",//基金公司
			"oneDayGains":"--"//日涨幅
		},
		{
			"secuSht":"13423423sdfa其柔和的是发的说法阿萨德飞",//基金名称
			"trdCode":"519888",//基金代码
			"unitNav":"0.010",//最新净值(元)
			"trdDt":"2016-11-04",//最新净值的更新时间
			"oneMonthGains":"0.21",//近一个月涨幅
			"threeMonthGains":"0.54",//近三个月涨幅
			"sixMonthGains":"1.06",//近六个月涨幅
			"oneYearGains":"2.16",//近一年涨幅
			"sinceThisYearGains":"1.81",//今年以来涨幅
			"sevenDayYield":"2.1420",//七日年化收益率
			"tenThousandEarnings":"0.5587",//万分收益(元)
			"invTypCom":"10300",//基金类型
			"fmcComId":"161518",//基金公司
			"oneDayGains":"-0.01"//日涨幅
		}],

		"pageItems":{
			"slider":[1],//页码条
			"hasPrePage":false,//是否有上一页
			"startRow":1,//开始行目数
			"offset":0,//历史条数
			"lastPage":true,//当前是否为尾页
			"prePage":1,//上一页码
			"hasNextPage":false,//是否有下一页
			"nextPage":1,//下一页码
			"endRow":1,//结尾行条目数
			"totalCount":1,//总条数
			"firstPage":true,//当前是否为首页
			"totalPages":1,//总页数
			"limit":10,//当前页显示条数
			"page":1//当前页码
		}

	} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;