/*
 * @page: 基金详情-查询
 * @Author: zhangyanping
 * @Last Modified time: 2019-12-16 15:27:45
 * 
 */


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    "hmac": "hmac", 
    "status": "0000", 
    "code": "CS0000", 
    "msg": "处理成功！", 
    "data": {
    	"secuId":419752,//基金编码
        "trdCode":"001753",//基金交易代码
        "chiName":"红土创新新兴产业灵活配置混合型证券投资基金",//基金中文名称
        "secuSht":"红土创新新兴产业灵活配置混合",//基金简称
        "fundManager":"张倩",//基金经理
        "fmcComName":"红土创新基金管理有限公司",//基金管理公司
        "custComName":"中国建设银行股份有限公司",//基金托管人
        "purSt":"1",//申购状态(0暂停申购，1正常申购，空代表未开放申赎 )
        "redemSt":"1",//赎回状态(0暂停申购，1正常申购，空代表未开放申赎 )
        "redemptionTime":"2",//基金赎回时长
        "isQDII":"0",//是否QDII(0是QDII)
        "invTypCom":10400,//基金投资类型编码
        "invTypComDesc":"混合型",//基金投资类型描述
        "trDate":"2018-04-15",//交易日期（净值日期）
        "unitNav":0.907,//份额净值
        "chgRat1d":-1.002227,//日涨跌幅(日收益率)
        "chgRat1w":0.777778,
        "chgRat1m":-2.577873,
        "chgRat3m":-4.526316,
        "chgRat6m":-4.726891,
        "chgRat1y":2.951192,
        "chgRat2y":5.957944,
        "chgRat3y":0,
        "chgRat5y":0,
        "chgRat10y":0,
        "chgRatBgn":-9.3,
        "chgRat1dRk":131,
        "chgRat1wRk":316,
        "chgRat1mRk":1543,
        "chgRat3mRk":1417,
        "chgRat6mRk":1785,
        'discountRate': '24.00',
        "chgRat1yRk":1375,
        "chgRat2yRk":817,
        "chgRat3yRk":0,
        "chgRat5yRk":0,
        "chgRat10yRk":0,
        "chgRatBgnRk":1895,
        "cashTreasure":"0",//现金宝标志(1:是现金宝，0：不是现金宝)
        "managementFee":"",//管理费率
        "custodyFee":"",//托管费率
        "salesFee":"",//销售费率
        "unitYld":0,//每万份基金单位当日收益
        "annYldRat":0,//最近7日折算年收益率
        "riskLevel":"3",//基金风险等级
        "riskLevelName":"中等风险",//基金风险等级名称
        "fundStatus":"0",//基金状态
        "purchaseRate":"1.5",//购买费率
        "discount":"10.0",//折扣率
        "redemptionRate":"",//赎回费率
        "minHoldVol":"500.00",//最低持有份额
        "fundConfirmDate":"2018-04-18", //份额确认日期
        "fundEarnDate":"2018-04-19", //查看盈亏日期
        "issBgnDt":"2018-04-08",//募集起始日期
        "issEndDt":"2020-01-16",//募集截止日期
		"endDtBefore":"2018-08-07",//募集截止日期的上一个工作日
        "applyDate":"2018-07-12",//申请日期
        "purchaseConfirmDay":"2",// 申购确认天数
        "lookEarnDay":"2", //查看盈亏天数
        "redeemConfirmDay":"2",// 赎回确认天数
        "redeemToBank":"3",// 赎回到银行卡天数
        "supportFixedFlag":true, //手否支持定投标识 true 支持,false不支持 
		"nowConfirmDate":"2018-04-19", //前自然日时间的 确认日期
		"g2gnowConfirmDate":"2018-04-19", //公转公前自然日时间的 确认日期
		"after15tradeDate":"2018-04-19", //当前自然日15点之后 所属交易日 
		"g2gafter15tradeDate":"2018-04-19", //公转公当前自然日15点之后 所属交易日
        "before15confirmDate":"yyyy-MM-dd",  //15点之前的确认日期 
        "fundPurchaseFeeRate": {//基金认/申购费率信息
			"totalCount":0,
			"operationType":null,
			"managementFee":null,
			"custodyFee":null,
			"salesFee":null,
			"redeemTime":null,
			"detailList": [{
			"conditions": "100万元≤金额<300万元",
			"fundFeeRate": "0.50%",
			"feeCalcMed": "2", //计算方式(1是固定费用，2是固定费率),
			"maxValue": "300",
			"minValue": "",
			"maxRate":"0.500"
			},{
			 "conditions": "500万元≤金额",
			 "fundFeeRate": "每笔1,000.00元",
			 "feeCalcMed": "1" ,//计算方式(1是固定费用，2是固定费率),
			 "maxValue": "",
			 "minValue": "500",
			 "maxRate":"1000"
			}]
        },
        "fundRedeemFeeRate": {//基金赎回费率信息
			"totalCount":0,
			"operationType":null,
			"managementFee":null,
			"custodyFee":null,
			"salesFee":null,
			"redeemTime":null,
			"detailList": [{
				"conditions": "0天<持有时长<7天",
				"fundFeeRate": "1.50%",
				"feeCalcMed": "2" //计算方式(1是固定费用，2是固定费率)
			}]
			},
        "tradeLimitList": [ //交易限制信息
            {
                "errorCode":"",
                "errorInfo":"",
                "successType":"0", //成功标志
                "fundCode":"001753", //基金代码
                "shareType":"", //份额类型
                "custType":"1", //客户类型
                "maxValue":"999999999999.00", // 首次最高
                "secondMin":"1000.00", //追加最低
                "minValue":"1000.00", //首次最低
                "fundBusinCode":"022", //业务代码
                "trustWay":"", //委托方式
                "capitalMode":"", //资金方式
                "forbidFlag":"", //业务禁止方式
                "totalCount":"1", //总记录数
                "rowcount":"1" //记录数
            }
        ]
    }
});

module.exports = data;
