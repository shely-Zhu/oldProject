// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({
    message: "操作成功！",
    status: "0000",
    "data": {
        balance: "1002.00",
        balanceMask: "1,002.00",
        bankAccountMask: "623022******7471",
        bankAccountSecret: "7e68e99901ceb083c0987f55fb558318dee2768fa5d318c36f598819853312d5",
        bankName: "http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0XuABh-rAAANKzFrWkU393.png",
        bankNo: "012",
        capitalMode: "M",
        capitalModeDesc: "在线支付",
        expiryDate: "99990101",
        firstExchdate: "201912",
        fixState: "D",
        fixedPeriodMask: "每周 周一",
        fundCode: "000847",
        fundName: "中融货币A",
        fundType: "10300",
        fundTypeDesc: "货币型",
        nextFixrequestDate: "20191223",
        nextFixrequestDateMask: "2019-12-23",
        protocolFixDay: "2",
        protocolPeriodUnit: "1",
        serviceCharge: "0.00",
        shares: "0.00",
        signDate: "20191128",
        signDateMask: "2019-11-28",
        totalCfmBala: "0.00",
        totalCfmBalaMask: "0.00",
        totalCfmShare: "0.00",
        totalCfmShareMask: "0.00",
        totalTradeTimes: "0",
        tradeAcco: "5718",
        tradePeriod: "1",
        tradeRecord: [],
    }
});

module.exports = data;