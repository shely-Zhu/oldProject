/*
  交易列表接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
	"status": "0000",
	"message": "操作成功",
	"data":[
	{
		"fundStatus":"",// 基金认申购状态
		"onwayAssetTotal":"0.00",//在途金额（待确认金额）
		"fundCode": "003075", 
		"isFixFlag":"1",
		"fundName": "中融货币E",
		"totalMoney":"1059170.16",// 基金总资产 
		"totalMoneyMask":"6,878,075.99",//基金总资产千分位展示
		"income":"30.89",//基金昨日收益  
		"incomeMask":"21.65",//基金昨日收益千分位展示 
		"addupIncome":"115.80", // 基金持有收益 
		"addupIncomeMask":"2,174.89",//基金持有收益千分位展示  
		"addupIncomeRat":"5.8", // 基金持有收益率(%)
		"enableShares":"1059170.16",// 可用份额 
		"currentShare":"1059170.16",// 持有份额
		"nav":"1059170.16",// 最新净值
		"dayChgRat":"1059170.16",// 日涨幅
		"sevenDayYield":"4.12",//七日年化收益率
		"invTypCom":"10200",//基金类型
		"inTransitNum":"0", // 待确认交易笔数
		"trDate":"2018-04-08", //净值日期
		"unitYld":"1.20",//万份收益 
		"tradeNo":"",// 交易账号 
		"bankAccount":"",// 银行账户 
		"bankIdNo":"",// 银行编号 
		"bankName":"",//银行名称
		"riskLevel":"",//基金风险等级
		"riskLevelName":"",//基金风险等级名称
		"invTypComDesc":"混合型",//基金类型描述
		"capitalMode":"M",//资金方式
		"enMinshare":"",//最低持有份额
		"estimateArrivalDate":"",//资预估到账日期
		"bankLogoUrl":"",//银行logo
		"bankThumbnailUrl":"",//银行缩略图
		"shareType":"",//前后端收费方式 
		"canBeSpentMsg":"提示：该基金资产可用于购买其他基金产品 ", //支持货基购基提示文案
		"holdIncome":0.2514,//持有收益
		"holdIncomeMask":0.54564,// 持有收益千分位
		"isShowDivideMsg":0, //0否1是(是否显示分红文案)
		"divideMsg":"最近有分红",
		"isBuyFlag":0,//是否可购买(0否1是) int类型
		"isRedemptionFlag":1, //是否可赎回(0否1是) int 类型
		"isFixFlag":1,//是否可定投(0否1是) int 类型
		"canBeSpent":"0",//支持货基购基  0为支持  1为不支持
		"g2gestimateArrivalDate":"12-14 周四 15：00之前 ", //赎回到货基 预估到账时间 （到货基持仓的时间）
		"tradeLimitList":[{
			"fundBusinCode":"024",//业务类型 024-赎回 
			"minValue":"",//首次最低 
			"maxValue":"",//最高 
			"secondMin":"",//追加最低 
		}] //限额列表
	}
]
});

module.exports=data;