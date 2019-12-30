/*
	
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var financial = Mock.mock({
    "status": 0000,
    "msg": "处理成功！",
    'data':{
        assetValue: "107696380.53",
        assetValueTime: "2019-09-30",
        custComName: "南京银行",
        custodyFee: "",
        dividendWay: "红利再投",
        establishDate: "2014-10-21",
        fundAbbreviation: "中融货币A",
        fundCode: "000847",
        fundComName: "中融基金",
        fundName: "中融货币市场基金",
        fundStatus: "0",
        fundTypeName: "货币型",
        invTypCom: "10300",
        investmentScope: "1111本基金投资于法律法规及监管机构允许投资的金融工具，包括现金，期限在1年以内(含1年)的银行存款、债券回购、中央银行票据和同业存单，剩余期限在397天以内(含397天)的债券、非金融企业债务融资工具、资产支持证券，以及中国证监会、中国人民银行认可的其他具有良好流动性的货币市场工具。",
        managementFee: "",
        perfBen: "七天通知存款利率(税后)",
        redeemTime: "",
        riskCharacteristics: "本基金为货币市场基金,是证券投资基金中的低风险品种。本基金的预期风险和预期收益低于股票型基金、混合型基金、债券型基金。",
        riskLevel: "1",
        riskLevelName: "低风险",
        riskTarget: "在保持基金资产的低风险和高流动性的前提下，力争实现超越业绩比较基准的投资回报。",
        salesFee: "",
        shareType: "A",
    }
  });


module.exports=financial;