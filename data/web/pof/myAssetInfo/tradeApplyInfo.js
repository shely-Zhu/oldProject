/*
  公募交易详情查询接口
  http://192.168.6.105:8090/pages/viewpage.action?pageId=9470018#id-%E5%85%AC%E5%8B%9FWEB%E6%A8%A1%E5%9D%97-16.%E9%87%91%E6%9C%8DWEB-%E4%BA%A4%E6%98%93%E8%AF%A6%E6%83%85%E6%9F%A5%E8%AF%A2
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status": "0000",
    "message": "处理成功！",
    "data": {

        applyId: "",//交易申请编号

        fundName: "中融3-5年信用债A",//基金名称

        fundCode: "",//基金代码

        fundType: "",//基金类型

        fundStatus: "",//基金交易状态

        fundBusinCode: "020",//业务大类

        capitalMode: "",//资金方式

        payModeName: "汇款支付",//支付方式名称

        tradeShares: "1,000,000",//交易申请份额(赎回交易使用)

        tradeAmount: "1,000,000.00",//交易申请金额(认/申购交易使用)

        tradeStatus: "0",//交易申请状态

        tradeApplyDesc: "待扣款",//交易状态信息

        tradeApplyDescMessage: "等待银行汇款",//交易状态描述

        debitStatus: "",//扣款状态

        tradeDate: "2017-09-01 11:00:35",//交易申请日期

        originalDate: "2016-09-01 11:00:35",//原交易日期

        estimateConfirmDate: "2018-08-01 11:00:35",//预估确认日期

        estimateArrivalDate: "2019-09-01 11:00:35",//预估到账日期

        confirmShares: "1,000份",//确认份额

        confirmAmount: "1,000,000.00",//确认金额

        confirmNav: "1.02",//确认净值

        confirmRate: "120.00",//手续费

        confirmDate: "2019-09-01 11:00:35",//确认日期

        tradeNo: "",//交易账号

        bankAccount: "6230221111111117",//银行账户

        bankIdNo: "",//银行编号

        bankLogoUrl: "http://hbimg.b0.upaiyun.com/a9d854a213470cd3805bc9404b03f9179a8532b81b814-RUgwaI_fw658",//银行logoUrl

        bankName: "中国工商银行",//银行名称

        cancelable: 0,//可撤单标记1-可撤单；0-不可撤单

        secondFundName: "",

        secondFundCode: "",

        combinationFundInfo: [//组合基金信息列表

            {

                fundCode: "",//基金代码

                fundName: "",//基金全称

                fundAbbreviation: "",//基金简称

                fundType: "",//基金类型

                fundStatus: "",//基金状态

                combinationProportion: "",//组合权重

                tradeShares: "",//交易份额

                tradeAmount: "1,000,000.00",//交易金额

                confirmDate: "",//确认日期

                confirmShares: "",//确认份额

                confirmAmount: "",//确认金额

                confirmNav: "",//确认净值

                confirmRate: ""//手续费

            }

        ]

    }
});

module.exports = data;